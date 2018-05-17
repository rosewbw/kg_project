let updateGraph = require('../utils/updateGraph');

let WriteToDB = function (options, callback) {
    var tStudent = global.dbHandel.getModel('tStudent');
    tStudent.create({
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
    let studentInfo = req.body;
    //TODO:学生信息model校验

    updateGraph(studentInfo,'student', function (opt) {
        WriteToDB(opt,function (doc) {
            res.send(200);
        })
    })
};