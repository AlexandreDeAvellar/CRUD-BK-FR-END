import React, { Component } from 'react';
import Main from '../template/Main';
import axios from 'axios';

const headerProps = {
    libIcon: "fa fa-",
    icon: 'users',
    title: 'Usuário',
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir!'
}


const baseUrl = 'http://localhost:3001/users';
const initialState = {
    user: { name: '', email: '' },
    list: []
}


// Criando um componente de classe.
// Trabalhando com método de ciclo de vida do React.
// Trabalhando com estado.
// export default class UserCrud

export default class UserCrud extends Component {

    state = { ...initialState };

    clear() {
        this.setState({ user: initialState.user });
    }

    save() {
        const user = this.state.user;
        const method = user.id ? 'put' : 'post';
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl;
        axios[method](url, user)
            .then(resp => {
                const list = this.getUpdatedList(resp.data);
                this.setState({ user: initialState.user, list });
            })
    }

    getUpdatedList(user) {
        // Essa função filter vai verificar se o id dentro de list é diferente do id que veio no parâmetro
        // e se for diferente ele adiciona na const list.
        // Isso é para remover o id de dentro da list. (Acredito que tem outras formas de fazer isso.)

        const list = this.state.list.filter(u => u.id !== user.id)

        // Adicionando o usuário na lista de novo na primeira posição.
        list.unshift(user);
        return list;
    }

    render() {
        return (
            <Main {...headerProps}>
                Cadastro de usuário
            </Main>
        )
    }
}
