class Dea {
    constructor(sequence) {
        console.log(sequence);

        const transitions = [];
        this.state = 0;
        this.finalState = 7;
        this.errorCount = 0;

        for (const val of sequence) {
            const currentState = this.state;
            const response = {
                0: currentState,
                1: val,
                2: this.transition(val)
            };
            this.state = this.transition(val);
            if (this.state === undefined) {
                this.errorCount += 1;
                response[2] = null;
                transitions.push(response);
                return {
                    0: false,
                    1: transitions
                };
                // break; // Schleife wird verlassen
            } else {
                console.log(`Neuer Status: ${this.state}`);
                transitions.push(response);
                console.log(transitions);
            }
        }

        if (this.state === this.finalState && this.errorCount == 0) { // dea test passed
            console.log(true);
            return {
                0: true,
                1: transitions
            };
        } else { // dea test failed
            console.log(false);
            return {
                0: false,
                1: transitions
            };
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