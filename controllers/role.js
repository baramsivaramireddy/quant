const path = require("path");
const Role = require(path.resolve(DB_MODEL, "role"));
const z = require('zod')
module.exports = {
  search: async function (req, res) {
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
  create: async function (req, res) {
    const roleSchema = z.object({
      name: z.string(),
      description: z.string(),
    });

    const parseResponse =  roleSchema.safeParse(req.body)

    if (!parseResponse.success){

      res.status(422).json({message:'invalid data'})
    }

    const doc = await Role.create(parseResponse.data);
    res.status(201).json({
      _id: doc._id
    })
  }


};
