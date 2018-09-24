import React from "react";
import { shallow } from "enzyme";
import Stalk from "../src/Stalk.js";
import stalkList from "../fixtures/fixtures";

const { celebrity, stalker, location, date, comment } = stalkList[0];
console.log(`***** `, stalker, celebrity, stalkList);

describe("Stalk component", () => {
  // This test is rendered moot by the snapshot test!
  it("renders with data", () => {
    const stalk = shallow(<Stalk item={stalkList[0]} />);
    console.log(`***** `, stalker, celebrity, stalkList);
    const stalkText = new RegExp(
      `<button>edit<\/button><button>delete<\/button>${stalker}\\s*spotted\\s*${celebrity}\\s*on\\s*${date.toDateString()}\\s*in\\s*${location}\\s*: &quot;${comment}`
    );
    expect(stalk.html()).toMatch(stalkText);
  });

  it("has working buttons", () => {
    const editSpy = jest.fn();
    const deleteSpy = jest.fn();
    const stalk = shallow(
      <Stalk item={stalkList[0]} onEdit={editSpy} onDelete={deleteSpy} />
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
