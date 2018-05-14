import React, { Component } from 'react';
import { VizulyWeightedTree } from '../utils/Vizuly';

class CourseContent extends Component {
    constructor(props) {
        super(props);

        this.course = {
    "_id" : "d8a31930-4a65-46c1-9b00-15673aab5ad8",
    "projectName" : "232323232323",
    "userName" : "1",
    "thumbnailUrl" : "",
    "publishStatus" : "unPublish",
    "createDate" : "2018-5-14 01:52:07",
    "updateDate" : "2018-5-14 14:39:38",
    "description" : "",
    "startPosition" : {
        "x" : 87,
        "y" : 225
    },
    "__v" : 0,
    "data" : [
        {
            "id" : "a4bb6389-274b-44ab-8127-87a57398fa2c",
            "name" : "Node 0",
            "thumbnailUrl" : "http://localhost:3000/defaultImg.jpg",
            "root" : true,
            "demand" : 0,
            "achieve" : 0,
            "synonym" : [],
            "position" : {
                "x" : 298,
                "y" : 158
            },
            "isStart" : false,
            "parent" : [],
            "rely" : [],
            "related" : [],
            "brothers" : [],
            "contain" : [
                "c8e85f9e-fe96-4eee-839d-5ccadfd120ca",
                "91a354aa-ed92-466f-89f1-a221064d5bf4"
            ],
            "parallel" : [],
            "hasParentNode" : [],
            "hasChildNode" : [],
            "isRelatedTo" : [],
            "isParallelWith" : [],
            "isRelyOnTo" : [],
            "isBeingRelyOnBy" : [],
            "teachUnit" : {
                "id" : "752dbd34-d843-457f-8dd5-8389f1ab45e2",
                "keyword" : [],
                "status" : "",
                "description" : "",
                "title" : "",
                "knowledgeUnitId" : "a4bb6389-274b-44ab-8127-87a57398fa2c",
                "mCourseUnit" : {
                    "id" : "abf13f15-7be0-4ed0-b483-95b5b753b513",
                    "type" : "main",
                    "title" : "",
                    "duration" : 0,
                    "interactionDegree" : "",
                    "interactionType" : "",
                    "clickNum" : 0,
                    "difficulty" : "",
                    "watchNum" : 0,
                    "material" : "",
                    "learningObjectType" : "",
                    "averageRetentionRate" : 0,
                    "semanticDensity" : 0,
                    "TeachUnitId" : "752dbd34-d843-457f-8dd5-8389f1ab45e2"
                },
                "aCourseUnit" : [
                    {
                        "id" : "f34dff48-bfb8-4f95-8ea2-7c591de54c44",
                        "type" : "aid",
                        "title" : "1",
                        "duration" : 0,
                        "interactionDegree" : "",
                        "interactionType" : "",
                        "clickNum" : 0,
                        "difficulty" : "",
                        "watchNum" : 0,
                        "material" : {
                            "_id" : "b6f48140-300f-11e8-9efe-ff75498d8b88",
                            "userId" : "a8e4a85b-63fe-49c4-a4bc-681425013d01",
                            "name" : "1",
                            "type" : "图片",
                            "keyword" : "3",
                            "url" : "/media/b6f48140-300f-11e8-9efe-ff75498d8b88.jpg",
                            "size" : "175219",
                            "description" : "2",
                            "thumbnailUrl" : "/media/b6f48140-300f-11e8-9efe-ff75498d8b88.jpg",
                            "learningTime" : "0",
                            "title" : "",
                            "format" : "jpg",
                            "language" : "4",
                            "__v" : 0
                        },
                        "learningObjectType" : "",
                        "averageRetentionRate" : 0,
                        "semanticDensity" : 0,
                        "TeachUnitId" : "752dbd34-d843-457f-8dd5-8389f1ab45e2"
                    }
                ],
                "student" : [],
                "comments" : []
            }
        },
        {
            "id" : "c8e85f9e-fe96-4eee-839d-5ccadfd120ca",
            "name" : "Node 1",
            "thumbnailUrl" : "http://localhost:3000/defaultImg.jpg",
            "root" : false,
            "demand" : 0,
            "achieve" : 0,
            "synonym" : [],
            "position" : {
                "x" : 475,
                "y" : 429
            },
            "isStart" : false,
            "parent" : [
                "a4bb6389-274b-44ab-8127-87a57398fa2c"
            ],
            "rely" : [],
            "related" : [],
            "brothers" : [],
            "contain" : [
                "097cee92-fd5e-4d8b-84df-9d60d693eabe",
                "1d9c1c1c-385a-4dc4-8d95-60788c53ac77"
            ],
            "parallel" : [],
            "hasParentNode" : [],
            "hasChildNode" : [],
            "isRelatedTo" : [],
            "isParallelWith" : [],
            "isRelyOnTo" : [],
            "isBeingRelyOnBy" : [],
            "teachUnit" : {
                "id" : "b3ee5387-8e8e-41a3-94e7-fc3dbfb92d6f",
                "keyword" : [],
                "status" : "",
                "description" : "",
                "title" : "",
                "knowledgeUnitId" : "c8e85f9e-fe96-4eee-839d-5ccadfd120ca",
                "mCourseUnit" : {
                    "id" : "460c1f08-8143-4a8b-88c4-de717c98af76",
                    "type" : "main",
                    "title" : "",
                    "duration" : 0,
                    "interactionDegree" : "",
                    "interactionType" : "",
                    "clickNum" : 0,
                    "difficulty" : "",
                    "watchNum" : 0,
                    "material" : "",
                    "learningObjectType" : "",
                    "averageRetentionRate" : 0,
                    "semanticDensity" : 0,
                    "TeachUnitId" : "b3ee5387-8e8e-41a3-94e7-fc3dbfb92d6f"
                },
                "aCourseUnit" : [],
                "student" : [],
                "comments" : []
            }
        },
        {
            "id" : "91a354aa-ed92-466f-89f1-a221064d5bf4",
            "name" : "Node 2",
            "thumbnailUrl" : "http://localhost:3000/defaultImg.jpg",
            "root" : false,
            "demand" : 0,
            "achieve" : 0,
            "synonym" : [],
            "position" : {
                "x" : 502,
                "y" : 49
            },
            "isStart" : false,
            "parent" : [
                "a4bb6389-274b-44ab-8127-87a57398fa2c"
            ],
            "rely" : [],
            "related" : [],
            "brothers" : [],
            "contain" : [
                "c44a2f3f-0b44-41f3-88c2-b9e706a13487",
                "b641956d-2999-468c-8405-81b08cb36428"
            ],
            "parallel" : [],
            "hasParentNode" : [],
            "hasChildNode" : [],
            "isRelatedTo" : [],
            "isParallelWith" : [],
            "isRelyOnTo" : [],
            "isBeingRelyOnBy" : [],
            "teachUnit" : {
                "id" : "df11e7c8-6ac4-4e3a-820b-c2b18942589a",
                "keyword" : [],
                "status" : "",
                "description" : "",
                "title" : "",
                "knowledgeUnitId" : "91a354aa-ed92-466f-89f1-a221064d5bf4",
                "mCourseUnit" : {
                    "id" : "92b10659-2982-4174-89c7-6b682cb98aa6",
                    "type" : "main",
                    "title" : "",
                    "duration" : 0,
                    "interactionDegree" : "",
                    "interactionType" : "",
                    "clickNum" : 0,
                    "difficulty" : "",
                    "watchNum" : 0,
                    "material" : "",
                    "learningObjectType" : "",
                    "averageRetentionRate" : 0,
                    "semanticDensity" : 0,
                    "TeachUnitId" : "df11e7c8-6ac4-4e3a-820b-c2b18942589a"
                },
                "aCourseUnit" : [],
                "student" : [],
                "comments" : []
            }
        },
        {
            "id" : "c44a2f3f-0b44-41f3-88c2-b9e706a13487",
            "name" : "Node 3",
            "thumbnailUrl" : "http://localhost:3000/defaultImg.jpg",
            "root" : false,
            "demand" : 0,
            "achieve" : 0,
            "synonym" : [],
            "position" : {
                "x" : 815,
                "y" : -41
            },
            "isStart" : false,
            "parent" : [
                "91a354aa-ed92-466f-89f1-a221064d5bf4"
            ],
            "rely" : [],
            "related" : [],
            "brothers" : [],
            "contain" : [
                "639ce6f9-72e3-4be3-9fa8-571db74fa2d0",
                "a20257af-7e8f-4041-bb52-4938bde76826"
            ],
            "parallel" : [],
            "hasParentNode" : [],
            "hasChildNode" : [],
            "isRelatedTo" : [],
            "isParallelWith" : [],
            "isRelyOnTo" : [],
            "isBeingRelyOnBy" : [],
            "teachUnit" : {
                "id" : "facacda0-c4ec-4e7e-bbf5-3e786d85e1db",
                "keyword" : [],
                "status" : "",
                "description" : "",
                "title" : "",
                "knowledgeUnitId" : "c44a2f3f-0b44-41f3-88c2-b9e706a13487",
                "mCourseUnit" : {
                    "id" : "e295b9fd-e31a-4bb4-b4e7-01d8c6425fb3",
                    "type" : "main",
                    "title" : "",
                    "duration" : 0,
                    "interactionDegree" : "",
                    "interactionType" : "",
                    "clickNum" : 0,
                    "difficulty" : "",
                    "watchNum" : 0,
                    "material" : "",
                    "learningObjectType" : "",
                    "averageRetentionRate" : 0,
                    "semanticDensity" : 0,
                    "TeachUnitId" : "facacda0-c4ec-4e7e-bbf5-3e786d85e1db"
                },
                "aCourseUnit" : [],
                "student" : [],
                "comments" : []
            }
        },
        {
            "id" : "b641956d-2999-468c-8405-81b08cb36428",
            "name" : "Node 4",
            "thumbnailUrl" : "http://localhost:3000/defaultImg.jpg",
            "root" : false,
            "demand" : 0,
            "achieve" : 0,
            "synonym" : [],
            "position" : {
                "x" : "800",
                "y" : "185"
            },
            "isStart" : false,
            "parent" : [
                "91a354aa-ed92-466f-89f1-a221064d5bf4"
            ],
            "rely" : [],
            "related" : [],
            "brothers" : [],
            "contain" : [],
            "parallel" : [],
            "hasParentNode" : [],
            "hasChildNode" : [],
            "isRelatedTo" : [],
            "isParallelWith" : [],
            "isRelyOnTo" : [],
            "isBeingRelyOnBy" : [],
            "teachUnit" : {
                "id" : "f5e90ca9-6697-444d-82ec-b14f9a108ace",
                "keyword" : [],
                "status" : "",
                "description" : "",
                "title" : "",
                "knowledgeUnitId" : "b641956d-2999-468c-8405-81b08cb36428",
                "mCourseUnit" : {
                    "id" : "efdbf7e5-4d46-4b32-8947-b41d125e37cb",
                    "type" : "main",
                    "title" : "",
                    "duration" : 0,
                    "interactionDegree" : "",
                    "interactionType" : "",
                    "clickNum" : 0,
                    "difficulty" : "",
                    "watchNum" : 0,
                    "material" : "",
                    "learningObjectType" : "",
                    "averageRetentionRate" : 0,
                    "semanticDensity" : 0,
                    "TeachUnitId" : "f5e90ca9-6697-444d-82ec-b14f9a108ace"
                },
                "aCourseUnit" : [],
                "student" : [],
                "comments" : []
            }
        },
        {
            "id" : "639ce6f9-72e3-4be3-9fa8-571db74fa2d0",
            "name" : "Node 5",
            "thumbnailUrl" : "http://localhost:3000/defaultImg.jpg",
            "root" : false,
            "demand" : 0,
            "achieve" : 0,
            "synonym" : [],
            "position" : {
                "x" : "1059",
                "y" : "134"
            },
            "isStart" : false,
            "parent" : [
                "c44a2f3f-0b44-41f3-88c2-b9e706a13487"
            ],
            "rely" : [],
            "related" : [],
            "brothers" : [],
            "contain" : [],
            "parallel" : [],
            "hasParentNode" : [],
            "hasChildNode" : [],
            "isRelatedTo" : [],
            "isParallelWith" : [],
            "isRelyOnTo" : [],
            "isBeingRelyOnBy" : [],
            "teachUnit" : {
                "id" : "827a2087-e4e8-4e36-8a92-c43b72d5fcbf",
                "keyword" : [],
                "status" : "",
                "description" : "",
                "title" : "",
                "knowledgeUnitId" : "639ce6f9-72e3-4be3-9fa8-571db74fa2d0",
                "mCourseUnit" : {
                    "id" : "cb08a396-2931-4dd0-8a97-80089452240e",
                    "type" : "main",
                    "title" : "",
                    "duration" : 0,
                    "interactionDegree" : "",
                    "interactionType" : "",
                    "clickNum" : 0,
                    "difficulty" : "",
                    "watchNum" : 0,
                    "material" : "",
                    "learningObjectType" : "",
                    "averageRetentionRate" : 0,
                    "semanticDensity" : 0,
                    "TeachUnitId" : "827a2087-e4e8-4e36-8a92-c43b72d5fcbf"
                },
                "aCourseUnit" : [],
                "student" : [],
                "comments" : []
            }
        },
        {
            "id" : "a20257af-7e8f-4041-bb52-4938bde76826",
            "name" : "Node 6",
            "thumbnailUrl" : "http://localhost:3000/defaultImg.jpg",
            "root" : false,
            "demand" : 0,
            "achieve" : 0,
            "synonym" : [],
            "position" : {
                "x" : "1057",
                "y" : "50"
            },
            "isStart" : false,
            "parent" : [
                "c44a2f3f-0b44-41f3-88c2-b9e706a13487"
            ],
            "rely" : [],
            "related" : [],
            "brothers" : [],
            "contain" : [],
            "parallel" : [],
            "hasParentNode" : [],
            "hasChildNode" : [],
            "isRelatedTo" : [],
            "isParallelWith" : [],
            "isRelyOnTo" : [],
            "isBeingRelyOnBy" : [],
            "teachUnit" : {
                "id" : "99aa1791-10c2-4320-8c25-e0a5afb17010",
                "keyword" : [],
                "status" : "",
                "description" : "",
                "title" : "",
                "knowledgeUnitId" : "a20257af-7e8f-4041-bb52-4938bde76826",
                "mCourseUnit" : {
                    "id" : "47841bf0-eb3e-465c-85aa-553871746929",
                    "type" : "main",
                    "title" : "",
                    "duration" : 0,
                    "interactionDegree" : "",
                    "interactionType" : "",
                    "clickNum" : 0,
                    "difficulty" : "",
                    "watchNum" : 0,
                    "material" : "",
                    "learningObjectType" : "",
                    "averageRetentionRate" : 0,
                    "semanticDensity" : 0,
                    "TeachUnitId" : "99aa1791-10c2-4320-8c25-e0a5afb17010"
                },
                "aCourseUnit" : [],
                "student" : [],
                "comments" : []
            }
        },
        {
            "id" : "097cee92-fd5e-4d8b-84df-9d60d693eabe",
            "name" : "Node 7",
            "thumbnailUrl" : "http://localhost:3000/defaultImg.jpg",
            "root" : false,
            "demand" : 0,
            "achieve" : 0,
            "synonym" : [],
            "position" : {
                "x" : 698,
                "y" : 308
            },
            "isStart" : false,
            "parent" : [
                "c8e85f9e-fe96-4eee-839d-5ccadfd120ca"
            ],
            "rely" : [],
            "related" : [],
            "brothers" : [],
            "contain" : [
                "c95e04fb-d724-4bdd-80a4-fb3844260e03"
            ],
            "parallel" : [],
            "hasParentNode" : [],
            "hasChildNode" : [],
            "isRelatedTo" : [],
            "isParallelWith" : [],
            "isRelyOnTo" : [],
            "isBeingRelyOnBy" : [],
            "teachUnit" : {
                "id" : "4edb1984-7844-434e-8573-664908806c46",
                "keyword" : [],
                "status" : "",
                "description" : "",
                "title" : "",
                "knowledgeUnitId" : "097cee92-fd5e-4d8b-84df-9d60d693eabe",
                "mCourseUnit" : {
                    "id" : "6ebfa755-6721-4547-8607-2ca001bc17ac",
                    "type" : "main",
                    "title" : "",
                    "duration" : 0,
                    "interactionDegree" : "",
                    "interactionType" : "",
                    "clickNum" : 0,
                    "difficulty" : "",
                    "watchNum" : 0,
                    "material" : "",
                    "learningObjectType" : "",
                    "averageRetentionRate" : 0,
                    "semanticDensity" : 0,
                    "TeachUnitId" : "4edb1984-7844-434e-8573-664908806c46"
                },
                "aCourseUnit" : [],
                "student" : [],
                "comments" : []
            }
        },
        {
            "id" : "1d9c1c1c-385a-4dc4-8d95-60788c53ac77",
            "name" : "Node 8",
            "thumbnailUrl" : "http://localhost:3000/defaultImg.jpg",
            "root" : false,
            "demand" : 0,
            "achieve" : 0,
            "synonym" : [],
            "position" : {
                "x" : "700",
                "y" : "519"
            },
            "isStart" : false,
            "parent" : [
                "c8e85f9e-fe96-4eee-839d-5ccadfd120ca"
            ],
            "rely" : [],
            "related" : [],
            "brothers" : [],
            "contain" : [],
            "parallel" : [],
            "hasParentNode" : [],
            "hasChildNode" : [],
            "isRelatedTo" : [],
            "isParallelWith" : [],
            "isRelyOnTo" : [],
            "isBeingRelyOnBy" : [],
            "teachUnit" : {
                "id" : "f76c464b-7d06-47c3-ac16-5b0be3689696",
                "keyword" : [],
                "status" : "",
                "description" : "",
                "title" : "",
                "knowledgeUnitId" : "1d9c1c1c-385a-4dc4-8d95-60788c53ac77",
                "mCourseUnit" : {
                    "id" : "c0289792-cf94-4c7a-9238-ee243799c693",
                    "type" : "main",
                    "title" : "",
                    "duration" : 0,
                    "interactionDegree" : "",
                    "interactionType" : "",
                    "clickNum" : 0,
                    "difficulty" : "",
                    "watchNum" : 0,
                    "material" : "",
                    "learningObjectType" : "",
                    "averageRetentionRate" : 0,
                    "semanticDensity" : 0,
                    "TeachUnitId" : "f76c464b-7d06-47c3-ac16-5b0be3689696"
                },
                "aCourseUnit" : [],
                "student" : [],
                "comments" : []
            }
        },
        {
            "id" : "c95e04fb-d724-4bdd-80a4-fb3844260e03",
            "name" : "Node 9",
            "thumbnailUrl" : "http://localhost:3000/defaultImg.jpg",
            "root" : false,
            "demand" : 0,
            "achieve" : 0,
            "synonym" : [],
            "position" : {
                "x" : "945",
                "y" : "397"
            },
            "isStart" : false,
            "parent" : [
                "097cee92-fd5e-4d8b-84df-9d60d693eabe"
            ],
            "rely" : [],
            "related" : [],
            "brothers" : [],
            "contain" : [],
            "parallel" : [],
            "hasParentNode" : [],
            "hasChildNode" : [],
            "isRelatedTo" : [],
            "isParallelWith" : [],
            "isRelyOnTo" : [],
            "isBeingRelyOnBy" : [],
            "teachUnit" : {
                "id" : "26a06127-d4ec-4205-89e1-6f3353af5244",
                "keyword" : [],
                "status" : "",
                "description" : "",
                "title" : "",
                "knowledgeUnitId" : "c95e04fb-d724-4bdd-80a4-fb3844260e03",
                "mCourseUnit" : {
                    "id" : "182ba62b-b87d-4c60-ab06-818dd77c7e79",
                    "type" : "main",
                    "title" : "",
                    "duration" : 0,
                    "interactionDegree" : "",
                    "interactionType" : "",
                    "clickNum" : 0,
                    "difficulty" : "",
                    "watchNum" : 0,
                    "material" : "",
                    "learningObjectType" : "",
                    "averageRetentionRate" : 0,
                    "semanticDensity" : 0,
                    "TeachUnitId" : "26a06127-d4ec-4205-89e1-6f3353af5244"
                },
                "aCourseUnit" : [],
                "student" : [],
                "comments" : []
            }
        }
    ]
}

    }

    render() {

        return <VizulyWeightedTree/>;
    }
}

export default CourseContent;