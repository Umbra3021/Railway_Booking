import mysql from 'mysql2';
import express from 'express';
import cors from 'cors';
const app =express();
app.use(cors());
app.use(express.urlencoded({extended:false}))
app.use(express.json());

let data = {};





// var i=14;
const conn = mysql.createPool({host:'127.0.0.1',user:'root',password:'kiit',database:'railway'}).promise();

var sources,destinations;
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
        var id=null;
        const insert=await conn.query(`INSERT into customers values(?,?,?,?)`,[,name,email,password]);
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

async function booking (seat,train){
    try{
        const [row] = await conn.query(`select ${seat} from coaches where trainNo= ?`,[train]);
        const rows = row[0];
        var value=0;
        for (const key in rows) {
            value = rows[key];
          }
          value=value-1;
          console.log(value);


          const [update] = await conn.query(`update coaches SET ${seat} = ? where trainNo = ?`,[value,train]);
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

    if(Object.keys(data).length!==0){
        res.json({status:true,user})
    }
    else{
        res.status(404).json({err:"Incorrect Credentials",status:false});
    }
    
})

app.post("/form",async (req,res)=>{

    let s = req.body.from;
    console.log(s);
    let d= req.body.to;
    sources = s;
    destinations = d;
    const data = await availTrain(sources,destinations);
    if(Object.keys(data).length!==0){
        res.status(200).json({msg:"Showing results",status:true});
    }
    else{
        res.status(404).json({err:"No available train",status:false});
    }

})


app.get("/search", async (req,res)=>{
    const data = await trains(sources,destinations);
    if(Object.keys(data).length!==0){
        res.send(data)
    }
    else{
        console.log("No available trains");
        res.status(400).json({error:"No available trains",status:false});
        
    }   
    
});

app.post("/booking",async (req,res)=>{
    const {seat_type,tr,user_info}= req.body;
    data = {
        name:user_info.username,
        email:user_info.email,
        train:tr,
        seat:seat_type
    }

})

app.get("/get_booking", async (req, res) => {
    data = {...data, roll: 17};
    res.send(data)
    console.log("inside get booking");
})



app.listen(5000,()=>{
    console.log("Server is up") 
})