// imports
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

// ejs, urlencoded, methodOverride and Bootstrap setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); // parsing req.body in POST
app.use(methodOverride("_method"));
app.use(
  "/bootstrap",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist"))
);

// mongodb
main()
  .then(() => {
    console.log("Connection Successful!");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

// port
let port = 3000;

// root route
app.get("/", (req, res) => {
  res.send("Working root route");
});

// index route
app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  res.render("index.ejs", { chats });
});

// new route
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

// create route
app.post("/chats", (req, res) => {
  let { from, to, message } = req.body; // fetching input from new.ejs
  //as there are multiple inputs we are fetching, we will create an variable and store mongodb document inside it calling from, to, message and created_at inputs from user
  let newChat = new Chat({
    from: from,
    to: to,
    message: message,
    created_at: new Date(),
  });
  // saving the document inside database
  newChat
    .save()
    .then((res) => {
      console.log(res);
      console.log("Chat was saved!");
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/chats");
});

// edit route
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});

// update route
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params; // extracting id
  let { message: newMessage } = req.body; // extracting message
  console.log(newMessage);
  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    { message: newMessage, updated_at: new Date() },
    { runValidators: true, new: true }
  );
  console.log(updatedChat);
  res.redirect("/chats");
});

// delete route
app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let chatDeleted = await Chat.findByIdAndDelete(id);
  console.log(chatDeleted);
  console.log("Chat deleted!");
  res.redirect("/chats");
});

// listening port
app.listen(port, () => {
  console.log("Connection Established:", port);
});
