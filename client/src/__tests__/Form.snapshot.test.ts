/// <reference path="../components/interfaces.d.ts" />

import "jest";
import * as React from "react";
import Form from "../components/Form";
import { create } from "react-test-renderer";
import { stalkList } from "../fixtures/fixtures";

describe("Form component renders the form correctly", () => {
  it("create form", () => {
    Date.now = jest.fn(() => 1537963884615);
    const rendered = create(React.createElement(Form, {isEditForm: false, item: null, resetAppState: () => {}, getSightings: () => {}}));

    expect(rendered.toJSON()).toMatchSnapshot();
  });

  it("edit form", () => {
    const rendered = create(React.createElement(Form, {isEditForm: true, item: stalkList[0], resetAppState: () => {}, getSightings: () => {}}));

    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
