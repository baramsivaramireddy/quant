
const path = require("path")
const Category = require(path.resolve(DB_MODEL,'category'))
const zod = require('zod');
const dbconnect = require(path.resolve(__dirname,'..','dbconnect'))
const categorySchema = zod.object({
    name: zod.string()
})
module.exports ={

    create: async (req,res,next)=>{
        await dbconnect()
        try{

            const parsedResponse= categorySchema.safeParse(req.body)
            if (!parsedResponse.success){
                res.status(422).json({message:'invalid data'})
                return 
            }
            
            let newDoc =  await Category.create(parsedResponse.data)
            res.status(201).json({message:newDoc._id})
        }
        catch(err){
            console.log(`Error occured while creating a category ${err}`)
            res.status(500).json({message: 'internal server error'})
        }

    },
    find:  async (req,res,next)=>{
        try{
            await dbconnect()
            let docId = req.params.id

            let Doc = await Category.findById(docId)

            if (Doc==null){
                res.status(404).json({message:'not found'})
                return ''
            }

            res.status(200).json({
                data :Doc
            })
        }
        catch(err){
            console.log(`Error occured while finding a category ${err}`)
            res.status(500).json({message: 'internal server error'})
        }

    },
    search: async  (req,res,next)=>{
        try{
            await dbconnect()

           let Docs =  await Category.find();
           
           if (Docs.length == 0){
            res.status(404).json({message: 'not found'})
            return 
           }

           res.status(200).json({ count:Docs.length,data: Docs})
        }
        catch(err){
            console.log(`Error occured while search  a category ${err}`)
            res.status(500).json({message: 'internal server error'})
        }
    },
    delete: async (req,res,next)=>{
        try{
            await dbconnect()

            let docId = req.params.id;

            await Category.findByIdAndDelete(docId)
            res.status(200).json({message:'deleted successfully'})
        }
        catch(err){
            console.log(`Error occured while deleting  a category ${err}`)
            res.status(500).json({message: 'internal server error'})
        }
    },
    update: async (req,res,next) =>{
        try{
            await dbconnect()
            const parsedResponse= categorySchema.safeParse(req.body)
            if (!parsedResponse.success){
                res.status(422).json({message:'invalid data'})
                return 
            }

            let docId = req.params.id;
            let updatedDoc =  await Category.findByIdAndUpdate(docId ,parsedResponse.data)
            res.status(201).json({message:"updated successfully"})
        
        }
        catch(err){
            console.log(`Error occured while updating a category ${err}`)
            res.status(500).json({message: 'internal server error'})
        }
    }
}