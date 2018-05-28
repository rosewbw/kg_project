const UpdateGraph = require('../utils/updateGraph')
module.exports = {
    getSearchResult: function (req, res, next) {
        const searchInput = req.body.searchInput;
        const searchOptions = req.body.searchOptions;


        res.json({
            "status": "success",
            "data": {
                "searchResult": {
                    "lesson": [],
                    "knowledge": [[{
                        "similarity": 1,
                        "lesson": {
                            "id": "449a8a92-3ab6-407d-b881-e5ec2078794c",
                            "data": {
                                "title": "高等数学",
                                "description": "高等数学巴里巴啊",
                                "thumbnailUrl": "",
                                "publishStatus": "unPublish"
                            }
                        },
                        "knowledge": {
                            "id": "bf220a01-b823-4d3d-8cb1-03efd5f937f9",
                            "data": {
                                "demand": "0",
                                "achieve": "0",
                                "title": "数列极限",
                                "thumbnailUrl": "http://localhost:3000/defaultImg.jpg",
                                "synonym": "",
                                "difficulty": "",
                                "importance": "",
                                "description": ""
                            }
                        },
                        "teach": {
                            "id": "bc95ccb2-08f7-4d36-9807-3a92b7c87613",
                            "data": {"keyword": "", "description": "这节课主要说明数列极限的基本定义", "title": "数列极限的定义"}
                        },
                        "mcourse": {
                            "id": "dec38fcb-9c41-4ddd-8b21-2e321d24143e",
                            "data": {
                                "interactionDegree": "",
                                "interactionType": "",
                                "learningObjectType": "",
                                "averageRetentionRate": "",
                                "semanticDensity": "",
                                "watchNum": "",
                                "clickNum": "",
                                "duration": "",
                                "type": "",
                                "difficulty": "",
                                "typicalLearningTime": "",
                                "title": "",
                                "material_data": {
                                    "id": "5b0a594bba2bf93474a863e3",
                                    "data": {
                                        "url": "/media/ad88c1e0-617c-11e8-bbd5-1b82c8646a41.mp4",
                                        "userid": "",
                                        "size": "156007511",
                                        "thumbnailUrl": "/media/ad88c1e0-617c-11e8-bbd5-1b82c8646a41.png",
                                        "language": "中文",
                                        "keyword": "数列极限",
                                        "description": "数列极限的课程",
                                        "title": "数列的极限",
                                        "applicableObject": "",
                                        "type": "视频"
                                    }
                                }
                            }
                        },
                        "acourse": [{
                            "id": "5b01f3a9-d892-48d1-8312-a8da4f2ba90c",
                            "data": {
                                "interactionDegree": "",
                                "interactionType": "",
                                "learningObjectType": "",
                                "averageRetentionRate": "0",
                                "semanticDensity": "0",
                                "watchNum": "0",
                                "clickNum": "0",
                                "duration": "0",
                                "type": "aid",
                                "difficulty": "",
                                "typicalLearningTime": "",
                                "title": "2",
                                "material_data": {
                                    "id": "",
                                    "data": {
                                        "url": "",
                                        "userid": "",
                                        "size": "",
                                        "thumbnailUrl": "",
                                        "language": "",
                                        "keyword": "",
                                        "description": "",
                                        "title": "pdf",
                                        "applicableObject": "",
                                        "type": "pdf"
                                    }
                                }
                            }
                        }, {
                            "id": "00b61a33-e316-42cf-a1d9-50010333032d",
                            "data": {
                                "interactionDegree": "",
                                "interactionType": "",
                                "learningObjectType": "",
                                "averageRetentionRate": "0",
                                "semanticDensity": "0",
                                "watchNum": "0",
                                "clickNum": "0",
                                "duration": "0",
                                "type": "aid",
                                "difficulty": "",
                                "typicalLearningTime": "",
                                "title": "3",
                                "material_data": {
                                    "id": "5b0a594bba2bf93474a863e3",
                                    "data": {
                                        "url": "/media/ad88c1e0-617c-11e8-bbd5-1b82c8646a41.mp4",
                                        "userid": "",
                                        "size": "156007511",
                                        "thumbnailUrl": "/media/ad88c1e0-617c-11e8-bbd5-1b82c8646a41.png",
                                        "language": "中文",
                                        "keyword": "数列极限",
                                        "description": "数列极限的课程",
                                        "title": "数列的极限",
                                        "applicableObject": "",
                                        "type": "视频"
                                    }
                                }
                            }
                        }, {
                            "id": "a8b30769-3bc3-45ef-a0ed-d274f90c2784",
                            "data": {
                                "interactionDegree": "high",
                                "interactionType": "commentary",
                                "learningObjectType": "video",
                                "averageRetentionRate": "0",
                                "semanticDensity": "0",
                                "watchNum": "0",
                                "clickNum": "0",
                                "duration": "0",
                                "type": "aid",
                                "difficulty": "high",
                                "typicalLearningTime": "",
                                "title": "123",
                                "material_data": {
                                    "id": "5b0a594bba2bf93474a863e3",
                                    "data": {
                                        "url": "/media/ad88c1e0-617c-11e8-bbd5-1b82c8646a41.mp4",
                                        "userid": "",
                                        "size": "156007511",
                                        "thumbnailUrl": "/media/ad88c1e0-617c-11e8-bbd5-1b82c8646a41.png",
                                        "language": "中文",
                                        "keyword": "数列极限",
                                        "description": "数列极限的课程",
                                        "title": "数列的极限",
                                        "applicableObject": "",
                                        "type": "视频"
                                    }
                                }
                            }
                        }, {
                            "id": "5eccbfa4-db8b-4b07-8953-6b702827862b",
                            "data": {
                                "interactionDegree": "",
                                "interactionType": "",
                                "learningObjectType": "",
                                "averageRetentionRate": "0",
                                "semanticDensity": "0",
                                "watchNum": "0",
                                "clickNum": "0",
                                "duration": "0",
                                "type": "aid",
                                "difficulty": "",
                                "typicalLearningTime": "",
                                "title": "1",
                                "material_data": {
                                    "id": "5b057190bef0223748fb9550",
                                    "data": {
                                        "url": "/media/3490b340-5e90-11e8-80bf-190678dc9b31.jpg",
                                        "userid": "",
                                        "size": "119765",
                                        "thumbnailUrl": "/media/3490b340-5e90-11e8-80bf-190678dc9b31.jpg",
                                        "language": "1",
                                        "keyword": "1",
                                        "description": "1",
                                        "title": "1",
                                        "applicableObject": "",
                                        "type": "图片"
                                    }
                                }
                            }
                        }, {
                            "id": "a04d2e87-c4af-4e88-80c1-ff971dd006ee",
                            "data": {
                                "interactionDegree": "",
                                "interactionType": "",
                                "learningObjectType": "",
                                "averageRetentionRate": "0",
                                "semanticDensity": "0",
                                "watchNum": "0",
                                "clickNum": "0",
                                "duration": "0",
                                "type": "aid",
                                "difficulty": "",
                                "typicalLearningTime": "",
                                "title": "4",
                                "material_data": {
                                    "id": "",
                                    "data": {
                                        "url": "",
                                        "userid": "",
                                        "size": "",
                                        "thumbnailUrl": "",
                                        "language": "",
                                        "keyword": "",
                                        "description": "",
                                        "title": "",
                                        "applicableObject": "",
                                        "type": ""
                                    }
                                }
                            }
                        }]
                    }]]
                }, "searchInput": "数列极限"
            }
        })

        // UpdateGraph({
        //     searchInput: searchInput,
        //     searchOptions: searchOptions
        // }, 'search', (data) => {
        //     res.json({
        //         status: 'success',
        //         data: {
        //             searchResult: data,
        //             searchInput: searchInput
        //         }
        //     })
        // })

    }
};


