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
                'q': currentState,
                's': Object.keys(this.transitionStates[this.state]),
                'r': this.transition(val)
            };
            this.state = this.transition(val);
            if (this.state === undefined) {
                this.errorCount += 1;
                return response;
            } else {
                console.log(`Neuer Status: ${this.state}`);
                return response;
            }
        }

        if (this.state === this.finalState && this.errorCount == 0) { // dea test passed
            console.log(this.result[1]);
            return this.result[1];
        } else { // dea test failed
            console.log(this.result[0]);
            return this.result[0];
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