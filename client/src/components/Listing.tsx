import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios'
import './Listing.css'
import {BsFillPencilFill} from "react-icons/bs"
import {MdDelete} from "react-icons/md"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import { Form } from 'react-router-dom';

type Product = {
  name: string;
  description: string;
  imageUrl?: string;
};

const Listing = () => {
  const [data, setData] = useState<Product[]>([]);
  const [editProduct, setEditProduct] = useState<Product | null >(null);


  const fetchProducts = async () => {
    try{
      // const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/fetch`);
     const response = await axios.get("http://localhost:3001/api/fetch");
      setData(response.data.data);
      console.log(data);
    }catch(err){
      console.error(err);
    }
  }

useEffect(()=>{
 fetchProducts();
}, []);


const handleEditOpen = (product: Product) => {
  setEditProduct(product);
}

const handleEditClose = () => {
  setEditProduct(null)
}


const handleSubmitChange = async(updatedProduct: Product) => {
  try{
     await axios.put(`http://localhost:3001/api/update/${updatedProduct.id}`, updatedProduct);

      setData((data.map((prod)=> prod.id === updatedProduct.id ? updatedProduct: prod)))
      
      //close the modal
      handleEditClose();


  }catch(err){
    console.error(err);
  }
}

const handleDelete = async (productId: Product) => {
  try{
    await axios.delete(`http://localhost:3001/delete/${productId}`)
    setData(data.filter((prod)=> prod._id !== productId)) //the one who are not matching with the id will be filtered in the database
  }catch(err){
    console.error(err);
  }
}


return (
  <div className='container'>
   <div className="parent">
    <h1 className="title">Hello! This is the listing page</h1>
     {data.map((product) => (
       <Card key={product.name} className="card-body">
         <BsFillPencilFill className='edit-button' onClick={()=> handleEditOpen(product)}/>
         <MdDelete className='delete-button' onClick={()=> handleDelete(product._id)}/>
         <div className='card-image'>
         {product.imageUrl && <Card.Img variant="top" src={product.imageUrl} />}
         </div>
         <Card.Body className="card-body">
           <Card.Title className='card-title'>{product.name}</Card.Title>
           <Card.Text className="card-desc">{product.description}</Card.Text>
         </Card.Body>
       </Card>
     ))}
   </div>
     </div>
 );
}

export default Listing;