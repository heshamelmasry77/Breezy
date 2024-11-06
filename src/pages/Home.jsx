import React from "react";
import Weather from "../components/Weather.jsx";

function Home() {
  return (
    <>
      <h1 className={"bg-amber-300"}>
        Home Page: Main weather search and current location weather display.
      </h1>
      <Weather />
    </>
  );
}

export default Home;
