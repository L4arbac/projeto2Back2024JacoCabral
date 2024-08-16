let ids = 0;
let users = [];

module.exports = {
    // Cria um novo usuário
    new(nome, idade, cpf, usuario, senha) {
        let user = {
            id: ++ids,
            nome: nome,
            idade: idade,
            cpf: cpf,
            usuario: usuario,
            senha: senha
        };
        users.push(user);
        return user;
    },

    // Atualiza os dados do usuário pelo ID
    update(id, nome, idade, cpf, usuario, senha) {
        let pos = this.getPositionById(id);
        if (pos >= 0) {
            let user = users[pos];
            user.nome = nome || user.nome;
            user.idade = idade || user.idade;
            user.cpf = cpf || user.cpf;
            user.usuario = usuario || user.usuario;
            user.senha = senha || user.senha;
            return user;
        }
        return null;
    },

    // Lista todos os usuários
    list() {
        return users;
    },

    // Obtém um usuário pelo ID
    getElementById(id) {
        let pos = this.getPositionById(id);
        if (pos >= 0) {
            return users[pos];
        }
        return null;
    },

    // Obtém a posição de um usuário pelo ID
    getPositionById(id) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === id) {
                return i;
            }
        }
        return -1;
    },

    // Remove um usuário pelo ID
    delete(id) {
        let i = this.getPositionById(id);
        if (i >= 0) {
            let obj = users[i];
            users.splice(i, 1);
            return obj;
        }
        return null;
    }
};
