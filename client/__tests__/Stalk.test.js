import React from "react";
import { shallow } from "enzyme";
import Stalk from "../src/Stalk.js";

const testStalk = {
  id: 1,
  celebrity: "Katherine Zellner",
  stalker: "Terrell Devereaux",
  location: "Indianapolis",
  date: new Date("2018-09-20"),
  comment: "Win win win!"
};

const { id, celebrity, stalker, location, date, comment } = testStalk;

describe("Stalk component", () => {
  fit("renders with data", () => {
    const stalk = shallow(<Stalk item={testStalk} />);
    const stalkText = new RegExp(`${stalker}.*spotted`); //${celebrity} on ${date} in ${location}: "${comment}"`;
    for (const property in testStalk) {
      const matcher =
        property === "date"
          ? testStalk[property].toDateString()
          : testStalk[property].toString();
      expect(stalk.html()).toMatch(matcher);
    }
  });
});
