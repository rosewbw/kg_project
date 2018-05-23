module.exports = {
    tTeacher:{
        userId:{type:String,require:true},
        name:{type:String,require:true},
        studentNum:{type:Number,require:true},
        age:{type:Number,require:true},
        course:{type:Array},
        sex:{type:String,require:true}
    },
    tStudent:{
        userId:{type:String,require:true},
        name:{type:String,require:true},
        discipline:{type:String,require:true},
        interest:{type:Object,require:true},
        email:{type:String,require:true},
        backgroundKnowledge:{type:Array,require:true},
        phoneNumber:{type:String,require:true},
        sex:{type:String,require:true},
        age:{type:Number,require:true},
        school:{type:String,require:true},
        LearningStyle:{type:Object},
        cognitiveLevel:{type:String}
    }
};
