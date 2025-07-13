import { response } from "express";
import foodModel from "../models/foodModel.js";
import fs from 'fs';


//add food items

const addFood=async (req,res) => {
    try {
        const { name, description, price, category } = req.body;
        const image = req.file.path; // Cloudinary image URL

        // Save image URL in DB
        const newFood = new foodModel({
          name,
          description,
          price,
          category,
          image
        });
        await newFood.save();
        res.json({ success: true, message: "Food added!" });
      } catch (error) {
        res.json({ success: false, message: "Error adding food" });
      }
}

//all food list
const listFood=async(req,res)=>{
    try {
        const foods= await foodModel.find({});
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//remove food_item
const removeFood=async (req,res) => {
    try {
        const food=await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {addFood,listFood,removeFood}