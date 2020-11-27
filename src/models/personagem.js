import {Habilidade} from "./habilidade";

export class Personagem {
    constructor(id, nome, imgGrande, habilidades) {
        this.vida = 100
        this.id = id;
        this.nome = nome
        this.imgGrande = imgGrande
        this.habilidades = this._instanciarHabilidades(habilidades)
    }

    receberDano(danoHabilidadeAdversario) {
        this.vida -= danoHabilidadeAdversario
    }

    atacar(adversario, hablidade, turnoAtual) {
        if (!this.calcularChanceDeFalha() && hablidade.retornaSePodeUsarHabilidade(turnoAtual)) {
            if (this.calcularChanceDeCritico()) {
                adversario.receberDano(hablidade.usarHabilidade(turnoAtual) * 2)
            } else {
                adversario.receberDano(hablidade.usarHabilidade(turnoAtual))
            }
        } else {
            adversario.receberDano(hablidade.errouHabilidade(turnoAtual))
        }
        if (adversario.verificarMorte()) {
            return 1
        }
    }

    calcularChanceDeCritico() {
        const chance = Math.random()
        return chance <= 0.03
    }

    calcularChanceDeFalha() {
        const chance = Math.random()
        return chance <= 0.2
    }

    verificarMorte() {
        return this.vida <= 0
    }

    _instanciarHabilidades(habilidades) {
        return habilidades.map((value, key) => {
            return new Habilidade(key, value.name, value.damage, value.turnsToUse)
        })
    }

    getHabilidade(indexHabilidade) {
        return this.habilidades[indexHabilidade]
    }

    resetaHabilidades() {
        this.habilidades.forEach((value) => {
            value.resetaHabilidade()
        })
    }

}