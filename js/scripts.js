/**
 * 
 */

 const
 sigma = ['B', 'E', 'P', 'S', 'T', 'V', 'X'], //the alphabet of words
 sigmaProof = ['B', 'P', 'V', 'V', 'E'],
 min = 5,
 max = 15
 ;

var seq,
 runCount = 0,
 errorCount = 0
 ;


function runProof(seq) {
 console.log("Game over!");
 if (window.confirm("Erfolgshungrig?")) {
   seqOutput.value = seq;
   startDea.classList.add('visible');
   startDea.classList.remove('invisible');
 }
}

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

   if (sequence) {
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
   }


   if (this.state === this.finalState) {
     console.log(accept);
     this.response = accept;
     return response;
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

/* function getBar(obj, state) {

 var nextStates = Object.values(obj[state]);
 console.log("next states:" + nextStates);

 var counter = 0;
 while (counter <3){
   for (const next of nextStates) {
     console.log("Next: " + next);
     foo = getBar(obj, next);
   }
 }

 // return ";)";
}

(function () {
 const foo = new Dea();
 /*   console.log(foo.transitionStates);
   console.log(Object.keys(foo.transitionStates));
   console.log(Object.keys(foo.transitionStates).length);
   console.log(Object.keys(foo.transitionStates[foo.state]));
   console.log(Object.values(foo.transitionStates[foo.state]));
   // var start = Object.keys(foo.transitionStates[0]);
   */
  /*
 var start = 0;
 const obj = foo.transitionStates;
 const bar = getBar(obj, start);
 console.log(bar);
})(); */