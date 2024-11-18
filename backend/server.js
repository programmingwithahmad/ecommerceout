import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoute  from './routes/authRoute.js'
import cors  from 'cors';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import assistantRoute from './routes/assistantRoute.js';
import ngrok from 'ngrok';
import bodyParser from 'body-parser';
import path from 'path';

//configure env
dotenv.config();   

//database config
connectDB();

//rest object
const app = express();

// Serve static assets in production
const __dirname = path.resolve()
 
//middleware
app.use(cors({
    origin: ['http://localhost:5171', 'http://localhost:3000', 'https://ecommerceout.vercel.app'],
    credentials: true,
}))
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.json());


//routes
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/product', productRoutes)
app.use('/cx', assistantRoute)

 
//rest api            
app.get('/checkbackend', (req, res) => {
    res.send('Welcome to ecommerce');
})  


// Serve static assets in production
app.use(express.static(path.join(__dirname, "/frontend/dist", )))
app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
})


//PORT
const PORT = process.env.PORT || 3000;


//run listen
app.listen(PORT ,() => {
    console.log(`Server is running on port ${PORT}`.bgYellow.white);
})
