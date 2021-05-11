import React, { useState } from "react";
import List from "./List";
import initialData from "./data";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";

const Container = styled.div`
  display: flex;
`;

const Trello = () => {
  const [board, setBoard] = useState(initialData);
  const [toggleInput, setToggleInput] = useState(false);
  const [listName, setListName] = useState("deafult_name");
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const start = board["lists"][source.droppableId];
    const finish = board["lists"][destination.droppableId];

    if (start === finish) {
      const newCardIds = Array.from(start.cardIds);
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);
      const newList = {
        ...start,
        cardIds: newCardIds
      };
      const newBoard = {
        ...board
      };
      newBoard["lists"][newList.id] = newList;
      setBoard(newBoard);
      return;
    }

    // // Moving from one list to another
    const startCardIds = Array.from(start.cardIds);
    startCardIds.splice(source.index, 1);
    const newStart = {
      ...start,
      cardIds: startCardIds
    };
    const finishCardIds = Array.from(finish.cardIds);
    finishCardIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finish,
      cardIds: finishCardIds
    };

    const newBoard = {
      ...board
    };

    newBoard["lists"][newStart.id] = newStart;
    newBoard["lists"][newFinish.id] = newFinish;
    setBoard(newBoard);
  };
  // Handle Key press function
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addList(listName);
      setListName("");
      setToggleInput(false);
    }
  };

  // Adds a list
  const addList = (listName) => {
    const listId = `list-${board["listOrder"].length + 1}`;
    const newList = {
      id: listId,
      title: listName,
      cardIds: []
    };
    const newListOrder = [...board["listOrder"]];
    newListOrder.push(listId);
    const newBoard = { ...board };
    newBoard["listOrder"] = newListOrder;
    newBoard["lists"][listId] = newList;
    setBoard(newBoard);
  };

  // Delete a list
  const deleteList = (listId) => {
    const newListOrder = board["listOrder"].filter((id) => id !== listId);
    const newBoard = { ...board };
    const listToBeRemoved = board["lists"][listId];
    if (listToBeRemoved["cardIds"].length) {
      for (let cardId of listToBeRemoved["cardIds"]) {
        delete newBoard["cards"][cardId];
      }
    }
    newBoard["listOrder"] = newListOrder;
    delete newBoard["lists"][listId];
    setBoard(newBoard);
  };

  // Add a card
  const addCard = (listId, cardDetails) => {
    let newCardId = `card-${board["cardIdMaker"] + 1}`;
    const newCard = {
      id: newCardId,
      title: cardDetails.title,
      description: cardDetails.description
    };

    const newBoard = { ...board };
    const newCardIds = [...newBoard["lists"][listId]["cardIds"], newCardId];

    const newCards = {
      ...newBoard["cards"],
      [newCard.id]: newCard
    };

    const newList = {
      ...newBoard["lists"][listId],
      cardIds: newCardIds
    };
    newBoard["lists"][listId] = newList;
    newBoard["cards"] = newCards;
    newBoard["cardIdMaker"] += 1;

    setBoard(newBoard);
  };

  const deleteCard = (listId, cardId) => {
    console.log(listId, cardId);
    let newCardIds = board["lists"][listId]["cardIds"].filter(
      (id) => id !== cardId
    );
    const newBoard = { ...board };
    newBoard["lists"][listId]["cardIds"] = newCardIds;
    delete newBoard["cards"][cardId];
    setBoard(newBoard);
  };

  return (
    <div>
      <nav>
        <h1 className="nav-title">Trello</h1>
        <button className="add-list-btn" onClick={() => setToggleInput(true)}>
          Add List
        </button>
        {toggleInput ? (
          <div>
            <input
              type="text"
              onChange={(e) => setListName(e.target.value)}
              value={listName}
              onKeyPress={handleKeyPress}
            />
          </div>
        ) : null}
      </nav>
      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          {board.listOrder.map((listId) => {
            const list = board["lists"][listId];
            const cards = list.cardIds.map((cardId) => board["cards"][cardId]);

            return (
              <List
                key={list.id}
                list={list}
                cards={cards}
                deleteList={deleteList}
                addCard={addCard}
                deleteCard={deleteCard}
              />
            );
          })}
        </Container>
      </DragDropContext>
    </div>
  );
};

export default Trello;
