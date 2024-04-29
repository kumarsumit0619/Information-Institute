import "./App.css";

import { useState } from "react";

import Header from "./components/Header.jsx";
import Form from "./components/Form.jsx";
import DataTable from "./components/DataTable.jsx";

export default function App() {
  const [showForm, setShowForm] = useState(null);

  function updateShowForm(showForm) {
    setShowForm(showForm);
  }
  return (
    <>
      <Header updateShowForm={updateShowForm} />
      {showForm && <Form />}
      {!showForm && <DataTable />}
    </>
  );
}
