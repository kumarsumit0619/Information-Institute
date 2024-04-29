import classes from "./Form.module.css";

import { useState } from "react";

const INITIAL_VALUES = {
  name: "",
  age: "",
  contactNo: "",
  email: "",
  city: "",
  state: "",
};

export default function Form() {
  const [formData, setFormData] = useState(INITIAL_VALUES); //{}

  function blurHandler(event) {
    const { value, name } = event.target; //{name:'dsd",value:"dfdf", id:"dgfg"}
    if (!value.trim()) {
      return;
    }
    console.log(event.target);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    debugger;
    console.log("submit button clicked");
    console.log("----------formData-----------", formData);
    try {
      const resp = await fetch("http://localhost:5000/api/addStudent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      // const da = await resp.json();
      // console.log(da);//same as formData
      setFormData({ ...INITIAL_VALUES });
      console.log("Added a new student data to MongoDB");
    } catch (err) {
      console.error("Failed to add student to MongoDB: " + err);
    }
  };
  return (
    <>
      <div className={classes["form-main-wrapper"]}>
        <div className={classes["form-wrapper"]}>
          <div className={classes["form-title"]}>
            Fill this form to add new students
          </div>
          <form onSubmit={handleFormSubmit}>
            <div className={classes["form-row"]}>
              <label htmlFor="name">Name </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onBlur={blurHandler}
              />
            </div>

            <div className={classes["form-row"]}>
              <label htmlFor="age"> Age </label>
              <input
                id="age"
                type="number"
                name="age"
                value={formData.age}
                onBlur={blurHandler}
              />
            </div>

            {/* <div className={classes["form-row"]}>
              <label htmlFor="studentid">Student ID</label>
              <input
                id="studentid"
                type="number"
                name="studentId"
                value={formData.studentId}
                onBlur={blurHandler}
              />
            </div> */}
            <div className={classes["form-row"]}>
              <label htmlFor="contactno">Contact No.</label>
              <input
                id="contactno"
                type="number"
                name="contactNo"
                value={formData.contactNo}
                onBlur={blurHandler}
              />
            </div>
            <div className={classes["form-row"]}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onBlur={blurHandler}
              />
            </div>
            <div className={classes["form-row"]}>
              <label htmlFor="city">City</label>
              <input
                id="city"
                type="text"
                name="city"
                value={formData.city}
                onBlur={blurHandler}
              />
            </div>
            <div className={classes["form-row"]}>
              <label htmlFor="state">State</label>
              <input
                id="state"
                type="text"
                name="state"
                value={formData.state}
                onBlur={blurHandler}
              />
            </div>
            <div className={classes["button-wrapper"]}>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
