import { Nodes } from "./types";

export const createTwoFlatNodes = (): Nodes => ({
  "1": {
    id: "1",
    text: "Item 1"
  },
  "2": {
    id: "2",
    text: "Item 2"
  }
});

export const createInitialNodes = (): Nodes => ({
  "1": {
    id: "1",
    text: "Item 1",
    children: ["2", "3", "5"]
  },
  "2": {
    id: "2",
    text: "Item 1.1"
  },
  "3": {
    id: "3",
    text: "Item 1.2",
    children: ["4"]
  },
  "4": {
    id: "4",
    text: "Item 1.2.1"
  },
  "5": {
    id: "5",
    text: "Item 1.3"
  },
  "6": {
    id: "6",
    text: "Item 2"
  },
  "7": {
    id: "7",
    text: "Item 3"
  }
});
