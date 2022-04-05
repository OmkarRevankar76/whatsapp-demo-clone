// import
import  express  from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js"
import Pusher from "pusher"
import  cors  from "cors"
// import path from "path"
import dotenv from "dotenv";

dotenv.config()

// config
 const app=express()
  const port=process.env.PORT 

  const pusher = new Pusher({
    appId: "1366236",
    key: "cd79d1e39963c7cf0216",
    secret: "61b40a4522852b5d6840",
    cluster: "ap2",
    useTLS: true
  });


 
  




// middleware

app.use(express.json())

app.use(cors())



//DB config
const connection_url="mongodb+srv://admin:T9TumieBKDHHiY8y@cluster0.h2dsi.mongodb.net/whatsappdb?retryWrites=true&w=majority"
mongoose.connect(connection_url,{
    
    useNewUrlParser:true, 
    useUnifiedTopology:true,
})

const db=mongoose.connection

db.once("open",()=>{
    console.log("db is connected")

    const msgCollection=db.collection("messagecontents")
    const changeStream=msgCollection.watch()

    changeStream.on ("change",(change)=>{
        console.log(change)

        if(change.operationType==="insert"){
            const messageDetails=change.fullDocument;
            pusher.trigger("messages","inserted",
            {
                name:messageDetails.name,
                Messages:messageDetails.message,
                timestamp:messageDetails.timestamp,
                received:messageDetails.received,
            }
            )
        }else{
            console.log("error triggerung pusher")
        }
    })
}) 

// ?????#



// api routes
// app.get("/",(req,res)=>{
//     res.status(200).send("hello world")
// })


app.get("/messages/sync",(req,res)=>{
    Messages.find((err,data)=>{
    if(err){
        res.status(500).send(err)
    }else{
        res.status(200).send(data)
    }
})
})

app.post("/messages/new",(req,res)=>{
    const dbMessage=req.body

    Messages.create(dbMessage,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})

//deployment


if (process.env.NODE_ENV==="production"){
    app.use(express.static("client/build"))
}
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// listen

app.listen(port,()=>console.log(`listening on the localhost:${port}`))


