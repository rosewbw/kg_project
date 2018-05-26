const UpdateGraph = require('../utils/updateGraph')
module.exports = {
    getCourse: function (req, res, next) {
        let tProject = global.dbHandel.getModel('tProject');
        tProject.findOne({_id: req.body.projectId}, function (err, doc) {
            if (err) {
                return res.statusCode(404)
            }
            res.json({
                status: 'success',
                data: doc
            })
        })
    },
    publishCourse: function (req, res, next) {
        let tProject = global.dbHandel.getModel('tProject');
        tProject.findOne({_id: req.body.projectId}, function (err, doc) {
            if (err) {
                return res.statusCode(404)
            }
            if (doc.publishStatus === 'unPublish') {
                tProject.findOneAndUpdate({_id: req.body.projectId}, {
                    publishStatus: 'publish',
                    new: true
                }, function (err, projectData) {
                    if (err) {
                        return res.statusCode(404)
                    }

                    UpdateGraph(projectData, 'publish', (e) => {
                        res.json({
                            status: 'success',
                            data: 'publish'
                        })
                    })
                })
            } else {
                tProject.findOneAndUpdate({_id: req.body.projectId}, {
                    publishStatus: 'unPublish',
                    new: true
                }, function (err, projectData) {
                    if (err) {
                        return res.statusCode(404)
                    }
                    UpdateGraph(projectData, 'unPublish', (e) => {
                        res.json({
                            status: 'success',
                            data: 'unPublish'
                        })
                    })
                })
            }
        })
    },
    getAllCourses:function (req, res, next) {
        let tProject = global.dbHandel.getModel('tProject');
        tProject.find({publishStatus:'publish'}, function (err, doc) {
            if (err) {
                return res.statusCode(404)
            }
            doc.map((item)=>item.data = []);
            res.json({
                status: 'success',
                data: doc
            })
        })
    }
};

    
