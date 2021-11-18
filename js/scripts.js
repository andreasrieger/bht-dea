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
  // const seqInput = document.getElementById("seqInput");
  document.getElementById("seqOutput").innerText = "";
  document.getElementById("outputAll").setAttribute("disabled", "");
  document.getElementById("outputDelayed").setAttribute("disabled", "");
  document.getElementById("outputStepByStep").setAttribute("disabled", "");

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
  console.log(output);
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
  const outputText = document.getElementById("seqOutput");
  const machine = new Dea(sequence);
  if (machine[0]) {
    output = machine[1];
    outputText.innerText = `Die Zeichenfolge "${sequence}" wurde akzeptiert`;
    document.getElementById("outputAll").removeAttribute("disabled");
    document.getElementById("outputDelayed").removeAttribute("disabled");
    document.getElementById("outputStepByStep").removeAttribute("disabled");
    document.getElementById("clear-control").removeAttribute("disabled");
  } else {
    console.log("Error");
    outputText.innerText = `Die Zeichenfolge "${sequence}" wurde nicht akzeptiert`;
  }
}

document.addEventListener("DOMContentLoaded", function (event) {
  console.log("DOM fully loaded and parsed");
  const genSeq = document.getElementById("generateSequence");
  const seqInput = document.getElementById("seqInput");
  const sigmaPlaceholder = document.getElementById("sigmaPlaceholder");
  const startDea = document.getElementById("startDea");
  // const stategraph = document.getElementById("stategraph");

  const sigma = ["B", "E", "P", "S", "T", "V", "X"],
    proof = ["B", "P", "V", "V", "E"];
    //BTSSXXTVVE
    // BTXXVPSE
    // BPVPXVPXVPXVVE
    // BTSXXVPSE

  document.getElementById("test").addEventListener("click", function () {
    startMachine(proof);
  });

  document.getElementById("clear-control").addEventListener("click", function () {
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

  startDea.addEventListener("click", (event) => {
    const input = seqInput.value;
    const str = input.replace(",", "").toUpperCase();// To do: check for spaces and other invalid chars

    startMachine(input);

    /* const valid = () => {
      for (let i = 0, l = str.length; i < l; i++) {
        if (!sigma.includes(str[i])) return false;
      }
      return true;
    }

    // To do: check if empty
    if (str === "") {
      console.log("Feld ist leer!");
      startDea.classList.add("btn-danger");
    }

    // To do: check string for compatibility with $sigma
    else if (str !== "" && !valid()) {
      console.log(`Die Eingabe "${str}" enthält ungültige Zeichen!`);
      if (!startDea.classList.contains("btn-danger")){
        startDea.classList.add("btn-danger");
      }
    }

    // prepare for take-off 
    else if (str !== "" && valid()){
      startDea.setAttribute("data-bs-dismiss", "modal");
      if (startDea.classList.contains("btn-danger")){
        startDea.classList.replace("btn-danger", "btn-success");
      } else startDea.classList.add("btn-success");
      startDea.innerText = "Starte Automaten";
    }

    // take-off if ready
    else if (str !== "" && valid() && seqInput.getAttribute("valid") == true) {
      console.log(str);
      // startMachine(str);
    } */



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
