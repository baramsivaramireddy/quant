const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
    },
    password: {
      type: String,
    },
    otp:{
      type: String,
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "role",
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods.generateToken = async function () {
  let token = "";
  let user = await this.populate("roles");
  let roleNames = user.roles.map((role)=>{
    return role.name
  })
  let payload = { _id: user._id, roles: roleNames };
  
  token = jwt.sign(payload, __configurations.SECRET_KEY);

  return token;
};

module.exports = mongoose.model("user", userSchema);
