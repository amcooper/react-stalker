import React from "react";
import ReactDOM from "react-dom";
import Form from "../src/Form";
import { mount } from "enzyme";
import { stalkList } from "../fixtures/fixtures";

describe("Form component", () => {
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
      console.log(
        formComponent
          .find("input")
          .first()
          .html()
      );
      const celebrityInput = formComponent.find("input").first();
      celebrityInput.simulate("change", {
        target: {
          name: celebrityInput.props().name,
          value: stalkList[0]["celebrity"]
        }
      });
      expect(formComponent.state("celebrity")).toEqual(
        stalkList[0]["celebrity"]
      );
    });
  });
});
