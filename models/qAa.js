const mongoose = require("mongoose");


const QandASchema = new mongoose.Schema({
    title: {
        type: String,
        required:true,
        lowercase: true
    },
    description: {
        type: String,
            required: true
    },
    difficulty: {
        type: String,
        enum:['easy','medium' ,'hard']
    },
    type: {
        type: String,
        enum:['multiplechoice','singlechoice','fillintheblank' ,'matching']
    },
    category:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'category',
            required:true
    },
    isPublished: {
        type: Boolean,
        default:false
    },
    options: [mongoose.Schema.Types.Mixed] ,

    correctOptions:[mongoose.Schema.Types.Mixed],
    solution: {
        type: String
    }
})

module.exports = mongoose.model('qAa',QandASchema)
