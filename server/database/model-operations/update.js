const { getModel } = require('../dbhandle');

const operations = {
    updateInModel: (modelname, ...options) => {
        const model = getModel(modelname);

        return new Promise((resolve, reject) => {
            model.update.apply(model, options)
                .exec(function(err, raw) {
                    if (err) return reject(err);

                    resolve(raw);
                })
        });
    },
    findByIdAndUpdateInModel: (modelname, ...options) => {
        const model = getModel(modelname);

        return new Promise((resolve, reject) => {
            model.findByIdAndUpdate.apply(model, options)
                .exec(function(err, doc) {
                    if (err) return reject(err);

                    resolve(doc);
                })
        });
    },
};

module.exports = operations;
