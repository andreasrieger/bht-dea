class Dea {
    constructor(sequence) {
        console.log(sequence);

        
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
                // console.log(`Error: Status unknown`);
                this.errorCount += 1;
                response.push(-1);
                transitions.push(response);
                // console.log(response);
                console.log(transitions);
                return [false, transitions];
            } else {
                // console.log(`New State: ${this.state}`);
                response.push(this.state);
                transitions.push(response);
                // console.log(transitions);
            }
        }

        if (this.state === this.finalState && this.errorCount == 0) { // dea test passed
            // console.log(true);
            return [true, transitions];
        } else { // dea test failed
            // console.log(false);
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
            6: { E: 7 }
        };
    }

    transition(word) {
        return this.transitionStates[this.state][word];
    }
}