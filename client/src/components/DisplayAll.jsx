import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const DisplayAll = () => {
  const navigate = useNavigate();
  const [allGoals, setAllGoals] = useState([]);
  const [allEntries, setAllEntries] = useState([]);
  const daysOfWeek = ["S", "M", "T", "W", "Th", "F", "S"];
  const [hoveredId, setHoveredId] = useState(null);

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

  const showDate = (e, entryId) => {
    setHoveredId(entryId);
  };

  const hideDate = () => {
    setHoveredId(null);
  };

  return (
    <div>
      <h1>--- My Goals ---</h1>
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
          <div className="header-card">
            <h2>{thisGoal.header}</h2>
            <p>{thisGoal.intent}</p>
          </div>
          <div className="tracker-box">
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
                    onMouseOver={() => showDate(thisEntry._id)}
                    onMouseOut={hideDate}
                  >
                    {daysOfWeek[thisEntry.dayOfWeek]}
                  </Link>
                  {hoveredId === thisEntry._id && (
                    <p className="popup">{thisEntry.date}</p>
                  )}
                </div>
              ))}
          </div>
          <button
            className="delete"
            onClick={(e) => handleDelete(e, thisGoal._id)}
          >
            Delete
          </button>
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
