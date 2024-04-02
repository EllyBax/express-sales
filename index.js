const main = document.getElementById("main");
const form = document.getElementById("form");
const table = document.getElementById("table");
const amount = document.getElementById("amount");
const total = document.getElementById("total");
const item = document.getElementById("item");
const addEntry = document.getElementById("addEntry");
let id = 1;
const currentDate = new Date();

form.style.display = "none";
form.style.transition = "all 1s .5s ease";
addEntry.addEventListener("click", (event) => {
  event.preventDefault();
  form.style.opacity = "1";
  form.style.display = "flex";
});

function fillTable(event) {
  event.preventDefault();
  if (total.value === "" || item.value === "") {
    const errDiv = document.createElement("div");
    errDiv.innerHTML = `
          <div class="errDiv">
            <h1>Err: "Can't log empty fields"</h1>
          </div>`;
    main.appendChild(errDiv);
    // console.log("Can't log empty fields");
    setTimeout(() => {
      errDiv.style.opacity = "0";
      errDiv.style.transition = "all 1s ease-in-out";
      setTimeout(() => {
        errDiv.remove();
      }, 1000);
    }, 2000);
  } else {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    const td5 = document.createElement("td");
    td1.innerText = id;
    td2.innerText = item.value;
    td3.innerText = amount.value;
    td4.innerText = total.value;
    td5.innerText = formatDate(currentDate);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    table.appendChild(tr);
    tr.setAttribute("id", id);

    total.value = "";
    item.value = "";
    amount.value = "";

    setTimeout(() => {
      form.style.opacity = "0";
      form.style.display = "none";
    }, 2000);

    id++;
  }
}

// delEntry.addEventListener('click', deleteEntry());

form.addEventListener("submit", (event) => {
  fillTable(event);
});

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based in JavaScript
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

const deleteMessage = document.getElementById("deleteMessage");
const entryId = document.getElementById("entryId");
const entryChoice = document.getElementById("entryChoice");
const delEntry = document.getElementById("delEntry");

// Initial state of deleteMessage
deleteMessage.style.display = "none";

function fetchEntry() {
  deleteMessage.style.display = "flex";
  deleteMessage.style.opacity = "1";
  entryId.value = "";
}

function getEntry() {
  if (!entryId.value) {
    const errDiv = document.createElement("div");
    errDiv.innerHTML = `
      <div class="errDiv">
        <h1>Err: "Can't delete empty entry"</h1>
      </div>`;
    main.appendChild(errDiv);
    // console.log("Can't log empty fields");
    setTimeout(() => {
      errDiv.style.opacity = "0";
      errDiv.style.transition = "all 1s ease-in-out";
      setTimeout(() => {
        errDiv.remove();
      }, 1000);
    }, 2000);
    console.log("Can't delete empty entry");
  }
  return entryId.value;
}

function deleteEntry(event) {
  event.preventDefault(); // Prevent form submission
  let id = getEntry(); // Get the entry ID
  console.log(id);
  // Assuming you have a way to find the element by its ID
  let elementToDelete = document.getElementById(id);
  if (elementToDelete) {
    setTimeout(() => {
      document.getElementById("deleteMessage").style.opacity = "0";
      document.getElementById("deleteMessage").style.transition = "all 1s ease";
      document.getElementById("deleteMessage").style.display = "none";
      // document.getElementById("deleteMessage").style.display = "none";
    }, 2000);
  }
  elementToDelete.remove();
}

//close form when prompted
document.getElementById("closeButton").addEventListener("click", function () {
  document.getElementById("deleteMessage").style.display = "none";
  // document.getElementById("deleteMessage").remove();
});

// Attach event listeners
entryChoice.addEventListener("click", deleteEntry);
delEntry.addEventListener("click", fetchEntry);