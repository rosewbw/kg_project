const { getModel } = require('../dbhandle');

const operations = {
    updateInModel: (modelname, ...options) => {
        const model = getModel(modelname);

        return new Promise((resolve, reject) => {
            model.update.apply(model, options)
                .exec(function(err) {
                    if (err) return reject(err);

                    resolve();
                })
        });
    },
    findByIdAndUpdateInModel: (modelname, ...options) => {
        const model = getModel(modelname);

        return new Promise((resolve, reject) => {
            model.findByIdAndUpdate.apply(model, options)
                .exec(function(err) {
                    if (err) return reject(err);

                    resolve();
                })
        });
    },
};

module.exports = operations;
