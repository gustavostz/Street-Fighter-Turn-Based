import React, {Component} from 'react';
import './style.css';
import {SelecionePersonagem, BarraCentral} from "./components/";
import listaPersonagens from "../../personagensJson"
import ReactPlayer from "react-player";


export class Home extends Component {
    constructor(props) {
        super(props)

        this.selecionadoLadoEsquerdo = false
        this.selecionadoLadoDireito = false

        this.state = {
            corFundoBotao: "#A3A3A3",
            selecionadoLadoEsquerdo: false,
            selecionadoLadoDireito: false,
            estaIndisponivelJogar: true,
            tocarMusica: true
        }
    }

    setCorFundoBotao = (cor) => {
        this.setState({
            corFundoBotao: cor
        })
    }

    selecionaLadoEsquerdo = () => {
        this.selecionadoLadoEsquerdo = true
        this.setState({
            selecionadoLadoEsquerdo: true,
        })
        this.estaIndisponivelJogar()
    }

    selecionaLadoDireito = () => {
        this.selecionadoLadoDireito = true
        this.setState({
            selecionadoLadoDireito: true,
        })
        this.estaIndisponivelJogar()
    }

    estaIndisponivelJogar = () => {
        if (this.selecionadoLadoDireito && this.selecionadoLadoEsquerdo) {
            this.setState({
                estaIndisponivelJogar: false
            })
        }
    }

    tocaSom = () => {
        this.setState({
            tocarMusica: !this.state.tocarMusica
        })
    }

    render() {
        return (
            <div className="body">
                <input id="input-music" type="checkbox" onChange={this.tocaSom}/>
                <label className="label-music" htmlFor="input-music">
                    <img style={{animationName: this.state.tocarMusica ? "musica-animacao" : null}}
                         className="botao-som"
                         src="https://cdn3.iconfinder.com/data/icons/watchify-v1-0-32px/32/music-note-512.png"
                         alt="icone de musica"/>
                </label>
                <ReactPlayer url='https://www.youtube.com/watch?v=oUn549UmSlw' playing={this.state.tocarMusica}
                             width="0" height="0" loop={true}/>
                <SelecionePersonagem listaPersonagens={listaPersonagens} corFundo="#A52626" lado="vermelho"
                                     corFundoBotao={this.setCorFundoBotao}
                                     ladoEsquerdoSelecionado={this.selecionadoLadoEsquerdo}
                                     ladoDireitoSelecionado={this.selecionadoLadoDireito}
                                     ladoEsquerdoSelecionadoMetodo={this.selecionaLadoEsquerdo}/>

                <BarraCentral corFundoBotao={this.state.corFundoBotao}
                              estaIndisponivelJogar={this.state.estaIndisponivelJogar}
                              preparaPersonagensSelecionados={this.preparaPersonagensSelecionados}/>

                <SelecionePersonagem listaPersonagens={listaPersonagens} corFundo="#13499B" lado="azul"
                                     corFundoBotao={this.setCorFundoBotao}
                                     ladoDireitoSelecionado={this.selecionadoLadoDireito}
                                     ladoEsquerdoSelecionado={this.selecionadoLadoEsquerdo}
                                     ladoDireitoSelecionadoMetodo={this.selecionaLadoDireito}/>
            </div>
        );
    }
}
