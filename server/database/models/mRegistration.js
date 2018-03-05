module.exports = {
    tUser:{
        // 暂时使用默认 _id
        _id:{type:String,required:true},
        name:{type:String,required:true},
        PassWord:{type:String,required:true},
        token:{type:String,required:true},
        usertype:{type:String,required:true},
        Email:{type:String,required:true},//密码、邮箱、等
        registrationDate:{type:Date,required:false,default:Date.now},
        // registrationIp:{type:String,required:false},
    }
}
