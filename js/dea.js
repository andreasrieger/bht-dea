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
                break;
            }
            console.log(`Neuer Status: ${this.state}`);
        }

        if (this.state === this.finalState) {
            console.log(accept);
            this.response = accept;
            return this.response;
        } else {
            console.log(reject);
            this.response = reject;
            return this.response;
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