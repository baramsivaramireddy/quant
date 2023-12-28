const path = require("path");

const User = require(path.resolve(DB_MODEL, "user"));

const Role = require(path.resolve(DB_MODEL, "role"));
const dbconnect = require("../dbconnect");
const z = require("zod");
const bcrypt = require("bcrypt");
let UserSchema = z.object({
  email: z.string().email({ message: "email is invalid" }),
  password: z
    .string()
    .min(8, { message: "password should atleast 8 characters" }),
  name: z.string(),
});

module.exports = {
  signup: async function (req, res) {
    await dbconnect();
    try {
      const parsedResponse = UserSchema.safeParse(req.body);
     
      if (!parsedResponse.success) {
        res.status(422).json({ message: "invalid data" });
        return;
      }

      let ExistedResource = await User.findOne({
        email: parsedResponse.data.email,
      });

      if (ExistedResource) {
        res.status(409).json({ message: "user already exist" });
        return;
      }
      parsedResponse.data.password = await bcrypt.hash(
        parsedResponse.data.password,
        __configurations.SALTROUND
      );
      let userRole = await Role.findOne({ name: "user" });
      parsedResponse.data.roles = [userRole.id];
      let createNewResource = await User.create(parsedResponse.data);

      res.status(201).json({ _id: createNewResource._id });
    } catch (err) {
      console.log(`Error while signing up a user ${err} `);
      res.status(500).json({
        message: "internal server error",
      });
    }
  },

  search: async function (req, res) {
    await dbconnect();
    try {
      const resources = await User.find({}, "-password").populate("roles");
      res.status(200).json({
        count: resources.length,
        data: resources,
      });
    } catch (err) {
      console.log(`Error occured while searching for user ${err.message}`);
      res.status(500).json({
        message: "internal server error",
      });
    }
  },

  find: async function (req, res) {
    await dbconnect();
    try {
      const resource = await User.findById(req.params.id, "-password");
      if (resource == null) {
        res.status(404).json({ message: "not found" });
        return;
      }
      return res.status(200).json({
        data: resource,
      });
    } catch (err) {
      console.log(`Error occured while finding a user ${err}`);
      res.status(500).json({
        message: "internal server error",
      });
    }
  },
  login: async function (req, res) {
    await dbconnect();
    try {
      const UserLogin = z.object({
        email: z.string().email(),
        password: z.string().min(8),
      });
      const parsedResponse = UserLogin.safeParse(req.body);

      if (!parsedResponse.success) {
        res.status(422).json({ message: "invalid data" });
        return;
      }
      // if does not exit return 404
      let ExistedResource = await User.findOne({
        email: parsedResponse.data.email,
      });

      if (ExistedResource == null) {
        res.status(404).json({ message: "user does not exist" });
        return;
      }
      let isPasswordMatched = await bcrypt.compare(
        parsedResponse.data.password,
        ExistedResource.password
      );
      if (isPasswordMatched == false) {
        res.status(401).json({ message: "password does not wrong" });
      }

      let token = await ExistedResource.generateToken();
      res.status(200).json({
        token: token,
      });
    } catch (err) {
      console.log(`Error while logining `);
      res.status(500).json({
        message: "internal server error",
      });
    }
  },
  delete: async function (req, res) {
    await dbconnect();
    try {
      const deletedResource = await User.findByIdAndDelete(req.params.id);
      res.status(200).json({
        message: "delete successfully",
      });
    } catch (err) {
      console.log(`Error while updating the role ${err}`);
      res.status(500).json({
        message: "internal server error",
      });
    }
  },
  update: async function (req, res) {
    await dbconnect();
    try {
      let ExistedResource = await User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        roles: req.body.roles,
      });
      
      
      if (ExistedResource == null) {
        res.status(404).json({ message: "user does not exist" });
        return;
      }
      res.status(201).json({ message: "updated successfully" });
    } catch (err) {
      console.log(`error while updating user ${err}`);
      res.status(500).json({ message: "internal server error" });
    }
  },
};
