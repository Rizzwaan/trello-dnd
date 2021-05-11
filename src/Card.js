import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  border: 1px solid #e8384f;
  border-radius: 2px;
  margin-bottom: 8px;
  padding: 8px;
  background-color: ${(props) => (props.isDragging ? "lightgreen" : "white")};
  color: ${(props) => (props.isDragging ? "darkgreen" : "black")};
  font-size: ${(props) => (props.isDragging ? "20px" : "16px")};
  font-weight: ${(props) => (props.isDragging ? "600" : "400")};
`;

const DeleteButtonCard = styled.button`
  justify-self: center;
  align-self: center;
  padding: 4px;
  margin: 0;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  background-color: #e8384f;
  color: white;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
const CardHeaderTitle = styled.p`
  font-weight: 400;
`;

const CardDetails = styled.div``;
const CardDetailsContent = styled.p`
  font-size: 14px;
`;

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
