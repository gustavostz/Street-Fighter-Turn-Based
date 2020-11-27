import React, {Component} from 'react'
import "./style.css"
import {PersonagemService} from "../../../../service";

export class CardPersonagem extends Component {
    chamaPreview = () => {

        if (this.props.lado === "vermelho") {
            this.props.ladoEsquerdoSelecionadoMetodo()
        } else {
            this.props.ladoDireitoSelecionadoMetodo()
        }
        this.props.decideSeChamaPreview(this.props.previewPersonagem, this.props.lado, this.props.nomePersonagem)
        this.salvaPersonagem()
    }

    salvaPersonagem = () => {
        const personagemService = new PersonagemService();
        if (this.props.lado === "vermelho") {
            personagemService.setObject("player1", this.props.personagem)
        } else {
            personagemService.setObject("player2", this.props.personagem)
        }
    }

    render() {

        return (
            <div className="quadradinho">
                <input onChange={this.chamaPreview} type="radio" name={this.props.lado}
                       id={`${this.props.idPersonagem}-${this.props.lado}`}/>
                <label htmlFor={`${this.props.idPersonagem}-${this.props.lado}`}>
                    <img src={this.props.iconePersonagem} alt="icone mostrando personagem disponível para luta"/>
                    <p>{this.props.nomePersonagem.toUpperCase()}</p>
                </label>
            </div>
        )
    }
}