import React, { Component } from 'react';
import Header from '../template/Header';
import Main from '../template/Main';

const headerProps = {
    icon: 'users',
    title: 'Usuário',
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir!'
}

// Criando um componente de classe.
// Trabalhando com método de ciclo de vida do React.
// Trabalhando com estado.
// export default class Use

export default class AAA extends Main {
    render() {
        return (
            <Main {...headerProps}>
                Cadastro de usuário
            </Main>
        )
    }
}
