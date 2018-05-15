const { getModel } = require('../dbhandle');

const operations = {
    findInModel : (modalname, options) => {
        const modal = getModel(modalname);

        return new Promise((resolve, reject) => {
            modal.find(options, function(err, docs) {
                if (err) return reject(err);
                if (!docs) return reject('查询 ' + modalname + '无返回结果');

                resolve(docs);
            })
        });
    },
};

module.exports = operations;
