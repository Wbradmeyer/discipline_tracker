import { React, useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";

const UpdateGoal = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [goal, setGoal] = useState({
    header: "",
    intent: "",
  });
  const [error, setError] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/goals/getOne/${id}`)
      .then((res) => {
        console.log(res);
        setGoal(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleVals = (e) => {
    setGoal({ ...goal, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:8000/api/goals/update/${id}`, goal)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data.error.errors.name);
        setError(err.response.data.error.errors.name);
      });
  };

  return (
    <div>
      <h1>Edit Goal</h1>
      <form onSubmit={onSubmitHandler} className="form-card">
        {error ? <p style={{ color: "red" }}>{error.message}</p> : null}
        <div className="form-items">
          <label>Header:</label>
          <input
            type="text"
            name="header"
            onChange={handleVals}
            value={goal.header}
          />
        </div>
        <div className="form-items">
          <label>Intent Statement (what and target frequency):</label>
          <input
            type="text"
            name="intent"
            onChange={handleVals}
            value={goal.intent}
          />
        </div>
        <div className="form-items">
          <button style={{ margin: "0px 5px" }}>Edit</button>
          <Link to={"/"} className="back">
            Dashboard
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UpdateGoal;
