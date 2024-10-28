const mongoose = require("mongoose");
const config = require("config");
const dbgr = require("debug")("development:mongoose");

main()
  .then(dbgr("connected to db"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(`${config.get("MONGO_URI")}/anshu`);
}
module.exports = main;

//  $env:NODE_ENV = 'development'  -------- for proces.env.NODE_ENV
// $env:DEBUG='development:*'
// npm i debug config
