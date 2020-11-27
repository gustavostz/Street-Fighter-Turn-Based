import React, {Component} from 'react';
import './style.css';
import {PersonagemService} from "../../service";
import {Cabecalho, Lutadores} from "./components";
import {Personagem} from "../../models/personagem";
import {Link} from "react-router-dom";
import ReactPlayer from "react-player";


export class Batalha extends Component {
    constructor(props) {
        super(props)

        this.personagemService = new PersonagemService();

        this.state = {
            player1: new Personagem(this.personagemService.getObject("player1").id,
                this.personagemService.getObject("player1").name,
                this.personagemService.getObject("player1").largeImg,
                this.personagemService.getObject("player1").skills),
            player2: new Personagem(this.personagemService.getObject("player2").id,
                this.personagemService.getObject("player2").name,
                this.personagemService.getObject("player2").largeImg,
                this.personagemService.getObject("player2").skills),
            player1Joga: this._qmComecaPartida(),
            turnoPlayer1: 1,
            turnoPlayer2: 1,
            venceu: false,
            contador: 30,
            errou: false
        }
        this.contaTempoParaPassarTurno()
    }

    contaTempoParaPassarTurno = () => {
        this.intervalo = setInterval(() => {
                let tempo = this.state.contador
                if (tempo === 0) {
                    this.setState({
                        contador: 30,
                        player1Joga: !this.state.player1Joga
                    })
                } else {
                    tempo--
                    this.setState({
                        contador: tempo
                    })
                }
            }
            , 1000)
    }

    _qmComecaPartida = () => {
        const chance = Math.random()
        return chance <= 0.5;
    }

    usarPoder = (habilidade) => {
        let tomouDano;
        if (!this.state.player1Joga) {
            tomouDano = this.state.player2.vida

            const passouTurno = this.state.turnoPlayer1 + 1
            this.setState({
                venceu: this.state.player1.atacar(this.state.player2, habilidade, this.state.turnoPlayer1),
                turnoPlayer1: passouTurno,
                player1Joga: !this.state.player1Joga,
                contador: 30
            })

            tomouDano -= this.state.player2.vida
            if (tomouDano) {
                this.setState({errou: false})
            } else {
                this.setState({errou: true})
            }
        } else {
            tomouDano = this.state.player1.vida

            const passouTurno = this.state.turnoPlayer2 + 1
            this.setState({
                venceu: this.state.player2.atacar(this.state.player1, habilidade, this.state.turnoPlayer2),
                turnoPlayer2: passouTurno,
                player1Joga: !this.state.player1Joga,
                contador: 30
            })

            tomouDano -= this.state.player1.vida
            if (tomouDano) {
                this.setState({errou: false})
            } else {
                this.setState({errou: true})
            }
        }
    }

    printaCabecalho = () => {
        const vidaPlayer1 = (this.state.player1.vida < 0 ? 0 : this.state.player1.vida) + "%"
        const vidaPlayer2 = (this.state.player2.vida < 0 ? 0 : this.state.player2.vida) + "%"
        return (
            <div className="header">
                <Cabecalho vidaRestante={vidaPlayer1} nomePersonagem={this.state.player1.nome}
                           alinhamentoNome="flex-start"/>
                <span className="versus-batalha"
                      style={{color: this.state.contador > 5 ? "white" : "red"}}>VS<br/>{this.state.contador}</span>
                <Cabecalho vidaRestante={vidaPlayer2} nomePersonagem={this.state.player2.nome}
                           espelha="scaleX(-1)"
                           alinhamentoNome="flex-end"/>
            </div>
        )
    }

    reiniciaPartida = () => {
        this.personagemService = new PersonagemService();
        this.setState({
            player1: new Personagem(this.personagemService.getObject("player1").id,
                this.personagemService.getObject("player1").name,
                this.personagemService.getObject("player1").largeImg,
                this.personagemService.getObject("player1").skills),
            player2: new Personagem(this.personagemService.getObject("player2").id,
                this.personagemService.getObject("player2").name,
                this.personagemService.getObject("player2").largeImg,
                this.personagemService.getObject("player2").skills),
            player1Joga: this._qmComecaPartida(),
            turnoPlayer1: this.state.turnoPlayer1 + 100,
            turnoPlayer2: this.state.turnoPlayer2 + 100,
            venceu: false,
            contador: 30
        })
        this.contaTempoParaPassarTurno()
    }

    printaModalVitoria = () => {
        const nomeDoJogadorVencedor = this.state.player1Joga ? this.state.player1.nome : this.state.player2.nome
        let gifDoSilvioComemorando = null
        if (nomeDoJogadorVencedor === "Silvio") {
            gifDoSilvioComemorando = (
                <>
                    <ReactPlayer url='https://www.youtube.com/watch?v=Q7eEHbPyqAE' playing={true} width="0" height="0"/>
                    <img className="comemoracaoSilvio"
                         src="https://thumbs.gfycat.com/ForcefulRawCavy-size_restricted.gif"
                         alt="Silvio Santos dançando"/>
                </>
            )
        }
        clearInterval(this.intervalo)
        return (
            <div className="modal-final">
                <h2 className="nome-vencedor">{nomeDoJogadorVencedor.toUpperCase()} WINS</h2>
                <div className="botoes-finais">
                    <button onClick={this.reiniciaPartida}>Jogar Novamente</button>
                    <Link to="/">
                        <button>Trocar Personagens</button>
                    </Link>
                </div>
                {gifDoSilvioComemorando}
            </div>
        )
    }


    render() {
        const cabecalho = this.printaCabecalho()
        const modalFinal = this.state.venceu ? this.printaModalVitoria() : null
        const mostraFaustaoErrou = this.state.errou ?
            <img className="errou-faustao" src="https://media.giphy.com/media/3XuEQA6Ygv0StEzuRg/giphy.gif"
                 alt="Faustão falando Errou"/> : null
        return (
            <div className="campo-de-batalha">
                {modalFinal}
                {mostraFaustaoErrou}
                <ReactPlayer url='https://www.youtube.com/watch?v=2ZKBeHLEGtQ' playing={this.state.errou} width="0"
                             height="0"/>
                {cabecalho}
                <div className="body-batalha">
                    <Lutadores personagem={this.state.player1} player="1"
                               display={this.state.player1Joga ? "none" : "flex"}
                               justifyContent={this.state.player1Joga ? "flex-end" : "space-between"}
                               deixaCinza={this.state.player1Joga ? "grayscale(1)" : "grayscale(0)"}
                               usarPoder={this.usarPoder} turnoAtual={this.state.turnoPlayer1}/>

                    <Lutadores personagem={this.state.player2} player="2"
                               display={this.state.player1Joga ? "flex" : "none"}
                               justifyContent={this.state.player1Joga ? "space-between" : "flex-end"}
                               deixaCinza={this.state.player1Joga ? "grayscale(0)" : "grayscale(1)"}
                               usarPoder={this.usarPoder} turnoAtual={this.state.turnoPlayer2}/>
                </div>
            </div>
        )
            ;
    }
}
