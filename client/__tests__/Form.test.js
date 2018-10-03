import React from "react";
import ReactDOM from "react-dom";
import { mount } from "enzyme";
import fetchMock from "fetch-mock";
import Form from "../src/Form";
import config from "../src/config";
import { stalkList } from "../fixtures/fixtures";

describe("Form component", () => {
  describe("Create form", () => {
    it("enters text and submits form", () => {
      const resetSpy = jest.fn();
      const getSpy = jest.fn();
      fetchMock.post(
        config.apiURL.development,
        new Promise(resolve => {
          resetSpy();
          getSpy();
          return resolve(stalkList[0]);
        }),
        { name: "sightingspost" }
      );
      const formComponent = mount(
        <Form
          resetAppState={resetSpy}
          getSightings={getSpy}
          isEditForm={false}
          item={null}
        />
      );
      const formInstance = formComponent.instance(); // spurious?
      jest.spyOn(formInstance, "handleSubmit");
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

      console.log(formComponent.find("input[type='submit']").html());
      formComponent
        .find("input[type='submit']")
        .simulate("click", { preventDefault: () => {} });
      // expect(formComponent.find("form").props().handleSubmit).toHaveBeenCalledTimes(1);
      expect(formInstance.handleSubmit).toHaveBeenCalled();
      expect(resetSpy).toHaveBeenCalledTimes(1);
      expect(getSpy).toHaveBeenCalledTimes(1);
      console.log(
        `*****\n* `,
        fetchMock.calls(undefined, { name: "sightingspost" })
      );
    });
  });
});
