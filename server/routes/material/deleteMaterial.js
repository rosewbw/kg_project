const { removeInModel, findOneInModel } = require('../../database/model-operations');

const deleteMaterial = function (req, res, next) {
    const username = req.api_user.param;

    const onSuccess = () => res.json({
        status: 'success',
    });

    const onError = err => {console.log(err);res.json({
        status: 'error',
        message: err.toString(),
    })};

    // 判断用户 id 和 Material 对应
    const pCheckUser = findOneInModel('tUser', { name: username });
    const pCheckMaterial = findOneInModel('tMaterial', { _id: req.query.materialId });
    
    Promise.all([pCheckUser, pCheckMaterial])
        .then(([user, material]) => {
            if (user._id !== material.userId) { return Promise.reject('资源不属于该用户！')}

            return material;
        })
        .then(material => removeInModel('tMaterial', { _id: material._id }))
        .then(onSuccess)
        .catch(onError);

};

module.exports = deleteMaterial;
