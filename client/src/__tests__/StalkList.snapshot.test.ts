import "jest";
import * as React from "react";
import StalkList from "../components/StalkList";
import { MemoryRouter } from "react-router-dom";
import { create } from "react-test-renderer";
import { stalkList } from "../fixtures/fixtures";

describe("StalkList component renders the stalk list correctly", () => {
  it("renders correctly", () => {
    const rendered = create(React.createElement(MemoryRouter, null, React.createElement(StalkList, {sightings: stalkList, onClick: (id: number) => {}})))

    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
