import express from 'express';
import { cancelOrderController, showImageController, showOrderStatus } from '../controllers/assistantController.js';

const router = express.Router();


// First welcome Message
// router.post('/webhook', firstMessageController)

// show image in dialogflow cx
router.post('/image', showImageController)

// show image in dialogflow cx
router.post('/order', showOrderStatus)

router.post('/cancel', cancelOrderController)




export default router