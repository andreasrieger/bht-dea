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
  for (const [key, value] of Object.entries(row)) {
    let newCell = newRow.insertCell(-1);
    const cellId = "r" + rowNum + "c" + key;
    newCell.setAttribute("id", cellId);
    if (value == -1) {
      document.getElementById("r" + rowNum + "c" + (key - 1)).setAttribute("class", "text-danger");

      if (document.getElementById("errorMessage")) {
        document.getElementById("errorMessage").classList.remove("invisible");
      } else {
        const errorMessage = document.createElement("span");
        const errorMessageText = document.createTextNode(`Das ${rowNum}. Zeichen "${row[1]}" der Zeichenfolge ist ungültig.`);
        errorMessage.setAttribute("id", "errorMessage");
        errorMessage.setAttribute("class", "visible");
        errorMessage.appendChild(errorMessageText);
        document.getElementById("resultOutput").appendChild(errorMessage);
      }
    }
    let newText = document.createTextNode((value == -1) ? "?" : value);
    newCell.appendChild(newText);
  }
}

function printStateGraph(row) {

  // initial state graph (arrow)
  const e0 = document.getElementById('e0');
  e0.classList.add("active-state");

  // state zero
  for (const element of row) {
    if (Number.isInteger(element)) { // first and last row value 
      const nodeId = 's' + element;
      const node = document.getElementById(nodeId);
      if (node != null) node.classList.add("active-state");
      else document.getElementById('s' + row[0]).classList.add("state-error");
    } else {
      const edgeId = 'e' + row.join('');
      const edge = document.getElementById(edgeId);
      if (edge != null) edge.classList.add("active-state");
    }
  }
}


function resetGraph() {
  const activeNodes = document.querySelectorAll(".active-state");
  for (let i = 0, l = activeNodes.length; i < l; i++) {
    activeNodes[i].classList.remove("active-state");
  }
  const errorNodes = document.querySelectorAll(".state-error");
  for (let i = 0, l = errorNodes.length; i < l; i++) {
    errorNodes[i].classList.remove("state-error");
  }
}

function resetTable() {
  step = 0;
  const transitions = document.getElementById("transitions");
  while (transitions.firstChild) {
    transitions.removeChild(transitions.firstChild);
  }
}

function resetUserInput() {
  document.getElementById("userInput").value = "";
}

function resetOutput() {
  document.getElementById("resultOutput").classList.remove("alert-danger", "alert-success");
}

function resetErrorMessage() {
  document.getElementById("errorMessage").classList.add("invisible");
  /*   const resultOutput = document.getElementById("resultOutput");
    while (resultOutput.firstChild) {
      resultOutput.removeChild(resultOutput.firstChild);
    } */
}

function runAuto() {
  for (let i = 0, l = output.length; i < l; i++) {
    printStateTableRow(output[i], i + 1);
    printStateGraph(output[i]);
  }
}

function runDelayed(delay) {
  // console.log(output);
  for (let i = 0, l = output.length; i < l; i++) {
    setTimeout(
      (y) => {
        // console.log(output[y]);
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
  output = machine[1];
  const resultOutput = document.getElementById("resultOutput");
  const result = [];
  for (const char of sequence) result.push(char);
  const resultText = result.join('');
  if (machine[0]) {
    resultOutput.classList.add("alert-success");
    resultOutput.innerText = `Die Zeichenfolge "${resultText}" wurde akzeptiert. `;
  } else {
    resultOutput.classList.add("alert-danger");
    resultOutput.innerText = `Die Zeichenfolge "${resultText}" wurde nicht akzeptiert. `;
  }
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
    if (userInput.checkValidity()) {
      startButton.setAttribute("data-bs-toggle", "modal");
      document.getElementById("inputFailureMessage").classList.add("invisible");
    }
    else startButton.removeAttribute("data-bs-toggle", "modal");
  });

  document.getElementById("random").addEventListener("click", () => {
    userInput.value = getRandomSequence(sigma).join('');
    startButton.setAttribute("data-bs-toggle", "modal");
  });

  startButton.addEventListener("click", () => {
    if (userInput.checkValidity()) {
      document.getElementById("inputFailureMessage").classList.add("invisible");
      startMachine(userInput.value.toUpperCase());
    }
    else document.getElementById("inputFailureMessage").classList.remove("invisible");
  });

  /**
   * Start DEA with random working sequence
   */
  document.getElementById("testButton").addEventListener("click", function () {
    startMachine(proof[randomInt(0, proof.length)]);
  });

  document.getElementById("resetButton").addEventListener("click", function () {
    resetGraph();
    resetTable();
    resetErrorMessage();
  });

  document.getElementById("closeButton").addEventListener("click", function () {
    resetGraph();
    resetTable();
    resetOutput();
    resetUserInput();
  });

  document.getElementById("closeButtonX").addEventListener("click", function () {
    resetGraph();
    resetTable();
    resetOutput();
    resetUserInput();
  });

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
