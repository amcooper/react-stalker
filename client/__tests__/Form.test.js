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
      const fetch = jest.fn(() => {}); // TODO Use fetch-mock
      const formComponent = mount(
        <Form
          resetAppState={resetSpy}
          getSightings={getSpy}
          isEditForm={false}
          item={null}
        />
      );
      const formInstance = formComponent.instance();
      formComponent.find("input").forEach(node => {
        const name = node.props().name;
        node.simulate("change", {
          target: {
            name,
            value: stalkList[0][name]
          }
        });
      });
      formComponent
        .find("textarea")
        .first()
        .simulate("change", {
          target: { name: "comment", value: stalkList[0].comment }
        });
      const { id, ...stalkData } = stalkList[0];
      expect(formComponent.state()).toEqual(stalkData);

      formComponent.find("input[type='submit']").simulate("click");
    });
  });
});
