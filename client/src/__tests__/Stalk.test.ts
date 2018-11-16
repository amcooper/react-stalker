import * as React from "react";
import { shallow } from "enzyme";
import Stalk from "../components/Stalk";
import { stalkList } from "../fixtures/fixtures";

describe("Stalk component", () => {
  it("has working buttons", () => {
    const editSpy = jest.fn();
    const deleteSpy = jest.fn();
    const stalk = shallow( React.createElement(Stalk, {item: stalkList[0], onEdit: editSpy, onDelete: deleteSpy}));
    const editButton = stalk.findWhere(
      n => n.type() === "button" && n.text() === "edit"
    );
    editButton.simulate("click");
    expect(editSpy).toHaveBeenCalledTimes(1);
    const deleteButton = stalk.findWhere(
      n => n.type() === "button" && n.text() === "delete"
    );
    deleteButton.simulate("click");
    expect(deleteSpy).toHaveBeenCalledTimes(1);
  });
});
