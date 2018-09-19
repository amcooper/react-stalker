import React from "react";
import ReactDOM from "react-dom";
import Form from "../src/Form";

describe("Form component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Form />, div);
  });
});
