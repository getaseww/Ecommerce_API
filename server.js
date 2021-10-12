require('dotenv').config();
const express=require("express");
const cors=require("cors");
const bodyParser=require("body-parser");
const db=require("./db");
const { connect } = require("http2");
const app=express();
const router=require("./routes/api-routes");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/api",router);

const port=process.env.PORT||5000;
db.mongoose.connect(db.url,{
    userNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    app.listen(port,()=>{
        console.log("server started at port:"+port );
    });
}).catch(err=>{
    console.log("not connected with db"+err);
})
