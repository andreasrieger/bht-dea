/**
 * 
 */

const
  sigma = ['B', 'E', 'P', 'S', 'T', 'V', 'X'], //the alphabet of words
  sigmaProof = ['B', 'P', 'V', 'V', 'E'],
  min = 5,
  max = 15
  ;

class Dea {
  constructor(sequence) {
    console.log(sequence);

    const
      accept = "Zeichenfolge akzeptiert",
      reject = "Zeichenfolge abgelehnt",
      error = "Fehler"
      ;

    this.state = 0;
    this.finalState = 7;
    this.response = null;

    for (const val of sequence) {
      this.state = this.transition(val);
      if (this.state === undefined) {
        console.log(error);
        this.state = null;
        return this.state;
        break;
      }
      console.log(`Neuer Status: ${this.state}`);
    }

    if (this.state === this.finalState) {
      console.log(accept);
    } else {
      console.log(reject);
    }
  }

  get transitionStates() {
    return {
      0: { B: 1 },
      1: { P: 3, T: 2 },
      2: { S: 2, X: 4 },
      3: { T: 3, V: 5 },
      4: { S: 6, X: 3 },
      5: { P: 4, V: 6 },
      6: { E: 7 }
    };
  }

  transition(word) {
    return this.transitionStates[this.state][word];
  }
}

/**
* Getting a number between min and max
*/
const randomInt = () => {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
};

/**
 * Getting a random selection of x words from sigma.
 * X is a random number between min and max.
 */
function getSequence() {
  const
    n = sigma.length,
    arr = [],
    x = randomInt()
    ;

  for (let i = 0; i < x; i++) {
    arr.push(sigma[(0 + Math.floor(Math.random() * n)) % n]);
  }
  return arr;
}
