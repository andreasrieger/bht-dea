class Dea {
    constructor(sequence) {
        console.log(sequence);

        const
            accept = "Zeichenfolge akzeptiert",
            reject = "Zeichenfolge abgelehnt",
            error = "Fehler",
            transitions = []
            ;

        this.state = 0;
        this.finalState = 7;
        this.errorCount = 0;
        /*         this.response = {
                    0: "invalid",
                    1: "valid"
                }; */
        this.result = {
            0: "failed",
            1: "passed"
        };

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
                // return response; // Schleife wird nach einem Durchlauf verlassen
            } else {
                console.log(`Neuer Status: ${this.state}`);
                transitions.push(response);
                console.log(transitions);
                // return response; // Schleife wird nach einem Durchlauf verlassen
            }
        }

        if (this.state === this.finalState && this.errorCount == 0) { // dea test passed
            console.log(this.result[1]);
            return {
                0: this.result[1],
                1: transitions
            };
        } else { // dea test failed
            console.log(this.result[0]);
            return {
                0: this.result[0],
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