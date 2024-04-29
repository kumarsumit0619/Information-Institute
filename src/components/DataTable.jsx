import { useEffect, useState } from "react";
import axios from "axios";

import classes from "./DataTable.module.css";
import TableRow from "./TableRow";
/*
const DUMMY_DATA = [
  {
    name: "John Doe",
    age: 24,
    contactNo: 9956564545,
    email: "john.doe@gmail.com",
    city: "Pune",
    state: "Maharashtra",
  },
  {
    name: "Kelly James",
    age: 26,
    contactNo: 8899445562,
    email: "kelly.james@gmail.com",
    city: "Bangaluru",
    state: "Karnataka",
  },
  {
    name: "Allen Copper",
    age: 21,
    contactNo: 8976453325,
    email: "allen.copper@gmail.com",
    city: "Hyderabad",
    state: "Telangana",
  },
];
*/

export default function DataTable() {
  const [tableData, setTableData] = useState([]);
  const [editableRowId, setEditableRowId] = useState(null);

  async function fetchStudentsData() {
    // axios
    //   .get("http://localhost:5000/api/item1")
    //   .then((resp) => {
    //     const data = resp?.data?.response;
    //     setTableData(data);
    //   })
    // .catch((error) => console.log(error));
    try {
      const resp = await fetch("http://localhost:5000/api/item", {
        method: "GET",
      });
      const data = await resp.json();
      setTableData(data);
    } catch (error) {
      console.error("Fetching students data failed :" + error);
    }
  }

  useEffect(() => {
    fetchStudentsData();
  }, []);

  function updateRowHandler(id) {
    //console.log(id);
    setEditableRowId(id);
  }

  async function saveRowHandler(id) {
    //console.log(id);
    //debugger;
    let updatedDataRow = tableData.filter((item) => item._id === id)[0]; //{}
    try {
      const response = await fetch(`http://localhost:5000/api/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedDataRow),
      });
      //const data = await response.json();
      //console.log(data);
    } catch (error) {
      console.error(
        `Failed to update student row with id as ${id} => ${error}`
      );
    }
    setEditableRowId(null);
  }

  function rowBlurHandler(event, id) {
    debugger;
    let { name, value } = event.target;
    //console.log("row unblured" + event.target.value);
    const newTableData = [...tableData];
    newTableData.filter((item) => item._id === id)[0][name] = value; //{}
    setTableData(newTableData);
  }

  async function deleteRowHandler(id) {
    try {
      debugger;
      const resp = await fetch(`http://localhost:5000/api/delete/${id}`, {
        method: "DELETE",
      });
      // const da = await resp.json();
      // console.log(da.message); //`${req.params.id} Student deleted successfully😀`
      fetchStudentsData();
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <table
      className={classes["dataTable"]}
      cellSpacing="0"
      cellPadding="0"
      border="0"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Contact No</th>
          <th>Email</th>
          <th>City</th>
          <th>State</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {Boolean(tableData) &&
          tableData.map((item) => (
            <TableRow
              {...item}
              key={item._id}
              editableRowId={editableRowId}
              onUpdateRowHandler={updateRowHandler}
              onSaveRowHandler={() => saveRowHandler(item._id)}
              onRowBlurHandler={(event) => rowBlurHandler(event, item._id)}
              onDeleteRowHandler={() => deleteRowHandler(item._id)}
            />
          ))}
      </tbody>
    </table>
  );
}
