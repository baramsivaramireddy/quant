const nodemailer = require('nodemailer');


const  SendOtp = async function(otp,toEmail){

    // take otp and email 
    // send email 
    // return statusSendOtp
    console.log(`send otp ${otp} to ${toEmail}`)

    try{
        await __configurations.transporter.sendMail({
            from: process.env.Google_Mail,
            to: toEmail,
            subject: 'OTP for Password change',
            text: `otp is ${otp}  valid for 3 mins`
        });
    }
    catch(err){
        console.log(`Error occured while sending otp`)
    }
   


}

module.exports = SendOtp