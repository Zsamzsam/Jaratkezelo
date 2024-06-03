export class JaratKezelo {
    constructor() {
        this.jaratok = {};
    }

    ujJarat(jaratSzam, repterHonnan, repterHova, indulas) {
        if (this.jaratok[jaratSzam]) {
            throw new Error("A járatszám már létezik!");
        }

        this.jaratok[jaratSzam] = { repterHonnan, repterHova, indulas, keses: 0 };
    }

    keses(jaratSzam, keses) {
        if (!this.jaratok[jaratSzam]) {
            throw new Error("A járat nem létezik!");
        }

        this.jaratok[jaratSzam].keses += keses;

        if (this.jaratok[jaratSzam].keses < 0) {
            throw new Error("A késés nem lehet negatív!");
        }
    }

    mikorIndul(jaratSzam) {
        if (!this.jaratok[jaratSzam]) {
            throw new Error("A járat nem létezik!");
        }

        let indulas = new Date(this.jaratok[jaratSzam].indulas);
        indulas.setMinutes(indulas.getMinutes() + this.jaratok[jaratSzam].keses);

        return indulas;
    }

    jaratokRepuloterrol(repter) {
        let jaratSzamok = [];

        for (let jaratSzam in this.jaratok) {
            if (this.jaratok[jaratSzam].repterHonnan === repter) {
                jaratSzamok.push(jaratSzam);
            }
        }

        return jaratSzamok;
    }
}