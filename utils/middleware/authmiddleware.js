const jwt = require("jsonwebtoken");
module.exports = {
  authenticationMiddleware: async function (req, res, next) {
    try {
      if (__configurations.ENV_TYPE=='local') {
        next();
        return "";
      }
      let token = req?.headers?.authorization?.split(" ")[1];

      if (token === undefined) {
        res.status(401).json({ message: " authorization  token is required" });
        return "";
      }

      try {
        let decoded = jwt.verify(token, __configurations.SECRET_KEY);
        req.user = decoded;
      } catch (err) {
        res.status(401).json({ message: "  token is invalid" });
        return "";
      }
      next();
      return;
    } catch (err) {
      console.log(`Error occured while verifing the token ${err}`);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  authorizaritionMiddleware: function (allowedRoleArray) {
    return function (req, res, next) {
  
      try {

        if (__configurations.ENV_TYPE=='local') {
            next();
            return "";
          }

          let isAllowed = req.user.roles.some((role) => allowedRoleArray.includes(role))
          if (!isAllowed){
            res.status(403).json({message:"not permitted"})
            return
          }
        next();
      } catch (err) {
        console.log(`Error while authorizing the token ${err}`);
        res.status(500).json({
          message: "internal server error",
        });
      }
    };
  },
};
