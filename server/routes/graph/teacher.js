let updateGraph = require('../utils/updataGraph');

let WriteToDB = function (options, callback) {
    var tTeacher = global.dbHandel.getModel('tTeacher');
    tTeacher.create({
        options
        }, function (err, doc) {
            if (err) {
                console.log(err);
            } else {
                callback(doc);
            }
        }
    );
};
module.exports = function (req, res, next) {
    let teacherInfo = req.body;
    //TODO:教师信息model校验
    updateGraph(teacherInfo,'teacher', function (opt) {
        WriteToDB(opt,function (doc) {
            res.send(200);
        })
    })
};