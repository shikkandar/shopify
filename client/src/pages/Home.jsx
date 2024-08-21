import React from "react";

const Home = () => {
  return (
    <div>
      {" "}
      <div
        className="lg:tooltip"
        data-tip="hello">
        <button className="btn">Hover me</button>
      </div>
    </div>
  );
};

export default Home;
