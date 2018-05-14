
const getMaterial = function (req, res, next) {
    const materials = [
        {
            id: '9d365990-54c7-11e8-894b-076bddf849cd',
            name: '后台的假数据',
            description: 'test',
            format: 'png',
            url: '../../server/public/media/9d365990-54c7-11e8-894b-076bddf849cd.png',
            thumbnail: '../defaultImg.jpg',
        },
        {
            id: 'c841a311-54c7-11e8-894b-076bddf849cd',
            name: '测试',
            description: 'test',
            format: 'png',
            url: '../../server/public/media/c841a310-54c7-11e8-894b-076bddf849cd.png',
            thumbnail: '../../server/public/media/c841a310-54c7-11e8-894b-076bddf849cd.png',
        },
        {
            id: 'c841o310-54c7-11e8-894b-076bddf849cd',
            name: '测试',
            description: 'test',
            format: 'png',
            url: '../../server/public/media/c841a310-54c7-11e8-894b-076bddf849cd.png',
            thumbnail: '../../server/public/media/c841a310-54c7-11e8-894b-076bddf849cd.png',
        },
        {
            id: 'c841a310-53c7-11e8-894b-076bddf849cd',
            name: '测试',
            description: 'test',
            format: 'png',
            url: '../../server/public/media/c841a310-54c7-11e8-894b-076bddf849cd.png',
            thumbnail: '../../server/public/media/c841a310-54c7-11e8-894b-076bddf849cd.png',
        },
        {
            id: 'c841a310-54c7-11e8-894b-0761ddf849cd',
            name: '测试',
            description: 'test',
            format: 'png',
            url: '../../server/public/media/c841a310-54c7-11e8-894b-076bddf849cd.png',
            thumbnail: '../../server/public/media/c841a310-54c7-11e8-894b-076bddf849cd.png',
        },
        {
            id: 'c841a310-54c7-11e8-894b-076b1df849cd',
            name: '测试',
            description: 'test',
            format: 'png',
            url: '../../server/public/media/c841a310-54c7-11e8-894b-076bddf849cd.png',
            thumbnail: '../../server/public/media/c841a310-54c7-11e8-894b-076bddf849cd.png',
        },
    ];
    res.json({
        status: 'success',
        data: materials,
    });

};

module.exports = getMaterial;
