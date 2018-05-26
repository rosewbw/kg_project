const UpdateGraph = require('../utils/updateGraph')
module.exports = {
    getSearchResult: function (req, res, next) {
        const searchInput = req.body.searchInput;
        const searchOptions = req.body.searchOptions;


        res.json({"status":"success","data":{"searchResult":{"lesson":[],"knowledge":[[{"similarity":1,"lesson":{"id":"6f53fa6b-da66-4aa1-b827-d7becba43034","data":{"title":"高等数学","description":"123","thumbnailUrl":"","publishStatus":"unPublish"}},"knowledge":{"id":"85f247b4-0ce7-45bb-87cd-0d16345199c4","data":{"demand":"0","achieve":"0","title":"数列极限","thumbnailUrl":"http://localhost:3000/defaultImg.jpg","synonym":"","difficulty":"","importance":"","description":""}},"teach":{"id":"1d5f5d22-892d-4a06-97cc-cd76705b9381","data":{"keyword":"","description":"","title":""}},"mcourse":{"id":"04eeb579-ff5c-471b-936e-1e144cba9cf1","data":{"interactionDegree":"","interactionType":"","learningObjectType":"","averageRetentionRate":"","semanticDensity":"","watchNum":"","clickNum":"","duration":"","type":"","difficulty":"","typicalLearningTime":"","title":"","material_data":{"id":"","data":{"url":"","userid":"","size":"","thumbnailUrl":"","language":"","keyword":"","description":"","title":"","applicableObject":"","type":""}}}},"acourse":[]}],[{"similarity":1,"lesson":{"id":"c580aea9-df36-48ae-b0e7-6288c019def1","data":{"title":"通信原理","description":"12","thumbnailUrl":"","publishStatus":"unPublish"}},"knowledge":{"id":"db9ef4b9-e2af-48fb-8506-e2cb4d555aec","data":{"demand":"0","achieve":"0","title":"数列极限","thumbnailUrl":"http://localhost:3000/defaultImg.jpg","synonym":"","difficulty":"","importance":"","description":""}},"teach":{"id":"37127cfa-b51a-4a1a-beca-36e2860bb1cf","data":{"keyword":"","description":"","title":""}},"mcourse":{"id":"2316e237-f6de-4c4c-9d2a-f3e794f4d146","data":{"interactionDegree":"","interactionType":"","learningObjectType":"","averageRetentionRate":"","semanticDensity":"","watchNum":"","clickNum":"","duration":"","type":"","difficulty":"","typicalLearningTime":"","title":"","material_data":{"id":"","data":{"url":"","userid":"","size":"","thumbnailUrl":"","language":"","keyword":"","description":"","title":"","applicableObject":"","type":""}}}},"acourse":[]}]]},"searchInput":"数列极限"}})

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


