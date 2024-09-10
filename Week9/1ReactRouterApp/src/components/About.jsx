import { Link } from "react-router-dom";

export default function About() {
  return (
    <div>
      <h1>I am a Full Stack Software Developer.</h1>
      <h1>
        My links can be found on the <br /> <Link to="/contact">«Contact»</Link>{" "}
        <br /> page.
      </h1>
    </div>
  );
}
