let jwt = require('jsonwebtoken');
let uuid = require('uuid');
module.exports = function (req, res, next) {
    let tUser = global.dbHandel.getModel('tUser');
    let username = req.body.username,
        password = req.body.password,
        type = req.body.type,
        email = req.body.email;
    tUser.findOne({name: username, password: password}, function (err, doc) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else if (doc) {
            res.json({
                type: false,
                data: "User already exists!"
            });
        } else {
            let token = jwt.sign({name: username}, '12345');
            let tuser = {
                _id: uuid.v4(),
                name: username,
                PassWord: password,
                token: token,
                usertype: type,
                Email: email
            };
            tUser.create(tuser, function (err, doc) {
                if (doc) {
                    res.json({
                        type: true,
                        data: doc.name,
                        token: doc.token
                    });
                } else {
                    res.json({
                        type: false,
                        data: "Error occured: " + err
                    });
                }
            })

        }
    });
};