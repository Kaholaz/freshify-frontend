import { beforeEach, describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";

import ItemCard from "../ItemCard.vue";
import type { Item } from "@/services/index";
import { ItemState } from "@/services/index";

let item: Item = {};

// Reset the item before each run
beforeEach(() => {
  item = {
    id: 1,
    state: ItemState.INVENTORY,
    remaining: 2,
    bought: "2023-04-21",
    suggested: true,
    type: {
      id: 123,
      name: "Milk",
    },
    addedBy: {
      id: 10,
      email: "test@test.com",
      firstName: "Joe",
    },
  } as Item;
});

describe("ItemCard", () => {
  it("has item name in title", () => {
    const wrapper = mount(ItemCard as any, {
      props: {
        item,
      },
    });
    expect(wrapper.text()).toContain(item.type?.name);
    return true;
  });

  it("has days since added in subtitle", () => {
    const wrapper = mount(ItemCard as any, {
      props: {
        item,
      },
    });

    const days = Math.floor(
      (new Date().getTime() - new Date(item.bought!).getTime()) / (1000 * 3600 * 24)
    );

    expect(wrapper.text()).toContain(`${days} dager siden.`);
  });

  it("has button to use item", () => {
    const wrapper = mount(ItemCard as any, {
      props: {
        item,
      },
    });
    expect(wrapper.find("#use-button").text()).toContain("Bruk");
  });

  it("has button to delete item", () => {
    const wrapper = mount(ItemCard as any, {
      props: {
        item,
      },
    });
    expect(wrapper.find("#delete-button").text()).toContain("Slett");
  });
});
