import { React, useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";

const UpdateEntry = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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
      .get(`http://localhost:8000/api/entries/getOne/${id}`)
      .then((res) => {
        console.log(res);
        setEntry(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleVals = (e) => {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:8000/api/entries/update/${id}`, entry)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data.error.errors.name);
        setError(err.response.data.error.errors.name);
      });
  };

  const handleDelete = (e, id) => {
    axios
      .delete(`http://localhost:8000/api/entries/delete/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    navigate("/");
  };

  return (
    <div>
      <h1>--- Edit Entry ---</h1>
      <form onSubmit={onSubmitHandler} className="form-card">
        {error ? <p style={{ color: "red" }}>{error.message}</p> : null}
        <div className="form-items">
          <label>Date of Entry</label>
          <input
            type="date"
            name="date"
            onChange={handleVals}
            value={entry.date}
          />
        </div>
        <div className="form-items">
          <label>Day of the Week</label>
          <select
            type="number"
            name="dayOfWeek"
            id="dayOfWeek"
            onChange={handleVals}
            value={entry.dayOfWeek}
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
          <button style={{ margin: "0px 5px" }}>Update</button>
          <Link to={"/"} className="back">
            Dashboard
          </Link>
          <button
            className="delete"
            onClick={(e) => handleDelete(e, entry._id)}
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateEntry;
