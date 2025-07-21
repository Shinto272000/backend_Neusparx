import Product from '../models/Product.js';
import cloudinary from '../config/cloudinary.js';

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    console.log("you are at create log in end point");
    
    const { name, price, description } = req.body;
    let imageUrl = null;

    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString('base64');
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;
      
      const uploadResult = await cloudinary.uploader.upload(dataURI, {
        folder: 'ecommerce-products',
        transformation: [{ width: 500, height: 500, crop: 'limit' }]
      });
      
      imageUrl = uploadResult.secure_url;
    }

    const product = new Product({
      name,
      price,
      description,
      image: imageUrl
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    let updateData = { name, price, description };

    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString('base64');
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;
      
      const uploadResult = await cloudinary.uploader.upload(dataURI, {
        folder: 'ecommerce-products',
        transformation: [{ width: 500, height: 500, crop: 'limit' }]
      });
      
      updateData.image = uploadResult.secure_url;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id, 
      updateData, 
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};