import { useState, useRef, useEffect, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import Stack from "@mui/material/Stack";

function TodoList() {
  const [todo, setTodo] = useState({
    description: "",
    date: null,
    priority: "",
  });
  const [todos, setTodos] = useState([]);
  const gridRef = useRef();

  const inputChanged = (event) => {
    setTodo({ ...todo, [event.target.name]: event.target.value });
  };

  const addTodo = () => {
    setTodos([...todos, todo]);
    setTodo({ description: "", date: null, priority: "" });
  };

  const deleteTodo = useCallback(() => {
    const selectedNodes = gridRef.current.getSelectedNodes();
    if (selectedNodes.length > 0) {
      const selectedIds = selectedNodes.map((node) => node.id);
      setTodos(
        todos.filter((todo, index) => !selectedIds.includes(index.toString()))
      );
    } else {
      alert("Select Row First");
    }
  }, [todos]);

  const onGridReady = (params) => {
    gridRef.current = params.api;
    document.addEventListener("keydown", handleKeyDown);
  };

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Delete") {
        deleteTodo();
      }
    },
    [deleteTodo]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const dateFormatter = (params) => {
    return params.value ? dayjs(params.value).format("DD.MM.YYYY") : "";
  };

  const columns = [
    { field: "description", sortable: true, filter: true },
    {
      field: "date",
      sortable: true,
      filter: true,
      valueFormatter: dateFormatter,
    },
    { field: "priority", sortable: true, filter: true },
  ];

  return (
    <div>
      <Stack
        direction={"row"}
        spacing={2}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <TextField
          label="Description"
          variant="outlined"
          type="text"
          onChange={inputChanged}
          placeholder="Description"
          name="description"
          value={todo.description}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date"
            onChange={(date) => setTodo({ ...todo, date })}
            value={todo.date}
            format="DD.MM.YYYY"
            defaultValue={dayjs()}
          />
        </LocalizationProvider>
        <TextField
          label="Priority"
          variant="outlined"
          type="text"
          onChange={inputChanged}
          placeholder="Priority"
          name="priority"
          value={todo.priority}
        />
        <Button onClick={addTodo} variant="contained">
          Add
        </Button>
        <Button onClick={deleteTodo} variant="contained" color="error">
          Delete
        </Button>
      </Stack>
      <div
        className="ag-theme-alpine-dark"
        style={{
          height: "800px",
          width: "600px",
          margin: "auto",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        {todos.length > 0 && (
          <AgGridReact
            ref={gridRef}
            onGridReady={onGridReady}
            columnDefs={columns}
            rowData={todos}
            rowSelection="multiple"
            animateRows={true}
          ></AgGridReact>
        )}
      </div>
    </div>
  );
}

export default TodoList;
