import React from "react";
import Stalk from "../src/Stalk";
import renderer from "react-test-renderer";

describe("Stalk component renders the stalk correctly", () => {
  it("renders correctly", () => {
    const testStalk = {
      id: 1,
      celebrity: "Katherine Zellner",
      stalker: "Terrell Devereaux",
      location: "Indianapolis",
      date: new Date("2018-09-20"),
      comment: "Win win win!"
    };

    const rendered = renderer.create(<Stalk item={testStalk} />);

    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
