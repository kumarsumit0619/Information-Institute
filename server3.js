// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

mongoose
  .connect("mongodb://localhost/Students_DB")
  .then(() => console.log("mongo db connected Yeyyyyyyyyy"))
  .catch((err) => console.log(err));

const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
});
const Item = mongoose.model("Item", itemSchema);

//Middleware
// app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
//Routes
app.get("/api/items", async (req, res) => {
  try {
    // const items = await Item.find();
    let data = [
      {
        age: "123",
        city: "wededfe",
        contactNo: "",
        email: "wwd@dwd.in",
        name: "eddce",
        state: "efef",
        studentId: "",
      },
    ];
    console.log("res", res);
    return res.json({ items: res });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ mess: "fdngdfkjghdkjg" });
  }
});

app.post("/api/studentdatapost", async (req, res) => {
  try {
    // const items = await Item.find();
    console.log("data", req);
    const data = req.body;
    console.log("data", data);
    return res.status(201).send({ items: data });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ mess: "fdngdfkjghdkjg" });
  }
});

//Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//////

// const Item = require("./models/Item"); // Create the Item model

// app.get("/api/items", async (req, res) => {
//   try {
//     const items = await Item.find();
//     res.json(items);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server Error");
//   }
// });
