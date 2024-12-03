import { React, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const GoalForm = () => {
  const navigate = useNavigate();
  const [goal, setGoal] = useState({
    header: "",
    intent: "",
    entries: [],
  });
  const [error, setError] = useState({});

  const handleVals = (e) => {
    setGoal({ ...goal, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/goals/create", goal)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data.error.errors.name);
        setError(err.response.data.error.errors.name);
      });
  };

  return (
    <div>
      <h1>Add a New Goal</h1>
      <form onSubmit={onSubmitHandler}>
        {error ? <p style={{ color: "red" }}>{error.message}</p> : null}
        <div className="form-items">
          <label>Header:</label>
          <input type="text" name="header" onChange={handleVals} />
        </div>
        <div className="form-items">
          <label>Intent Statement (what and target frequency):</label>
          <input type="text" name="intent" onChange={handleVals} />
        </div>
        <div className="form-items">
          <button style={{ margin: "0px 5px" }}>Create</button>
          <button
            style={{
              margin: "0px 5px",
              backgroundColor: "red",
            }}
          >
            <Link to={"/"} style={{ color: "black" }}>
              Dashboard
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default GoalForm;
