import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const DisplayAll = () => {
  const navigate = useNavigate();
  const [allGoals, setAllGoals] = useState([]);
  const [allEntries, setAllEntries] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/goals")
      .then((res) => {
        console.log(res);
        setAllGoals(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/entries")
      .then((res) => {
        console.log(res);
        setAllEntries(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (e, id) => {
    axios
      .delete(`http://localhost:8000/api/goals/delete/${id}`)
      .then((res) => {
        console.log(res);
        const newList = allGoals.filter((goal) => goal._id !== id);
        setAllGoals(newList);
      })
      .catch((err) => console.log(err));
    navigate("/");
  };

  return (
    <div>
      <h1>My Goals</h1>
      <div>
        <button>
          <Link to={"/goals/create"}>+ New Goal</Link>
        </button>
        <button style={{ backgroundColor: "yellow", margin: "5px" }}>
          <Link to={"/entries/create"}>+ New Entry</Link>
        </button>
      </div>
      {allGoals.map((thisGoal) => (
        <div key={thisGoal._id} className="card">
          <h2>{thisGoal.header}</h2>
          <p>{thisGoal.intent}</p>
          <div>
            {allEntries
              .filter((a) => a.goalId == thisGoal._id)
              .map((thisEntry) => (
                <div
                  key={thisEntry._id}
                  className="entry-box"
                  style={{ backgroundColor: thisEntry.color }}
                >
                  <Link
                    to={`entries/update/${thisEntry._id}`}
                    style={{ color: "white" }}
                  >
                    {thisEntry.dayOfWeek}
                  </Link>
                </div>
              ))}
          </div>
          <button className="delete">Delete</button>
          <button style={{ backgroundColor: "blue", margin: "5px" }}>
            <Link
              to={`/goals/update/${thisGoal._id}`}
              style={{ color: "white" }}
            >
              Edit Goal
            </Link>
          </button>
        </div>
      ))}
    </div>
  );
};

export default DisplayAll;
