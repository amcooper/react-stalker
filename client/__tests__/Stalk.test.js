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
  // This test is rendered moot by the snapshot test!
  xit("renders with data", () => {
    const stalk = shallow(<Stalk item={testStalk} />);
    const stalkText = new RegExp(
      `<button>edit<\/button><button>delete<\/button>${stalker}\\s*spotted\\s*${celebrity}\\s*on\\s*${date.toDateString()}\\s*in\\s*${location}\\s*: &quot;${comment}`
    );
    expect(stalk.html()).toMatch(stalkText);
  });

  it("has working buttons", () => {
    const editSpy = jest.fn();
    const deleteSpy = jest.fn();
    const stalk = shallow(
      <Stalk item={testStalk} onEdit={editSpy} onDelete={deleteSpy} />
    );
    const editButton = stalk.findWhere(
      n => n.type() === "button" && n.text() === "edit"
    );
    // console.log("********\n*\n* editButton.html(): ", editButton.html());
    editButton.simulate("click");
    expect(editSpy).toHaveBeenCalledTimes(1);
    const deleteButton = stalk.findWhere(
      n => n.type() === "button" && n.text() === "delete"
    );
    deleteButton.simulate("click");
    expect(deleteSpy).toHaveBeenCalledTimes(1);
  });
});
