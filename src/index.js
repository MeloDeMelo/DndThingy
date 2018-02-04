'use strict'
import printMe from "./print.js"
import {ApiClient} from "./request.js"

function component() {
  let element = document.createElement('div');
  let button = document.createElement('button');
  let client = new ApiClient();

  element.innerHTML = ["Hello", "webpack"].join(" ");
  button.innerHTML = "HELLO";
  button.addEventListener("click", () => {
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
          listContainer.appendChild(spellItem);
        }
        document.body.appendChild(listContainer);
    })
  });
  element.appendChild(button);

  return element;
}

document.body.appendChild(component());