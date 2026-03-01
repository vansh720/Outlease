import imagekit from "../configs/imageKit.js"
import Items from "../models/AddItem.js"
import User from "../models/User.js"
import fs from 'fs'

//Api to change role
export const changeRoleToOwner = async (req,res)=>{
    try {
        const {_id}=req.user
        await User.findByIdAndUpdate(_id,{role:"owner"})
        res.json({success:true,message:"Now you can list cars"})
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}

// API to list items
export const addItem=async(req,res)=>{
    try {
        const {_id}=req.user;
        let item=JSON.parse(req.body.itemData)
        const imageFile=req.file;

        //Upload image to imagekit
        const fileBuffer = fs.readFileSync(imageFile.path)
        const response=await imagekit.upload({
            file: fileBuffer,
            fileName:imageFile.originalname,
            folder:'/items'
        })

        // optimizing through imagekit URL transformation
        var optimizedImageUrl=imagekit.url({
            path: response.filePath,
            transformation:[
                {width:'1200'},
                {quality:"auto"},
                {format:'webp'}
            ]
        })

        const image = optimizedImageUrl;
        await Items.create({...item,owner:_id,image})
        res.json({success:true,message:"Item added"})
        
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}