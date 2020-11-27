import {Habilidade} from "../../src/models";

export const habilidadeTest = () => describe('Testes - Habilidade', () => {
    it('Quando recem Instanciada, Habilidade deve ser possível usa-la', () => {
        const habilidade = new Habilidade(5, "Vingarti-Lave-A-Louça", 900, 12)
        const podeUsarHabilidadeEsperado = true

        const podeUsarHabilidadeRetornado = habilidade.retornaSePodeUsarHabilidade(1)

        expect(podeUsarHabilidadeRetornado).toEqual(podeUsarHabilidadeEsperado)
    });

    it('Quando usado no 5 Turno, Habilidade com CoolDown de 5 turnos não deve ser possível usa-la no 10 turno', () => {
        const habilidade = new Habilidade(5, "Vingarti-Lave-A-Louça", 900, 5)
        const podeUsarHabilidadeEsperado = false

        habilidade.usarHabilidade(5)
        const podeUsarHabilidadeRetornado = habilidade.retornaSePodeUsarHabilidade(10)

        expect(podeUsarHabilidadeRetornado).toEqual(podeUsarHabilidadeEsperado)
    });

    it('Quando usado no 5 Turno, Habilidade com CoolDown de 5 turnos deve ser possível usa-la no 11 turno', () => {
        const habilidade = new Habilidade(5, "Vingarti-Lave-A-Louça", 900, 5)
        const podeUsarHabilidadeEsperado = true

        habilidade.usarHabilidade(5)
        const podeUsarHabilidadeRetornado = habilidade.retornaSePodeUsarHabilidade(11)

        expect(podeUsarHabilidadeRetornado).toEqual(podeUsarHabilidadeEsperado)
    });

    it('Deve retornar o Dano da Habilidade ao usa-la, caso seja permitido usa-la', () => {
        const habilidade = new Habilidade(5, "Vingarti-Lave-A-Louça", 900, 5)
        const danoHabilidadeEsperado = 900

        habilidade.usarHabilidade(5)
        const danoHabilidadeRetornado = habilidade.usarHabilidade(11)

        expect(danoHabilidadeRetornado).toEqual(danoHabilidadeEsperado)
    });

});
