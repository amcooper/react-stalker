import * as React from "react";
import * as Form from "../components/Form";
import { MemoryRouter } from "react-router-dom";
// import renderer from "react-test-renderer";
import { create } from "react-test-renderer";
// import * as renderer from "react-test-renderer";
import { stalkList } from "../fixtures/fixtures";
import * as jest  from "jest";

describe("Form component renders the form correctly", () => {
  it("create form", () => {
    Date.now = jest.fn(() => 1537963884615);
    const rendered = create(<Form isEditForm={false} item={null} />);

    expect(rendered.toJSON()).toMatchSnapshot();
  });

  it("edit form", () => {
    const rendered = create(
      <Form isEditForm={true} item={stalkList[0]} />
    );

    expect(rendered.toJSON()).toMatchSnapshot();
  });
});