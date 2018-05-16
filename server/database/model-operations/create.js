const { getModel } = require('../dbhandle');

const operations = {
    createInModel: (modelname, ...options) => {
        const model = getModel(modelname);

        return new Promise((resolve, reject) => {
            model.create.apply(model, options)
                .exec(function(err, docs) {
                    if (err) return reject(err);
                    if (!docs) return reject('创建 ' + modelname + ' 无返回结果');

                    resolve(docs);
                })
        });
    },
};

module.exports = operations;
