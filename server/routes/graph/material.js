let ffmpeg = require('fluent-ffmpeg');
let fs = require('fs');
let uuid = require('node-uuid');
let path = require('path');

let UpdateGraph = require('../utils/updateGraph');
let supportedExtensions = (function () {
    let s = { // 可支持的扩展名列表
        'image': ["jpg", "png", "bmp", "gif", "svg"],
        'video': ["3gp", "flv", "mp4", "mov", "avi", "mpg", "m4v"],
        'audio': ["mp3", "wma", "ogg", "wav", "aac", "m4a"],
        'flash': ["swf"],
        'attachment': ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx"],
    };

    return {
        contains: function (extension, type) {
            if (!Array.prototype.includes) {
                Object.defineProperty(Array.prototype, "includes", {
                    enumerable: false,
                    value: function (obj) {
                        let newArr = this.filter(function (el) {
                            return el == obj;
                        });
                        return newArr.length > 0;
                    }
                });
            }
            if (type) {
                return s[type].includes(extension);
            }

            for (type in s) {
                if (s[type].includes(extension)) return true;
            }
            return false;
        },
    }
})();
let Process = function (file, originOptions, callback) {
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

    if (supportedExtensions.contains(originalExtension, 'video')) {
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
    else if (supportedExtensions.contains(originalExtension, 'image')) {
        extension = originalExtension;
        thumbnailPath = "/media/" + fileId + "." + extension;
        duration = 0;
        newOptions.duration = duration;
        newOptions.thumbnailUrl = thumbnailPath;
        callback(newOptions);
    }
    else if (supportedExtensions.contains(originalExtension, 'audio')) {
        newOptions.thumbnailUrl = "/resources/icons/audio-logo.png";
        ffmpeg(originalPath)
            .ffprobe(function (err, data) {
                duration = data.format.duration.toString();
                newOptions.duration = duration;
                callback(newOptions);
            });

    }
};
let WriteToDB = function (options, callback) {

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
module.exports = function (req, res, next) {
    let files = [];
    let upfile = req.files.upfile;
    // let username = req.session.user ? req.session.user : req.body.username;
    // let userId = req.session.userId ? req.session.userId : req.body.userId;
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



};