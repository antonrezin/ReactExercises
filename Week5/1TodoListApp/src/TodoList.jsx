import { useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [desc, setDesc] = useState("");
  const [date, setDates] = useState("");

  const addTodo = () => {
    setTodos([...todos, { desc, date }]);
    setDesc("");
    setDates("");
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
      {todos.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => (
              <tr key={index}>
                {<td>{todo.desc}</td>}
                <td>{todo.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TodoList;
