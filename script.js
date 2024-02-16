"use strict";

const form = document.getElementById("form");
const bookList = [];

const errorElement = document.getElementById("error");
const newTableData = document.getElementById("newData");

const checkValidations = function (e) {
  let messages = [];
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;
  if (title.length < 6) {
    messages.push("Title must be longer than 6 characters");
  }
  if (author.length < 6) {
    messages.push("Author value must be longer than 6 characters");
  }
  if (isbn.length < 6) {
    messages.push("ISBN value must be longer than 6 characters");
  }
  if (messages.length > 0) {
    errorElement.innerText = messages.join(", ");
    return false;
  }
  return true;
};

const takeInput = function (e) {
  e.preventDefault();
  if (checkValidations()) {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const isbn = document.getElementById("isbn").value;
    const deleteFunctionality = document.getElementById("delete");

    const tr = document.createElement("tr");

    const tdTitle = document.createElement("td");
    tr.append(tdTitle);
    tdTitle.innerText = title;

    const tdAuthor = document.createElement("td");
    tdAuthor.innerText = author;
    tr.append(tdAuthor);

    const tdISBN = document.createElement("td");
    tdISBN.innerText = isbn;
    tr.append(tdISBN);

    // Delete button
    const btnDelete = document.createElement("button");
    btnDelete.classList.add("btnDelete");
    tr.append(btnDelete);
    btnDelete.innerText = "Delete Record";
    btnDelete.onmouseover = function mouseover() {
      btnDelete.style.color = "blue";
    };

    btnDelete.onmouseout = function mouseout() {
      btnDelete.style.color = "black";
    };

    btnDelete.addEventListener("click", function () {
      tdTitle.innerText = "";
      tdAuthor.innerText = "";
      tdISBN.innerText = "";
      btnDelete.style.display = "none";
    });

    newTableData.append(tr);
    form.reset();
  }
};

form.addEventListener("submit", takeInput);
