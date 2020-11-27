import React, {Component} from 'react'
import "./style.css"
import Imagem from "./img/VS.png"
import {Redirect} from "react-router-dom"

export class BarraCentral extends Component {
    constructor(props) {
        super(props)

        this.state = {
            iniciaBatalha: false
        }
    }

    redicionaParaBatalha = () => {
        this.setState({
            iniciaBatalha: true
        })
    }

    render() {
        if (this.state.iniciaBatalha) {
            return <Redirect to="/batalha"/>
        } else {
            return (
                <div className="barra-central">
                    <button disabled={this.props.estaIndisponivelJogar} onClick={this.redicionaParaBatalha}
                            style={{background: this.props.corFundoBotao}}>Jogar
                    </button>
                    <img src={Imagem} alt="icone de versus"/>
                </div>
            )
        }
    }
}