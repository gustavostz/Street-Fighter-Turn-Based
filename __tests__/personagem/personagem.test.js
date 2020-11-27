import {Personagem} from "../../src/models";

export const personagemTest = () => describe('Testes - Personagem', () => {
    it('Quando usado atacar com habilidade de 40 de dano, advesario deve ficar com 60 de vida', () => {
        const personagem1 = new Personagem(1, "gustavo", "?", [
            {
                name: 'Punch',
                damage: 5,
                turnsToUse: 0
            },
            {
                name: 'Hadouken',
                damage: 20,
                turnsToUse: 2
            },
            {
                name: 'Super Hadouken',
                damage: 40,
                turnsToUse: 5
            }
        ])
        const personagem2 = new Personagem(2, "stz", "?", [
            {
                name: 'Punch',
                damage: 5,
                turnsToUse: 0
            },
            {
                name: 'Hadouken',
                damage: 20,
                turnsToUse: 2
            },
            {
                name: 'Super Hadouken',
                damage: 40,
                turnsToUse: 5
            }
        ])
        const vidaPersonagem2Esperado = personagem2.vida - 40

        personagem1.atacar(personagem2, personagem2.getHabilidade(2), 5);

        const vidaPersonagem2Retornado = personagem2.vida

        expect(vidaPersonagem2Retornado).toEqual(vidaPersonagem2Esperado)
    });

    it('Quando usado atacar com habilidade de 40 de dano 3x, advesario deve retornar como morto no atacar, ou seja, true é vitoria', () => {
        const personagem1 = new Personagem(5, "gustavo", "?", [
            {
                name: 'Punch',
                damage: 5,
                turnsToUse: 0
            },
            {
                name: 'Hadouken',
                damage: 20,
                turnsToUse: 2
            },
            {
                name: 'Super Hadouken',
                damage: 40,
                turnsToUse: 5
            }
        ])
        const personagem2 = new Personagem(9, "stz", "?", [
            {
                name: 'Punch',
                damage: 5,
                turnsToUse: 0
            },
            {
                name: 'Hadouken',
                damage: 20,
                turnsToUse: 2
            },
            {
                name: 'Super Hadouken',
                damage: 40,
                turnsToUse: 5
            }
        ])
        const morteEsperada = true

        personagem1.atacar(personagem2, personagem2.getHabilidade(2), 5);
        personagem1.atacar(personagem2, personagem2.getHabilidade(2), 15);
        const morteRetornada = personagem1.atacar(personagem2, personagem2.getHabilidade(2), 25);


        expect(morteRetornada).toEqual(morteEsperada)
    });
});