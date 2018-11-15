import React from "react";
import StalkList from "../components/StalkList";
import { MemoryRouter } from "react-router-dom";
import { create } from "react-test-renderer";
import { stalkList } from "../fixtures/fixtures";

describe("StalkList component renders the stalk list correctly", () => {
  it("renders correctly", () => {
    const rendered = create(
      <MemoryRouter>
        <StalkList sightings={stalkList} />
      </MemoryRouter>
    );

    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
