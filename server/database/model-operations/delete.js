const { getModel } = require('../dbhandle');

const operations = {
    deleteOneInModel: (modelname, ...options) => {
        const model = getModel(modelname);

        return new Promise((resolve, reject) => {
            model.deleteOne.apply(model, options)
                .exec(function(err) {
                    if (err) return reject(err);

                    resolve();
                })
        });
    },
    removeInModel: (modelname, ...options) => {
        const model = getModel(modelname);

        return new Promise((resolve, reject) => {
            model.remove.apply(model, options)
                .exec(function(err) {
                    if (err) return reject(err);

                    resolve();
                })
        });
    },
};

module.exports = operations;
