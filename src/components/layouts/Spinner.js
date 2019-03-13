import React from "react";
import spinner from "./spinner.gif";

export default () => {
  return (
    <div>
      <img
        src={spinner}
        alt="loading..."
        style={{ width: "150px", margin: "50px auto", display: "block" }}
      />
    </div>
  );
};
