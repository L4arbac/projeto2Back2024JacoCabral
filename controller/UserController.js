const userService = require('../service/UserService');

class UserController {
    async create(req, res) {
        try {
            const { nome, idade, cpf, usuario, senha } = req.body;
            const user = userService.createUser(nome, idade, cpf, usuario, senha);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar usuário', error });
        }
    }

    async update(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const { nome, idade, cpf, usuario, senha } = req.body;
            const user = userService.updateUser(id, nome, idade, cpf, usuario, senha);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'Usuário não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar usuário', error });
        }
    }

    async list(req, res) {
        try {
            const users = userService.listUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar usuários', error });
        }
    }

    async getById(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const user = userService.getUserById(id);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'Usuário não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro ao obter usuário', error });
        }
    }

    async delete(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const user = userService.deleteUser(id);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'Usuário não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar usuário', error });
        }
    }
}

module.exports = new UserController();
