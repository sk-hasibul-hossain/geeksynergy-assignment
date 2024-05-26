import React from "react";
import "./CompanyInfo.css";

const CompanyInfo = () => {
  return (
    <div className="company-info-outer-container">
      <div className="company-info-inner-container">
        <h2>Company Info</h2>
        <p>
          <span>Company:</span> Geeksynergy Technologies Pvt Ltd
        </p>
        <p>
          <span>Address:</span> Sanjayanagar, Bengaluru-56
        </p>
        <p>
          <span>Phone:</span> XXXXXXXXX09
        </p>
        <p>
          <span>Email:</span> XXXXXX@gmail.com
        </p>
      </div>
    </div>
  );
};

export default CompanyInfo;
