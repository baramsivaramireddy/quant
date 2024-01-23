const path = require("path");
const QandA = require(path.resolve(DB_MODEL, "qAa"));
const zod = require("zod");
const dbconnet = require(path.resolve(__dirname, "..", "dbconnect"));

const QandASchema = zod.object({
  title: zod.string(),
  description: zod.string(),
  difficulty: zod.enum(["easy", "medium", "hard"]),
  type: zod.enum([
    "multiplechoice",
    "singlechoice",
    "fillintheblank",
    "matching",
  ]),
  category: zod.string(),
  isPublished: zod.boolean(),
  options: zod.array(zod.any()),
  correctOptions: zod.array(zod.any()),
  solution: zod.string().optional(),
});
module.exports = {
  create: async (req, res) => {
    await dbconnet();
    try {
      let parsedResponse = QandASchema.safeParse(req.body);

      if (!parsedResponse.success) {
        res.status(422).json({ message: "invalid data" });
        return;
      }

      let newResource = await QandA.create(parsedResponse.data);

      res.status(201).json({ message: newResource._id });
    } catch (err) {
      console.log(`Error while creating question and answeer`);
      res.status(500).json({ message: "internal server error" });
    }
  },

  find: async (req, res) => {
    await dbconnet();
    try {
      let resourceId = req.params.id;

      let resource = await QandA.findById(resourceId);

      if (resource == null) {
        res.status(404).json({ message: "not found" });
        return;
      }
      res.status(200).json({ data: resource });
    } catch (err) {
      console.log(`Error while finding question and answeer`);
      res.status(500).json({ message: "internal server error" });
    }
  },
  update: async (req, res) => {
    await dbconnet();
    try {
      let resourceId = req.params.id;
      let parsedResponse = QandASchema.safeParse(req.body);
      if (!parsedResponse.success) {
        res.status(422).json({ message: "invalid data" });
        return;
      }
      let resource = await QandA.findByIdAndUpdate(
        resourceId,
        parsedResponse.data
      );

      if (resource == null) {
        res.status(404).json({ message: "not found" });
        return;
      }
      res.status(200).json({ message: "updated  successfully" });
    } catch (err) {
      console.log(`Error while updating question and answeer`);
      res.status(500).json({ message: "internal server error" });
    }
  },
  delete: async (req, res) => {
    await dbconnet();
    try {
      let resourceId = req.params.id;

      let resource = await QandA.findByIdAndDelete(resourceId);

      res.status(200).json({ message: "deleted successfully" });
    } catch (err) {
      console.log(`Error while deleting question and answeer`);
      res.status(500).json({ message: "internal server error" });
    }
  },
  search: async (req, res) => {
    await dbconnet();
    try {
      let resources = await QandA.find();
      res.status(200).json({ count: resources.length, data: resources });
    } catch (err) {
      console.log(`Error while searching question and answeer`);
      res.status(500).json({ message: "internal server error" });
    }
  },
};
