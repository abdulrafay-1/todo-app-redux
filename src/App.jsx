import "./App.css";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  deleteTodo,
  editTodo,
} from "./config/redux/reducers/todoSlice";
const App = () => {
  const input = useRef();
  const [edit, setEdit] = useState(null);
  //data bulane ke liye
  const selector = useSelector((state) => state.todos.todos);
  console.log(selector);

  //data bhejny ke liye
  const dispatch = useDispatch();

  const addData = (e) => {
    e.preventDefault();
    if (input.current.value.trim()) {
      if (edit) {
        dispatch(
          editTodo({
            id: edit.id,
            title: input.current.value,
          })
        );
        setEdit(null);
        input.current.value = "";
        return;
      }
      dispatch(
        addTodo({
          title: input.current.value,
        })
      );
      input.current.value = "";
    } else {
      input.current.value = "";
      setEdit(null);
    }
  };

  const deleteData = (id) => {
    dispatch(deleteTodo({ id: id }));
    console.log(id);
  };

  const editData = (item) => {
    setEdit(item);
    input.current.value = item.title;
    input.current.select();
  };

  return (
    <>
      <div style={styles.container}>
        <h1 style={styles.title}>Todo App</h1>
        <form onSubmit={(e) => addData(e)} style={styles.form}>
          <input type="text" required ref={input} style={styles.input} />
          <button type="submit" style={styles.button}>
            {edit ? "Edit" : "Submit"}
          </button>
        </form>
        <div style={styles.listContainer}>
          <ul style={styles.list}>
            {selector.map((item) => (
              <li key={item.id} style={styles.listItem}>
                <span>{item.title}</span>
                <div>
                  <button
                    onClick={() => editData(item)}
                    style={styles.editButton}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteData(item.id)}
                    style={styles.deleteButton}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    backgroundColor: "#f4f4f9",
    padding: "20px",
    minHeight: "100vh",
  },
  title: {
    color: "#333",
    fontSize: "2rem",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginRight: "10px",
  },
  button: {
    padding: "10px 15px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  listContainer: {
    textAlign: "left",
    maxWidth: "400px",
    margin: "0 auto",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginBottom: "10px",
    backgroundColor: "#fff",
  },
  editButton: {
    padding: "5px 10px",
    marginRight: "5px",
    fontSize: "14px",
    color: "#fff",
    backgroundColor: "#28a745",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "5px 10px",
    fontSize: "14px",
    color: "#fff",
    backgroundColor: "#dc3545",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
  },
};

export default App;
