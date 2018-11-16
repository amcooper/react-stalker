import * as React from "react";
import StalkListItem from "../components/StalkListItem";
import { MemoryRouter } from "react-router-dom";
import { create } from "react-test-renderer";
import { stalkList } from "../fixtures/fixtures";

const testStalk = stalkList[0];

describe("StalkListItem component renders a stalk list item correctly", () => {
  it("renders correctly", () => {
    const rendered = create(React.createElement(MemoryRouter, null, React.createElement(StalkListItem, {item: testStalk})));

    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
