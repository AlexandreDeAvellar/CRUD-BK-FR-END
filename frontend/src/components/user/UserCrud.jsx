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

    componentDidMount() {
        axios(baseUrl).then(res => {
            this.setState({ list: res.data });
        });
    }

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

    getUpdatedList(user, add = true) {
        // Essa função filter vai verificar se o id dentro de list é diferente do id que veio no parâmetro
        // e se for diferente ele adiciona na const list.
        // Isso é para remover o id de dentro da list. (Acredito que tem outras formas de fazer isso.)

        const list = this.state.list.filter(u => u.id !== user.id)

        // Adicionando o usuário na lista de novo na primeira posição.
        if (add) list.unshift(user);
        return list;
    }

    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value;
        this.setState({ user });
    }

    load(user) {
        axios(baseUrl).then(e => {
            this.setState({ user });
        });
    }

    remove(user) {
        axios.delete(`${baseUrl}/${user.id}`).then(e => {
            const list = this.getUpdatedList(user, false);
            this.setState({ list });
        })
    }

    // Criando a função que renderiza o formulário.
    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control" name="name" value={this.state.user.name}
                                onChange={e => this.updateField(e)} placeholder="Digite o nome..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label >E-mail</label>
                            <input type="text" className="form-control" name="email"
                                value={this.state.user.email} onChange={e => this.updateField(e)}
                                placeholder="Digite o e-mail..." />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary" onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2" onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOME</th>
                        <th>EMAIL</th>
                        <th>AÇÕES</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRow()}
                </tbody>
            </table>
        )
    }

    renderRow() {
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning" onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2" onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    // Render é a função principal.
    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}
