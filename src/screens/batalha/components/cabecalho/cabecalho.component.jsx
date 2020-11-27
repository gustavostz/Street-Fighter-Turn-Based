import React, {Component} from 'react'
import "./style.css"

export class Cabecalho extends Component {

    render() {
        return (
            <div className="vida-e-nome">
                <div className="cabecalho" style={{justifyContent: `${this.props.alinhamentoNome}`}}>
                    <div className="dano-tomado" style={{
                        width: this.props.vidaRestante,
                        transition: "2s"
                    }}/>
                    <div className="vida" style={{width: this.props.vidaRestante}}>
                        <span className="vida-texto">{this.props.vidaRestante}</span>
                    </div>
                </div>
                <h2 className="nome-personagem" style={{alignSelf: `${this.props.alinhamentoNome}`}}>
                    {this.props.nomePersonagem.toUpperCase()}</h2>
            </div>
        )
    }
}