const nodemailer = require('nodemailer')
module.exports ={
    MONGO_URI:process.env.MONGO_URI ,
    ENVIRONMENT:process.env.ENV_TYPE,
    SECRET_KEY:process.env.SECRET_KEY,
    SALTROUND :10,
    transporter: nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
     user: process.env.Google_Mail ,
     pass: process.env.Google_Password,
    },
   })
}