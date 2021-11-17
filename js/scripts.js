/**
 *
 */

function printStateTableRow(row, rowNum) {
  const newRow = transitions.insertRow(-1);
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

function runAuto(output) {
  for (let i = 0, l = output.length; i < l; i++) {
    printStateTableRow(output[i], (i += 1));
  }
}

function runDelayed(output, delay) {
  // auto delayed
  for (let i = 0, l = output.length; i < l; i++) {
    setTimeout(
      (y) => {
        console.log(output[y]);
        printStateTableRow(output[y], (y += 1));
      },
      i * delay * 1000,
      i
    );
  }
}

function runOutput(valid, output) {

  const warning = document.getElementById("warning");

  if (valid) {
    // To do: running sequence according to the settings (auto, auto delayed, step by step)
    const autoRun = document.getElementById("startAuto");
    const oneSecondDelay = document.getElementById("1s");
    const twoSecondDelay = document.getElementById("2s");
    const fourSecondDelay = document.getElementById("4s");
    const stepByStep = document.getElementById("startStepByStep");
    const transitions = document.getElementById("transitions");
    
    document.querySelectorAll(".dea-control").removeAttribute("disabled");

    while (transitions.firstChild) {
      transitions.removeChild(transitions.firstChild);
    }
    autoRun.addEventListener("click", () => {
      runAuto(output);
    });
    oneSecondDelay.addEventListener("click", () => {
      runDelayed(output, 1);
    });
    twoSecondDelay.addEventListener("click", () => {
      runDelayed(output, 2);
    });
    fourSecondDelay.addEventListener("click", () => {
      runDelayed(output, 4);
    });

    // running into timeout
    /*   for (let i = 0, l = output.length; i < l; ) {
  stepByStep.addEventListener("click", () => {
    printStateTableRow(output[i], (i += 1));
    i += 1;
  });
} */
  } else {
    warning.removeAttribute("disabled");
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
  if (machine[0]) runOutput(machine[0], machine[1]);
  else runOutput(machine[0], machine[1]);
}

document.addEventListener("DOMContentLoaded", function (event) {
  console.log("DOM fully loaded and parsed");
  const start = document.getElementById("start");
  const genSeq = document.getElementById("generateSequence");
  const seqInput = document.getElementById("seqInput");
  const startDea = document.getElementById("startDea");
  const testDea = document.getElementById("testDea");
  const sigmaPlaceholder = document.getElementById("sigmaPlaceholder");
  const stategraph = document.getElementById("stategraph");

  const sigma = ["B", "E", "P", "S", "T", "V", "X"],
    proof = ["B", "P", "V", "V", "E"];

  testDea.addEventListener("click", () => {
    startMachine(proof); //fire button twice doubles the console output
  });

  if (seqInput) {
    start.addEventListener("click", () => {
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

  startDea.addEventListener("click", (event) => {
    // console.log(`seqInput: ${seqInput.value}`);

    // To do: check if empty
    // To do: add commas to string
    // To do: check string for compatibility with $sigma
    startMachine(seqInput.value);
  });
});
