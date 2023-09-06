//all routes related to the CRUD operations will be here
const express = require('express')
const router = express.Router();
const {v4: uuidv4} = require('uuid'); 
const productSchema = require('../models/product.schema')


//route for creating a product 
router.post("/create", async (req, res)=> {
    const {name, description, price, imageUrl} = req.body;
   
    try{
      let product = new productSchema({

        name: name, 
        description: description,
        price: price,
        imageUrl: imageUrl
      })

      await product.save();

      res.status(200).json({
        message: "Product created successfully and stored to database!",
        data: product
      })

    }catch(err){
        console.error(err);
        res.status(500).send("Server Error");
    }
})


//route for fetching all the products from the database
router.get("/fetch", async(req, res)=> {
    try{
       const products = await productSchema.find({}) //that means find all 
       res.status(200).json({
        message: "Products fetched successfully",
        data: products
       })
    }catch(err){
        console.error(err);
        res.status(500).send("Server Error");
    }
})


//route for updating the products
router.post("/update/:id", async(req, res)=> {
    const {name, description, price, imageUrl} = req.body;
    try{
      let product = await productSchema.findById(req.params.id)
      if(!product){
        res.status(401).send("Product not found with this id!")
      }
      product.name = name;
      product.description = description;
      product.price = price;
      product.imageUrl = imageUrl;

      await product.save();

      res.status(200).json({ message: "Successfully updated the code!", data: product})

    }catch(err){
        console.error(err);
        res.status(401).send("Couldnt find the product!")
    }
})

//route for deleting the 
router.delete("/delete:id", async (req, res)=> {
    try{
        let product = await productSchema.findById(req.params.id);
        if(!product){
            res.status(401).json({message: "Not found!"})
        }
        await product.remove();

        res.status(200).json("Successfully removed!")

    }catch(err){
        console.error(err);
        res.status(500).send("Server Error!")
    }
})


module.exports = router

