const userService = require("../service/UserService");
const authMiddleware = require("../auth/authMiddleware");

class UserController {
  async create(req, res) {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint para criar um novo usuário.'
    try {
      const { nome, idade, cpf, usuario, senha, adm } = req.body;
      const user = await userService.createUser(nome, idade, cpf, usuario, senha, adm);
      res.status(201).json({
        message: "Usuário criado com sucesso!",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        message: "Erro ao criar usuário",
        error: error.message,
      });
    }
  }

  async update(req, res) {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint para atualizar um usuário existente.'
    authMiddleware.authenticateToken(req, res, async () => {
      try {
        const { id } = req.params;

        if (req.user.id == id || req.user.adm) {
          const data = req.body;
          const updatedUser = await userService.updateUser(id, data);
          res.status(200).json({
            message: "Usuário atualizado com sucesso!",
            data: updatedUser,
          });
        } else {
          res.status(403).json({
            message: "Processo só poderá ser realizado pelo próprio usuário!",
          });
        }
      } catch (error) {
        res.status(500).json({
          message: "Erro ao atualizar usuário",
          error: error.message,
        });
      }
    });
  }

  async list(req, res) {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint para listar todos os usuários com paginação.'
    authMiddleware.authenticateToken(req, res, async () => {
      try {
        const limite = parseInt(req.query.limite) || 5;  
        const pagina = parseInt(req.query.pagina) || 1; 
  
        if (![5, 10, 30].includes(limite)) {
            return res.status(400).json({ message: "Limite inválido. Os valores possíveis são 5, 10 ou 30." });
        }
        const users = await userService.listUsers(limite, pagina);
        res.status(200).json({
          message: "Usuários listados com sucesso!",
          data: users,
        });
      } catch (error) {
        res.status(500).json({
          message: "Erro ao listar usuários",
          error: error.message,
        });
      }
    });
  }

  async getById(req, res) {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint para recuperar um usuário pelo ID.'
    authMiddleware.authenticateToken(req, res, async () => {
      try {
        const { id } = req.params;
        const user = await userService.getUserById(id);

        if (!user) {
          return res.status(404).json({
            message: "Usuário não encontrado.",
          });
        }

        res.status(200).json({
          message: "Usuário recuperado com sucesso!",
          data: user,
        });
      } catch (error) {
        res.status(500).json({
          message: "Erro ao buscar usuário",
          error: error.message,
        });
      }
    });
  }

  async delete(req, res) {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint para deletar um usuário pelo ID.'
    authMiddleware.authenticateToken(req, res, async () => {
      try {
        const { id } = req.params;

        if (req.user.id == id || req.user.adm) {
          await userService.deleteUser(id);
          res.status(200).json({
            message: "Usuário deletado com sucesso!",
          });
        } else {
          res.status(403).json({
            message: "Processo só poderá ser realizado pelo próprio usuário ou ADM!",
          });
        }
      } catch (error) {
        res.status(500).json({
          message: "Erro ao deletar usuário",
          error: error.message,
        });
      }
    });
  }

  async login(req, res) {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint para autenticar um usuário e gerar um token.'
    try {
      const { usuario, senha } = req.body;
      const user = await userService.getUserByUsuario(usuario);

      if (!user) {
        return res.status(404).json({
          message: "Usuário não encontrado.",
        });
      }

      if (!(senha == user.senha)) {
        return res.status(401).json({
          message: "Senha inválida.",
        });
      }

      const token = authMiddleware.generateToken({
        id: user.id,
        usuario: user.usuario,
        adm: user.adm,
      });

      return res.status(200).json({
        message: "Login bem-sucedido",
        token,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao fazer login",
        error: error.message,
      });
    }
  }

  async makeAdm(req, res) {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint para promover um usuário a administrador.'
    authMiddleware.authenticateToken(req, res, async () => {
      try {
        const { id } = req.params;

        if (req.user.adm) {
          const updatedUser = await userService.updateUserFree(id, { adm: true });
          res.status(200).json({
            message: "Usuário promovido a administrador com sucesso!",
            data: updatedUser,
          });
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
}

module.exports = new UserController();
