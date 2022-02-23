import React from "react";
import './style.css'
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
    const navigate = useNavigate()
  return (
    <div className="html">
      <div className="head">
        <div className="style"></div>
      </div>
      <div className="body">
          <Button type="primary" className="btn" onClick={()=>navigate('/')}>goto back</Button>
      </div>
    </div>
  );
};

export default PageNotFound;
