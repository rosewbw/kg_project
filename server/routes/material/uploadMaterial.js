const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');
const uuid = require('node-uuid');

const formatParser = require('../utils/format-parser');
const updateGraph = require('../utils/updateGraph');
const { createInModel, findOneInModel } = require('../../database/model-operations');

/**
 * 上传文件并返回文件相关属性
 * @param file
 * @param originOptions
 * @param callback
 */
const uploadFile = function (file, originOptions) {
    let newOptions = {};
    let originalExtension = file.extension.toLowerCase(); // 用户上传文件的扩展名
    let fileId = uuid.v1();
    let originalPath = path.join(__dirname, "../../public/media/", file.name),
        targetPath = path.join(__dirname, "../../public/media/", fileId + '.' + originalExtension); // 上传后目标文件路径;
    let url = "/media/" + fileId + "." + originalExtension;
    let extension, duration, thumbnailPath;

    for (let item in originOptions) {
        if (originOptions.hasOwnProperty(item)) {
            newOptions[item] = originOptions[item];
        }
    }

    fs.rename(file.path, targetPath, function (err) {
        if (err) {return Promise.reject(err.toString());}
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

    newOptions.uniqueData = {};

    const processVideo = function () {
        return new Promise(function (resolve, reject) {
            newOptions.type = '视频';

            ffmpeg(targetPath)
                .ffprobe(function (err, data) {
                    if (err || !data) return reject('ffprobe error!', err.toString());

                    duration = data.format.duration.toString();
                    newOptions.duration = duration;
                });

            thumbnailPath = `/media/${fileId}.png`;
            ffmpeg(targetPath)
                .takeScreenshots({//生成缩略图
                    count: 1,
                    timemarks: ['0.5'],
                    folder: './public/media/',
                    filename: fileId + '.png',
                })
                .on('error', function (err) {
                    reject('thumbnail error!', err.toString());
                })
                .on('end', function () {
                    newOptions.thumbnailUrl = thumbnailPath;
                    resolve(newOptions);
                });
        });
    };

    const processImage = function () {
        return new Promise(function (resolve, reject) {
            newOptions.type = '图片';
            extension = originalExtension;
            thumbnailPath = "/media/" + fileId + "." + extension;
            duration = 0;
            newOptions.duration = duration;
            newOptions.thumbnailUrl = thumbnailPath;
            resolve(newOptions);
        });
    };

    const processAudio = function () {
        return new Promise(function (resolve, reject) {
            newOptions.type = '音频';
            newOptions.thumbnailUrl = "/resources/icons/audio-logo.png";
            ffmpeg(originalPath)
                .ffprobe(function (err, data) {
                    if (err) { reject(err.toString()); }

                    duration = data.format.duration.toString();
                    newOptions.duration = duration;
                    resolve(newOptions);
                });
        });
    };

    switch (formatParser.toType(originalExtension)) {
        case 'video': return processVideo();
        case 'image': return processImage();
        case 'audio': return processAudio();
        default: return Promise.resolve({}); // 默认不处理，返回的 newOptions 为空
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
    else if (files.length === 0) {
        return Promise.reject('请上传文件！');
    }
    else {
        return Promise.reject('一次只能上传一个文件！');
    }
};

const uploadMaterial = function (req, res, next) {
    const username = req.api_user.param;
    let materialInfo = {};

    // 成功返回素材信息
    const onSuccess = data =>
        res.json({
            material: {
                duration: data.duration,
                source: data.url,
                thumbnail: data.thumbnailUrl,
                title: data.name,
                type: data.type,
                id: data._id,
                keyword: data.keyword,
                size: data.size,
                description: data.description
            }
        });
        // res.json({
        //     status: 'success',
        //     data
        // });

    // 失败返回错误信息
    const onError = err => {
        console.log(err);
        res.json({
            status: 'error',
            message: err.toString(),
        });
    };

    const uploadToDatabaseAndGraph= function() {
        const pUploadToDatabase = createInModel('tMaterial', materialInfo);
        const pUploadToGraph = Promise.resolve(updateGraph(materialInfo, 'material'));

        return Promise.all([pUploadToDatabase, pUploadToGraph]);
    };

    const getUserId = function(username) {
        return findOneInModel('tUser', { name: username });
    };

    getInfoFromReq(req)
        .then(info => { materialInfo = info; return getUserId(username); })
        .then(user => { materialInfo.userId = user._id; })
        .then(uploadToDatabaseAndGraph)
        .then(([resOfDatabase, resOfGraph]) => resOfDatabase) // 一次只上传一个 Material
        .then(onSuccess)
        .catch(onError);

};

module.exports = uploadMaterial;
