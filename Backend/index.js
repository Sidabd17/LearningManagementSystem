const express = require("express");
const connectDB = require("./database/dbConnect") ;
// const connectDB = require("./database/dbConnect");
const dotenv = require("dotenv");
// import userRoute from "./routes/user.routes.js";
const userRouter = require("./routes/user.routes");
const cookieParser = require("cookie-parser");
const cors = require('cors');

const app = express();
dotenv.config({});
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",  // Correct frontend URL
    credentials: true,                // Allow cookies (if needed)
    methods: ["GET", "POST", "PUT", "DELETE"], // Explicitly define allowed methods
    allowedHeaders: ["Content-Type", "Authorization"],
}))

const Port = process.env.PORT || 3000;

app.use("/api/v1/user" ,userRouter);

app.listen(Port , ()=>{
    console.log(`Server is running at ${Port}`); 
})
