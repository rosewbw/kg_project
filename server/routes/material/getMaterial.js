const { findInModel, findOneInModel } = require('../../database/model-operations');

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

    findOneInModel('tUser', { name: username })
        .then(user => findInModel('tMaterial', { userId: user._id }))
        .then(onSuccess)
        .catch(onError);

};

module.exports = getMaterial;
