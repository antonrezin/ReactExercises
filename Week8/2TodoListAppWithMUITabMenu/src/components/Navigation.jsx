import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Home from "./Home";
import TodoList from "./TodoList";

function Navigation() {
  const [value, setValue] = useState("one");

  const handleChange = (event, value) => {
    setValue(value);
  };

  return (
    <div>
      <Tabs value={value} onChange={handleChange}>
        <Tab value="one" label="Home" />
        <Tab value="two" label="Todos" />
      </Tabs>
      {value === "one" && <Home />}
      {value === "two" && <TodoList />}
    </div>
  );
}

export default Navigation;
