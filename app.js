/*const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 5050;
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));

/*main()
   .then(()=>{
     console.log("connection sucessfull");
   })
   .catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chatapp');
}*/

/*main() 
   .then(() => { 
      console.log("Connection successful"); 
   }) 
   .catch((err) => console.log("Connection failed:", err)); 
async function main() { 
   try { 
      await mongoose.connect('mongodb://127.0.0.1:27017/chatapp', { 
         useNewUrlParser: true,
         useUnifiedTopology: true 
      }); 
      console.log("Connected to MongoDB"); 
   } catch (err) { 
      console.error("Error connecting to MongoDB:", err); 
   } 
}

//start
app.get("/",(req,res)=>{
     res.render('start.ejs');
});

//chat.js
app.get("/chats",async(req,res)=>{
     let chats = await Chat.find();
     res.render("chat.ejs",{chats});
});

//new
app.get("/chats/new",(req,res)=>{
     res.render("new.ejs");
});

//create route
app.post("/chats",(req,res)=>{
     let { from ,to ,msg }= req.body;
     let newChat = new Chat({
       from : from,
       to : to,
       msg : msg,
       created_at : new Date()
     });
     newChat 
      .save()
      .then((res)=>{
       console.log("chat was saved");
      })
      .catch((err)=>{
       console.log(err);
      });
     res.redirect("/chats");
});

//edit
app.get("/chats/:id/edit",async(req,res)=>{
     let {id} = req.params;
     let chat = await Chat.findById(id);
     res.render("edit.ejs",{chat});
});
   
//update route
app.put("/chats/:id",async (req,res)=>{
     let {id} = req.params;
     let {msg : newMsg} = req.body;
     let updatedchat = await Chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators:true,new : true});
     console.log(updatedchat);
     res.redirect("/chats");
});

//destroy route
app.delete("/chats/:id",async (req,res)=>{
     let {id} = req.params;
     let deletedchat = await Chat.findByIdAndDelete(id);
     console.log(deletedchat);
     res.redirect("/chats");
});

app.listen(port,()=>{
     console.log(`server is running at http://localhost:${port}`)
})*/

const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 5050;
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

main()
   .then(() => {
     console.log("Connection successful");
   })
   .catch((err) => {
     console.log("Connection failed:", err);
     process.exit(1);
   });

async function main() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/chatapp');
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

// Routes
app.get("/", (req, res) => {
  res.render('start.ejs');
});

app.get("/chats", async (req, res) => {
  try {
    let chats = await Chat.find();
    res.render("chat.ejs", { chats });
  } catch (err) {
    console.error("Error fetching chats:", err);
    res.status(500).send("Error fetching chats");
  }
});

app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/chats", async (req, res) => {
  let { from, to, msg } = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date()
  });

  try {
    await newChat.save();
    console.log("Chat was saved");
    res.redirect("/chats");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error saving chat");
  }
});

app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});

app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: newMsg } = req.body;
  let updatedChat = await Chat.findByIdAndUpdate(id, { msg: newMsg }, { runValidators: true, new: true });
  console.log(updatedChat);
  res.redirect("/chats");
});

app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id);
  console.log(deletedChat);
  res.redirect("/chats");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

