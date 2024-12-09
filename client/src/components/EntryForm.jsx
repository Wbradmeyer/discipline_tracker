import { React, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const EntryForm = () => {
  const navigate = useNavigate();
  const [allGoals, setAllGoals] = useState([]);
  const [entry, setEntry] = useState({
    date: "",
    dayOfWeek: "",
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
          <input type="date" name="date" onChange={handleVals} />
        </div>
        <div className="form-items">
          <label>Completed</label>
          <input type="date" name="date" onChange={handleVals} />
        </div>
        <div className="form-items">
          <label>Description</label>
          <textarea name="description" onChange={handleVals} />
        </div>
        <div className="form-items">
          <label>Assigned Goal</label>
          <select name="goalId" onChange={handleVals} />
          {/* loop through all goals, each one list the name, values equals id */}
          {allGoals.map((goal, index) => (
            <option key={index} value={goal._id}>
              {goal.header}
            </option>
          ))}
        </div>
      </form>
    </div>
  );
};

export default EntryForm;
