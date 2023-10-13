import mysql from 'mysql2';
import express from 'express';
import cors from 'cors';
const app =express();
app.use(cors());
app.use(express.urlencoded({extended:false}))
app.use(express.json());

var i=9;
const conn = mysql.createPool({host:'127.0.0.1',user:'root',password:'kiit',database:'railway'}).promise();

var sources="Puri",destinations="Howrah";

async function trains(source,destination){
    const [rows] = await conn.query(`select * from train inner join coaches on Train.trainNO=coaches.trainNo WHERE Train.source= ? AND
    Train.destination =?`,[sources,destinations]);
    
    return rows;
}

async function availTrain(source,destination){
    const [rows] =await conn.query(`select * from train where source = ? AND destination = ?`,[source,destination]);
    return rows;
}

async function insertUser(name,email,password){
    try{
        const insert=await conn.query(`INSERT into customer values(?,?,?,?)`,[i,name,email,password]);
        i++;
        return true;
    }
    catch(err){
        console.log(err);
        return 1;
    }
}

async function findUser(username,password){
    try{
        const [rows] = await conn.query(`select * from customer where CustomerName = ?`,[username]);
        return rows;
    }
    catch(err){
        console.log(err);
    }
}


app.post("/register",async (req,res)=>{
    const{username,email,password} = req.body;
    console.log(username);
    var state= await insertUser(username,email,password);
    console.log(state);
    if(state===true){
        return res.json({status:true});
    }
    else{
        return res.json({status:false});
    }
})

app.post("/login",async(req,res)=>{
    const{username,password} = req.body;
    console.log(username);
    var data = await findUser(username,password);
    var user ={
        username,
        password
    } 
    res.json({status:true})
})


app.post("/search", async (req,res)=>{
    
    let source = req.body.from;
    let destination =req.body.to;
    sources=source;
    destinations=destination;
    const data = await availTrain(source,destination);
    if(Object.keys(data).length!==0){
        res.send(data)
        console.log(data);
    }
    else{
        console.log("No available trains");
        res.status(400).json({error:"No available trains",status:false});
        
    }   
    
});

app.get("/show",async(req,res)=>{
    const data = await trains("bhubaneshwar","howrah");
    console.log(data);
});

app.listen(5000,()=>{
    console.log("Server is up") 
})