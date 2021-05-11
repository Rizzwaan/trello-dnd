import React, { useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import { Droppable } from "react-beautiful-dnd";
const Container = styled.div`
  margin: 8px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px grey;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 22%;
  display: flex;
  align-self: flex-start;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  flex-grow: 1;
  min-height: 50px;
  background-color: ${(props) => (props.isDraggingOver ? "#81e0e3" : "white")};
`;

const DeleteListBtn = styled.button`
  justify-self: center;
  align-self: center;
  border: 0;
  background-color: white;
  color: black;
  border-radius: 4px;
  padding: 4px;
  cursor: pointer;
  margin-right: 10px;
`;

const AddCardButton = styled.button`
  background-color: #e8384f;
  color: white;
  padding: 6px;
  font-weight: 600;
  margin: 10px;
  border-radius: 4px;
  cursor: pointer;
  border: none;
`;

const ListHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
  color: black;
  border-radius: 10px 10px 0px 0px;
  border-bottom: 2px solid black;
  letter-spacing: 2px;
`;

const Form = styled.form`
  display: flex;
  padding: 10px;
  flex-direction: column;
  gap: 4px;
`;

const Input = styled.input`
  box-sizing: border-box;
  border: 1px solid green;
  border-radius: 4px;

  padding: 8px;
  width: 100%;
`;

const Label = styled.label``;

const TextArea = styled.textarea`
  border: 1px solid green;
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
`;

const SubmitInput = styled.input`
  box-sizing: border-box;
  border: 1px solid green;
  border-radius: 4px;
  background-color: green;
  color: white;
  font-weight: bold;
  padding: 8px;
  width: 100%;
`;

const List = ({ list, cards, deleteList, addCard, deleteCard }) => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCardInputData = (event, listId) => {
    // TODO: Propper Form Validation can be added
    event.preventDefault();
    if (title && description) {
      const cardDetails = { title, description };
      addCard(listId, cardDetails);
      setTitle("");
      setDescription("");
      setShowForm(false);
    } else {
      setTitle("");
      setDescription("");
      setShowForm(false);
    }
  };

  return (
    <Container>
      <ListHeaderContainer>
        <Title>{list.title.toUpperCase()}</Title>
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
      <AddCardButton onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Add"}
      </AddCardButton>
      {showForm ? (
        <Form onSubmit={(e) => handleCardInputData(e, list.id)}>
          <Label htmlFor="title">
            <Input
              name="title"
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
              placeholder="title"
              type="text"
              value={title}
            />
          </Label>

          <Label htmlFor="description">
            <TextArea
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="description"
              type="text"
              value={description}
            />
          </Label>
          <br />
          <SubmitInput type="submit" value="Submit" />
        </Form>
      ) : null}
    </Container>
  );
};

export default List;
