const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const port = process.env.PORT;
const userRoutes = require('./routes/userRouter.js')
const cookieParser = require('cookie-parser');
main().catch(err => console.log(err));
const cors = require('cors')
async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Database Connected');

}

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your client origin
    credentials: true
}));
app.use(cookieParser());

// Import and use your routes

app.use('/api/auth', userRoutes);

app.listen(port, () => {
    console.log(`Server Running on ${port}`);

})