const NAME = "Jay";
const WELCOME_MESSAGE_TEMPLATE = ["night", "morning", "afternoon", "evening"];

// All shortcuts are in a `SHORTCUT_STARTER+shortcutKey` format. 
// So, for example, pressing `tab+q` would redirect you to https://google.com/?q=q
const SHORTCUT_STARTER = 'control' 

// How much time (in milliseconds) you have to press shortcutKey after pressing SHORTCUT_STARTER.
// Also change --SHORTCUT_TIMEOUT in styles.css if you change this option.
const SHORTCUT_TIMEOUT = 1500;

// The groups of links are generated from this object. Edit it to edit the page's contents.
// shortcutKey must hold an all-lowercase single button. Theoretically should work with values like `esc` and `f1`,
// but intended to be used with just regular latin letters.
const MASTER_MAP = [
  {"groupName": "",
   "items":[]},
    {
        "groupName": "Repos",
        "items":[
            {"name": "ISIS", "shortcutKey": "i", "url": "https://github.com/USGS-Astrogeology/isis3"},
            {"name": "AutoCnet", "shortcutKey": "a", "url": "https://github.com/jlaura/autocnet"},
            {"name": "Plio", "shortcutKey": "p", "url": "https://github.com/jlaura/plio"},
            {"name": "Plurmy", "shortcutKey": "l", "url": "https://github.com/jlaura/plurmy"},
            {"name": "AMG", "shortcutKey": "e", "url": "https://github.com/jlaura/automated-metadata-generation"},
            {"name": "ARD Docs", "shortcutKey": "r", "url":"https://code.chs.usgs.gov/jlaura/arc_docs"}
        ]
    },
    {
        "groupName": "Boards / Docs",
        "items":[
            {"name": "Personal Tasks", "shortcutKey": "t", "url": "https://github.com/users/jlaura/projects/1"},
            {"name": "FY22 Tasks", "shortcutKey": "s", "url": "https://github.com/USGS-Astrogeology/softwaremanagement/projects/3"},
            {"name": "Support Board", "shortcutKey": "u", "url": "https://github.com/orgs/USGS-Astrogeology/projects/6"},
            {"name": "HPC Docs", "shortcutKey": "z", "url": "https://hpcportal.cr.usgs.gov/hpc-user-docs/"},
            {"name": "CHS Docs", "shortcutKey": "c", "url": "https://support.chs.usgs.gov/display/CHSKB/Program+Overview"},
            {"name": "Notes", "shortcutKey":"n", "url":"https://app.simplenote.com"},
	    {"name": "AWS Console", "shortcutKey": "w", "url":"http://awsconsole.usgs.gov"}
        ]
    }
]


let $container = document.getElementById("content");
let getUrl = {};

let $shortcutDisplayList = document.getElementsByClassName("shortcut");
let listeningForShortcut = false;
let listenerTimeout;

function setupWelcomeMessage(){
    let curHours = new Date().getHours();
    curHours = Math.floor(curHours/6); // Simply dividing current hours by 6 proves to be a good enough aproximation.
    if (curHours == 4) curHours = 3;
    let welcome = "Good " + WELCOME_MESSAGE_TEMPLATE[curHours] + ", " + NAME;
    document.getElementById("welcome-string").innerHTML = welcome;
}

function setupGroups(){

    for (let i = 0; i < MASTER_MAP.length; i++){
        let curGroupData = MASTER_MAP[i];

        let group = document.createElement("div");
        group.className = "group";
        $container.appendChild(group);

        if (i == 0) {            
            let cardAdd = document.createElement("div");
            cardAdd.className = "card add";
            group.appendChild(cardAdd);

            let textContainer = document.createElement("div");
            textContainer.className = "txt-container";
            cardAdd.appendChild(textContainer)

            let input = document.createElement("input");
            input.type = "text";
            input.className = "txt-input";
            input.placeholder = "Create new todo...";
            input.spellcheck = "false";
            input.autocomplete = "off";
            input.id = "addt";
            cardAdd.appendChild(input);

            let todos = document.createElement("ul");
            todos.className = "todos";
            group.appendChild(todos);

            let cardstat = document.createElement("div");
            cardstat.className = "card stat";
            group.appendChild(cardstat);

            let corner = document.createElement("p");
            corner.className = "corner";
            cardstat.appendChild(corner);

        } else {
          let header = document.createElement("h1");
          header.innerHTML = curGroupData.groupName;
          group.appendChild(header);
        }

        for (let j = 0; j < curGroupData.items.length; j++){
            let curItemData = curGroupData.items[j];

            let pContainer = document.createElement("p");
            group.appendChild(pContainer);

            let link = document.createElement("a");
            link.innerHTML = curItemData.name;
            link.setAttribute("href", curItemData.url);
            pContainer.appendChild(link);

            let shortcutDisplay = document.createElement("span");
            shortcutDisplay.innerHTML = curItemData.shortcutKey;
            shortcutDisplay.className = "shortcut";
            shortcutDisplay.style.animation = "none";
            pContainer.appendChild(shortcutDisplay);

            getUrl[curItemData.shortcutKey] = curItemData.url
        }
    }
}

function shortcutListener(e) {
    let key = e.key.toLowerCase();

    if (listeningForShortcut && getUrl.hasOwnProperty(key)){
        window.location = getUrl[key];
    }

    if (key === SHORTCUT_STARTER) {
        clearTimeout(listenerTimeout);
        listeningForShortcut = true;

        // Animation reset
        for (let i = 0; i < $shortcutDisplayList.length; i++){
            $shortcutDisplayList[i].style.animation = "none";
            setTimeout(function() { $shortcutDisplayList[i].style.animation = ''; }, 10);
        }

        listenerTimeout = setTimeout(function(){ listeningForShortcut = false; }, SHORTCUT_TIMEOUT);
    }
}


function main(){
    setupWelcomeMessage();
    setupGroups();
    document.addEventListener('keyup', shortcutListener, false);

    // 
    // get alltodos and initialise listeners
  addTodo();
  // dragover on .todos container
  document.querySelector(".todos").addEventListener("dragover", function (e) {
    e.preventDefault();
    if (
      !e.target.classList.contains("dragging") &&
      e.target.classList.contains("card")
    ) {
      const draggingCard = document.querySelector(".dragging");
      const cards = [...this.querySelectorAll(".card")];
      const currPos = cards.indexOf(draggingCard);
      const newPos = cards.indexOf(e.target);
      console.log(currPos, newPos);
      if (currPos > newPos) {
        this.insertBefore(draggingCard, e.target);
      } else {
        this.insertBefore(draggingCard, e.target.nextSibling);
      }
      const todos = JSON.parse(localStorage.getItem("todos"));
      const removed = todos.splice(currPos, 1);
      todos.splice(newPos, 0, removed[0]);
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  });
  // add new todos on user input
  const txtInput = document.querySelector(".txt-input");
  // add todo also on enter key event
  txtInput.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
        const item = txtInput.value.trim();
        if (item) {
          txtInput.value = "";
          const todos = !localStorage.getItem("todos")
            ? []
            : JSON.parse(localStorage.getItem("todos"));
          const currentTodo = {
            item,
            isCompleted: false,
          };
          addTodo([currentTodo]);
          todos.push(currentTodo);
          localStorage.setItem("todos", JSON.stringify(todos));
        }
    }
  });
  // filter todo - all, active, completed
  document.querySelector(".filter").addEventListener("click", function (e) {
    const id = e.target.id;
    if (id) {
      document.querySelector(".on").classList.remove("on");
      document.getElementById(id).classList.add("on");
      document.querySelector(".todos").className = `todos ${id}`;
    }
  });
  // clear completed
  document
    .getElementById("clear-completed")
    .addEventListener("click", function () {
      deleteIndexes = [];
      document.querySelectorAll(".card.checked").forEach(function (card) {
        deleteIndexes.push(
          [...document.querySelectorAll(".todos .card")].indexOf(card)
        );
        card.classList.add("fall");
        card.addEventListener("animationend", function (e) {
          setTimeout(function () {
            card.remove();
          }, 100);
        });
      });
      removeManyTodo(deleteIndexes);
    });
}

/* stateTodo() FUNCTION TO UPDATE TODO ABOUT COMPLETION */

function stateTodo(index, completed) {
  const todos = JSON.parse(localStorage.getItem("todos"));
  todos[index].isCompleted = completed;
  localStorage.setItem("todos", JSON.stringify(todos));
}

/* removeManyTodo() FUNCTION TO REMOVE ONE TODO */

function removeTodo(index) {
  const todos = JSON.parse(localStorage.getItem("todos"));
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

/* removeManyTodo FUNCTION TO REMOVE MANY TODOS */

function removeManyTodo(indexes) {
  let todos = JSON.parse(localStorage.getItem("todos"));
  todos = todos.filter(function (todo, index) {
    return !indexes.includes(index);
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

/* addTodo() FUNCTION TO LIST/CREATE TODOS AND ADD EVENT LISTENERS */

function addTodo(todos = JSON.parse(localStorage.getItem("todos"))) {
  if (!todos) {
    return null;
  }
  // create cards
  todos.forEach(function (todo) {
    const card = document.createElement("li");
    const cbContainer = document.createElement("div");
    const cbInput = document.createElement("input");
    const check = document.createElement("span");
    const item = document.createElement("p");
    const button = document.createElement("button");
    const img = document.createElement("img");
    // Add classes
    card.classList.add("card");
    button.classList.add("clear");
    cbContainer.classList.add("cb-container");
    cbInput.classList.add("cb-input");
    item.classList.add("item");
    check.classList.add("check");
    button.classList.add("clear");
    // Set attributes
    card.setAttribute("draggable", true);
    img.setAttribute("src", "./assets/icon-cross.svg");
    img.setAttribute("alt", "Clear it");
    cbInput.setAttribute("type", "checkbox");
    // set todo item for card
    console.log(item);
    item.textContent = todo.item;
    // if completed -> add respective class / attribute
    if (todo.isCompleted) {
      card.classList.add("checked");
      cbInput.setAttribute("checked", "checked");
    }
    // Add drag listener to card
    card.addEventListener("dragstart", function () {
      this.classList.add("dragging");
    });
    card.addEventListener("dragend", function () {
      this.classList.remove("dragging");
    });
    // Add click listener to checkbox
    cbInput.addEventListener("click", function () {
      const correspondingCard = this.parentElement.parentElement;
      const checked = this.checked;
      stateTodo(
        [...document.querySelectorAll(".todos .card")].indexOf(
          correspondingCard
        ),
        checked
      );
      checked
        ? correspondingCard.classList.add("checked")
        : correspondingCard.classList.remove("checked");
    });
    // Add click listener to clear button
    button.addEventListener("click", function () {
      const correspondingCard = this.parentElement;
      correspondingCard.classList.add("fall");
      removeTodo(
        [...document.querySelectorAll(".todos .card")].indexOf(
          correspondingCard
        )
      );
      correspondingCard.addEventListener("animationend", function () {
        setTimeout(function () {
          correspondingCard.remove();
        }, 100);
      });
    });
    // parent.appendChild(child)
    button.appendChild(img);
    cbContainer.appendChild(cbInput);
    cbContainer.appendChild(check);
    card.appendChild(cbContainer);
    card.appendChild(item);
    card.appendChild(button);
    document.querySelector(".todos").appendChild(card);
  });

}

main();
