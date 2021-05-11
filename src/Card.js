import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  border: 1px solid lightgray;
  border-radius: 2px;
  margin-bottom: 8px;
  padding: 8px;
  background-color: ${(props) => (props.isDragging ? "lightgreen" : "white")};
`;

const DeleteButtonCard = styled.button`
  justify-self: center;
  align-self: center;
  padding: 4px;
  margin: 0;
  border: none;
  cursor: pointer;
  background-color: red;
  color: white;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
const CardHeaderTitle = styled.p``;

const CardDetails = styled.div``;
const CardDetailsContent = styled.p``;

// const Handle = styled.div`
//   width: 20px;
//   height: 20px;
//   background-color: orange;
//   border-radius: 4px;
//   margin-right: 8px;
// `;

const Card = ({ card, index, listId, deleteCard }) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <CardHeader>
            <CardHeaderTitle>{card.title}</CardHeaderTitle>
            <DeleteButtonCard onClick={() => deleteCard(listId, card.id)}>
              &#x2716;
            </DeleteButtonCard>
          </CardHeader>
          <CardDetails>
            <CardDetailsContent>{card.description}</CardDetailsContent>
          </CardDetails>
        </Container>
      )}
    </Draggable>
  );
};

export default Card;
