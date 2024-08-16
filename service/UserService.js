const userModel = require('../model/User');

class UserService {
    createUser(nome, idade, cpf, usuario, senha) {
        return userModel.new(nome, idade, cpf, usuario, senha);
    }

    updateUser(id, nome, idade, cpf, usuario, senha) {
        return userModel.update(id, nome, idade, cpf, usuario, senha);
    }

    listUsers() {
        return userModel.list();
    }

    getUserById(id) {
        return userModel.getElementById(id);
    }

    deleteUser(id) {
        return userModel.delete(id);
    }
}

module.exports = new UserService();