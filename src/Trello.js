import React, { useState, useEffect } from "react";
import List from "./List";
import initialData from "./data";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";

const Container = styled.div`
  display: flex;
  padding: 20px;
  overflow: auto;
`;
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  background-color: #e8384f;
  padding: 16px;
`;

const BrandName = styled.h1`
  align-self: center;
  color: white;
`;

const AddListContainer = styled.div`
  align-self: center;
  padding-left: 30px;
  display: flex;
  gap: 20px;
`;

const AddListButton = styled.button`
  padding: 8px 16px 8px 16px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 600;
  background-color: white;
  cursor: pointer;
  :hover {
    background-color: #0390fc;
    color: white;
  }
`;

const AddTodoInput = styled.input``;

const Trello = () => {
  const intialState = JSON.parse(localStorage.getItem("board")) || initialData;
  const [board, setBoard] = useState(intialState);
  const [toggleInput, setToggleInput] = useState(false);
  const [listName, setListName] = useState("deafult_name");

  useEffect(() => {
    localStorage.setItem("board", JSON.stringify(board));
  });
  // Handle darg and drop
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
        cardIds: newCardIds,
      };
      const newBoard = {
        ...board,
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
      cardIds: startCardIds,
    };
    let finishCardIds = [draggableId, ...Array.from(finish.cardIds)];

    // finishCardIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finish,
      cardIds: finishCardIds,
    };

    const newBoard = {
      ...board,
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
    // TODO : Proper form Validation and Error message can added
    if (listName) {
      const listId = `list-${board["listOrder"].length + 1}`;
      const newList = {
        id: listId,
        title: listName,
        cardIds: [],
      };
      const newListOrder = [...board["listOrder"]];
      newListOrder.push(listId);
      const newBoard = { ...board };
      newBoard["listOrder"] = newListOrder;
      newBoard["lists"][listId] = newList;
      setBoard(newBoard);
    }
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
      description: cardDetails.description,
    };

    const newBoard = { ...board };
    const newCardIds = [...newBoard["lists"][listId]["cardIds"], newCardId];

    const newCards = {
      ...newBoard["cards"],
      [newCard.id]: newCard,
    };

    const newList = {
      ...newBoard["lists"][listId],
      cardIds: newCardIds,
    };
    newBoard["lists"][listId] = newList;
    newBoard["cards"] = newCards;
    newBoard["cardIdMaker"] += 1;

    setBoard(newBoard);
  };
  // Delete A card
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
      <Nav>
        <BrandName className="nav-title">Trello</BrandName>
        <AddListContainer>
          <AddListButton
            className="add-list-btn"
            onClick={() => setToggleInput(!toggleInput)}
          >
            {toggleInput ? "Cancel" : "Add List"}
          </AddListButton>
          {toggleInput ? (
            <AddTodoInput
              autoFocus
              type="text"
              onChange={(e) => setListName(e.target.value)}
              value={listName}
              onKeyPress={handleKeyPress}
            />
          ) : null}
        </AddListContainer>
      </Nav>
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
