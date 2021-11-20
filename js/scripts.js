/**
 *
 */

let output,
  step = 0;

function printStateTableRow(row, rowNum) {
  const newRow = document.getElementById("transitions").insertRow(-1);
  const th = document.createElement("th");
  const thAttr = document.createAttribute("scope");
  thAttr.value = "row";
  th.setAttributeNode(thAttr);
  th.innerText = rowNum;
  newRow.appendChild(th);
  for (const element of row) {
    // console.log(`cell: ${element}`);
    // let newCell = newRow.insertCell(Object.keys(element) + 1);
    let newCell = newRow.insertCell(-1);
    let newText = document.createTextNode(element);
    newCell.appendChild(newText);
  }
}

function printStateGraph(row) {

  // light-grey: #f8f9fa
  // dark-grey: #6c757d
  // green: #2A8754

  // initial state graph (arrow)
  const e0 = document.getElementById('e0');
  for (let i = 0, l = e0.children.length; i < l; i++) {
    const nodeChild = e0.children[i];
    if(nodeChild.classList.contains("background")) {
      changeColor(nodeChild, "bg-dark", "bg-success");
    } else if(nodeChild.classList.contains("border")) {
      changeColor(nodeChild, "border-dark", "border-success");
    }
  }

  // state zero
  for (const element of row) {
    console.log(document.getElementById('e' + row.join('')));
    
    if (Number.isInteger(element)) { // first and last row value 
      const nodeId = document.getElementById('s' + element);
      console.log(document.getElementById(nodeId));

      for (let i = 0, l = nodeId.children.length; i < l; i++) {
        const nodeChild = nodeId.children[i];
        if(nodeChild.classList.contains("background")) {
          changeColor(nodeChild, "bg-dark", "bg-success");
        } else if(nodeChild.classList.contains("border")) {
          changeColor(nodeChild, "border-dark", "border-success");
        }
      }
    } else {
      //
    }
  }
  // document.getElementById('s0').classList.add("bg-success");

  // method to change graph color
  function changeColor(element, o, r){
    element.classList.replace(o, r);
  }

  
}



function clearUi() {
  const transitions = document.getElementById("transitions");


  document.getElementById("outputAll").setAttribute("disabled", "");
  document.getElementById("outputDelayed").setAttribute("disabled", "");
  document.getElementById("outputStepByStep").setAttribute("disabled", "");

  const nodes = document.querySelectorAll(".graph-node");

  for (let i = 0, l = nodes.length; i < l; ++i) {
    for (let j = 0, cl = nodes[i].children.length; j < cl; j++) {

      const node = nodes[i].children[j];

      if (node.className == "graph-letter") {
        //
      } else {
        //
      }

    }
  }

  const edges = document.querySelectorAll(".graph-edge");
  for (let i = 0, l = edges.length; i < l; ++i) {
    for (let j = 0, cl = edges[i].children.length; j < cl; j++) {
      if (edges[i].children[j].className != "edge-bg") {
        edges[i].children[j].setAttribute("stroke", "#6c757d");
        edges[i].children[j].setAttribute("fill", "#6c757d");
      }
    }
  }

  while (transitions.firstChild) {
    transitions.removeChild(transitions.firstChild);
  }

  step = 0;
}


function runAuto() {
  for (let i = 0, l = output.length; i < l; i++) {
    printStateTableRow(output[i], i + 1);
    printStateGraph(output[i]);
  }
}

function runDelayed(delay) {
  console.log(output);
  for (let i = 0, l = output.length; i < l; i++) {
    setTimeout(
      (y) => {
        console.log(output[y]);
        printStateTableRow(output[y], y + 1);
        printStateGraph(output[y]);
      },
      i * delay * 1000,
      i
    );
  }
}

function runStepByStep() {
  if (step + 1 <= output.length) {
    printStateTableRow(output[step], step + 1);
    printStateGraph(output[step]);
    step += 1;
  }
}

/**
 * Getting a number between min and max
 */
const randomInt = (min, max) => {
  return (
    Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) +
    Math.ceil(min)
  );
};

/**
 * Getting a random selection of x words from sigma.
 * X is a random number between min and max.
 */
function getRandomSequence(alphabet) {
  // To do: set min and max
  const n = alphabet.length,
    arr = [],
    x = randomInt(5, 10);
  for (let i = 0; i < x; i++) {
    arr.push(alphabet[(0 + Math.floor(Math.random() * n)) % n]);
  }
  return arr;
}


function startMachine(sequence) {
  const machine = new Dea(sequence);
  // if (machine[0]) {
  output = machine[1];
  console.log(output);
  // outputText.innerText = `Die Zeichenfolge "${sequence}" wurde akzeptiert`;
  // } else {
  //   console.log("Error");
  // outputText.innerText = `Die Zeichenfolge "${sequence}" wurde nicht akzeptiert`;
  // }

  // To do: clean-up with loop
  document.getElementById("outputAll").removeAttribute("disabled");
  document.getElementById("outputDelayed").removeAttribute("disabled");
  document.getElementById("outputStepByStep").removeAttribute("disabled");
}

document.addEventListener("DOMContentLoaded", function (event) {
  console.log("DOM fully loaded and parsed");

  const sigma = ["B", "E", "P", "S", "T", "V", "X"],
    proof = [
      ["B", "P", "V", "V", "E"],
      ["B", "T", "S", "S", "X", "X", "T", "V", "V", "E"],
      ["B", "T", "X", "X", "V", "P", "S", "E"],
      ["B", "P", "V", "P", "X", "V", "P", "X", "V", "P", "X", "V", "V", "E"],
      ["B", "T", "S", "X", "X", "V", "P", "S", "E"]
    ];
  const userInput = document.getElementById("userInput");
  const startButton = document.getElementById("startButton");

  userInput.addEventListener("input", () => {
    // const valid = userInput.validity.valid;
    if (userInput.checkValidity()) startButton.setAttribute("data-bs-toggle", "modal");
    else startButton.removeAttribute("data-bs-toggle", "modal");
  });

  document.getElementById("random").addEventListener("click", () => {
    userInput.value = getRandomSequence(sigma).join('');
    startButton.setAttribute("data-bs-toggle", "modal");
  });

  startButton.addEventListener("click", () => {
    if (userInput.checkValidity()) {
      // console.log("Kann losgehen mit " + userInput.value.toUpperCase());
      startMachine(userInput.value.toUpperCase());
    }
    else console.log("Eingabe fehlerhaft!");
  });

  /**
   * Start DEA with random working sequence
   */
  document.getElementById("testButton").addEventListener("click", function () {
    startMachine(proof[randomInt(0, proof.length)]);
  });

  // document.getElementById("clear").addEventListener("click", function () {
  //   clearUi();
  // });

  /**
   * Controls
   */

  document.getElementById("outputAll").addEventListener("click", runAuto);

  document.getElementById("1s").addEventListener("click", () => {
    runDelayed(1);
  });
  document.getElementById("2s").addEventListener("click", () => {
    runDelayed(2);
  });
  document.getElementById("4s").addEventListener("click", () => {
    runDelayed(4);
  });

  document
    .getElementById("outputStepByStep")
    .addEventListener("click", runStepByStep);
});
