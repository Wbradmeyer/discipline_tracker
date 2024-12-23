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
    description: "Nothing today",
    goalId: "",
    color: "#808080",
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
        console.log(err.response.data.error);
        setError(err.response.data.error);
      });
  };

  return (
    <div>
      <h1>Add a New Entry</h1>
      <form onSubmit={onSubmitHandler} className="form-card">
        {error ? <p style={{ color: "red" }}>{error.message}</p> : null}
        <div className="form-items">
          <label>Date of Entry</label>
          <input type="date" name="date" onChange={handleVals} />
        </div>
        <div className="form-items">
          <label>Day of the Week</label>
          <select
            type="number"
            name="dayOfWeek"
            id="dayOfWeek"
            onChange={handleVals}
          >
            <option value="0">Sunday</option>
            <option value="1">Monday</option>
            <option value="2">Tuesday</option>
            <option value="3">Wednesday</option>
            <option value="4">Thursday</option>
            <option value="5">Friday</option>
            <option value="6">Saturday</option>
          </select>
        </div>
        <div
          className="form-items"
          style={{ display: "flex", alignItems: "center" }}
        >
          <label>Completed</label>
          <input
            type="checkbox"
            name="completed"
            checked={entry.completed}
            onChange={(e) =>
              setEntry({ ...entry, completed: e.target.checked })
            }
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
            value={entry.description}
            onChange={handleVals}
            cols={32}
            rows={4}
          />
        </div>
        <div className="form-items">
          <label>Assigned Goal</label>
          <select name="goalId" onChange={handleVals} id="goal">
            <option value=""> -- Select a Goal -- </option>
            {allGoals.map((goal, index) => (
              <option key={index} value={goal._id}>
                {goal.header}
              </option>
            ))}
          </select>
        </div>
        <div className="form-items">
          <label>Color for Completed</label>
          <input
            type="color"
            name="color"
            value={entry.color}
            onChange={handleVals}
            id="color"
          />
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
