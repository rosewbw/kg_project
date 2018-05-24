module.exports = {
    getSearchResult: function (req, res, next) {
        let dataKnowledge = [{
            "lesson": {
                "id": "d8a31930-4a65-46c1-9b00-15673aab5ad8",
                "data": {
                    "title": "\u9ad8\u7b49\u6570\u5b66",
                    "description": "",
                    "thumbnailUrl": "",
                    "publishStatus": "unPublish"
                }
            },
            "knowledge": {
                "id": "d6a8325a-f903-43e9-85d9-f454481a6960",
                "data": {
                    "demand": "0",
                    "achieve": "0",
                    "title": "\u51fd\u6570\u7684\u6781\u9650",
                    "thumbnailUrl": "https://i2.hdslb.com/bfs/archive/1fba41474b913736ac18a0973a6f87a225333eca.jpg@320w_200h.webp",
                    "synonym": "",
                    "difficulty": "",
                    "importance": "",
                    "description": ""
                }
            },
            "teach": {
                "id": "ea4eb2ec-c2df-4678-aab2-8af307aeb0a6",
                "data": {"keyword": "", "description": "", "title": "\u51fd\u6570\u7684\u6781\u9650"}
            },
            "mcourse": {
                "id": "7addf0c0-d761-49c0-874c-c197630d4e19",
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
                        "id": "841a4c90-57c5-11e8-9cc1-b9b0b483f760",
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
            },
            "acourse": [{
                "id": "43c48405-5195-4ac6-9d87-280cd2215d48",
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
                    "title": "\u51fd\u6570\u7684\u6781\u9650\u8865\u5145\u5185\u5bb91",
                    "material_data": {
                        "id": "8d4d0910-57c5-11e8-9cc1-b9b0b483f760",
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
            }, {
                "id": "b0f383df-6e0d-4b38-b1ce-331503611592",
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
                    "title": "\u51fd\u6570\u7684\u6781\u9650\u8865\u5145\u5185\u5bb92",
                    "material_data": {
                        "id": "973bc290-57c5-11e8-9cc1-b9b0b483f760",
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
        }, {
            "lesson": {
                "id": "d8a31930-4a65-46c1-9b00-15673aab5ad8",
                "data": {
                    "title": "\u9ad8\u7b49\u6570\u5b66",
                    "description": "",
                    "thumbnailUrl": "",
                    "publishStatus": "unPublish"
                }
            },
            "knowledge": {
                "id": "75740e22-65c4-4dc0-8fd7-16f69279e3a0",
                "data": {
                    "demand": "0",
                    "achieve": "0",
                    "title": "\u65e0\u7a77\u5927\u4e0e\u65e0\u7a77\u5c0f",
                    "thumbnailUrl": "https://i2.hdslb.com/bfs/archive/1fba41474b913736ac18a0973a6f87a225333eca.jpg@320w_200h.webp",
                    "synonym": "",
                    "difficulty": "",
                    "importance": "",
                    "description": ""
                }
            },
            "teach": {
                "id": "d9bff027-e0ab-42aa-b3f1-6f85f25a6b06",
                "data": {"keyword": "", "description": "", "title": "\u65e0\u7a77\u5927\u4e0e\u65e0\u7a77\u5c0f"}
            },
            "mcourse": {
                "id": "38e90e8d-ae62-4719-85e1-386f159fb00b",
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
                        "id": "c3b8c480-57c5-11e8-9cc1-b9b0b483f760",
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
            },
            "acourse": []
        }, {
            "lesson": {
                "id": "d8a31930-4a65-46c1-9b00-15673aab5ad8",
                "data": {
                    "title": "\u9ad8\u7b49\u6570\u5b66",
                    "description": "",
                    "thumbnailUrl": "",
                    "publishStatus": "unPublish"
                }
            },
            "knowledge": {
                "id": "64f23798-ccab-49f9-97c0-06eab7c58574",
                "data": {
                    "demand": "0",
                    "achieve": "0",
                    "title": "\u51fd\u6570\u7684\u57fa\u672c\u4ecb\u7ecd",
                    "thumbnailUrl": "https://i2.hdslb.com/bfs/archive/1fba41474b913736ac18a0973a6f87a225333eca.jpg@320w_200h.webp",
                    "synonym": "",
                    "difficulty": "",
                    "importance": "",
                    "description": ""
                }
            },
            "teach": {
                "id": "8af9cf56-8fd2-4a12-9e8d-c9e70319b436",
                "data": {"keyword": "", "description": "", "title": "\u51fd\u6570\u7684\u57fa\u672c\u4ecb\u7ecd"}
            },
            "mcourse": {
                "id": "10b6e4bc-fef0-400e-84c6-6d970974347d",
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
                        "id": "973bc290-57c5-11e8-9cc1-b9b0b483f760",
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
            },
            "acourse": []
        }, {
            "lesson": {
                "id": "d8a31930-4a65-46c1-9b00-15673aab5ad8",
                "data": {
                    "title": "\u9ad8\u7b49\u6570\u5b66",
                    "description": "",
                    "thumbnailUrl": "",
                    "publishStatus": "unPublish"
                }
            },
            "knowledge": {
                "id": "91a354aa-ed92-466f-89f1-a221064d5bf4",
                "data": {
                    "demand": "0",
                    "achieve": "0",
                    "title": "\u51fd\u6570",
                    "thumbnailUrl": "https://i2.hdslb.com/bfs/archive/1fba41474b913736ac18a0973a6f87a225333eca.jpg@320w_200h.webp",
                    "synonym": "",
                    "difficulty": "",
                    "importance": "",
                    "description": ""
                }
            },
            "teach": {
                "id": "df11e7c8-6ac4-4e3a-820b-c2b18942589a",
                "data": {"keyword": "", "description": "", "title": "\u51fd\u6570"}
            },
            "mcourse": {
                "id": "92b10659-2982-4174-89c7-6b682cb98aa6",
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
                        "id": "8d4d0910-57c5-11e8-9cc1-b9b0b483f760",
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
            },
            "acourse": []
        }];
        let lesson = [{"lesson_id": "d8a31930-4a65-46c1-9b00-15673aab5ad8"}]
        res.json({
            status: 'success',
            data: {
                data:lesson,
                searchInput:'高等数学'
            }
        })
    }
};


