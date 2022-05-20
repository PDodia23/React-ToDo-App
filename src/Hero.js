import React, { useEffect, useState } from "react";
import "./App.css";
import Todo from "./Todo";
import { db } from "./fire";
import firebase from "firebase/compat/app";

function Hero({ handleLogout }) {
  let inspirationalQuotes = [
    `When you have a dream, you’ve got to grab it and never let go.`,
    `Nothing is impossible. The word itself says ‘I’m possible!`,
    `There is nothing impossible to they who will try.`,
    `The bad news is time flies. The good news is you’re the pilot.`,
    `Keep your face always toward the sunshine, and shadows will fall behind you.`,
    `Spread love everywhere you go.`,
    `No matter what people tell you, words and ideas can change the world.`,
  ];

  let randomQuote =
    inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)];

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().text }))
        );
      });
  }, []);
  const addTodo = (event) => {
    event.preventDefault();
    db.collection("todos").add({
      text: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setTodos([...todos, input]);
    setInput("");
    console.log(todos);
  };

  const closeNav = () => {
    const navSlideOut = document.querySelector(".nav-slideIn");
    navSlideOut.style.width = "0";
  };

  const openNav = () => {
    const navSlideOut = document.querySelector(".nav-slideIn");
    navSlideOut.style.width = "250px";
    navSlideOut.style.visibility = "visible";
  };

  let months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let timeNew = "";
  const date = new Date();
  const day = date.getDay();
  const dateNew = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const time = date.getHours();
  if (time < 12) {
    timeNew = "Morning";
  } else if (time >= 12 && time < 18) {
    timeNew = "Afternoon";
  } else {
    timeNew = "Evening";
  }

  return (
    <>
      <div>
        <section className="hero userUI">
          <nav onClick={openNav}>
            <div className="squares" id="square1"></div>
            <div className="squares" id="square2"></div>
            <div className="squares" id="square3"></div>
            <div className="squares" id="square4"></div>
          </nav>
          {/* WHEN USER CLICKS MENU, NAV SLIDES OUT */}

          <div className="nav-slideIn">
            <div id="close-nav" onClick={closeNav}>
              <div id="line-close-1" className="line-close"></div>
              <div id="line-close-2" className="line-close"></div>
            </div>
            <p id="user-name">
              <span id="first-name">Good</span> <br />
              {timeNew}
            </p>
            <div className="lines" id="line-1"></div>
            <div className="lines" id="line-2"></div>
            <img src="/img/cactus.png" alt="cactus" id="cactus" />
            <button onClick={handleLogout} id="logout">
              Logout
            </button>
            <div id="app-logo">
              <p>kiai.</p>
              <div id="logo-line"></div>
            </div>
          </div>
          <div className="welcome-message">
            <p id="name">
              {days[day]}, {dateNew} {months[month]} {year}
            </p>
            <p id="today-task">today's tasks</p>
          </div>

          <p id="quote">"{randomQuote}"</p>
          {/* TASKS INPUT BTN AND ADD TASK*/}
          <form id="new-form">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              id="input-task"
              placeholder="enter task"
              autoComplete="off"
            />

            <button
              onClick={addTodo}
              type="submit"
              disabled={!input}
              id="add-task-btn"
            >
              +
            </button>
          </form>
          <ul>
            {todos.map((todo) => (
              <Todo todo={todo} />
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

export default Hero;
