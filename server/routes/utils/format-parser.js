/**
 * @description 根据 format 查找对应类型/样式
 */
class FormatParser {
    constructor() {
        this.ICONTYPE_TABLE = {
            "picture" : ["png"], // 图片
            "video-camera": ["mp4"], // 视频
            "file": ["doc", "docx", "pdf", "ppt", "pptx"], // 文档
            "bulb": ["rich-media"] // 富媒体
        };

        this.TYPE_EXTENSITONS_TABLE = {
            'image': ["jpg", "png", "bmp", "gif", "svg"],
            'video': ["3gp", "flv", "mp4", "mov", "avi", "mpg", "m4v"],
            'audio': ["mp3", "wma", "ogg", "wav", "aac", "m4a"],
            'flash': ["swf"],
            'attachment': ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx"],
        };

        this.toIcon = this.toIcon.bind(this);
    }

    _parser(TABLE, format) {
        for( var prop in TABLE ) {
            if( TABLE.hasOwnProperty( prop ) ) {
                if( TABLE[ prop ].includes(format) )
                    return prop;
            }
        }
        return undefined;
    }

    toIcon(format) {
        return this._parser(this.ICONTYPE_TABLE, format);
    }

    toType(ext) {
        return this._parser(this.TYPE_EXTENSITONS_TABLE, ext);
    }

}

export default new FormatParser();