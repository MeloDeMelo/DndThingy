'use strict'
import printMe from "./print.js"
import {ApiClient} from "./request.js"

function component() {
  let client = new ApiClient();
  let element = document.createElement('div');
  let spellsButton = document.createElement('button');
  let removeListButton = document.createElement('button');
  let spellListID = 1234;
  let spellListHeadingID = 2345;

  element.innerHTML = ["Hello", "webpack"].join(" ");
  spellsButton.innerHTML = "Get List";
  removeListButton.innerHTML = "remove List";
  spellsButton.addEventListener("click", () => {
    client.getSpellsList().then((response) => {
      // console.log(JSON.parse(response));
      // console.log(response);
      let listContainer = document.createElement("ul");
      let spells = response.results;
      for(let key in spells){
        if(!spells.hasOwnProperty(key)) continue;
  
        let spell = spells[key];
        let spellItem = document.createElement("li");
        let spellText = document.createTextNode(spell.name);
        spellItem.appendChild(spellText);
  
        // spellItem.addEventListener("click", () => {
        //   client.getSpecificSpell(spell.url).then((response) => {
        //     let heading = document.createElement("h1");
        //     heading.innerText = response.name;
        //     let description = document.createElement("p");
        //     description.innerText = response.desc;
        //     document.body.appendChild(heading);
        //     document.body.appendChild(description);
        //   })
        // })
  
        listContainer.appendChild(spellItem);
      }
      listContainer.style = "list-style-type:none";
      listContainer.setAttribute('id', spellListID);

      let heading = document.createElement("h1");
      heading.innerText = "Spell List";
      heading.setAttribute('id', spellListHeadingID);

      document.body.appendChild(heading);
      document.body.appendChild(listContainer);
    });
  });
  removeListButton.addEventListener("click", () => {
    var element = document.getElementById(spellListID);
    element.parentNode.removeChild(element);
    element = document.getElementById(spellListHeadingID);
    element.parentNode.removeChild(element);
  });
  element.appendChild(document.createElement("br"));
  element.appendChild(spellsButton);
  element.appendChild(removeListButton);

  return element;
}

document.body.appendChild(component());