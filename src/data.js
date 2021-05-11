const initialData = {
  cards: {
    "card-1": { id: "card-1", title: "Take out", description: "" },
    "card-2": { id: "card-2", title: "Get out", description: "" },
    "card-3": { id: "card-3", title: "Hii", description: "" },
    "card-4": { id: "card-4", title: "Hello", description: "" }
  },
  cardIdMaker: 4,
  lists: {
    "list-1": {
      id: "list-1",
      title: "Todo",
      cardIds: ["card-1", "card-2", "card-3", "card-4"]
    },
    "list-2": {
      id: "list-2",
      title: "Doing",
      cardIds: []
    },
    "list-3": {
      id: "list-3",
      title: "Done",
      cardIds: []
    }
  },
  listOrder: ["list-1", "list-2", "list-3"]
};

export default initialData;
