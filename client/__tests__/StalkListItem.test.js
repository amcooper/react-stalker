import React from "react";
import { MemoryRouter } from "react-router-dom";
import StalkListItem from "../src/StalkListItem";
import { mount } from "enzyme";
import { stalkList } from "../fixtures/fixtures";

describe("StalkListItem component", () => {
  it("Stalk list item's focus button works", () => {
    const spy = jest.fn();
    const stalkListItem = mount(
      <MemoryRouter>
        <StalkListItem
          item={stalkList[0]}
          onClick={() => spy(stalkList[0].id)}
        />
      </MemoryRouter>
    );
    const clickDiv = stalkListItem.find(".StalkListItem");
    clickDiv.simulate("click");
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
