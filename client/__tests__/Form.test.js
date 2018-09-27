import React from "react";
import ReactDOM from "react-dom";
import Form from "../src/Form";
import { mount } from "enzyme";
import { stalkList } from "../fixtures/fixtures";

describe("Form component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Form />, div);
  });

  describe("Create form", () => {
    it("enters text and submits form", () => {
      const resetSpy = jest.fn();
      const getSpy = jest.fn();
      const formComponent = mount(
        <Form
          resetAppState={resetSpy}
          getSightings={getSpy}
          isEditForm={false}
          item={null}
        />
      );
      const formInstance = formComponent.instance();
      // formComponent.find("input[name='celebrity']").simulate("change", {target:{value:stalkList[0]["celebrity"]}});
      formComponent
        .find("input")
        .first()
        .simulate("change", { target: { value: stalkList[0]["celebrity"] } });
      console.log(`*****\n* state: `, formComponent.state());
      expect(formComponent.state("celebrity")).to.equal(
        stalkList[0]["celebrity"]
      );
    });
  });
});
