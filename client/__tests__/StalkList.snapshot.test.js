import React from "react";
import StalkList from "../src/StalkList";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { stalkList } from "../fixtures/fixtures";

describe("StalkList component renders the stalk list correctly", () => {
  it("renders correctly", () => {
    const rendered = renderer.create(
      <MemoryRouter>
        <StalkList sightings={stalkList} />
      </MemoryRouter>
    );

    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
