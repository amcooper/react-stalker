import React from "react";
import Form from "../src/Form";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { stalkList } from "../fixtures/fixtures";

describe("Form component renders the form correctly", () => {
  it("create form", () => {
    Date.now = jest.fn(() => 1537963884615);
    const rendered = renderer.create(<Form isEditForm={false} item={null} />);

    expect(rendered.toJSON()).toMatchSnapshot();
  });

  it("edit form", () => {
    const rendered = renderer.create(
      <Form isEditForm={true} item={stalkList[0]} />
    );

    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
