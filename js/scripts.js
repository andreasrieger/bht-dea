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
  document.getElementById('e0').setAttribute("stroke", "green");
  document.getElementById('e0').setAttribute("fill", "green");
  document.getElementById('s0').setAttribute("fill", "green");
  for (const element of row) {
    if (Number.isInteger(element)) {
      console.log('s' + element);
      document.getElementById('s' + element).setAttribute("fill", "green");
    }
  }
}

function clearUi() {
  const transitions = document.getElementById("transitions");
  // document.getElementById("seqOutput").innerText = "";
  document.getElementById("outputAll").setAttribute("disabled", "");
  document.getElementById("outputDelayed").setAttribute("disabled", "");
  document.getElementById("outputStepByStep").setAttribute("disabled", "");

  const nodes = document.querySelectorAll(".graphNode");
  const edges = document.querySelectorAll(".graphEdge");

  for (let i = 0, l = nodes.length; i < l; ++i) {
    nodes[i].removeAttribute("fill");
  }

  for (let i = 0, l = edges.length; i < l; ++i) {
    edges[i].setAttribute("stroke", "black");
    edges[i].setAttribute("fill", "black");
  }

  while (transitions.firstChild) {
    transitions.removeChild(transitions.firstChild);
  }

  clearForm();

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

// @Todo: develop a generator for valid sequences

function clearForm() {
  const form = document.getElementById("form");
  form.classList.remove('was-validated');
  document.getElementById("seqInput").value = "";
  //   while (tSomeStyleClasses.length) {
  //     tSomeStyleClasses[0].classList.remove("someStyle");
  // }
}

function startMachine(sequence) {
  // const outputText = document.getElementById("seqOutput");
  const machine = new Dea(sequence);
  if (machine[0]) {
    output = machine[1];
    // outputText.innerText = `Die Zeichenfolge "${sequence}" wurde akzeptiert`;
    document.getElementById("outputAll").removeAttribute("disabled");
    document.getElementById("outputDelayed").removeAttribute("disabled");
    document.getElementById("outputStepByStep").removeAttribute("disabled");
    document.getElementById("clear-control").removeAttribute("disabled");
  } else {
    console.log("Error");
    // outputText.innerText = `Die Zeichenfolge "${sequence}" wurde nicht akzeptiert`;
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

  // if (document.getElementById("form").classList.contains('was-validated')) {
  startDea.addEventListener("click", () => {
    // document.getElementById("form").addEventListener("submit", function () {
    const input = seqInput.value;
    // const str = input.replace(",", "").toUpperCase();// To do: check for spaces and other invalid chars

    startMachine(input);




  });
  // }


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
