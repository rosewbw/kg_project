let jwt = require('jsonwebtoken');
let uuid = require('uuid')
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
            let token = jwt.sign({name: username}, 'shhhhh');
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

// if (err) {
//     res.sendStatus(500);
// } else if (doc) {
//     //req.session.error='用户名已存在！';
//     res.json("username exists");
//     res.end();
// } else {
//     tUser.create(docs, function (err, doc) {
//         if (err) {
//             res.sendStatus(404);
//         } else {
//             req.session.user = doc.name;
//             req.session.userId = doc._id;
//             res.json({status:200});
//         }
//     })
// }