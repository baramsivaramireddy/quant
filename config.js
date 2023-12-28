
module.exports ={
    MONGO_URI:process.env.MONGO_URI ,
    ENVIRONMENT:process.env.ENV_TYPE|| 'local',
    SECRET_KEY:process.env.SECRET_KEY,
    SALTROUND :10
}