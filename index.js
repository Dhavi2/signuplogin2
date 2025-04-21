const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const EmployeeModel = require("./models/Employee")
const jwt = require("jsonwebtoken")
const app = express();
app.use(express.json())
app.use(cors())
let SECRET_KEY = "e0eb75ea9c1a8a588f2685efb6243a5923cb785c74b678d8373ff5f0e9a1caaf38ce4114203d10eba18f2057d059be2e2a90d361050fe1284c67146ecb0e9eb408f042e6c21970ecac9302ad78d1ef075eb693c0edb96cb0cd68d89d7bd09d1c3e36828bf0f9b31c58daf02f8e6965787e23bb16ae2634851daac1de078ff87f455cf2caa9ba1cd5f2869fee4195aeafdbbe6e743ab11cbadd53ae25eb5b093f99243fb4053411d863a1f61cea31762e044d1d3fa993468a58daec42f51985fb24d9825de0d8ece37b405e0e2bbb9c4b4579db153543b5eecdd03bede2ff29f0731cc1c431fc518b438d63b75123b2a59011827f5121016a995a4dfc28823098"
mongoose.connect("mongodb+srv://Ashish01:ashishRAJ123@cluster0.z2cvr.mongodb.net/myDatabaseCRUD2")
.then(() =>{
    console.log("DB Connection Successfully")
})
.catch(()=>{
    console.log("DB is not connected successfully")
})
app.post('/register',(req,res)=> {
    EmployeeModel.create(req.body)
    .then(employee => {
        const token = jwt.sign(
         {id:employee._id,email:employee.email},
         SECRET_KEY,
         {expires:"1d"}  
        )
        res.json({employee,token})
    })
    .catch((err)=>{
     res.status(500).json({message:"Data is not create Successfully",err})
    })
   })
app.post("/login",(req,res)=>{
    const {email,password} = req.body;
    EmployeeModel.findOne({email:email})
    .then(user => {
        if(user){
            if(user.password === password){
                res.json("Success")
            }else{
                res.json("the password is incorrect")
            }
        }else{
            res.json("No Record existed")
        }
        const token = jwt.sign(
            {id:user._id,email:user.email},
            SECRET_KEY,
            {expiresIn:'1d'}
        )
        res.json({message:"Login Successfully",token})
    })
})

app.get("/register",(req,res)=>{
    EmployeeModel.find()
    then((data)=>{
        req.status(201).json({message:"Getting Data Successfully",data})
    }).catch((err)=>{
        res.status(500).json({message:"Getting Data Successfully",err})
    })
})
app.get("/register/:id",(req,res)=>{
    const id = req.params.id
    EmployeeModel.findById(id)
    then((data)=>{
         req.status(201).json({message:"Getting Data By ID",data})
    }).catch((err)=>{
        res.status(500).json({message:"Not getting Data By ID",err})
    })
})
app.put("/register/:id",(res,req)=>{
const id = req.params.id
 EmployeeModel.findByIdAndUpdate(id)
 then((data)=>{
    req.status(201).json({message:"Data Update Successfully",data})
    console.log("Data Update Successfully")
 }).catch((err)=>{
    res.status(500).json({message:"Data is not Update data Successfully",err})
    console.log("Data is not Update data Successfully")
 })
})
app.delete("/register/:id",(req,res)=>{
    const id = req.params.id
    EmployeeModel.findByIdAndDelete(id)
    then((data)=>{
        req.status(201).json({message:"Data delete Successfully",data})
    }).catch((err)=>{
        res.status(500).json({message:"Data isd not deleted Successfully",err})
    })
})
app.listen(3001,()=>{
    console.log("Server is Running")
})