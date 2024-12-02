import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const DisplayAll = () => {
  return (
    <div>
      <div>Goal 1</div>
      <div>Goal 2</div>
      <div>Goal 3</div>
      <div>Goal 4</div>
    </div>
  );
};

export default DisplayAll;
