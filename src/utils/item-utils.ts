import type { Item } from "@/services/index";
import { computed } from "vue";

export function getDaysSinceBought(item: Item): number {
  if (!item.bought) return NaN;

  const timeDelta = Date.now() - Date.parse(item.bought);
  return Math.floor(timeDelta / (1000 * 60 * 60 * 24));
}

export function getDaysSinceLastChanged(item: Item) {
  return computed(() => {
    if (!item.lastChanged) return NaN;

    const timeDelta = Date.now() - Date.parse(item.lastChanged);
    return Math.floor(timeDelta / (1000 * 60 * 60 * 24));
  });
}
