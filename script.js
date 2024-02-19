"use strict";

const form = document.getElementById("form");
const bookList = [];
let counter = 0;
const errorElement = document.getElementById("error");
const newTableData = document.getElementById("newData");
const editButton = document.getElementById("edit");
const addButton = document.getElementById("add");

const init = function () {
  editButton.classList.add("hidden");
};
init();

const checkValidations = function (e) {
  let messages = [];
  let isValid = true;
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;
  if (title.length < 6) {
    messages.push("Title must be longer than 6 characters");
  }
  if (author.length < 6) {
    messages.push("Author value must be longer than 6 characters");
    isValid = false;
  }
  if (isbn.length < 6) {
    messages.push("ISBN value must be longer than 6 characters");
    isValid = false;
  }
  if (messages.length > 0) {
    errorElement.innerText = messages.join(", ");
    form.reset();
    isValid = false;
  }
  if (messages.length === 0) {
    messages = [];
    errorElement.innerText = "";
  }
  return isValid;
};

const takeInput = function (e) {
  e.preventDefault();
  if (checkValidations()) {
    //input values
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const isbn = document.getElementById("isbn").value;

    // create table row and columns
    const tr = document.createElement("tr");
    //generate unique ID for tr
    tr.id = `table-tr-${counter}`;

    const tdTitle = document.createElement("td");
    tdTitle.innerText = title;
    tr.append(tdTitle);

    const tdAuthor = document.createElement("td");
    tdAuthor.innerText = author;
    tr.append(tdAuthor);

    const tdISBN = document.createElement("td");
    tdISBN.innerText = isbn;
    tr.append(tdISBN);

    //Edit button

    const btnEdit = document.createElement("button");

    const tdEditBtn = document.createElement("td");
    tdEditBtn.append(btnEdit);
    btnEdit.setAttribute("row-identifier", `table-tr-${counter}`);
    tr.append(tdEditBtn);
    btnEdit.innerText = "Edit Record";

    // Delete button
    const btnDelete = document.createElement("button");
    const tdDeleteBtn = document.createElement("td");
    tdDeleteBtn.append(btnDelete);
    btnDelete.setAttribute("row-identifier", `table-tr-${counter}`);
    tr.append(tdDeleteBtn);

    btnDelete.innerText = "Delete Record";
    btnDelete.onmouseover = function mouseover() {
      btnDelete.style.color = "blue";
    };

    btnDelete.onmouseout = function mouseout() {
      btnDelete.style.color = "black";
    };

    btnDelete.addEventListener("click", function (event) {
      const rowId = event.target.getAttribute("row-identifier");

      document.getElementById(rowId).remove();
    });

    btnEdit.addEventListener("click", function (event) {
      btnDelete.disabled = true;
      addButton.classList.add("hidden");
      editButton.classList.remove("hidden");

      editButton.setAttribute(
        "row-to-edit",
        event.target.getAttribute("row-identifier")
      );

      editButton.addEventListener("click", edit);
      document.getElementById("title").value = tdTitle.innerText;
      document.getElementById("author").value = tdAuthor.innerText;
      document.getElementById("isbn").value = tdISBN.innerText;
    });

    newTableData.append(tr);
    counter += 1;
    form.reset();
  }
};

function edit(event) {
  const rowId = event.target.getAttribute("row-to-edit");
  const row = document.querySelector(`#${rowId}`);
  const tds = row.getElementsByTagName("td");
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;
  tds[0].innerText = title;
  tds[1].innerText = author;
  tds[2].innerText = isbn;
  tds[4].getElementsByTagName("button")[0].disabled = false;
  addButton.classList.remove("hidden");
  editButton.classList.add("hidden");
  editButton.removeAttribute("row-to-edit");
  form.reset();
}

form.addEventListener("submit", takeInput);
