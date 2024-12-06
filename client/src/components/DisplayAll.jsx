import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const DisplayAll = () => {
  const [allGoals, setAllGoals] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/goals")
      .then((res) => {
        console.log(res);
        setAllGoals(res.data);
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
      {allGoals.map((thisGoal) => (
        <div key={thisGoal._id} className="card">
          <p>{thisGoal.header}</p>
          <p>{thisGoal.intent}</p>
          <button
            style={{ backgroundColor: "red" }}
            onClick={(e) => handleDelete(e, thisGoal._id)}
          >
            Delete
          </button>
        </div>
      ))}
      <div>
        <button>
          <Link to={"/goals/create"}>+ New Goal</Link>
        </button>
      </div>
    </div>
  );
};

export default DisplayAll;
