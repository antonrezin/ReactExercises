import { useState, useRef, useEffect, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

function TodoList() {
  const [todo, setTodo] = useState({ description: "", date: "", priority: "" });
  const [todos, setTodos] = useState([]);
  const gridRef = useRef();

  const inputChanged = (event) => {
    setTodo({ ...todo, [event.target.name]: event.target.value });
  };

  const addTodo = () => {
    setTodos([...todos, todo]);
    setTodo({ description: "", date: "", priority: "" });
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

  const columns = [
    { field: "description", sortable: true, filter: true },
    { field: "date", sortable: true, filter: true },
    { field: "priority", sortable: true, filter: true },
  ];

  return (
    <div>
      <label>Description: </label>
      <input
        type="text"
        onChange={inputChanged}
        placeholder="Description"
        name="description"
        value={todo.description}
      />
      <label>Date: </label>
      <input
        type="date"
        onChange={inputChanged}
        placeholder="Date"
        name="date"
        value={todo.date}
      />
      <label>Priority: </label>
      <input
        type="text"
        onChange={inputChanged}
        placeholder="Priority"
        name="priority"
        value={todo.priority}
      />
      <button onClick={addTodo}>Add</button>
      <button onClick={deleteTodo}>Delete</button>
      <div
        className="ag-theme-alpine-dark"
        style={{
          height: "800px",
          width: "602px",
          margin: "auto",
          alignItems: "center",
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
