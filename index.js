//necesssary constant declarations
const main = document.getElementById("main");
const header = document.getElementById("header");
const heroText = document.getElementById("heroText");
const form = document.getElementById("form");
const table = document.getElementById("table");
const amount = document.getElementById("amount");
const total = document.getElementById("total");
const item = document.getElementById("item");
const addEntry = document.getElementById("addEntry");
const deleteMessage = document.getElementById("deleteMessage");
const entryId = document.getElementById("entryId");
const entryChoice = document.getElementById("entryChoice");
const delEntry = document.getElementById("delEntry");
const fill = document.getElementById("fill");
const light = document.getElementById("light");
const dark = document.getElementById("dark");
const auto = document.getElementById("auto");
let id = 1;
const currentDate = new Date();

//top margin due to fixed header
document.addEventListener("DOMContentLoaded", () => {
  let headerHeight = header.scrollHeight;
  main.style.marginTop = `${headerHeight + 16}px`;
});

//get formatted date
function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based in JavaScript
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

// display date in heroText
heroText.innerText = `Sales Records for ${formatDate(currentDate)}`;

// Initial state of deleteMessage
deleteMessage.style.display = "none";

//initial state of form
form.style.display = "none";

//call form
addEntry.addEventListener("click", (event) => {
  event.preventDefault();
  form.style.display = "flex";
  form.style.opacity = "1";
});

//form submission
fill.addEventListener("click", (event) => {
  fillTable(event);
});

//delete entry callback
delEntry.addEventListener("click", fetchEntry);

function fetchEntry() {
  deleteMessage.style.display = "flex";
  deleteMessage.style.opacity = "1";
  entryId.value = "";
}

//get the entry id
entryChoice.addEventListener("click", deleteEntry);

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
      setTimeout(() => {
        document.getElementById("deleteMessage").style.display = "none";
      }, 1000);
    }, 1500);
  }
  elementToDelete.remove();
}

function getEntry() {
  if (!entryId.value) {
    displayError('Err: "Can\'t delete empty entry"', main);
    console.log("Can't delete empty entry");
  }
  return entryId.value;
}

function fillTable(event) {
  event.preventDefault();
  // Trim the input values to remove leading/trailing whitespace
  const totalValue = total.value.trim();
  const itemValue = item.value.trim();
  const amountValue = amount.value.trim();

  // Check if any of the inputs are empty or not a number
  if (!totalValue || !itemValue || !amountValue) {
    displayError('Err: "Can\'t log empty field"', main);
  } else {
    // Proceed with creating the table row if there's no error
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    td1.innerText = id;
    td2.innerText = itemValue; // Use trimmed value
    td3.innerText = amountValue; // Use trimmed value
    td4.innerText = totalValue; // Use trimmed value
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    table.appendChild(tr);
    tr.setAttribute("id", id);

    total.value = "";
    item.value = "";
    amount.value = "";

    setTimeout(() => {
      form.style.opacity = "0";
      setTimeout(() => {
        form.style.display = "none";
      }, 1000);
    }, 2000);

    id++;
  }
}

function displayError(errorMessage, parentElement) {
  const errDiv = document.createElement("div");
  errDiv.innerHTML = `
    <div class="errDiv">
      <h1>${errorMessage}</h1>
    </div>`;
  parentElement.appendChild(errDiv);
  setTimeout(() => {
    errDiv.style.opacity = "0";
    errDiv.style.transition = "all 1s ease-in-out";
    setTimeout(() => {
      errDiv.remove();
    }, 1000);
  }, 2000);
}

//close form when prompted
document.getElementById("closeButton").addEventListener("click", function () {
  document.getElementById("deleteMessage").style.display = "none";
  // document.getElementById("deleteMessage").remove();
});

//theme toggle

var themeCategories = document.querySelector(".themeCategories");
var chevyUp = document.getElementById("chevyUp");
var chevyDown = document.getElementById("chevyDown");

// Initially hide themeCategories and set chevron icons
chevyDown.style.display = "block";
chevyUp.style.display = "none";
themeCategories.style.display = "none";
document.querySelector(".toggleThemes").addEventListener("click", function () {
  // Toggle themeCategories visibility
  if (themeCategories.style.display === "none") {
    themeCategories.style.display = "block";
    chevyDown.style.display = "none";
    chevyUp.style.display = "block";
  } else {
    themeCategories.style.display = "none";
    chevyDown.style.display = "block";
    chevyUp.style.display = "none";
  }
});

light.addEventListener("click", () => {
  // remove/hide themeCategories and set chevron icons
  chevyDown.style.display = "block";
  chevyUp.style.display = "none";
  themeCategories.style.display = "none";
  changeTheme("light");
});
dark.addEventListener("click", () => {
  // remove/hide themeCategories and set chevron icons
  chevyDown.style.display = "block";
  chevyUp.style.display = "none";
  themeCategories.style.display = "none";
  changeTheme("dark");
});
auto.addEventListener("click", () => {
  // remove/hide themeCategories and set chevron icons
  chevyDown.style.display = "block";
  chevyUp.style.display = "none";
  themeCategories.style.display = "none";
  changeTheme("");
});

function changeTheme(theme) {
  console.log(`theme switching to ${theme}`);
  document.querySelector("html").classList = theme;
}
