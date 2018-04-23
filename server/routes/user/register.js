let uuid = require('uuid');
module.exports = function (req, res, next) {
    let tUser = global.dbHandel.getModel('tUser');
    let username = req.body.username,
        password = req.body.password,
        type = req.body.type,
        email = req.body.email;
    tUser.findOne({name: username}, function (err, doc) {
        if (err) {
            res.json({
                status: false,
            });
            console.log("Error occured: " + err)
        } else if (doc) {
            res.json({
                status: 'exist',
            });
            console.log("User already exists!")
        } else {
            let tuser = {
                _id: uuid.v4(),
                name: username,
                password: password,
                usertype: type,
                email: email
            };
            tUser.create(tuser, function (err, doc) {
                if (doc) {
                    res.json({
                        status: 'success',
                        data: {
                            username: doc.name,
                            usertype:doc.type,
                        },
                    });
                } else {
                    res.json({
                        status: false,
                    });
                    console.log("Error occured: " + err)
                }
            })

        }
    });
};