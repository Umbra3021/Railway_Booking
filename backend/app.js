import mysql from 'mysql2';
import express from 'express';
import cors from 'cors';
const app =express();
app.use(cors());
app.use(express.urlencoded({extended:false}))
app.use(express.json());



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
        const insert=await conn.query(`INSERT into customers values(?,?,?,?)`,[,name,password,email]);
        return true;
    }
    catch(err){
        console.log(err);
        return 1;
    }
}

async function findUser(username,password){
    try{
        const [rows] = await conn.query(`select * from customers where CustomerName = ?`,[username]);
        console.log(rows);
        return rows;
    }
    catch(err){
        console.log(err);
    }
}

async function journey_details(train){
    try{
        const [details] = await conn.query(`select * from train where trainNo =?`,[train]);
        return details;
    }
    catch(Err){
        console.log(Err);
    }
}

async function booking (seat,train){
    try{
        const [free_seat] = await conn.query(`select ${seat} from coaches where trainNo= ?`,[train]);
        const [curr_seat] = await conn.query(`select ${seat} from berth where trainNo=? AND ${seat} IS NOT NULL`,[train]);
        const [berth] = await conn.query(`select berth from berth where trainNo=? AND ${seat} IS NOT NULL`,[train]);
        var coach = free_seat[0];
        var curr = curr_seat[0];
        var berthNo = berth[0];
        var new_freeSeat=0;
        var new_CurSeat=0;
        var ticket=0;
        for (const key in coach){
            new_freeSeat = coach[key];
          }
        if(new_freeSeat!==0){
            for (const key in curr) {
                new_CurSeat = curr[key];
            }
            for (const key in berthNo) {
                ticket = berthNo[key];
            }

            new_freeSeat=new_freeSeat-1;
            new_CurSeat=new_CurSeat+1;
            
            var log = ticket+"/"+new_CurSeat;
            console.log(log);
              const [update] = await conn.query(`update coaches SET ${seat} = ? where trainNo = ?`,[new_freeSeat,train]);
              const[update2] = await conn.query(`update berth SET ${seat}=? where trainNo=? AND ${seat} IS NOT NULL`,[new_CurSeat,train]);
            return log;

        }
        else{
            return 0;
        }
     }

    catch(err){
        console.log(err);
    }
}


app.post("/register",async (req,res)=>{
    const{username,email,password} = req.body;
    var state= await insertUser(username,email,password);
    if(state===true){
        return res.json({status:true});
    }
    else{
        return res.json({status:false});
    }
})

app.post("/login",async(req,res)=>{
    const{username,password} = req.body;
    var data = await findUser(username,password);
    var user ={
        Id:data[0].ID,
        username:data[0].CustomerName,
        email:data[0].CustomerEmail
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

let x ={};
var berth;

app.post("/booking",async (req,res)=>{
    const {seat_type,tr,user_info}= req.body;
    berth = await booking(seat_type,tr);
    var journey = await journey_details(tr);
    x = {
        name:user_info.username,
        email:user_info.email,
        train:tr,
        trainName:journey[0].TraiName,
        source:journey[0].Source,
        destination:journey[0].Destination,
        departure:journey[0].DepartureTime,
        arrival:journey[0].ArrivalTime,
        seat:seat_type,
        seatno:berth
    }
    console.log(x);

})

app.get("/get_booking", async (req, res) => {
    console.log(x);
    res.send(x)
})





app.listen(5000,()=>{
    console.log("Server is up") 
})