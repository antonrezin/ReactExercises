import PropTypes from "prop-types";

function TodoTable({ todos, deleteTodo }) {
  return (
    <>
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
                <td>{todo.desc}</td>
                <td>{todo.date}</td>
                <td>
                  <button onClick={() => deleteTodo(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

TodoTable.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      desc: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default TodoTable;
