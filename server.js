import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const app = express();
const PORT = 5000;

// mongoose
//   .connect("mongodb://localhost/Students_DB", { family: 4 })
//   .then(() => console.log("mongo db connected Yeyyyyyyyyy"))
//   .catch((err) => console.log(err));
(async () => {
  try {
    await mongoose.connect("mongodb://localhost/Students_DB", { family: 4 });
    console.log("MongoDB connected Yeh😎");
  } catch (err) {
    console.error("Connection to MongoDB failed : " + err);
  }
})();

const itemSchema = new mongoose.Schema({
  name: String,
  age: Number,
  contactNo: Number,
  email: String,
  city: String,
  state: String,
});
const ItemModel = mongoose.model("item", itemSchema);
//Middleware
app.use(express.json());
app.use(cors());

//Routes
app.get("/api/item", async (req, res) => {
  try {
    const itemsData = await ItemModel.find();
    // console.log(itemsData);
    return res.json(itemsData);
  } catch (error) {
    console.error("Failed to fetch data : " + error);
    return res.status(500).send({ mess: "GET method Failed!!!" }); //don't know when this msg will be printed
  }
});

// Adding new row to Db when submit btn is clicked
app.post("/api/addStudent", async (req, res) => {
  try {
    const data = req.body;
    await mongoose.model("item").create(data);
    console.log("1 row inserted");
    return res.status(201).send(data);
  } catch (error) {
    console.error("Failed to create new student in DB" + error);
    return res.status(500).send({ mess: "Post method failed!!!" }); //don't know how to get these
  }
});

app.delete("/api/delete/:id", async (req, res) => {
  try {
    await mongoose.model("item").findByIdAndDelete(req.params.id);
    console.log("1 row deleted");
    return res.status(201).json({
      message: `${req.params.id} Student deleted successfully😀`,
    });
  } catch (err) {
    return res.status(500).send({ mess: "Delete method failed!!!" });
  }
});

//UPDATING the data
app.put("/api/update/:id", async (req, res) => {
  try {
    //debugger;
    const student = await mongoose
      .model("item")
      .findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(student);
    console.log("1 row updated---- from server.js");
  } catch (err) {
    console.dir(err); // print on server console
    return res.status(500).send({ mess: "Update method failed!!!" });
  }
});

//Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
