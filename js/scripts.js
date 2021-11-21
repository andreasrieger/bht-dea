/**
 * JavaScript to enable a finite-state machine on a website
 * 
 * This script was developed as a homework for 
 * computer science course at the Berliner Hochschule für Technik (BHT).
 * 
 * Author:  Andreas Rieger, s82456@beuth-hochschule.de
 * Date:    2021-11-22
 */

let output,
  step = 0,
  active = false,
  endOfSequence = false
  ;

/**
 * This method creates a new table row for the status table.
 * 
 * @param {*} rowNum 
 * @returns 
 */
function createTableRow(rowNum) {
  const row = document.getElementById("transitions").insertRow(-1);
  const th = document.createElement("th");
  const thAttr = document.createAttribute("scope");
  thAttr.value = "row";
  th.setAttributeNode(thAttr);
  th.innerText = rowNum + 1;
  row.appendChild(th);
  return row;
}

/**
 * This method creates a new table cell for the status table.
 * If $showIcon is true an additional icon will be shown.
 * 
 * @param {*} tableRow 
 * @param {*} cellId 
 * @param {*} value 
 * @param {*} showIcon 
 * @param {*} success 
 */
function createTableCell(tableRow, cellId, value, showIcon, success) {
  let tableCell = tableRow.insertCell(-1);
  tableCell.setAttribute("id", cellId);
  tableCell.appendChild(document.createTextNode(value));
  if (showIcon) {
    tableCell.appendChild(getIcon(success));
    tableCell.setAttribute("class", "text-success fw-bold");
  }
}


/**
 * This method returns a check mark if check is true otherwise an x-symbol.
 * 
 * @param {*} check 
 * @returns 
 */
function getIcon(check) {
  const iconNode = document.createElement("i");
  const icon = (check) ? "bi bi-check-lg text-success" : "bi bi-x text-danger";
  iconNode.setAttribute("class", icon);
  return iconNode;
}


/**
 * This method creates or shows a success status message 
 * if check is true otherwise a failure message.
 * 
 * @param {*} check 
 * @param {*} char 
 */
function showStatusMessage(check, char) {
  const successMessage = "Der definierte Endzustand wurde erreicht!";
  const failureMessage = `Ungültiges Zeichen "${char}" - Der definierte Endzustand wurde nicht erreicht!`;

  if (document.getElementById("statusMessage")) {
    document.getElementById("statusMessage").classList.remove("invisible");

  } else {
    const statusMessage = document.createElement("span");
    const statusMessageText = document.createTextNode(check ? successMessage : failureMessage);
    statusMessage.setAttribute("id", "statusMessage");
    statusMessage.setAttribute("class", "visible");
    statusMessage.appendChild(statusMessageText);
    document.getElementById("resultOutput").appendChild(statusMessage);
  }
}


/**
 * This method toggles the reset button below the status graph.
 * 
 * @param {*} show 
 */
function showResetButton(show) {
  document.getElementById("resetButton").disabled = show ? false : true;
}


/**
 * This method controls the status table output.
 * 
 * @param {*} rowData 
 * @param {*} rowNum 
 * @param {*} outputLength 
 */
function printStateTableRow(rowData, rowNum, outputLength) {

  const tableRow = createTableRow(rowNum);

  for (const [key, value] of Object.entries(rowData)) {
    const tr = rowNum + 1;
    const cellId = "r" + tr + "c" + key;

    if ((key == 2) && (value == 7) && (tr == outputLength)) {
      // console.log("Bingo!", key, value, tr);
      createTableCell(tableRow, cellId, value, true, true)
      showStatusMessage(true);
      endOfSequence = true;
      showResetButton(true);
    }

    else if ((key == 2) && (value == -1)) {
      createTableCell(tableRow, cellId, "?", false, false);
      const prevCell = document.getElementById("r" + tr + "c" + (key - 1));
      prevCell.appendChild(getIcon(false));
      prevCell.setAttribute("class", "text-danger fw-bold");
      const prevValue = rowData[1];
      showStatusMessage(false, prevValue);
      endOfSequence = true;
      showResetButton(true);

    } else {
      createTableCell(tableRow, cellId, value, false);
    }
  }
}

/**
 * This method controls the status graph animation.
 * 
 * @param {*} row 
 */
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


/**
 * This method resets the user interface.
 */
function resetUi() {
  resetGraph();
  resetTable();
  resetStatusMessage();
  endOfSequence = false;
}


/**
 * This method hides the status message.
 */
function resetStatusMessage() {
  if (document.getElementById("statusMessage")) {
    document.getElementById("statusMessage").classList.add("invisible");
  }
}


/**
 * This method resets the status graph.
 */
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


/**
 * This method resets the status table.
 */
function resetTable() {
  step = 0;
  const transitions = document.getElementById("transitions");
  while (transitions.firstChild) {
    transitions.removeChild(transitions.firstChild);
  }
}


/**
 * This method resets the user input field.
 */
function resetUserInput() {
  document.getElementById("userInput").value = "";
  setStartButton(false);
}


/**
 * This method resets the status output bar.
 */
function resetOutput() {
  document.getElementById("resultOutput").classList.remove("alert-danger", "alert-success");
}


/**
 * This method controls the status output sequence - not working.
 */
function runStop() {
  active = false;
}


/**
 * This method controls the automatic status output.
 */
function runAuto() {
  resetUi();
  for (let i = 0, l = output.length; i < l; i++) {
    printStateTableRow(output[i], i, l);
    printStateGraph(output[i]);
  }
}


/**
 * This method controls the automatic delayed status output.
 * 
 * @param {*} delay 
 */
function runDelayed(delay) {
  resetUi();
  for (let i = 0, l = output.length; i < l; i++) {
    document.getElementById("resetButton").disabled = true;
    setTimeout(
      (y) => {
        printStateTableRow(output[y], y, l);
        printStateGraph(output[y]);
      },
      i * delay * 1000,
      i
    );
  }
}


/**
 * This method controls the manual status output.
 */
function runStepByStep() {
  const l = output.length;
  if (step + 1 <= l) {
    printStateTableRow(output[step], step, l);
    printStateGraph(output[step]);
    step += 1;
  }
}


/**
 * This method returns a random number between min and max.
 * 
 * @param {*} min 
 * @param {*} max 
 * @returns 
 */
const randomInt = (min, max) => {
  return (
    Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) +
    Math.ceil(min)
  );
};


/**
 * This method returns a random selection of a 
 * random number of words (chars) from sigma.
 * 
 * @param {*} alphabet 
 * @returns 
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


/**
 * This method instantiates the Dea class and handles its result.
 * 
 * @param {*} sequence 
 */
function startMachine(sequence) {
  const machine = new Dea(sequence);
  output = machine[1];
  active = true;
  const resultOutput = document.getElementById("resultOutput");
  const result = [];
  for (const char of sequence) result.push(char);
  const resultText = result.join('');
  if (machine[0]) {
    resultOutput.classList.add("alert-success");
    resultOutput.innerText = `Die Zeichenfolge "${resultText}" wurde akzeptiert. `;
  } else {
    resultOutput.classList.add("alert-danger");
    resultOutput.innerText = `Die Zeichenfolge "${resultText}" wurde verworfen. `;
  }
}


/**
 * This method enables the start button if $ready is true 
 * otherwise the button will be disabled.
 * 
 * @param {*} ready 
 */
function setStartButton(ready) {
  const startButton = document.getElementById("startButton");
  if (ready) {
    startButton.setAttribute("data-bs-toggle", "modal");
    startButton.classList.replace("btn-outline-secondary", "btn-success");
  } else {
    startButton.removeAttribute("data-bs-toggle", "modal");
    startButton.classList.replace("btn-success", "btn-outline-secondary");
  }
}


/**
 * General function initialization when the document is loaded
 */
document.addEventListener("DOMContentLoaded", function (event) {
  console.log("DOM fully loaded and parsed");

  // The given aplphabet sigma
  const sigma = ["B", "E", "P", "S", "T", "V", "X"],
    proof = [
      ["B", "P", "V", "V", "E"],
      ["B", "T", "S", "S", "X", "X", "T", "V", "V", "E"],
      ["B", "T", "X", "X", "V", "P", "S", "E"],
      ["B", "P", "V", "P", "X", "V", "P", "X", "V", "P", "X", "V", "V", "E"],
      ["B", "T", "S", "X", "X", "V", "P", "S", "E"]
    ];

  const userInput = document.getElementById("userInput");
  userInput.addEventListener("input", () => {
    if (userInput.checkValidity()) {
      setStartButton(true);
      document.getElementById("inputFailureMessage").classList.add("invisible");
    }
    else setStartButton(false);
  });

  /**
   * Enabling the control buttons
   */

  document.getElementById("randomProof").addEventListener("click", function () {
    resetOutput();
    resetUserInput();
    userInput.value = proof[randomInt(0, proof.length - 1)].join('');
    setStartButton(true);
  });

  document.getElementById("randomUnproof").addEventListener("click", () => {
    resetOutput();
    resetUserInput();
    userInput.value = getRandomSequence(sigma).join('');
    setStartButton(true);
  });

  document.getElementById("resetUserInput").addEventListener("click", function () {
    resetUserInput();
    setStartButton(false);
  });

  startButton.addEventListener("click", () => {
    if (userInput.checkValidity()) {
      document.getElementById("inputFailureMessage").classList.add("invisible");
      startMachine(userInput.value.toUpperCase());
    }
    else document.getElementById("inputFailureMessage").classList.remove("invisible");
  });

  document.getElementById("resetButton").addEventListener("click", function () {
    resetUi();
  });

  document.getElementById("closeButton").addEventListener("click", function () {
    resetUi();
    resetUserInput();
    runStop();
  });

  document.getElementById("closeButtonX").addEventListener("click", function () {
    resetUi();
    resetUserInput();
    runStop();
  });

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
