import React, {Component} from 'react'
import "./style.css"
import {CardPersonagem} from "../";

export class SelecionePersonagem extends Component {

    constructor(props) {
        super(props)

        this.state = {
            preview: <h1> Selecione <br/>um <br/>Personagem </h1>,
        }
    }

    decideSeColocaPreview = (previewPersonagem, lado, nome) => {
        this.setState({
            preview: lado === "azul" ?
                (
                    <div className="preview-e-nome">
                        <img className="imagem-preview" src={previewPersonagem} alt="preview Mostrando o personagem"/>
                        <h1>{nome}</h1>
                    </div>
                ) :
                (
                    <div className="preview-e-nome">
                        <img className="imagem-preview" src={previewPersonagem} alt="preview Mostrando o personagem"
                             style={{transform: "scaleX(-1)"}}/>
                        <h1>{nome}</h1>

                    </div>
                )
        })
        this.atualizaButtonCasoAmbosLadosSelecionados(lado)
    }

    atualizaButtonCasoAmbosLadosSelecionados(lado) {
        let {ladoEsquerdoSelecionado, ladoDireitoSelecionado} = this.props
        if (lado === "vermelho") {
            ladoEsquerdoSelecionado = true
        }
        if (lado === "azul") {
            ladoDireitoSelecionado = true
        }
        if (ladoEsquerdoSelecionado && ladoDireitoSelecionado) {
            this.props.corFundoBotao("#F6DD00")
        }
    }

    render() {
        const personagens = this.props.listaPersonagens.map((value, key) => {
            return <CardPersonagem
                key={key}
                personagem={value}
                iconePersonagem={value.smallImg}
                previewPersonagem={value.largeImg}
                idPersonagem={value.id}
                nomePersonagem={value.name}
                lado={this.props.lado}
                decideSeChamaPreview={this.decideSeColocaPreview}
                ladoEsquerdoSelecionadoMetodo={this.props.ladoEsquerdoSelecionadoMetodo}
                ladoDireitoSelecionadoMetodo={this.props.ladoDireitoSelecionadoMetodo}
            />
        })

        return (
            <div className="selecionador-jogador"
                 style={{background: ` linear-gradient(180deg, ${this.props.corFundo} 0%, #000000 100%)`}}>
                {this.state.preview}
                <div className="personagens">
                    {personagens}
                </div>
            </div>
        )
    }
}