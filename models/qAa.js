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
        enum:['esay','medium' ,'hard']
    },
    type: {
        type: String,
        enum:['mutliplechoice','singlechoice','fillintheblack' ,'matching']
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

    correctOption:[mongoose.Schema.Types.Mixed]
})

module.exports = mongoose.model('qAa',QandASchema)