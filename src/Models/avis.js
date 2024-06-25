const mongoose= require("mongoose")




const avisSchema= new  mongoose.Schema({
    avis:{
        type:Boolean,require:true
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    

})