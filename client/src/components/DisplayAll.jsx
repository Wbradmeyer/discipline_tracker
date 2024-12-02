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

  return (
    <div>
      <h1>My Goals</h1>
      <div>Goal 1</div>
      <div>Goal 2</div>
      <div>Goal 3</div>
      <div>Goal 4</div>
      <div>
        <button>
          <Link to={"/goals/create"}>+ New Goal</Link>
        </button>
      </div>
    </div>
  );
};

export default DisplayAll;
