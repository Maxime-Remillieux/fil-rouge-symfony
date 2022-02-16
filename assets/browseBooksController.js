import React from "react";
import ReactDOM from "react-dom";
import Browse from "./pages/Browse";

const container = document.getElementById('browseBooks');

const dataThemes = document.getElementById('data-themes');
const dataUser = document.getElementById('data-user');

const user = JSON.parse(dataUser.innerHTML);
const themes = JSON.parse(dataThemes.innerHTML);

ReactDOM.render(<Browse themes={themes} connectedUser={user}/>, container);

