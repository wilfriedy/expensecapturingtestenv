let chars = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
let userCode = "DD345-"; //USER initials
const SelectRandomChars = (arr, turns) => {
  let nameTrack = "";
  for (let i = 0; i < turns; i++) {
    const rndInt = Math.floor(Math.random() * arr.length);
    nameTrack += arr[rndInt];
  }
  return nameTrack;
};
SelectRandomChars(chars, 5);
// Global variables
let randomInputName;

// add inputs headers abd their values
let addLine = true;
let noEmptyImputs = true; // this is to find which imputs are empty in the current selection
let currentSelection;
let addedSelection; // to get currrent inputs group
let cost_array = []; // get each cost upon every line
let items_array = []; // get item names
let prop_all = 0;
let total_cost;
const isEmpty = (el) => {
  return el.value == "" ? true : false;
};

const sum_total_currency = (arr) => {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += +arr[i].value;
  }
  return currencyFormat.format(total);
};

const addHeaders = (e) => {
  let sibling = e.target.nextElementSibling;
  randomInputName = userCode + SelectRandomChars(chars, 6);
  let inputTemplate = `
<div class="form-group">
   <label for="" class="label-el">Header type</label>
   <select name="${randomInputName} form-data-el" class="edgedbtn">
              <option value=""></option>
              <option value="Value">Value</option>
   </select>
</div>`;
  // the if statement bellow is used for checking if the current selection has its details i.e the cost and item name fields filled
  if (!noEmptyImputs) {
    let cost = addedSelection.querySelector(".cost");
    let item_name = addedSelection.querySelector(".itm_name");
    if (isEmpty(cost) && isEmpty(item_name)) {
      return; // do not add line if not filled
    } else {
      cost.disabled = true;
      item_name.disabled = true;
      noEmptyImputs = true;
      cost_array.push(cost);
      // items_array.push(item_name.value);
      total_cost = sum_total_currency(cost_array);
      total_display.innerText = total_cost;
    }
  }
  //  lines can only be added when the current selection has details and also its inuts
  if (addLine && noEmptyImputs) {
    console.log(cost_array);
    console.log(items_array);
    sibling
      ? sibling.insertAdjacentHTML("afterend", inputTemplate)
      : multiSelect.insertAdjacentHTML("afterbegin", inputTemplate);
  }
  if (multiSelect.children) {
    addLine = true;
    let allchildren = [...multiSelect.children].filter(
      (el) => el.className == "form-group"
    );

    prop_all = allchildren.length;

    currentSelection =
      allchildren.length > 0 ? allchildren[0].querySelector("select") : "";
    if (currentSelection.value == "") {
      addLine = false;
    }
  }
};

const selectionHandler = (e) => {
  let selected = e.target;
  let autoInput = `
  <div class='template-el'>
  <div class='details-els'>
  <label class="addded-labels">Item name</label>
  <input type="text" class="newinput itm_name form-data-el" name="${randomInputName}">
  </div>
  <br>
  <div class='details-els'>
    <label class="addded-labels">Cost</label>
    <input type="number" class="newinput cost form-data-el" name="${randomInputName}">
  </div>

  <a href="#" class="remove-el">remove</a>
  </div>`;
  if (e.target.matches("select")) {
    selected.addEventListener("change", (e) => {
      addLine = true;
      if (selected.nextElementSibling) {
        return;
      } else {
        selected.insertAdjacentHTML("afterend", autoInput);
        addedSelection = currentSelection.nextElementSibling;
        noEmptyImputs = false;
      }
    });
  }
  if (e.target.matches(".remove-el")) {
    noEmptyImputs = prop_all > 0 ? true : false;
    let parentElementRemoved = e.target.parentElement.parentElement;
    let costRemoved = parentElementRemoved.querySelector(".cost");
    parentElementRemoved.remove();
    cost_array = cost_array.filter((el) => el != costRemoved);
    total_cost = sum_total_currency(cost_array);
    total_display.innerText = total_cost;
  }

  // if input then disablef
};

// check if the user added a selection and check for the value of the inputs elements within the selection

multiSelect.addEventListener("click", selectionHandler);
addHeaderBtn.addEventListener("click", addHeaders);

// ++++++++++ Form data and uploads handling ++++++
let formEl = document.querySelector(".form-el");
formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  // let receipt_data = new FormData();
  console.log();
});
