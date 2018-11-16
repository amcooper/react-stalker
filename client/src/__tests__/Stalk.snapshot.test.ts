import * as React from "react";
import Stalk from "../components/Stalk";
import { create } from "react-test-renderer";
import { stalkList } from "../fixtures/fixtures";

const testStalk = stalkList[0];

describe("Stalk component renders the stalk correctly", () => {
  it("renders correctly", () => {
    const rendered = create(React.createElement(Stalk, {item: testStalk}));

    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
