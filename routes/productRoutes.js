import express from 'express';
import { 
  getAllProducts, 
  createProduct, 
  getProductById, 
  updateProduct, 
  deleteProduct 
} from '../controllers/productControllers.js';
import upload from '../middleware/upload.js';
import Product from '../models/Product.js';

const router = express.Router();

router.post('/', (req,res) => {
  console.log("you are at product end point");
  res.send("you are at product end point");
});

router.get('/get', getAllProducts);
router.post('/add', upload.single('image'), createProduct);
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})
router.put('/:id', upload.single('image'), updateProduct);
router.delete('/:id', deleteProduct);

export default router;
