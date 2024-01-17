import React, {Component} from 'react'
import "./style.css"

export class Poderes extends Component {

    usarPoder = () => {
        if (this.props.habilidade.nome === "Hadouken" || this.props.habilidade.nome === "Super Hadouken") {
            this.props.fazHadouken();
        }
        this.props.usarPoder(this.props.habilidade)
    }

    render() {
        const habilidadeDisponivel = this.props.habilidade.retornaSePodeUsarHabilidade(this.props.turnoAtual) ? 0 : 1
        const desabilitarSeletorHabilidade = habilidadeDisponivel === 1

        return (
            <button disabled={desabilitarSeletorHabilidade} onClick={this.usarPoder} className="poder" style={{
                background: `linear-gradient(${this.props.degPoderBackground},
                 rgba(21, 130, 165, 0.8) 73.89%, rgba(20, 103, 129, 0) 100%)`,
                filter: `grayscale(${habilidadeDisponivel})`
            }}>

                <h3 style={{justifyContent: this.props.direcaoFlex}}>{this.props.habilidade.nome}</h3>
                <p style={{justifyContent: this.props.direcaoFlex}}>{this.props.habilidade.dano} DAMAGE
                    | {this.props.habilidade.turnoAEsperar} TURNS</p>
            </button>
        )
    }
}