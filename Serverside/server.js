import  express  from "express";
import  Color  from "colors";
import dotenv from 'dotenv';
import cors from 'cors';
import connectDb from './db.js';
import bodyParser from 'body-parser'
import authRoute from './Routes/authRoute.js'
import morgan from "morgan";


const app = express()
dotenv.config();
app.use(cors({
    origin:["http://localhost:5173"],
    methods:["POST","GET"],
    
}));


const PORT = process.env.PORT || 8080
app.use(bodyParser.json())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(morgan("dev"))
app.use("/api/v1/auth", authRoute)

connectDb()

app.get("/", (req,res) => {
    res.send("hello welcome to this ecommerce page")
})



app.listen(PORT,() => {
    console.log(`port is running on ${PORT}`.bgBlack.red)
   
})