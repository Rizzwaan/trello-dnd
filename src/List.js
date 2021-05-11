import React from "react";
import styled from "styled-components";
import Card from "./Card";
import { Droppable } from "react-beautiful-dnd";
const Container = styled.div`
  margin: 8px;
  border: 1px solid black;
  border-radius: 2px;
  width: 220px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  flex-grow: 1;
  min-height: 100px;
  background-color: ${(props) => (props.isDraggingOver ? "skyblue" : "white")};
`;

const DeleteListBtn = styled.button`
  justify-self: center;
  align-self: center;
  border: 0;
  background-color: blue;
  color: white;
  padding: 4px;
  cursor: pointer;
`;

const AddCardButton = styled.button`
  background-color: green;
  color: white;
  padding: 4px;
  cursor: pointer;
`;

const ListHeaderContainer = styled.div`
  display: flex;
`;

const List = ({ list, cards, deleteList, addCard, deleteCard }) => {
  return (
    <Container>
      <ListHeaderContainer>
        <Title>{list.title}</Title>
        <DeleteListBtn onClick={() => deleteList(list.id)}>
          &#x2716;
        </DeleteListBtn>
      </ListHeaderContainer>
      <Droppable droppableId={list.id}>
        {(provided, snapshot) => (
          <TaskList
            {...provided.droppableProps}
            ref={provided.innerRef}
            provided={provided}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {cards.map((card, index) => (
              <Card
                key={card.id}
                index={index}
                card={card}
                deleteCard={deleteCard}
                listId={list.id}
              />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
      <AddCardButton onClick={() => addCard(list.id)}>Add Card</AddCardButton>
    </Container>
  );
};

export default List;
