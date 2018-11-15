import * as React from "react";
import Form from "../components/Form";
import { MemoryRouter } from "react-router-dom";
import { create } from "react-test-renderer";
import { stalkList } from "../fixtures/fixtures";

describe("Form component renders the form correctly", () => {
  it("create form", () => {
    Date.now = jest.fn(() => 1537963884615);
    // const rendered = create(<Form isEditForm={false} item={null} />);
    const rendered = create(React.createElement(Form, {isEditForm: false, item: null, getSightings(): void, resetAppState(): void}));

    expect(rendered.toJSON()).toMatchSnapshot();
  });

  it("edit form", () => {
    const rendered = create(<Form isEditForm={true} item={stalkList[0]} />);

    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
