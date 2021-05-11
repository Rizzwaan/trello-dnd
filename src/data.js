const initialData = {
  cards: {
    "card-1": {
      id: "card-1",
      title: "Dummy card 1",
      description: "Dummy description 1",
    },
    "card-2": {
      id: "card-2",
      title: "Dummy card 2",
      description: "Dummy description 2",
    },
    "card-3": {
      id: "card-3",
      title: "Dummy card 3",
      description: "Dummy description 3",
    },
  },
  cardIdMaker: 3,
  lists: {
    "list-1": {
      id: "list-1",
      title: "Dummy List 1",
      cardIds: ["card-1", "card-2", "card-3"],
    },
    "list-2": {
      id: "list-2",
      title: "Dummy List 2",
      cardIds: [],
    },
  },
  listOrder: ["list-1", "list-2"],
};

export default initialData;
