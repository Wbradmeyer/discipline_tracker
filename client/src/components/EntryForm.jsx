import { React, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const EntryForm = () => {
  const navigate = useNavigate();
  const [entry, setEntry] = useState({
    date: "",
    dayOfWeek: "",
    completed: false,
    description: "",
    goalId: "",
  });
  const [error, setError] = useState({});

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
    </div>
  );
};

export default EntryForm;
