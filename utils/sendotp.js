const nodemailer = require('nodemailer');


const  SendOtp = async function(otp,toEmail){

    // take otp and email 
    // send email 
    // return statusSendOtp

    await __configurations.transporter.sendMail({
        from: process.env.Google_Mail,
        to: toEmail,
        subject: 'OTP for Password change',
        text: `otp is ${otp}`
    });


}

module.exports = SendOtp