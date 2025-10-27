import express from "express"
import{dirname} from "path";
import path from "path";
import { fileURLToPath } from 'url';
import bodyParser from "body-parser";
import pg from"pg";




const app=express();
const port =3000;

const db = new pg.Client({
  user:"postgres",
 host :"localhost",
 database:"ktfood",
 password:"Kathir",
 port:5432,
}) 
db.connect();



const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); 



// app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


app.get("/about",(req,res)=>{
  res.sendFile(path.join(__dirname,"public","about.html"));
});

app.get("/service",(req,res)=>{
  res.sendFile(path.join(__dirname,"public","service.html"));
})

app.get("/contact",(req,res)=>{
  res.sendFile(path.join(__dirname,"public","contact.html"));
})

app.get("/menu",(req,res)=>{
  res.sendFile(path.join(__dirname,"public","menu.html"));
})

app.post("/contacts",async (req,res)=>{
   let name = req.body['name'];
   let email =req.body ['email'];
   let des =req.body['text'];
  try{
    await db.query("INSERT INTO list (name,email,description) VALUES( $1, $2, $3)" ,[name,email,des]);
     res.sendFile(path.join(__dirname,"public","sucess.html"),);
  }catch(err){
    console.log(err);
    res.status(500).send("error saving data");
  }

})


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
