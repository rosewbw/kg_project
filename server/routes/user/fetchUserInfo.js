const tUser = global.dbHandel.getModel('tUser');

module.exports = function (req, res, next) {
    const username = req.api_user.param;

    tUser.findOne({name: username}, function (err, doc) {
        if (err) {
            return res.json({
                status:false,
                data:"Error occured:" + err
            });
        }
        if (!doc) {
            return res.json({
                status: false,
                data: "Incorrect email/password"
            });
        }

        return res.json({
            status:'success',
            data:{
                usertype:doc.usertype,
                username:doc.name,
            }
        });
    });
};