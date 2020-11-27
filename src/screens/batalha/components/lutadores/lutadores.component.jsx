import React, {Component} from 'react'
import "./style.css"
import {Poderes} from "..";
import hadoukenImagem from "./img/hadouken.png"
import ReactPlayer from "react-player";


export class Lutadores extends Component {
    constructor(props) {
        super(props)
        this.personagem = this.props.personagem
        this.state = {
            hadouken: null,
            degPoderBackground: (this.props.player === "1" ? "90deg" : "-90deg"),
            direcaoFlex: (this.props.player === "1" ? "row" : "row-reverse"),
            direcaoAlign: (this.props.player === "1" ? "flex-start" : "flex-end"),
        }
    }

    usarPoder = (habilidade) => {
        this.props.usarPoder(habilidade)
    }

    fazHadouken = () => {
        this.setState({
            hadouken: (
                <>
                    <ReactPlayer url='https://www.youtube.com/watch?v=49jKoMbJyEo' playing={true} width="0" height="0"/>
                    <img src={hadoukenImagem} alt="Hadouken, ataque do Ryu" style={{
                        pointerEvents: "none",
                        opacity: 0,
                        position: "absolute",
                        animationName: this.props.player === "1" ? "hadouken-para-direita" : "hadouken-para-esquerda",
                        animationDuration: "5s"
                    }}/>
                </>
            )
        })
        setTimeout(() => {
            this.setState({
                hadouken: null
            })
        }, 3500)
    }

    render() {
        let listaPoderes = this.personagem.habilidades.map((value, key) => {
            return <Poderes
                key={key}
                habilidade={value}
                degPoderBackground={this.state.degPoderBackground}
                direcaoFlex={this.state.direcaoAlign}
                usarPoder={this.usarPoder}
                turnoAtual={this.props.turnoAtual}
                fazHadouken={this.fazHadouken}
            />
        })

        return (
            <div className="lutadores" style={{
                flexDirection: this.state.direcaoFlex,
                justifyContent: this.props.justifyContent
            }}>
                <div className="poderes" style={{
                    alignItems: this.state.direcaoAlign,
                    display: this.props.display
                }}>
                    <h2>Poderes</h2>
                    {listaPoderes}
                </div>
                <img className="personagem-imagem-luta" style={{
                    filter: this.props.deixaCinza,
                    transform: this.props.player === "1" ? "scaleX(-1)" : "scaleX(1)"
                }}
                     src={this.personagem.imgGrande} alt="Personagem posicionado para lutar"
                />
                {this.state.hadouken}
            </div>
        )
    }
}