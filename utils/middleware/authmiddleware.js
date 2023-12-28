const jwt = require('jsonwebtoken');
module.exports ={

    authenticationMiddleware : async function(req,res,next) {

        try{
            // token miss
            // invalid token 
            // valid token
            // if env is local then allow

            
            if (__configurations.ENVIRONMENT=='local'){
               
                next()
                return""
            }
           let  token = req?.headers?.authorization?.split(' ')[1]
           console.log(token,token == undefined)
            if ( token === undefined){

                res.status(401).json({message:" authorization  token is required"})
                return ""
            }
            
            try{
                let decoded = jwt.verify(token, __configurations.SECRET_KEY);
            }
            
            catch(err){
                res.status(401).json({message:"  token is invalid"})
                return ''
            }
            next()
            return
        }
        catch(err){
            console.log(`Error occured while verifing the token ${err}`)
            res.status(500).json({message: 'Internal server error'})
        }
    },
  
}