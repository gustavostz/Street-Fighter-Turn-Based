import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {habilidadeTest} from "../__tests__/habilidade/habilidade.test";
import {personagemTest} from "../__tests__/personagem/personagem.test";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

habilidadeTest()
personagemTest()