import React, { useState } from "react";
import { db } from "./fire";
import material, { Button, Box, Typography, Modal } from "@mui/material";

function Todo(props) {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = useState("");

  const handleOpen = () => {
    setOpen(true);
    const tasks = document.querySelectorAll(".task-style");
    // Select the task with that id
    const idText = props.todo.todo;

    for (const task of tasks) {
      const taskText = task.textContent;
      if (idText === taskText) {
        // task.classList.toggle("toggle-task-style");
        const editBtn = document.querySelector("#pencil-icon");
        editBtn.classList.toggle("opacity");
        // Highlight the text to show it can be edited
      }
    }
    // input should autofocus
  };
  const handleClose = () => setOpen(false);

  const updateTodo = () => {
    db.collection("todos").doc(props.todo.id).set(
      {
        text: input,
      },
      { merge: true }
    );
    setOpen(false);
    const updateInput = document.querySelector("#update-input").autoFocus;
  };

  function checkTask(id) {
    const tasks = document.querySelectorAll(".task-style");
    // Select the task with that id
    const idText = props.todo.todo;
    console.log(idText);

    for (const task of tasks) {
      const taskText = task.textContent;
      if (idText === taskText) {
        // When you click on circle you want the small-circle class to appear
        const circle = task
          .querySelector("#task-item")
          .querySelector("#check-circle");
        task.classList.toggle("task-complete");

        circle.classList.toggle("small-circle");
        //Line through text
        task.querySelector("#task-item").classList.toggle("line-through");
        // Disable edit and delete buttons
      }
    }
  }

  return (
    <div id="flex">
      <p className="task-style">
        <span id="task-item">
          <span id="check-circle" onClick={checkTask}>
            <span></span>
          </span>
          {props.todo.todo}
        </span>
        <div className="action-btns">
          <button className="buttons">
            <img
              src="/img/pencil-icon.png"
              alt="pencil icon"
              id="pencil-icon"
              onClick={handleOpen}
            />
          </button>
          <button
            onClick={(e) => db.collection("todos").doc(props.todo.id).delete()}
            className="buttons"
          >
            <img src="/img/bin.png" alt="bin icon" id="bin-icon" />
          </button>
          {/* <Button onClick={handleOpen}>Edit</Button> */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            autoFocus
          >
            <Box className="modal-Design">
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                className="modal-title"
              >
                Edit Task
              </Typography>
              <Typography id="update-input">
                <img
                  src="/img/cross.png"
                  alt="cross icon"
                  id="cross"
                  onClick={handleClose}
                />
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={props.todo.todo}
                  id="update-input"
                  autoFocus
                  autoComplete="off"
                />
                <br /> <br />
                <button id="update-task">
                  <img
                    src="/img/tick.png"
                    alt="tick icon"
                    id="tick"
                    onClick={updateTodo}
                  />
                </button>
              </Typography>
            </Box>
          </Modal>
        </div>
      </p>

      {/* <button>Edit</button> */}
    </div>
  );
}

export default Todo;
