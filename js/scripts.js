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

if (genSeq) {
  genSeq.addEventListener('click', () => {
    const sequence = getRandomSequence();
    seqInput.value = sequence;
  })
}


const table = (result) => {
  var arr = [];
  Object.entries(result).map(item => {
    arr.push(Object.values(item[1]));
  })
  return arr;
};


testDea.addEventListener('click', () => {
  const machine = new Dea(proof);
  if (machine[1]) response.innerText = valid;
  else response.innerText = invalid;
  transitions.innerText = table(machine[1]);
})


startDea.addEventListener('click', () => {
  console.log(data);
  console.log(`seqInput: ${seqInput}`);
  const machine = new Dea(data); //sequence comes from form
  if (machine[1]) response.innerText = valid;
  else {
    response.innerText = invalid;
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