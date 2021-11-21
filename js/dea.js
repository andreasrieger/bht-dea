/**
 * JavaScript class to enable a finite-state machine on a website.
 * It returns an object with states to control an output interface.
 * 
 * This script was developed as a homework for 
 * computer science course at the Berliner Hochschule für Technik (BHT).
 * 
 * Author:  Andreas Rieger, s82456@beuth-hochschule.de
 * Date:    2021-11-22
 */
class Dea {
    constructor(sequence) {

        this.state = 0;
        this.finalState = 7;
        this.errorCount = 0;
        const transitions = [];

        for (const val of sequence) {
            const response = [
                this.state,
                val
            ];

            this.state = this.transition(val);
            if (this.state === undefined) {
                this.errorCount += 1;
                response.push(-1);
                transitions.push(response);
                return [false, transitions];
            } else {
                response.push(this.state);
                transitions.push(response);
            }
        }

        if (this.state === this.finalState && this.errorCount == 0) { // dea test passed
            return [true, transitions];
        } else { // dea test failed
            return [false, transitions];
        }
    }

    get transitionStates() {
        return {
            0: { B: 1 },
            1: { P: 4, T: 2 },
            2: { S: 2, X: 3 },
            3: { X: 4, S: 6 },
            4: { T: 4, V: 5 },
            5: { P: 3, V: 6 },
            6: { E: 7 },
            7: { B: -1, E: -1, P: -1, S: -1, T: -1, V: -1, X: -1 }
        };
    }

    transition(word) {
        return this.transitionStates[this.state][word];
    }
}