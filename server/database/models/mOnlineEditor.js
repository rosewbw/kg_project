module.exports = {
    tMaterial: {
        // 暂时使用默认 _id
        _id: {type: String, required: true},
        userId: {type: String, required: true},
        name: {type: String, required: true},
        type: {type: String, required: true},
        keyword: {type: String, required: true},
        url: {type: String, required: true},
        size: {type: String, required: true},
        description: {type: String, required: true},
        thumbnailUrl: {type: String, required: true},
        uniqueData: {type: Object},
        learningTime: {type: String},
        title: {type: String},
        format: {type: String},
        comments: {type: Object},
        language: {type: String},
        applicableObject: {type: Object}
    },
    tProject: {
        _id: {type: String, required: true},
        projectName: {type: String, required: true},
        userName: {type: String, required: true},
        thumbnailUrl: {type: String},
        data: {type: Object, required: true},
        publishStatus: {type: String, required: true},
        createDate: {type: String},
        updateDate: {type: String},
        description: {type: String}
    }
};
