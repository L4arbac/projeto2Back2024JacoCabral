const Venda = require('../model/Venda');
const User = require('../model/User');
const Cafe = require('../model/Cafe');

const vendaService = {
  async createVenda(userId, cafeIds, quantidade, total) {
    try {
      // Cria a venda
      const venda = await Venda.create({ quantidade, total, UserId: userId });

      // Adiciona os cafés à venda
      await venda.addCafes(cafeIds);

      return venda;
    } catch (error) {
      throw new Error(`Erro ao criar venda: ${error.message}`);
    }
  },

  async listVendas() {
    try {
      return await Venda.findAll({
        include: [User, Cafe]
      });
    } catch (error) {
      throw new Error(`Erro ao listar vendas: ${error.message}`);
    }
  },

  async getVendaById(id) {
    try {
      return await Venda.findByPk(id, {
        include: [User, Cafe]
      });
    } catch (error) {
      throw new Error(`Erro ao buscar venda: ${error.message}`);
    }
  },

  async updateVenda(id, updates) {
    try {
      const venda = await this.getVendaById(id);
      if (!venda) {
        throw new Error('Venda não encontrada');
      }

      return await venda.update(updates);
    } catch (error) {
      throw new Error(`Erro ao atualizar venda: ${error.message}`);
    }
  },

  async deleteVenda(id) {
    try {
      const venda = await this.getVendaById(id);
      if (!venda) {
        throw new Error('Venda não encontrada');
      }

      await venda.destroy();
      return venda;
    } catch (error) {
      throw new Error(`Erro ao deletar venda: ${error.message}`);
    }
  }
};

module.exports = vendaService;
