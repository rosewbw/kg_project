const UpdateGraph = require('../utils/updateGraph')
module.exports = {
    getSearchResult: function (req, res, next) {
        const searchInput = req.body.searchInput;
        const searchOptions = req.body.searchOptions;


        UpdateGraph({
            searchInput: searchInput,
            searchOptions: searchOptions
        }, 'search', (data) => {
            res.json({
                status: 'success',
                data: {
                    searchResult: data,
                    searchInput: searchInput
                }
            })
        })

    }
};


