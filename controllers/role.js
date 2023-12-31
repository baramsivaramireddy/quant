const path = require("path");
const Role = require(path.resolve(DB_MODEL, "role"));
const z = require("zod");
const mongoose = require("mongoose");
const dbconnect = require("../dbconnect");
const roleSchema = z.object({
  name: z.string(),
  description: z.string(),
});

module.exports = {
  create: async function (req, res) {
    await dbconnect();
    try {
      const parseResponse = roleSchema.safeParse(req.body);

      if (!parseResponse.success) {
        res.status(422).json({ message: "invalid data" });
        return;
      }

      const doc = await Role.create(parseResponse.data);
      res.status(201).json({
        _id: doc._id,
      });
    } catch (err) {
      console.log(`Error occured while creating the role ${err}`);
      res.status(500).json({ message: "Internal serve error" });
    }
  },
  search: async function (req, res) {
    await dbconnect();
    try {
      const roles = await Role.find();

      res.status(200).json({
        count: roles.length,
        data: roles,
      });
    } catch (err) {
      console.log(`Error occured while searching for roles ${err.message}`);
      res.status(500).json({
        message: "internal server error",
      });
    }
  },

  find: async function (req, res) {
    await dbconnect();
    try {
      const role = await Role.findById(req.params.id);
      if (role == null) {
        res.status(404).json({ message: "not found" });
        return;
      }
      return res.status(200).json({
        data: role,
      });
    } catch (err) {
      console.log(`Error occured while finding a role ${err}`);
      res.status(500).json({
        message: "internal server error",
      });
    }
  },
  update: async function (req, res) {
    await dbconnect();
    try {
      const parseResponse = roleSchema.safeParse(req.body);

      if (!parseResponse.success) {
        res.status(422).json({ message: "invalid data" });
        return;
      }

      const doc = await Role.findByIdAndUpdate(
        req.params.id,
        parseResponse.data
      );
      res.status(201).json({
        _id: doc._id,
      });
    } catch (err) {
      console.log(`Error occured while updating  a role ${err}`);
      res.status(500).json({ message: "Internal serve error" });
    }
  },
  delete: async function (req, res) {
    await dbconnect();
    try {
      const deletedDoc = await Role.findByIdAndDelete(req.params.id);

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
};
