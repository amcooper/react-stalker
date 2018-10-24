import React from "react";
import Stalk from "../src/Stalk";
import renderer from "react-test-renderer";
import { stalkList } from "../fixtures/fixtures";

const testStalk = stalkList[0];

describe("Stalk component renders the stalk correctly", () => {
  it("renders correctly", () => {
    const rendered = renderer.create(<Stalk item={testStalk} />);

    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
