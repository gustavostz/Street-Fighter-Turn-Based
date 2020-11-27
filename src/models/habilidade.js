export class Habilidade {
    constructor(id, nome, dano, turnoAEsperar) {
        this.id = id
        this.nome = nome
        this.dano = dano
        this.turnoAEsperar = turnoAEsperar
        this.utlimoTurnoUtilizado = 0
    }

    retornaSePodeUsarHabilidade(turnoAtual) {
        if (this.utlimoTurnoUtilizado === 0) {
            return true
        }
        return ((turnoAtual - this.utlimoTurnoUtilizado) > this.turnoAEsperar)
    }

    usarHabilidade(turnoAtual) {
        this.utlimoTurnoUtilizado = turnoAtual
        return this.dano
    }

    errouHabilidade(turnoAtual) {
        this.utlimoTurnoUtilizado = turnoAtual
        return 0;
    }

    resetaHabilidade() {
        this.utlimoTurnoUtilizado = 0
    }
}