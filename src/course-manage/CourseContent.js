import React, { Component } from 'react';
import { VizulyWeightedTree } from '../utils/Vizuly';

class CourseContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            course:null
            // course:{
            //     "_id" : "d8a31930-4a65-46c1-9b00-15673aab5ad8",
            //     "projectName" : "高等数学",
            //     "userName" : "1",
            //     "thumbnailUrl" : "",
            //     "publishStatus" : "unPublish",
            //     "createDate" : "2018-5-14 01:52:07",
            //     "updateDate" : "2018-5-15 10:57:43",
            //     "description" : "",
            //     "startPosition" : {
            //         "x" : 72,
            //         "y" : 176
            //     },
            //     "__v" : 0,
            //     "data" : [
            //         {
            //             "id" : "a4bb6389-274b-44ab-8127-87a57398fa2c",
            //             "name" : "高等数学",
            //             "thumbnailUrl" : "https://i2.hdslb.com/bfs/archive/1fba41474b913736ac18a0973a6f87a225333eca.jpg@320w_200h.webp",
            //             "root" : true,
            //             "demand" : 0,
            //             "achieve" : 0,
            //             "synonym" : [],
            //             "position" : {
            //                 "x" : 298,
            //                 "y" : 158
            //             },
            //             "isStart" : false,
            //             "parent" : [],
            //             "rely" : [],
            //             "related" : [],
            //             "brothers" : [],
            //             "contain" : [
            //                 "c8e85f9e-fe96-4eee-839d-5ccadfd120ca",
            //                 "91a354aa-ed92-466f-89f1-a221064d5bf4",
            //                 "52ea9a67-bf9c-47eb-bbbb-b7d67f9f52f1"
            //             ],
            //             "parallel" : [],
            //             "hasParentNode" : [],
            //             "hasChildNode" : [],
            //             "isRelatedTo" : [],
            //             "isParallelWith" : [],
            //             "isRelyOnTo" : [],
            //             "isBeingRelyOnBy" : [
            //                 "52ea9a67-bf9c-47eb-bbbb-b7d67f9f52f1"
            //             ],
            //             "teachUnit" : {
            //                 "id" : "752dbd34-d843-457f-8dd5-8389f1ab45e2",
            //                 "keyword" : [],
            //                 "status" : "",
            //                 "description" : "",
            //                 "title" : "高等数学",
            //                 "knowledgeUnitId" : "a4bb6389-274b-44ab-8127-87a57398fa2c",
            //                 "mCourseUnit" : {
            //                     "id" : "abf13f15-7be0-4ed0-b483-95b5b753b513",
            //                     "type" : "main",
            //                     "title" : "",
            //                     "duration" : 0,
            //                     "interactionDegree" : "",
            //                     "interactionType" : "",
            //                     "clickNum" : 0,
            //                     "difficulty" : "",
            //                     "watchNum" : 0,
            //                     "material" : {
            //                         "_id" : "3fcb1dd0-57c5-11e8-9cc1-b9b0b483f760",
            //                         "userId" : "a8e4a85b-63fe-49c4-a4bc-681425013d01",
            //                         "name" : "数列的极限2_1.2",
            //                         "type" : "视频",
            //                         "keyword" : "数列的极限",
            //                         "url" : "/media/3fcb1dd0-57c5-11e8-9cc1-b9b0b483f760.mp4",
            //                         "size" : "156007511",
            //                         "description" : "数列的极限",
            //                         "thumbnailUrl" : "/media/3fcb1dd0-57c5-11e8-9cc1-b9b0b483f760.png",
            //                         "learningTime" : "0",
            //                         "title" : "",
            //                         "format" : "mp4",
            //                         "language" : "中文",
            //                         "__v" : 0
            //                     },
            //                     "learningObjectType" : "",
            //                     "averageRetentionRate" : 0,
            //                     "semanticDensity" : 0,
            //                     "TeachUnitId" : "752dbd34-d843-457f-8dd5-8389f1ab45e2"
            //                 },
            //                 "aCourseUnit" : [
            //                     {
            //                         "id" : "f34dff48-bfb8-4f95-8ea2-7c591de54c44",
            //                         "type" : "aid",
            //                         "title" : "1",
            //                         "duration" : 0,
            //                         "interactionDegree" : "",
            //                         "interactionType" : "",
            //                         "clickNum" : 0,
            //                         "difficulty" : "",
            //                         "watchNum" : 0,
            //                         "material" : {
            //                             "_id" : "b6f48140-300f-11e8-9efe-ff75498d8b88",
            //                             "userId" : "a8e4a85b-63fe-49c4-a4bc-681425013d01",
            //                             "name" : "1",
            //                             "type" : "图片",
            //                             "keyword" : "3",
            //                             "url" : "/media/b6f48140-300f-11e8-9efe-ff75498d8b88.jpg",
            //                             "size" : "175219",
            //                             "description" : "2",
            //                             "thumbnailUrl" : "/media/b6f48140-300f-11e8-9efe-ff75498d8b88.jpg",
            //                             "learningTime" : "0",
            //                             "title" : "",
            //                             "format" : "jpg",
            //                             "language" : "4",
            //                             "__v" : 0
            //                         },
            //                         "learningObjectType" : "",
            //                         "averageRetentionRate" : 0,
            //                         "semanticDensity" : 0,
            //                         "TeachUnitId" : "752dbd34-d843-457f-8dd5-8389f1ab45e2"
            //                     }
            //                 ],
            //                 "student" : [],
            //                 "comments" : []
            //             }
            //         },
            //         {
            //             "id" : "c8e85f9e-fe96-4eee-839d-5ccadfd120ca",
            //             "name" : "数列极限",
            //             "thumbnailUrl" : "https://i2.hdslb.com/bfs/archive/1fba41474b913736ac18a0973a6f87a225333eca.jpg@320w_200h.webp",
            //             "root" : false,
            //             "demand" : 0,
            //             "achieve" : 0,
            //             "synonym" : [],
            //             "position" : {
            //                 "x" : 505,
            //                 "y" : 251
            //             },
            //             "isStart" : false,
            //             "parent" : [
            //                 "a4bb6389-274b-44ab-8127-87a57398fa2c"
            //             ],
            //             "rely" : [],
            //             "related" : [],
            //             "brothers" : [],
            //             "contain" : [],
            //             "parallel" : [],
            //             "hasParentNode" : [],
            //             "hasChildNode" : [],
            //             "isRelatedTo" : [],
            //             "isParallelWith" : [],
            //             "isRelyOnTo" : [
            //                 "52ea9a67-bf9c-47eb-bbbb-b7d67f9f52f1"
            //             ],
            //             "isBeingRelyOnBy" : [
            //                 "91a354aa-ed92-466f-89f1-a221064d5bf4"
            //             ],
            //             "teachUnit" : {
            //                 "id" : "b3ee5387-8e8e-41a3-94e7-fc3dbfb92d6f",
            //                 "keyword" : [],
            //                 "status" : "",
            //                 "description" : "",
            //                 "title" : "数列极限",
            //                 "knowledgeUnitId" : "c8e85f9e-fe96-4eee-839d-5ccadfd120ca",
            //                 "mCourseUnit" : {
            //                     "id" : "460c1f08-8143-4a8b-88c4-de717c98af76",
            //                     "type" : "main",
            //                     "title" : "数列的极限",
            //                     "duration" : 0,
            //                     "interactionDegree" : "",
            //                     "interactionType" : "",
            //                     "clickNum" : 0,
            //                     "difficulty" : "",
            //                     "watchNum" : 0,
            //                     "material" : {
            //                         "_id" : "57b406f0-57c5-11e8-9cc1-b9b0b483f760",
            //                         "userId" : "a8e4a85b-63fe-49c4-a4bc-681425013d01",
            //                         "name" : "数列的极限3_1.2",
            //                         "type" : "视频",
            //                         "keyword" : "1",
            //                         "url" : "/media/57b406f0-57c5-11e8-9cc1-b9b0b483f760.mp4",
            //                         "size" : "196841715",
            //                         "description" : "1232",
            //                         "thumbnailUrl" : "/media/57b406f0-57c5-11e8-9cc1-b9b0b483f760.png",
            //                         "learningTime" : "0",
            //                         "title" : "",
            //                         "format" : "mp4",
            //                         "language" : "1",
            //                         "__v" : 0
            //                     },
            //                     "learningObjectType" : "",
            //                     "averageRetentionRate" : 0,
            //                     "semanticDensity" : 0,
            //                     "TeachUnitId" : "b3ee5387-8e8e-41a3-94e7-fc3dbfb92d6f"
            //                 },
            //                 "aCourseUnit" : [
            //                     {
            //                         "id" : "bb6db6c0-0e4c-4d0a-86c3-575d20c84a40",
            //                         "type" : "aid",
            //                         "title" : "数列的极限补充课程",
            //                         "duration" : 0,
            //                         "interactionDegree" : "",
            //                         "interactionType" : "",
            //                         "clickNum" : 0,
            //                         "difficulty" : "",
            //                         "watchNum" : 0,
            //                         "material" : {
            //                             "_id" : "57b406f0-57c5-11e8-9cc1-b9b0b483f760",
            //                             "userId" : "a8e4a85b-63fe-49c4-a4bc-681425013d01",
            //                             "name" : "数列的极限3_1.2",
            //                             "type" : "视频",
            //                             "keyword" : "1",
            //                             "url" : "/media/57b406f0-57c5-11e8-9cc1-b9b0b483f760.mp4",
            //                             "size" : "196841715",
            //                             "description" : "1232",
            //                             "thumbnailUrl" : "/media/57b406f0-57c5-11e8-9cc1-b9b0b483f760.png",
            //                             "learningTime" : "0",
            //                             "title" : "",
            //                             "format" : "mp4",
            //                             "language" : "1",
            //                             "__v" : 0
            //                         },
            //                         "learningObjectType" : "",
            //                         "averageRetentionRate" : 0,
            //                         "semanticDensity" : 0,
            //                         "TeachUnitId" : "b3ee5387-8e8e-41a3-94e7-fc3dbfb92d6f"
            //                     }
            //                 ],
            //                 "student" : [],
            //                 "comments" : []
            //             }
            //         },
            //         {
            //             "id" : "91a354aa-ed92-466f-89f1-a221064d5bf4",
            //             "name" : "函数",
            //             "thumbnailUrl" : "https://i2.hdslb.com/bfs/archive/1fba41474b913736ac18a0973a6f87a225333eca.jpg@320w_200h.webp",
            //             "root" : false,
            //             "demand" : 0,
            //             "achieve" : 0,
            //             "synonym" : [],
            //             "position" : {
            //                 "x" : 502,
            //                 "y" : 49
            //             },
            //             "isStart" : false,
            //             "parent" : [
            //                 "a4bb6389-274b-44ab-8127-87a57398fa2c"
            //             ],
            //             "rely" : [],
            //             "related" : [],
            //             "brothers" : [],
            //             "contain" : [
            //                 "b641956d-2999-468c-8405-81b08cb36428",
            //                 "64f23798-ccab-49f9-97c0-06eab7c58574",
            //                 "705254de-99a4-4ead-8b16-863f57a4dd63",
            //                 "0ee9bc4b-6941-484c-95ca-40d906b746ab",
            //                 "d2fed909-c079-4595-ab50-1b3040c96ba2",
            //                 "c8b16e0c-d6ee-46a6-9aea-2555c176f719",
            //                 "72cab8b2-6809-454c-95b5-a5f845eb1330",
            //                 "31a67083-17af-48a8-8a94-af812faa4bae",
            //                 "9b5b1d2d-52b8-439a-bb13-6b3098f441c9"
            //             ],
            //             "parallel" : [],
            //             "hasParentNode" : [],
            //             "hasChildNode" : [],
            //             "isRelatedTo" : [],
            //             "isParallelWith" : [],
            //             "isRelyOnTo" : [
            //                 "c8e85f9e-fe96-4eee-839d-5ccadfd120ca"
            //             ],
            //             "isBeingRelyOnBy" : [
            //                 "64f23798-ccab-49f9-97c0-06eab7c58574"
            //             ],
            //             "teachUnit" : {
            //                 "id" : "df11e7c8-6ac4-4e3a-820b-c2b18942589a",
            //                 "keyword" : [],
            //                 "status" : "",
            //                 "description" : "",
            //                 "title" : "函数",
            //                 "knowledgeUnitId" : "91a354aa-ed92-466f-89f1-a221064d5bf4",
            //                 "mCourseUnit" : {
            //                     "id" : "92b10659-2982-4174-89c7-6b682cb98aa6",
            //                     "type" : "main",
            //                     "title" : "",
            //                     "duration" : 0,
            //                     "interactionDegree" : "",
            //                     "interactionType" : "",
            //                     "clickNum" : 0,
            //                     "difficulty" : "",
            //                     "watchNum" : 0,
            //                     "material" : {
            //                         "_id" : "3fcb1dd0-57c5-11e8-9cc1-b9b0b483f760",
            //                         "userId" : "a8e4a85b-63fe-49c4-a4bc-681425013d01",
            //                         "name" : "数列的极限2_1.2",
            //                         "type" : "视频",
            //                         "keyword" : "数列的极限",
            //                         "url" : "/media/3fcb1dd0-57c5-11e8-9cc1-b9b0b483f760.mp4",
            //                         "size" : "156007511",
            //                         "description" : "数列的极限",
            //                         "thumbnailUrl" : "/media/3fcb1dd0-57c5-11e8-9cc1-b9b0b483f760.png",
            //                         "learningTime" : "0",
            //                         "title" : "",
            //                         "format" : "mp4",
            //                         "language" : "中文",
            //                         "__v" : 0
            //                     },
            //                     "learningObjectType" : "",
            //                     "averageRetentionRate" : 0,
            //                     "semanticDensity" : 0,
            //                     "TeachUnitId" : "df11e7c8-6ac4-4e3a-820b-c2b18942589a"
            //                 },
            //                 "aCourseUnit" : [],
            //                 "student" : [],
            //                 "comments" : []
            //             }
            //         },
            //         {
            //             "id" : "b641956d-2999-468c-8405-81b08cb36428",
            //             "name" : "函数的连续性",
            //             "thumbnailUrl" : "https://i2.hdslb.com/bfs/archive/1fba41474b913736ac18a0973a6f87a225333eca.jpg@320w_200h.webp",
            //             "root" : false,
            //             "demand" : 0,
            //             "achieve" : 0,
            //             "synonym" : [],
            //             "position" : {
            //                 "x" : 798,
            //                 "y" : 67
            //             },
            //             "isStart" : false,
            //             "parent" : [
            //                 "91a354aa-ed92-466f-89f1-a221064d5bf4"
            //             ],
            //             "rely" : [],
            //             "related" : [],
            //             "brothers" : [],
            //             "contain" : [],
            //             "parallel" : [],
            //             "hasParentNode" : [],
            //             "hasChildNode" : [],
            //             "isRelatedTo" : [],
            //             "isParallelWith" : [],
            //             "isRelyOnTo" : [],
            //             "isBeingRelyOnBy" : [],
            //             "teachUnit" : {
            //                 "id" : "f5e90ca9-6697-444d-82ec-b14f9a108ace",
            //                 "keyword" : [],
            //                 "status" : "",
            //                 "description" : "",
            //                 "title" : "",
            //                 "knowledgeUnitId" : "b641956d-2999-468c-8405-81b08cb36428",
            //                 "mCourseUnit" : {
            //                     "id" : "efdbf7e5-4d46-4b32-8947-b41d125e37cb",
            //                     "type" : "main",
            //                     "title" : "",
            //                     "duration" : 0,
            //                     "interactionDegree" : "",
            //                     "interactionType" : "",
            //                     "clickNum" : 0,
            //                     "difficulty" : "",
            //                     "watchNum" : 0,
            //                     "material" : "",
            //                     "learningObjectType" : "",
            //                     "averageRetentionRate" : 0,
            //                     "semanticDensity" : 0,
            //                     "TeachUnitId" : "f5e90ca9-6697-444d-82ec-b14f9a108ace"
            //                 },
            //                 "aCourseUnit" : [],
            //                 "student" : [],
            //                 "comments" : []
            //             }
            //         },
            //         {
            //             "id" : "52ea9a67-bf9c-47eb-bbbb-b7d67f9f52f1",
            //             "name" : "映射",
            //             "thumbnailUrl" : "https://i2.hdslb.com/bfs/archive/1fba41474b913736ac18a0973a6f87a225333eca.jpg@320w_200h.webp",
            //             "root" : false,
            //             "demand" : 0,
            //             "achieve" : 0,
            //             "synonym" : [],
            //             "position" : {
            //                 "x" : 503,
            //                 "y" : 415
            //             },
            //             "isStart" : false,
            //             "parent" : [
            //                 "a4bb6389-274b-44ab-8127-87a57398fa2c"
            //             ],
            //             "rely" : [],
            //             "related" : [],
            //             "brothers" : [],
            //             "contain" : [],
            //             "parallel" : [],
            //             "hasParentNode" : [],
            //             "hasChildNode" : [],
            //             "isRelatedTo" : [],
            //             "isParallelWith" : [],
            //             "isRelyOnTo" : [
            //                 "a4bb6389-274b-44ab-8127-87a57398fa2c"
            //             ],
            //             "isBeingRelyOnBy" : [
            //                 "c8e85f9e-fe96-4eee-839d-5ccadfd120ca"
            //             ],
            //             "teachUnit" : {
            //                 "id" : "22e769ac-4fc0-435c-8117-99c8399574c4",
            //                 "keyword" : [],
            //                 "status" : "",
            //                 "description" : "",
            //                 "title" : "映射",
            //                 "knowledgeUnitId" : "52ea9a67-bf9c-47eb-bbbb-b7d67f9f52f1",
            //                 "mCourseUnit" : {
            //                     "id" : "9871d991-a09f-4ff6-9f19-93288be37ead",
            //                     "type" : "main",
            //                     "title" : "",
            //                     "duration" : 0,
            //                     "interactionDegree" : "",
            //                     "interactionType" : "",
            //                     "clickNum" : 0,
            //                     "difficulty" : "",
            //                     "watchNum" : 0,
            //                     "material" : {
            //                         "_id" : "57b406f0-57c5-11e8-9cc1-b9b0b483f760",
            //                         "userId" : "a8e4a85b-63fe-49c4-a4bc-681425013d01",
            //                         "name" : "数列的极限3_1.2",
            //                         "type" : "视频",
            //                         "keyword" : "1",
            //                         "url" : "/media/57b406f0-57c5-11e8-9cc1-b9b0b483f760.mp4",
            //                         "size" : "196841715",
            //                         "description" : "1232",
            //                         "thumbnailUrl" : "/media/57b406f0-57c5-11e8-9cc1-b9b0b483f760.png",
            //                         "learningTime" : "0",
            //                         "title" : "",
            //                         "format" : "mp4",
            //                         "language" : "1",
            //                         "__v" : 0
            //                     },
            //                     "learningObjectType" : "",
            //                     "averageRetentionRate" : 0,
            //                     "semanticDensity" : 0,
            //                     "TeachUnitId" : "22e769ac-4fc0-435c-8117-99c8399574c4"
            //                 },
            //                 "aCourseUnit" : [],
            //                 "student" : [],
            //                 "comments" : []
            //             }
            //         },
            //         {
            //             "id" : "64f23798-ccab-49f9-97c0-06eab7c58574",
            //             "name" : "函数的基本介绍",
            //             "thumbnailUrl" : "https://i2.hdslb.com/bfs/archive/1fba41474b913736ac18a0973a6f87a225333eca.jpg@320w_200h.webp",
            //             "root" : false,
            //             "demand" : 0,
            //             "achieve" : 0,
            //             "synonym" : [],
            //             "position" : {
            //                 "x" : 801,
            //                 "y" : -191
            //             },
            //             "isStart" : false,
            //             "parent" : [
            //                 "91a354aa-ed92-466f-89f1-a221064d5bf4"
            //             ],
            //             "rely" : [],
            //             "related" : [],
            //             "brothers" : [],
            //             "contain" : [],
            //             "parallel" : [],
            //             "hasParentNode" : [],
            //             "hasChildNode" : [],
            //             "isRelatedTo" : [],
            //             "isParallelWith" : [],
            //             "isRelyOnTo" : [
            //                 "91a354aa-ed92-466f-89f1-a221064d5bf4"
            //             ],
            //             "isBeingRelyOnBy" : [
            //                 "72cab8b2-6809-454c-95b5-a5f845eb1330"
            //             ],
            //             "teachUnit" : {
            //                 "id" : "8af9cf56-8fd2-4a12-9e8d-c9e70319b436",
            //                 "keyword" : [],
            //                 "status" : "",
            //                 "description" : "",
            //                 "title" : "函数的基本介绍",
            //                 "knowledgeUnitId" : "64f23798-ccab-49f9-97c0-06eab7c58574",
            //                 "mCourseUnit" : {
            //                     "id" : "10b6e4bc-fef0-400e-84c6-6d970974347d",
            //                     "type" : "main",
            //                     "title" : "",
            //                     "duration" : 0,
            //                     "interactionDegree" : "",
            //                     "interactionType" : "",
            //                     "clickNum" : 0,
            //                     "difficulty" : "",
            //                     "watchNum" : 0,
            //                     "material" : {
            //                         "_id" : "8d4d0910-57c5-11e8-9cc1-b9b0b483f760",
            //                         "userId" : "a8e4a85b-63fe-49c4-a4bc-681425013d01",
            //                         "name" : "5_1.3函数的极限2",
            //                         "type" : "视频",
            //                         "keyword" : "1",
            //                         "url" : "/media/8d4d0910-57c5-11e8-9cc1-b9b0b483f760.mp4",
            //                         "size" : "216291526",
            //                         "description" : "1",
            //                         "thumbnailUrl" : "/media/8d4d0910-57c5-11e8-9cc1-b9b0b483f760.png",
            //                         "learningTime" : "0",
            //                         "title" : "",
            //                         "format" : "mp4",
            //                         "language" : "1",
            //                         "__v" : 0
            //                     },
            //                     "learningObjectType" : "",
            //                     "averageRetentionRate" : 0,
            //                     "semanticDensity" : 0,
            //                     "TeachUnitId" : "8af9cf56-8fd2-4a12-9e8d-c9e70319b436"
            //                 },
            //                 "aCourseUnit" : [],
            //                 "student" : [],
            //                 "comments" : []
            //             }
            //         },
            //         {
            //             "id" : "705254de-99a4-4ead-8b16-863f57a4dd63",
            //             "name" : "函数的不定积分",
            //             "thumbnailUrl" : "https://i2.hdslb.com/bfs/archive/1fba41474b913736ac18a0973a6f87a225333eca.jpg@320w_200h.webp",
            //             "root" : false,
            //             "demand" : 0,
            //             "achieve" : 0,
            //             "synonym" : [],
            //             "position" : {
            //                 "x" : 802,
            //                 "y" : -306
            //             },
            //             "isStart" : false,
            //             "parent" : [
            //                 "91a354aa-ed92-466f-89f1-a221064d5bf4"
            //             ],
            //             "rely" : [],
            //             "related" : [],
            //             "brothers" : [],
            //             "contain" : [],
            //             "parallel" : [],
            //             "hasParentNode" : [],
            //             "hasChildNode" : [],
            //             "isRelatedTo" : [],
            //             "isParallelWith" : [],
            //             "isRelyOnTo" : [],
            //             "isBeingRelyOnBy" : [],
            //             "teachUnit" : {
            //                 "id" : "a0d1c681-6c7b-4006-af66-7afa11be834a",
            //                 "keyword" : [],
            //                 "status" : "",
            //                 "description" : "",
            //                 "title" : "",
            //                 "knowledgeUnitId" : "705254de-99a4-4ead-8b16-863f57a4dd63",
            //                 "mCourseUnit" : {
            //                     "id" : "17596a72-5fe3-4d70-a3e3-e9899256f777",
            //                     "type" : "main",
            //                     "title" : "",
            //                     "duration" : 0,
            //                     "interactionDegree" : "",
            //                     "interactionType" : "",
            //                     "clickNum" : 0,
            //                     "difficulty" : "",
            //                     "watchNum" : 0,
            //                     "material" : "",
            //                     "learningObjectType" : "",
            //                     "averageRetentionRate" : 0,
            //                     "semanticDensity" : 0,
            //                     "TeachUnitId" : "a0d1c681-6c7b-4006-af66-7afa11be834a"
            //                 },
            //                 "aCourseUnit" : [],
            //                 "student" : [],
            //                 "comments" : []
            //             }
            //         },
            //         {
            //             "id" : "0ee9bc4b-6941-484c-95ca-40d906b746ab",
            //             "name" : "函数的导数",
            //             "thumbnailUrl" : "https://i2.hdslb.com/bfs/archive/1fba41474b913736ac18a0973a6f87a225333eca.jpg@320w_200h.webp",
            //             "root" : false,
            //             "demand" : 0,
            //             "achieve" : 0,
            //             "synonym" : [],
            //             "position" : {
            //                 "x" : 803,
            //                 "y" : -435
            //             },
            //             "isStart" : false,
            //             "parent" : [
            //                 "91a354aa-ed92-466f-89f1-a221064d5bf4"
            //             ],
            //             "rely" : [],
            //             "related" : [],
            //             "brothers" : [],
            //             "contain" : [],
            //             "parallel" : [],
            //             "hasParentNode" : [],
            //             "hasChildNode" : [],
            //             "isRelatedTo" : [],
            //             "isParallelWith" : [],
            //             "isRelyOnTo" : [],
            //             "isBeingRelyOnBy" : [],
            //             "teachUnit" : {
            //                 "id" : "0cfc33f2-8876-429d-a8d1-601e890d927e",
            //                 "keyword" : [],
            //                 "status" : "",
            //                 "description" : "",
            //                 "title" : "",
            //                 "knowledgeUnitId" : "0ee9bc4b-6941-484c-95ca-40d906b746ab",
            //                 "mCourseUnit" : {
            //                     "id" : "63e61251-d525-46fd-bcc5-fc47fa2910a9",
            //                     "type" : "main",
            //                     "title" : "",
            //                     "duration" : 0,
            //                     "interactionDegree" : "",
            //                     "interactionType" : "",
            //                     "clickNum" : 0,
            //                     "difficulty" : "",
            //                     "watchNum" : 0,
            //                     "material" : "",
            //                     "learningObjectType" : "",
            //                     "averageRetentionRate" : 0,
            //                     "semanticDensity" : 0,
            //                     "TeachUnitId" : "0cfc33f2-8876-429d-a8d1-601e890d927e"
            //                 },
            //                 "aCourseUnit" : [],
            //                 "student" : [],
            //                 "comments" : []
            //             }
            //         },
            //         {
            //             "id" : "d2fed909-c079-4595-ab50-1b3040c96ba2",
            //             "name" : "函数的极值",
            //             "thumbnailUrl" : "https://i2.hdslb.com/bfs/archive/1fba41474b913736ac18a0973a6f87a225333eca.jpg@320w_200h.webp",
            //             "root" : false,
            //             "demand" : 0,
            //             "achieve" : 0,
            //             "synonym" : [],
            //             "position" : {
            //                 "x" : 803,
            //                 "y" : 333
            //             },
            //             "isStart" : false,
            //             "parent" : [
            //                 "91a354aa-ed92-466f-89f1-a221064d5bf4"
            //             ],
            //             "rely" : [],
            //             "related" : [],
            //             "brothers" : [],
            //             "contain" : [],
            //             "parallel" : [],
            //             "hasParentNode" : [],
            //             "hasChildNode" : [],
            //             "isRelatedTo" : [],
            //             "isParallelWith" : [],
            //             "isRelyOnTo" : [],
            //             "isBeingRelyOnBy" : [],
            //             "teachUnit" : {
            //                 "id" : "93baacf2-09f4-4600-ad9f-0a38dc0f973c",
            //                 "keyword" : [],
            //                 "status" : "",
            //                 "description" : "",
            //                 "title" : "",
            //                 "knowledgeUnitId" : "d2fed909-c079-4595-ab50-1b3040c96ba2",
            //                 "mCourseUnit" : {
            //                     "id" : "9c8c2aae-56a1-40ea-845a-cc16b4b05fac",
            //                     "type" : "main",
            //                     "title" : "",
            //                     "duration" : 0,
            //                     "interactionDegree" : "",
            //                     "interactionType" : "",
            //                     "clickNum" : 0,
            //                     "difficulty" : "",
            //                     "watchNum" : 0,
            //                     "material" : "",
            //                     "learningObjectType" : "",
            //                     "averageRetentionRate" : 0,
            //                     "semanticDensity" : 0,
            //                     "TeachUnitId" : "93baacf2-09f4-4600-ad9f-0a38dc0f973c"
            //                 },
            //                 "aCourseUnit" : [],
            //                 "student" : [],
            //                 "comments" : []
            //             }
            //         },
            //         {
            //             "id" : "c8b16e0c-d6ee-46a6-9aea-2555c176f719",
            //             "name" : "函数的间断点",
            //             "thumbnailUrl" : "https://i2.hdslb.com/bfs/archive/1fba41474b913736ac18a0973a6f87a225333eca.jpg@320w_200h.webp",
            //             "root" : false,
            //             "demand" : 0,
            //             "achieve" : 0,
            //             "synonym" : [],
            //             "position" : {
            //                 "x" : 802,
            //                 "y" : 444
            //             },
            //             "isStart" : false,
            //             "parent" : [
            //                 "91a354aa-ed92-466f-89f1-a221064d5bf4"
            //             ],
            //             "rely" : [],
            //             "related" : [],
            //             "brothers" : [],
            //             "contain" : [],
            //             "parallel" : [],
            //             "hasParentNode" : [],
            //             "hasChildNode" : [],
            //             "isRelatedTo" : [],
            //             "isParallelWith" : [],
            //             "isRelyOnTo" : [],
            //             "isBeingRelyOnBy" : [],
            //             "teachUnit" : {
            //                 "id" : "748d6579-06fa-43db-8d36-cd4308ae0201",
            //                 "keyword" : [],
            //                 "status" : "",
            //                 "description" : "",
            //                 "title" : "",
            //                 "knowledgeUnitId" : "c8b16e0c-d6ee-46a6-9aea-2555c176f719",
            //                 "mCourseUnit" : {
            //                     "id" : "37b25670-17b6-4a5f-a0c8-72e7e3492578",
            //                     "type" : "main",
            //                     "title" : "",
            //                     "duration" : 0,
            //                     "interactionDegree" : "",
            //                     "interactionType" : "",
            //                     "clickNum" : 0,
            //                     "difficulty" : "",
            //                     "watchNum" : 0,
            //                     "material" : "",
            //                     "learningObjectType" : "",
            //                     "averageRetentionRate" : 0,
            //                     "semanticDensity" : 0,
            //                     "TeachUnitId" : "748d6579-06fa-43db-8d36-cd4308ae0201"
            //                 },
            //                 "aCourseUnit" : [],
            //                 "student" : [],
            //                 "comments" : []
            //             }
            //         },
            //         {
            //             "id" : "9b5b1d2d-52b8-439a-bb13-6b3098f441c9",
            //             "name" : "函数的微分",
            //             "thumbnailUrl" : "https://i2.hdslb.com/bfs/archive/1fba41474b913736ac18a0973a6f87a225333eca.jpg@320w_200h.webp",
            //             "root" : false,
            //             "demand" : 0,
            //             "achieve" : 0,
            //             "synonym" : [],
            //             "position" : {
            //                 "x" : 797,
            //                 "y" : 195
            //             },
            //             "isStart" : false,
            //             "parent" : [
            //                 "91a354aa-ed92-466f-89f1-a221064d5bf4"
            //             ],
            //             "rely" : [],
            //             "related" : [],
            //             "brothers" : [],
            //             "contain" : [],
            //             "parallel" : [],
            //             "hasParentNode" : [],
            //             "hasChildNode" : [],
            //             "isRelatedTo" : [],
            //             "isParallelWith" : [],
            //             "isRelyOnTo" : [],
            //             "isBeingRelyOnBy" : [],
            //             "teachUnit" : {
            //                 "id" : "9f9550b1-a852-4e42-ae9e-4d621fec6a35",
            //                 "keyword" : [],
            //                 "status" : "",
            //                 "description" : "",
            //                 "title" : "",
            //                 "knowledgeUnitId" : "9b5b1d2d-52b8-439a-bb13-6b3098f441c9",
            //                 "mCourseUnit" : {
            //                     "id" : "b97ed988-8047-4159-8a1b-3a3831e5298f",
            //                     "type" : "main",
            //                     "title" : "",
            //                     "duration" : 0,
            //                     "interactionDegree" : "",
            //                     "interactionType" : "",
            //                     "clickNum" : 0,
            //                     "difficulty" : "",
            //                     "watchNum" : 0,
            //                     "material" : "",
            //                     "learningObjectType" : "",
            //                     "averageRetentionRate" : 0,
            //                     "semanticDensity" : 0,
            //                     "TeachUnitId" : "9f9550b1-a852-4e42-ae9e-4d621fec6a35"
            //                 },
            //                 "aCourseUnit" : [],
            //                 "student" : [],
            //                 "comments" : []
            //             }
            //         },
            //         {
            //             "id" : "72cab8b2-6809-454c-95b5-a5f845eb1330",
            //             "name" : "函数的极限",
            //             "thumbnailUrl" : "https://i2.hdslb.com/bfs/archive/1fba41474b913736ac18a0973a6f87a225333eca.jpg@320w_200h.webp",
            //             "root" : false,
            //             "demand" : "90",
            //             "achieve" : "80",
            //             "synonym" : [],
            //             "position" : {
            //                 "x" : 802,
            //                 "y" : -76
            //             },
            //             "isStart" : false,
            //             "parent" : [
            //                 "91a354aa-ed92-466f-89f1-a221064d5bf4"
            //             ],
            //             "rely" : [],
            //             "related" : [],
            //             "brothers" : [],
            //             "contain" : [
            //                 "75740e22-65c4-4dc0-8fd7-16f69279e3a0"
            //             ],
            //             "parallel" : [],
            //             "hasParentNode" : [],
            //             "hasChildNode" : [],
            //             "isRelatedTo" : [],
            //             "isParallelWith" : [],
            //             "isRelyOnTo" : [
            //                 "64f23798-ccab-49f9-97c0-06eab7c58574"
            //             ],
            //             "isBeingRelyOnBy" : [
            //                 "75740e22-65c4-4dc0-8fd7-16f69279e3a0"
            //             ],
            //             "teachUnit" : {
            //                 "id" : "a2986f2a-bb11-4303-8c56-77a6d7625bc3",
            //                 "keyword" : [
            //                     "函数的极限"
            //                 ],
            //                 "status" : "",
            //                 "description" : "课程讲述了函数极限定义及其相关内容",
            //                 "title" : "函数的极限",
            //                 "knowledgeUnitId" : "72cab8b2-6809-454c-95b5-a5f845eb1330",
            //                 "mCourseUnit" : {
            //                     "id" : "613b9bb8-de34-42cc-b31b-ce5cd4a3ceb6",
            //                     "type" : "main",
            //                     "title" : "函数的极限",
            //                     "duration" : 0,
            //                     "interactionDegree" : "",
            //                     "interactionType" : "commentary",
            //                     "clickNum" : 0,
            //                     "difficulty" : "high",
            //                     "watchNum" : 0,
            //                     "material" : {
            //                         "_id" : "841a4c90-57c5-11e8-9cc1-b9b0b483f760",
            //                         "userId" : "a8e4a85b-63fe-49c4-a4bc-681425013d01",
            //                         "name" : "4_1.3函数的极限",
            //                         "type" : "视频",
            //                         "keyword" : "1",
            //                         "url" : "/media/841a4c90-57c5-11e8-9cc1-b9b0b483f760.mp4",
            //                         "size" : "208661259",
            //                         "description" : "1",
            //                         "thumbnailUrl" : "/media/841a4c90-57c5-11e8-9cc1-b9b0b483f760.png",
            //                         "learningTime" : "0",
            //                         "title" : "",
            //                         "format" : "mp4",
            //                         "language" : "1",
            //                         "__v" : 0
            //                     },
            //                     "learningObjectType" : "video",
            //                     "averageRetentionRate" : 0,
            //                     "semanticDensity" : 0,
            //                     "TeachUnitId" : "a2986f2a-bb11-4303-8c56-77a6d7625bc3"
            //                 },
            //                 "aCourseUnit" : [
            //                     {
            //                         "id" : "3429be27-ea7d-4d78-8484-65b69a1a231d",
            //                         "type" : "aid",
            //                         "title" : "函数极限补充内容1",
            //                         "duration" : 0,
            //                         "interactionDegree" : "middle",
            //                         "interactionType" : "commentary",
            //                         "clickNum" : 0,
            //                         "difficulty" : "middle",
            //                         "watchNum" : 0,
            //                         "material" : {
            //                             "_id" : "8d4d0910-57c5-11e8-9cc1-b9b0b483f760",
            //                             "userId" : "a8e4a85b-63fe-49c4-a4bc-681425013d01",
            //                             "name" : "5_1.3函数的极限2",
            //                             "type" : "视频",
            //                             "keyword" : "1",
            //                             "url" : "/media/8d4d0910-57c5-11e8-9cc1-b9b0b483f760.mp4",
            //                             "size" : "216291526",
            //                             "description" : "1",
            //                             "thumbnailUrl" : "/media/8d4d0910-57c5-11e8-9cc1-b9b0b483f760.png",
            //                             "learningTime" : "0",
            //                             "title" : "",
            //                             "format" : "mp4",
            //                             "language" : "1",
            //                             "__v" : 0
            //                         },
            //                         "learningObjectType" : "video",
            //                         "averageRetentionRate" : 0,
            //                         "semanticDensity" : 0,
            //                         "TeachUnitId" : "a2986f2a-bb11-4303-8c56-77a6d7625bc3"
            //                     },
            //                     {
            //                         "id" : "11245ed4-4df3-4886-988b-cf1940831db5",
            //                         "type" : "aid",
            //                         "title" : "函数极限补充内容2",
            //                         "duration" : 0,
            //                         "interactionDegree" : "",
            //                         "interactionType" : "",
            //                         "clickNum" : 0,
            //                         "difficulty" : "verylow",
            //                         "watchNum" : 0,
            //                         "material" : {
            //                             "_id" : "973bc290-57c5-11e8-9cc1-b9b0b483f760",
            //                             "userId" : "a8e4a85b-63fe-49c4-a4bc-681425013d01",
            //                             "name" : "6_1.3函数的极限3",
            //                             "type" : "视频",
            //                             "keyword" : "1",
            //                             "url" : "/media/973bc290-57c5-11e8-9cc1-b9b0b483f760.mp4",
            //                             "size" : "202825325",
            //                             "description" : "1",
            //                             "thumbnailUrl" : "/media/973bc290-57c5-11e8-9cc1-b9b0b483f760.png",
            //                             "learningTime" : "0",
            //                             "title" : "",
            //                             "format" : "mp4",
            //                             "language" : "1",
            //                             "__v" : 0
            //                         },
            //                         "learningObjectType" : "",
            //                         "averageRetentionRate" : 0,
            //                         "semanticDensity" : 0,
            //                         "TeachUnitId" : "a2986f2a-bb11-4303-8c56-77a6d7625bc3"
            //                     }
            //                 ],
            //                 "student" : [],
            //                 "comments" : []
            //             }
            //         },
            //         {
            //             "id" : "75740e22-65c4-4dc0-8fd7-16f69279e3a0",
            //             "name" : "无穷大与无穷小",
            //             "thumbnailUrl" : "https://i2.hdslb.com/bfs/archive/1fba41474b913736ac18a0973a6f87a225333eca.jpg@320w_200h.webp",
            //             "root" : false,
            //             "demand" : 0,
            //             "achieve" : 0,
            //             "synonym" : [],
            //             "position" : {
            //                 "x" : 1039,
            //                 "y" : -143
            //             },
            //             "isStart" : false,
            //             "parent" : [
            //                 "72cab8b2-6809-454c-95b5-a5f845eb1330"
            //             ],
            //             "rely" : [],
            //             "related" : [],
            //             "brothers" : [],
            //             "contain" : [],
            //             "parallel" : [],
            //             "hasParentNode" : [],
            //             "hasChildNode" : [],
            //             "isRelatedTo" : [],
            //             "isParallelWith" : [],
            //             "isRelyOnTo" : [
            //                 "72cab8b2-6809-454c-95b5-a5f845eb1330"
            //             ],
            //             "isBeingRelyOnBy" : [],
            //             "teachUnit" : {
            //                 "id" : "d9bff027-e0ab-42aa-b3f1-6f85f25a6b06",
            //                 "keyword" : [],
            //                 "status" : "",
            //                 "description" : "",
            //                 "title" : "无穷大与无穷小",
            //                 "knowledgeUnitId" : "75740e22-65c4-4dc0-8fd7-16f69279e3a0",
            //                 "mCourseUnit" : {
            //                     "id" : "38e90e8d-ae62-4719-85e1-386f159fb00b",
            //                     "type" : "main",
            //                     "title" : "",
            //                     "duration" : 0,
            //                     "interactionDegree" : "",
            //                     "interactionType" : "",
            //                     "clickNum" : 0,
            //                     "difficulty" : "",
            //                     "watchNum" : 0,
            //                     "material" : {
            //                         "_id" : "841a4c90-57c5-11e8-9cc1-b9b0b483f760",
            //                         "userId" : "a8e4a85b-63fe-49c4-a4bc-681425013d01",
            //                         "name" : "4_1.3函数的极限",
            //                         "type" : "视频",
            //                         "keyword" : "1",
            //                         "url" : "/media/841a4c90-57c5-11e8-9cc1-b9b0b483f760.mp4",
            //                         "size" : "208661259",
            //                         "description" : "1",
            //                         "thumbnailUrl" : "/media/841a4c90-57c5-11e8-9cc1-b9b0b483f760.png",
            //                         "learningTime" : "0",
            //                         "title" : "",
            //                         "format" : "mp4",
            //                         "language" : "1",
            //                         "__v" : 0
            //                     },
            //                     "learningObjectType" : "",
            //                     "averageRetentionRate" : 0,
            //                     "semanticDensity" : 0,
            //                     "TeachUnitId" : "d9bff027-e0ab-42aa-b3f1-6f85f25a6b06"
            //                 },
            //                 "aCourseUnit" : [],
            //                 "student" : [],
            //                 "comments" : []
            //             }
            //         },
            //         {
            //             "id" : "31a67083-17af-48a8-8a94-af812faa4bae",
            //             "name" : "函数的定积分",
            //             "thumbnailUrl" : "https://i2.hdslb.com/bfs/archive/1fba41474b913736ac18a0973a6f87a225333eca.jpg@320w_200h.webp",
            //             "root" : false,
            //             "demand" : 0,
            //             "achieve" : 0,
            //             "synonym" : [],
            //             "position" : {
            //                 "x" : 804,
            //                 "y" : 550
            //             },
            //             "isStart" : false,
            //             "parent" : [
            //                 "91a354aa-ed92-466f-89f1-a221064d5bf4"
            //             ],
            //             "rely" : [],
            //             "related" : [],
            //             "brothers" : [],
            //             "contain" : [],
            //             "parallel" : [],
            //             "hasParentNode" : [],
            //             "hasChildNode" : [],
            //             "isRelatedTo" : [],
            //             "isParallelWith" : [],
            //             "isRelyOnTo" : [],
            //             "isBeingRelyOnBy" : [],
            //             "teachUnit" : {
            //                 "id" : "4d9543b4-aedc-4d8a-8c62-c74700434414",
            //                 "keyword" : [],
            //                 "status" : "",
            //                 "description" : "",
            //                 "title" : "",
            //                 "knowledgeUnitId" : "31a67083-17af-48a8-8a94-af812faa4bae",
            //                 "mCourseUnit" : {
            //                     "id" : "09b09fb7-aaf9-4934-99fd-bb1838db4b48",
            //                     "type" : "main",
            //                     "title" : "",
            //                     "duration" : 0,
            //                     "interactionDegree" : "",
            //                     "interactionType" : "",
            //                     "clickNum" : 0,
            //                     "difficulty" : "",
            //                     "watchNum" : 0,
            //                     "material" : "",
            //                     "learningObjectType" : "",
            //                     "averageRetentionRate" : 0,
            //                     "semanticDensity" : 0,
            //                     "TeachUnitId" : "4d9543b4-aedc-4d8a-8c62-c74700434414"
            //                 },
            //                 "aCourseUnit" : [],
            //                 "student" : [],
            //                 "comments" : []
            //             }
            //         }
            //     ]
            // }
        };

        this.courseToData = this.courseToData.bind(this);
    }

    courseToData(course) {
        if(!course||!course.data){
            return null
        }
        const createTree = (root) => {
            if (!root.contain || root.contain.length === 0) return;

            root.children = [];
            root.contain.forEach(id => root.children.push(course.data.filter(node => node.id === id)[0]));
            root.children.forEach(item => createTree(item));
            return root;
        };

        course.data.forEach(item => item.value = 0.5);
        //course.data[0].value = 100;
        let data = createTree(course.data[0]);
        console.log('data is ', data);

        return data;
    }


    getData = (data,callback) => {
        console.log('ok')
            this.setState({
                course:data
            },()=>{
                console.log('ok')
                callback()
            })
    };

    render() {

        return <VizulyWeightedTree data={this.courseToData(this.state.course)} odata={this.state.course &&this.state.course.data} onInit={this.getData}/>;
    }
}

export default CourseContent;