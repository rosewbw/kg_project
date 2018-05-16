const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

const formatParser = require('../utils/format-parser');
const UpdateGraph = require('../utils/updataGraph');
const { findByIdAndUpdateInModel, findOneInModel } = require('../../database/model-operations');

const Process = function (file, originOptions, callback) {
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

const WriteToDB = function (options, callback) {

    var tMaterial = global.dbHandel.getModel('tMaterial');
    tMaterial.create({
            _id: options.fileId,
            userId: options.userId,
            name: options.materialName,
            type: options.materialType,
            keyword: options.keyword,
            url: options.url,
            size: options.size,
            description: options.description,
            thumbnailUrl: options.thumbnailUrl,
            uniqueData: options.uniqueData,
            learningTime: options.learningTime,
            title: options.title,
            format: options.format,
            comments: options.comments,
            language: options.language,
            applicableObject: options.applicableObject
        }, function (err, doc) {
            if (err) {
                console.log(err);
            } else {
                callback(doc);
            }
        }
    );
};

const updateMaterial = function (req, res, next) {
    // const username = req.api_user.param;
    //
    // const onSuccess = () => res.json({
    //     status: 'success',
    // });
    //
    // const onError = err => {console.log(err);res.json({
    //     status: 'error',
    //     message: err.toString(),
    // })};
    //
    // // 判断用户 id 和 Material 对应
    // const pCheckUser = findOneInModel('tUser', { name: username });
    // const pCheckMaterial = findOneInModel('tMaterial', { _id: req.query.materialId });
    //
    // Promise.all([pCheckUser, pCheckMaterial])
    //     .then(([user, material]) => {
    //         if (user.id !== material.userid) { return Promise.reject('资源不属于该用户！')}
    //
    //         return material;
    //     })
    //     .then(material => removeInModel('tMaterial', { _id: material._id }))
    //     .then(onSuccess)
    //     .catch(onError);

    let files = [];
    let upfile = req.files.upfile;
    let userId = 'debug-user';
    let materialInfo = {};
    let uploadInfo = req.body;

    for (let index in uploadInfo) {
        materialInfo[index] = uploadInfo[index]
    }

    materialInfo.userId = userId;

    if (upfile instanceof Array) {
        files = upfile;
    } else {
        files.push(upfile);
    }


    for (let i = 0; i < files.length; i++) {
        let file = files[i];//上传的文件对象
        Process(file, materialInfo, function (opt) {
            UpdateGraph(opt,'material',function (opts) {
                WriteToDB(opts, function (doc) {
                    res.write(JSON.stringify({
                            material: {
                                duration: doc.duration,
                                source: doc.url,
                                thumbnail: doc.thumbnailUrl,
                                title: doc.name,
                                type: doc.type,
                                id: doc._id,
                                keyword: doc.keyword,
                                size: doc.size,
                                description: doc.description
                            }
                        })
                    );
                    res.end();
                });
            })

        })
    }


    console.log(req.body);
    res.json({
        status: 'success',
        data: {
            _id: 'f2628c90-54c7-11e8-894b-076bddf849cd',
            name: '新名字'
        }
    });

    // material: {
    //     duration: doc.duration,
    //         source: doc.url,
    //         thumbnail: doc.thumbnailUrl,
    //         title: doc.name,
    //         type: doc.type,
    //         id: doc._id,
    //         keyword: doc.keyword,
    //         size: doc.size,
    //         description: doc.description
    // }
};

module.exports = updateMaterial;
