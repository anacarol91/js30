const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
const items = JSON.parse(localStorage.getItem("items")) || [];
const deleteButton = document.querySelector("input[type=button]");

function addItem(event) {
  event.preventDefault();

  const item = {
    text: this.querySelector("[name=item]").value,
    done: false
  };

  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem("items", JSON.stringify(items));
  this.reset();
}

const populateList = (plates = [], platesList) => {
  platesList.innerHTML = plates
    .map(
      ({ done, text }, index) => `
        <li>
          <input type="checkbox" data-index=${index} id="item${index}" ${
        done ? "checked" : ""
      } />
          <label for="item${index}">${text}</label>
        </li>
      `
    )
    .join("");
};

const toggleDone = ({ target }) => {
  if (!target.matches("input")) return;

  const index = target.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
};

const clearList = () => {
  items.length = 0;
  localStorage.clear();
  populateList(items, itemsList);
};

addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleDone);
deleteButton.addEventListener("click", clearList);

populateList(items, itemsList);
