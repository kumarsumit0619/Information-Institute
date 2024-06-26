import classes from "./Form.module.css";
import { useState } from "react";

const INITIAL_VALUE = {
  name: "",
  age: "",
  contactNo: "",
  email: "",
  city: "",
  state: "",
};
let errorsObj = {};

export default function Form() {
  const [formData, setFormData] = useState(INITIAL_VALUE); //{}
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validateValues = (inputValues, targetElem) => {
    if (targetElem != "") {
      errorsObj = errorsObj;
      let elemValue = targetElem.value;
      let elemName = targetElem.name;
      if (!elemValue.trim()) {
        errorsObj[elemName] = elemName + " cannot empty";
      } else {
        delete errorsObj[elemName];
      }
    } else {
      errorsObj = {};
      if (!inputValues.name) {
        errorsObj.name = "Name cannot be empty";
      }
      if (!inputValues.age) {
        errorsObj.age = "Age cannot be empty";
      }
      if (!inputValues.studentId) {
        errorsObj.studentId = "Student Id cannot be empty";
      }
      if (!inputValues.contactNo) {
        errorsObj.contactNo = "Contact Number cannot be empty";
      }
      if (inputValues.email.length < 15) {
        errorsObj.email = "Email is too short";
      }
      if (!inputValues.city) {
        errorsObj.city = "City cannot be empty";
      }
      if (!inputValues.state) {
        errorsObj.state = "State cannot be empty";
      }
    }
    return errorsObj;
  };

  function changeHandler(event) {
    const { value, name } = event.target; //{name:'dsd",value:"dfdf", id:"dgfg"}
    // if (!value.trim()) {
    //   return;
    // }
    //console.log(event.target);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    let validateVals = validateValues(
      { ...formData, [name]: value },
      event.target
    );
    setErrors(validateVals);
    setSubmitting(true);
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    debugger;
    console.log("submit button clicked");
    console.log("----------formData-----------", formData);
    try {
      if (Object.keys(errors).length === 0 && submitting) {
        const resp = await fetch("http://localhost:5000/api/addStudent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        // const da = await resp.json();
        // console.log(da);//same as formData
        setFormData(INITIAL_VALUE);
        e.target.reset();
        console.log("Added a new student data to MongoDB");
      } else {
        let submitValidateVals = validateValues(formData, "");
        setErrors(submitValidateVals);
        //setErrors(validateValues(formData));
        setSubmitting(true);
      }
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
                defaultValue={formData.name}
                onChange={changeHandler}
              />
            </div>
            {
              <div className={classes["error-row"]}>
                <label className={classes["dummylabel"]}></label>
                {errors.name ? (
                  <p className={classes["error"]}>Name cannot be empty</p>
                ) : null}
              </div>
            }

            <div className={classes["form-row"]}>
              <label htmlFor="age"> Age </label>
              <input
                id="age"
                type="number"
                name="age"
                defaultValue={formData.age}
                onChange={changeHandler}
              />
            </div>
            {
              <div className={classes["error-row"]}>
                <label className={classes["dummylabel"]}></label>
                {errors.age ? (
                  <p className={classes["error"]}>Age cannot be empty</p>
                ) : null}
              </div>
            }

            {/* <div className={classes["form-row"]}>
              <label htmlFor="studentid">Student ID</label>
              <input
                id="studentid"
                type="number"
                name="studentId"
                defaultValue={formData.studentId}
                onChange={changeHandler}
              />
            </div> */}
            {/* {
              <div className={classes["error-row"]}>
                <label className={classes["dummylabel"]}></label>
                {errors.studentId ? (
                  <p className={classes["error"]}>Student Id cannot be empty</p>
                ) : null}
              </div>
            } */}
            <div className={classes["form-row"]}>
              <label htmlFor="contactno">Contact No.</label>
              <input
                id="contactno"
                type="number"
                name="contactNo"
                defaultValue={formData.contactNo}
                onChange={changeHandler}
              />
            </div>
            {
              <div className={classes["error-row"]}>
                <label className={classes["dummylabel"]}></label>
                {errors.contactNo ? (
                  <p className={classes["error"]}>Contact No cannot be empty</p>
                ) : null}
              </div>
            }
            <div className={classes["form-row"]}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                defaultValue={formData.email}
                onChange={changeHandler}
              />
            </div>
            {
              <div className={classes["error-row"]}>
                <label className={classes["dummylabel"]}></label>
                {errors.email ? (
                  <p className={classes["error"]}>Email cannot be empty</p>
                ) : null}
              </div>
            }
            <div className={classes["form-row"]}>
              <label htmlFor="city">City</label>
              <input
                id="city"
                type="text"
                name="city"
                defaultValue={formData.city}
                onChange={changeHandler}
              />
            </div>
            {
              <div className={classes["error-row"]}>
                <label className={classes["dummylabel"]}></label>
                {errors.city ? (
                  <p className={classes["error"]}>City cannot be empty</p>
                ) : null}
              </div>
            }

            <div className={classes["form-row"]}>
              <label htmlFor="state">State</label>
              <input
                id="state"
                type="text"
                name="state"
                defaultValue={formData.state}
                onChange={changeHandler}
              />
            </div>
            {
              <div className={classes["error-row"]}>
                <label className={classes["dummylabel"]}></label>
                {errors.state ? (
                  <p className={classes["error"]}>State cannot be empty</p>
                ) : null}
              </div>
            }
            <div className={classes["button-wrapper"]}>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
