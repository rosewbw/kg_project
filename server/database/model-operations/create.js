const { getModel } = require('../dbhandle');

const operations = {
    createInModel: (modelname, ...options) => {
        const model = getModel(modelname);
        
        // Model.prototype.create 本身返回 promise 对象
        return model.create.apply(model, options);
    },
};

module.exports = operations;
