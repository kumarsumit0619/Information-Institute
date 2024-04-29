import classes from "./TableRow.module.css";

export default function TableRow({
  name,
  age,
  contactNo,
  email,
  city,
  state,
  _id,
  editableRowId,
  onUpdateRowHandler,
  onRowBlurHandler,
  onSaveRowHandler,
  onDeleteRowHandler,
}) {
  const isEditingAllowedFlag = editableRowId === _id;
  const editClass = isEditingAllowedFlag ? "tb-edit-mode" : "tb-non-edit-mode";
  return (
    <tr>
      <td>{name}</td>
      <td>{age}</td>
      <td>
        <input
          id="contactNo"
          type="text"
          name="contactNo"
          className={editClass}
          defaultValue={contactNo}
          onBlur={onRowBlurHandler}
        />
      </td>
      <td>
        <input
          id="email"
          type="text"
          name="email"
          className={editClass}
          defaultValue={email}
          onBlur={onRowBlurHandler}
        />
      </td>
      <td>{city}</td>
      <td>{state}</td>
      <td>
        {!isEditingAllowedFlag && (
          <button
            type="button"
            className={classes["primary"]}
            onClick={() => onUpdateRowHandler(_id)}
          >
            Update
          </button>
        )}
        {isEditingAllowedFlag && (
          <button
            type="button"
            className={classes["primary"]}
            onClick={() => onSaveRowHandler(_id)}
          >
            Save
          </button>
        )}
        <button
          type="button"
          className={classes["danger"]}
          onClick={onDeleteRowHandler}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
