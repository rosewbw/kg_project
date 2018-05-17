const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
let uuid = require('node-uuid');

const formatParser = require('../utils/format-parser');
const updateGraph = require('../utils/updateGraph');
const { findByIdAndUpdateInModel, findOneInModel } = require('../../database/model-operations');

/**
 * 上传文件并返回文件相关属性
 * @param file
 * @param originOptions
 * @param callback
 */
const uploadFile = function (file, originOptions, callback) {
    let newOptions = {};
    let originalExtension = file.extension.toLowerCase();//用户上传文件的扩展名
    let fileId = uuid.v1();
    let originalPath = "./public/media/" + file.name,
        targetPath = "./public/media/" + fileId + '.' + originalExtension;//上传后目标文件路径;
    let url = "/media/" + fileId + "." + originalExtension;
    let extension, duration, thumbnailPath;

    for (let item in originOptions) {
        if (originOptions.hasOwnProperty(item)) {
            newOptions[item] = originOptions[item];
        }
    }

    fs.rename(file.path, targetPath, function (err) {
        if (err) console.log(err);
    });


    //通用属性
    newOptions.originalPath = originalPath;
    newOptions.fileId = fileId;
    newOptions.targetPath = targetPath;
    newOptions.size = file.size;
    newOptions.url = url;
    newOptions.learningTime = 0;
    newOptions.applicableObject = {};
    newOptions.format = originalExtension;
    newOptions.title = '';

    newOptions.uniqueData = {};

    if (formatParser.toType(originalExtension) === 'video') {
        ffmpeg(originalPath)
            .ffprobe(function (err, data) {
                duration = data.format.duration.toString();
                newOptions.duration = duration;
            });

        var getthumbnail = new ffmpeg({source: originalPath})
            .takeScreenshots({//生成缩略图
                count: 1,
                timemarks: ['0.5'],
                folder: './public/media/',
                filename: fileId
            })
            .on('error', function (err) {
                console.log('thumbnail error!');
            })
            .on('end', function () {
                console.log('thumbnail succeed!');
                newOptions.thumbnailUrl = thumbnailPath;
                callback(newOptions);
            });
    }
    else if (formatParser.toType(originalExtension) === 'image') {
        extension = originalExtension;
        thumbnailPath = "/media/" + fileId + "." + extension;
        duration = 0;
        newOptions.duration = duration;
        newOptions.thumbnailUrl = thumbnailPath;
        callback(newOptions);
    }
    else if (formatParser.toType(originalExtension) === 'audio') {
        newOptions.thumbnailUrl = "/resources/icons/audio-logo.png";
        ffmpeg(originalPath)
            .ffprobe(function (err, data) {
                duration = data.format.duration.toString();
                newOptions.duration = duration;
                callback(newOptions);
            });

    }
};

/**
 * 从 request 中获取信息，上传文件，并返回 Promise
 * @param req
 * @return {Promise}
 */
const getInfoFromReq = function (req) {
    const {
        materialName,
        materialType,
        description,
        keyword,
        language,
    } = req.body;

    let materialInfo = {
        _id: req.query.materialId,
        title: materialName,
        type: materialType,
        description,
        keyword,
        language,
    };

    let files = [];
    let upfile = req.files.upfile;

    if (upfile instanceof Array) {
        files = upfile;
    } else {
        upfile && files.push(upfile); // 防止 upfile=undefined 的情况
    }

    // 认为一次只能上传一个文件
    if (files.length === 1) {
        return uploadFile(files[0])
            .then(fileInfo => Object.assign(materialInfo, fileInfo))
    }
    else {
        return Promise.resolve(materialInfo);
    }
};

const updateMaterial = function (req, res, next) {
    const username = req.api_user.param;
    let userId = 'debug-user'; // 暂时认为默认名为 debug-user

    // 成功返回新素材
    const onSuccess = data => res.json({
        status: 'success',
        data
    });

    // 失败返回错误信息
    const onError = err => {console.log(err);res.json({
        status: 'error',
        message: err.toString(),
    })};

    const updateDatabaseAndGraph = function(materialInfo) {
        const pUpdateDatabase = findByIdAndUpdateInModel('tMaterial', materialInfo._id, materialInfo, { new: true });
        const pUpdateGraph = Promise.resolve(updateGraph(materialInfo, 'material'));

        return Promise.all([pUpdateDatabase, pUpdateGraph]);
    };

    // 判断用户 id 和 Material 对应
    const chechUserMatchMaterial = function() {
        // 判断用户 id 和 Material 对应
        const pCheckUser = findOneInModel('tUser', { name: username });
        const pCheckMaterial = findOneInModel('tMaterial', { _id: req.query.materialId });

        return Promise.all([pCheckUser, pCheckMaterial])
            .then(([user, material]) => {
                // TODO: 测试时暂时注释掉，记得重新弄回来！
                if (user.id !== material.userid) { return Promise.reject('资源不属于该用户！')}

                userId = user.id;
                return;
            })
    };

    chechUserMatchMaterial()
        .then(() => getInfoFromReq(req))
        .then(updateDatabaseAndGraph)
        .then(([newMaterial, resOfGraph]) => newMaterial) // 只需要新的 Material 数据
        .then(onSuccess)
        .catch(onError);

};

module.exports = updateMaterial;
