import React from "react";
import StalkListItem from "../src/StalkListItem";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { stalkList } from "../fixtures/fixtures";

const testStalk = stalkList[0];

describe("StalkListItem component renders a stalk list item correctly", () => {
  it("renders correctly", () => {
    const rendered = renderer.create(
      <MemoryRouter>
        <StalkListItem item={testStalk} />
      </MemoryRouter>
    );

    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
