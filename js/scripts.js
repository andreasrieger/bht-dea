/**
 * 
 */

const
  sigma = ['B', 'E', 'P', 'S', 'T', 'V', 'X'], //the alphabet of words
  proof = ['B', 'P', 'V', 'V', 'E'],
  valid = "Eingabe akzeptiert",
  invalid = "Eingabe verworfen"
  ;

var errorCount = 0;


const genSeq = document.getElementById('generateSequence');
const output = document.getElementById('output');
const seqInput = document.getElementById('seqInput');
const startDea = document.getElementById('startDea');
const testDea = document.getElementById('testDea');
const response = document.getElementById('response');
const transitions = document.getElementById('transitions');
const sigmaPlaceholder = document.getElementsByClassName('sigmaPlaceholder');
const stategraph = document.getElementById('stategraph');


if (sigmaPlaceholder) {
  sigmaPlaceholder.innerText = sigma.toString();
}


if (genSeq) {
  genSeq.addEventListener('click', () => {
    const sequence = getRandomSequence();
    seqInput.value = sequence;
  })
}



function cleanOutput(element) {
  element.innerText = "";
  element.innerHTML = "";
}

function formatOutput(result) {
  var arr = [];
  Object.entries(result).map(item => {
    arr.push(`<li>${Object.values(item[1])}</li>`);
  });
  return arr; // To do: formatting output
}


function runSequence(valid, output) {
  if (valid) {
    response.innerText = "valid";
    const stepbystep = document.getElementById('stepbystep');
    if (stepbystep) {
      for (let i = 0; i < output.length;) {
        response.innerText = output[i];
        stepbystep.addEventListener('click', () => {
          i += 1;
        }) 
      }
    }
  } else {
    response.innerText = "invalid";
  }
  transitions.innerText = formatOutput(output);
}

testDea.addEventListener('click', () => {
  cleanOutput(transitions);
  cleanOutput(response);
  const machine = new Dea(proof);
  if (machine[1]) response.innerText = valid;
  else response.innerText = invalid;
  transitions.innerHTML = formatOutput(machine[1]);
})


startDea.addEventListener('click', (event) => {
  cleanOutput(transitions);
  cleanOutput(response);
  console.log(`seqInput: ${seqInput.value}`);
  // To do: check if empty
  // To do: add commas to string
  // To do: check string for compatibility with $sigma
  // To do: running sequence according to the settings (auto, auto delayed, step by step)
  const machine = new Dea(seqInput.value); //sequence comes from form
  if (machine[0]) runSequence(machine[0], machine[1]);
  else {
    runSequence(machine[0], machine[1]);
    errorCount += 1;
  }
  if (errorCount == 3) {
    console.log("3x falsch!");
    errorCount = 0;
  }
})

/**
* Getting a number between min and max
*/
const randomInt = (min, max) => {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
};

/**
* Getting a random selection of x words from sigma.
* X is a random number between min and max.
*/
function getRandomSequence() {// To do: set min and max
  const
    n = sigma.length,
    arr = [],
    x = randomInt(5, 10)
    ;

  for (let i = 0; i < x; i++) {
    arr.push(sigma[(0 + Math.floor(Math.random() * n)) % n]);
  }
  return arr;
}


// @Todo: develop a generator for valid sequences