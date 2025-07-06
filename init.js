// this file is dedicated for having bunch of sample data to test the interface!

// import
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

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

// sample data
let allChats = [
  {
    from: "Anki",
    to: "Ashi",
    message: "Did you watch the latest anime?",
    created_at: new Date(),
  },
  {
    from: "Jack Joyce",
    to: "Eve Frye",
    message: "I think he is awesome",
    created_at: new Date(),
  },
  {
    from: "Connor",
    to: "William J Balskowitch",
    message: "Kill them all!",
    created_at: new Date(),
  },
  {
    from: "David Miller",
    to: "Richard Stark",
    message: "Those people are tried of this tyranny",
    created_at: new Date(),
  },
];

Chat.insertMany(allChats);
