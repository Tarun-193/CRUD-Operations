const express = require('express')
const mysql = require('mysql2')
const bcrypt = require('bcrypt')
const bodyparser = require('body-parser')
const cors = require('cors')


const app = express();
app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

// Connection to the MySQL database, using the createConnection() method.
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1111',
    database: 'crud_operations'
  });
  
connection.connect((err)=> {
    if (err) throw err;
    console.log('Connected to the MySQL database');
});


// Register Api
app.post('/register',async(req,res)=>{
    const {email,password}=req.body;  

    connection.query( 'SELECT * FROM login WHERE email = ?',[email],(err,result)=>{
        if(err){
            return res.status(500).json({err})
        }else if(result.length>0){
            return res.status(400).json({message:"Email Already exists. please choose another email"})
        }else{
            connection.query(`INSERT into login (email,password) VALUES (?,?)`,
            [email,password],
            (err,result)=>{
                if(err){
                    return res.status(500).json({err})
                }
                return res.status(200).json({message:'User created successfully',data:result})
            })
        }
    })
})


// Login Api
app.post('/login',(req,res)=>{
    const {email,password}=req.body; 
    connection.query(`SELECT * from login WHERE email= ?`,[email],(err,data)=>{
        if(err){
            return res.status(500).json({err})
        }
        if(data.length>0){
                console.log(data)
                if(data){
                    return res.status(200).json({message:"Logged in successfully"})

                }else{
                    return res.status(400).json({message:"Enter valid password"})
                }
        }
        else{
            return res.status(404).json({message:"Enter Valid Email"})
        }
    })
})


app.post('/user/register',async(req,res)=>{
    const {firstName,lastName,email,phoneNo,address}=req.body;

    connection.query(`SELECT * FROM details where contact = ?`,[phoneNo],(err,data)=>{
        if(err){
            return res.status(500).json({message:"Internal server error in db query"})
        }
        else if (data.length>0){
            return res.status(400).json({message:"Mobile already exists"})
        }else{
            connection.query(`SELECT * FROM details where email = ?`,[email],(err,data)=>{
                if(err){
                    return res.status(500).json({message:"Internal server error in db query"})
                }
                else if (data.length>0){
                    return res.status(400).json({message:"Email already exists"})
                }else{
                    connection.query(`INSERT INTO details (first_name,last_name,email,contact,address) VALUES (?,?,?,?,?);`,
                    [firstName,lastName,email,phoneNo,address],
                    (err,data)=>{
                        if(err){
                            return res.status(500).json(err)
                        }
                        return res.status(200).json(data)
                    })
                }
            })
        }
    })
})

// Get all details
app.get('/details',(req,res)=>{
    connection.query(`SELECT * FROM details`,(err,data)=>{
        if(err){
            return res.status(500).json(err)
        }
        return res.status(200).json(data)
    })
})

// Get details by id
app.get('/details/:id',(req,res)=>{
    const {id} =req.params
    connection.query(`SELECT * FROM details WHERE id = ?`,[id],(err,data)=>{
        if(err){
            return res.status(500).json(err)
        }
        return res.status(200).json(data)
    })
})

//update api
app.patch('/details/:id',(req,res)=>{
    const {id} =req.params;
    const {firstName,lastName,email,phoneNo,address}=req.body;
    connection.query(`UPDATE details SET first_name=?,last_name=?,contact=?,email=?,address=? WHERE id = ?`,
    [firstName,lastName,phoneNo,email,address,id],
    (err,data)=>{
        if(err){
            return res.status(500).json(err)
        }
        return res.status(200).json(data)
    })
    
})

//delete api
app.delete('/details/:id',(req,res)=>{
    const {id} =req.params
    connection.query(`DELETE FROM details WHERE id = ?`,[id],(err,data)=>{
        if(err){
            return res.status(500).json(err)
        }
        return res.status(200).json(data)
    })
})
app.listen(4000,()=>{
    console.log('server running on localhost 4000')
})