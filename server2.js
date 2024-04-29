import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = 5000;

//trial
mongoose.connect("mongodb://localhost/Students_DB", {
  family: 4,
});
/*M1 Working */
const db = mongoose.connection;
console.log(db.once);

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Test connection to databases"));

/*M2 - Working */
// mongoose
//   .connect("mongodb://localhost/Students_DB")
//   .then(() => console.log("mongo db connected Yeyyyyyyyyy"))
//   .catch((err) => console.log(err));

app.listen(PORT, () => console.log("Test Server Started"));
