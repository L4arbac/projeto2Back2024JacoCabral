const User = require("../model/User");

class UserService {
  // Cria um novo usuário
  async createUser(nome, idade, cpf, usuario, senha, adm) {
    try {
      adm = false;
      const user = await User.create({ nome, idade, cpf, usuario, senha, adm });
      return user;
    } catch (error) {
      throw new Error(`Erro ao criar usuário: ${error.message}`);
    }
  }

  // Atualiza um usuário existente
  async updateUser(id, data) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("Usuário não encontrado");
      }
      // Impede que o próprio usuário se promova para ADM
      data.adm = false;

      const updatedUser = await user.update(data);
      return updatedUser;
    } catch (error) {
      throw new Error(`Erro ao atualizar usuário: ${error.message}`);
    }
  }
 // Atualiza um usuário existente podendo tornar adm 
 async updateUserFree(id, data) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      const updatedUser = await user.update(data);
      return updatedUser;
    } catch (error) {
      throw new Error(`Erro ao atualizar usuário: ${error.message}`);
    }
  }
  // Lista todos os usuários
  async listUsers() {
    try {
      const users = await User.findAll();

      return users;
    } catch (error) {
      throw new Error(`Erro ao listar usuários: ${error.message}`);
    }
  }

  // Busca um usuário pelo ID
  async getUserById(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("Usuário não encontrado");
      }
      return user;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error.message}`);
    }
  }

  async getUserByUsuario(usuario) {
    return await User.findOne({ where: { usuario } });
  }

  // Deleta um usuário pelo ID
  async deleteUser(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      await user.destroy();
      return user;
    } catch (error) {
      throw new Error(`Erro ao deletar usuário: ${error.message}`);
    }
  }
}

module.exports = new UserService();
