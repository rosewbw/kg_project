
module.exports = {
    getCourse:function (req,res,next) {
        let  tProject = global.dbHandel.getModel('tProject');
        tProject.findOne({_id:req.body.projectID},function (err, doc) {
            if(err){
                return res.statusCode(404)
            }
            res.json({
                status: 'success',
                data:doc
            })
        })
    }
};

    
