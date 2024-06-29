import { useState } from "react";
import TodoTable from "./TodoTable";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [desc, setDesc] = useState("");
  const [date, setDates] = useState("");

  const addTodo = () => {
    setTodos([...todos, { desc, date }]);
    setDesc("");
    setDates("");
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((todo, i) => i !== index));
  };

  return (
    <div>
      <label>Description: </label>
      <input
        placeholder="Description"
        type="text"
        value={desc}
        onChange={(event) => setDesc(event.target.value)}
      />
      <label>Date: </label>
      <input
        placeholder="Date"
        type="date"
        value={date}
        onChange={(event) => setDates(event.target.value)}
      />
      <button onClick={addTodo}>Add</button>
      <TodoTable todos={todos} deleteTodo={deleteTodo} />
    </div>
  );
}

export default TodoList;
