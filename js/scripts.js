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
    let newCell = newRow.insertCell(Object.keys(element) + 1);
    let newText = document.createTextNode(element);
    newCell.appendChild(newText);
  }
}

function clearUi() {
  const transitions = document.getElementById("transitions");

  while (transitions.firstChild) {
    transitions.removeChild(transitions.firstChild);
  }

  step = 0;
}

function runAuto() {
  for (let i = 0, l = output.length; i < l; i++) {
    printStateTableRow(output[i], i + 1);
  }
}

function runDelayed(delay) {
  for (let i = 0, l = output.length; i < l; i++) {
    setTimeout(
      (y) => {
        console.log(output[y]);
        printStateTableRow(output[y], y + 1);
      },
      i * delay * 1000,
      i
    );
  }
}

function runStepByStep() {
  if (step + 1 <= output.length) {
    printStateTableRow(output[step], step + 1);
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

// @Todo: develop a generator for valid sequences

function startMachine(sequence) {
  const machine = new Dea(sequence);
  if (machine[0]) {
    output = machine[1];
  } else {
    console.log("errororoororor");
  }
}

document.addEventListener("DOMContentLoaded", function (event) {
  console.log("DOM fully loaded and parsed");
  const genSeq = document.getElementById("generateSequence");
  const seqInput = document.getElementById("seqInput");
  const sigmaPlaceholder = document.getElementById("sigmaPlaceholder");
  // const stategraph = document.getElementById("stategraph");

  const sigma = ["B", "E", "P", "S", "T", "V", "X"],
    proof = ["B", "P", "V", "V", "E"];

  document.getElementById("test").addEventListener("click", function () {
    startMachine(proof);
  });

  document.getElementById("clear").addEventListener("click", function () {
    clearUi();
  });

  if (seqInput) {
    document.getElementById("start").addEventListener("click", () => {
      seqInput.value = "";
    });
  }

  if (sigmaPlaceholder) {
    sigmaPlaceholder.innerText = sigma;
  }

  if (genSeq) {
    genSeq.addEventListener("click", () => {
      seqInput.value = getRandomSequence(sigma);
    });
  }

  document.getElementById("startDea").addEventListener("click", (event) => {
    // To do: check if empty
    if (seqInput.value != null) console.log("Feldwert ist leer!");

    // To do: add commas to string
    // To do: check string for compatibility with $sigma
    startMachine(seqInput.value);
  });

  document.getElementById("startAuto").addEventListener("click", runAuto);

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
    .getElementById("startStepByStep")
    .addEventListener("click", runStepByStep);
});
