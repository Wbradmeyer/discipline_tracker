import { React, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const EntryForm = () => {
  const navigate = useNavigate();
  const [allGoals, setAllGoals] = useState([]);
  const [entry, setEntry] = useState({
    date: "",
    dayOfWeek: 0,
    completed: false,
    description: "",
    goalId: "",
  });
  const [error, setError] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/goals")
      .then((res) => {
        console.log(res);
        setAllGoals(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleVals = (e) => {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/entries/create", entry)
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
      <h1>Add a New Entry</h1>
      <form onSubmit={onSubmitHandler}>
        {error ? <p style={{ color: "red" }}>{error.message}</p> : null}
        <div className="form-items">
          <label>Date of Entry</label>
          <input type="date" name="date" onChange={handleVals} />
        </div>
        <div className="form-items">
          <label>Day of the Week</label>
          <select type="number" name="dayOfWeek" onChange={handleVals}>
            <option value="1">Sunday</option>
            <option value="2">Monday</option>
            <option value="3">Tuesday</option>
            <option value="4">Wednesday</option>
            <option value="5">Thursday</option>
            <option value="6">Friday</option>
            <option value="7">Saturday</option>
          </select>
        </div>
        <div
          className="form-items"
          style={{ display: "flex", alignItems: "center" }}
        >
          <label style={{ margin: "5px" }}>Completed</label>
          <input
            type="checkbox"
            name="completed"
            value={true}
            onChange={handleVals}
            style={{
              width: "auto",
              height: "auto",
              margin: "7px 5px 4px",
            }}
          />
        </div>
        <div className="form-items">
          <label>Description</label>
          <textarea
            name="description"
            onChange={handleVals}
            cols={32}
            rows={4}
          />
        </div>
        <div className="form-items">
          <label>Assigned Goal</label>
          <select name="goalId" onChange={handleVals}>
            {/* loop through all goals, each one list the name, values equals id */}
            {allGoals.map((goal, index) => (
              <option key={index} value={goal._id}>
                {goal.header}
              </option>
            ))}
          </select>
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

export default EntryForm;
