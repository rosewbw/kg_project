const { findInModel } = require('../../database/model-operations');

const getMaterial = function (req, res, next) {
    const username = req.api_user.param;

    const onSuccess = materials => res.json({
        status: 'success',
        data: materials,
    });

    const onError = err => res.json({
        status: 'error',
        message: err,
    });

    findInModel('tUser', { name: username })
        .then(users => users[0]) // 只会有一个匹配用户
        .then(user => findInModel('tMaterial', { userid: user.userid}))
        .then(onSuccess)
        .catch(onError);

};

module.exports = getMaterial;
