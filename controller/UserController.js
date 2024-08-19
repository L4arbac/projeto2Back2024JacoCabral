const userService = require("../service/UserService");
const authMiddleware = require("../auth/authMiddleware");

class UserController {
  async create(req, res) {
    try {
      const { nome, idade, cpf, usuario, senha, adm } = req.body;
      const user = await userService.createUser(
        nome,
        idade,
        cpf,
        usuario,
        senha,
        adm
      );
      res.status(201).json(user);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao criar usuário", error: error.message });
    }
  }

  async update(req, res) {
    authMiddleware.authenticateToken(req, res, async () => {
      try {
        const { id } = req.params;

        if (req.user.id == id || req.user.adm) {
          const data = req.body;
          const updatedUser = await userService.updateUser(id, data);
          res.status(200).json(updatedUser);
        } else {
          res.status(403).json({
            message: "Processo só poderá ser realizado pelo próprio usuário!",
          });
        }
      } catch (error) {
        res
          .status(500)
          .json({ message: "Erro ao atualizar usuário", error: error.message });
      }
    });
  }

  async list(req, res) {
    authMiddleware.authenticateToken(req, res, async () => {
      try {
        const users = await userService.listUsers();
        res.status(200).json(users);
      } catch (error) {
        res
          .status(500)
          .json({ message: "Erro ao listar usuários", error: error.message });
      }
    });
  }

  async getById(req, res) {
    authMiddleware.authenticateToken(req, res, async () => {
      try {
        const { id } = req.params;
        const user = await userService.getUserById(id);
        res.status(200).json(user);
      } catch (error) {
        res
          .status(500)
          .json({ message: "Erro ao buscar usuário", error: error.message });
      }
    });
  }

  async delete(req, res) {
    authMiddleware.authenticateToken(req, res, async () => {
      try {
        const { id } = req.params;

        if (req.user.id == id || req.user.adm) {
          const deletedUser = await userService.deleteUser(id);
          res.status(200).json(deletedUser);
        } else {
          res.status(403).json({
            message:
              "Processo só poderá ser realizado pelo próprio usuário ou ADM!",
          });
        }
      } catch (error) {
        res
          .status(500)
          .json({ message: "Erro ao deletar usuário", error: error.message });
      }
    });
  }

  async login(req, res) {
    try {
      const { usuario, senha } = req.body;
      const user = await userService.getUserByUsuario(usuario);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      if (!(senha == user.senha)) {
        return res.status(401).json({ message: "Senha inválida." });
      }

      const token = authMiddleware.generateToken({
        id: user.id,
        usuario: user.usuario,
        adm: user.adm,
      });

      return res.status(200).json({ message: "Login bem-sucedido", token });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao fazer login", error: error.message });
    }
  }

  async makeAdm(req, res) {
    
    authMiddleware.authenticateToken(req, res, async () => {
      try {
        const { id } = req.params;
        
        if (req.user.adm) {
          const updatedUser = await userService.updateUserFree(id, { adm: true });
          res.status(200).json(updatedUser);
        } else {
          res.status(403).json({
            message: "Processo só poderá ser realizado por um ADM!",
          });
        }
      } catch (error) {
        res.status(500).json({
          message: "Erro ao tornar usuário ADM",
          error: error.message,
        });
      }
    });
  }

  async popDatabase(req, res) {
    try {

      const usersData = req.body;
      var user = null;

      for (let userData of usersData) {

        user = await userService.getUserByUsuario(userData.usuario);

        if (!user) {

          await userService.createUser(
            userData.nome,
            userData.idade,
            userData.cpf,
            userData.usuario,
            userData.senha,
            false
          );

        }
      }

      const adm = await userService.getUserByUsuario("patricia.lima");
      await userService.updateUserFree(adm.id, {  "adm": true});

      res.status(200).json({
        message: "Banco populado com sucesso!"
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao popular o banco", error: error.message });
    }
  }
}

module.exports = new UserController();
