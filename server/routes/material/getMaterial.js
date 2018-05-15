
const getMaterial = function (req, res, next) {
    const findInModal = function(modalname, options) {
        const modal = global.dbHandel.getModel(modalname);

        return new Promise((resolve, reject) => {
            modal.find(options, function(err, docs) {
                if (err) return reject(err);
                if (!docs) return reject('查询 ' + modalname + '无返回结果');

                resolve(docs);
            })
        });
    };

    const username = req.api_user.param;

    const onSuccess = materials => res.json({
        status: 'success',
        data: materials,
    });

    const onError = err => {
        console.error(err);
        res.json({
            status: 'error',
            message: err,
        });
    };

    findInModal('tUser', { name: username })
        .then(users => users[0]) // 只会有一个匹配用户
        .then(user => findInModal('tMaterial', { userid: user.userid}))
        .then(onSuccess)
        .catch(onError);

};

module.exports = getMaterial;
