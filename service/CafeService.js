const Cafe = require("../model/Cafe");

const CafeService = {
  async createCafe(nome, descricao,preco) {
    try {
      const cafe = await Cafe.create({ nome,descricao, preco });
      return cafe;
    } catch (error) {
      throw new Error(`Erro ao criar café: ${error.message}`);
    }
  },

  async getAllCafes() {
    try {
      const cafes = await Cafe.findAll();
      return cafes;
    } catch (error) {
      throw new Error(`Erro ao listar cafés: ${error.message}`);
    }
  },

  async getCafeById(id) {
    try {
      const cafe = await Cafe.findByPk(id);
      if (!cafe) {
        throw new Error('Café não encontrado');
      }
      return cafe;
    } catch (error) {
      throw new Error(`Erro ao buscar café: ${error.message}`);
    }
  },

  async getCafeByName(nome) {
    return await Cafe.findOne({ where: { nome } });
  },

  async updateCafe(id, updates) {
    try {
      const cafe = await Cafe.findByPk(id);
      if (!cafe) {
        throw new Error('Café não encontrado');
      }
      await cafe.update(updates);
      return cafe;
    } catch (error) {
      throw new Error(`Erro ao atualizar café: ${error.message}`);
    }
  },

  async deleteCafe(id) {
    try {
      const cafe = await Cafe.findByPk(id);
      if (!cafe) {
        throw new Error('Café não encontrado');
      }
      await cafe.destroy();
      return cafe;
    } catch (error) {
      throw new Error(`Erro ao deletar café: ${error.message}`);
    }
  },
};

module.exports = CafeService;
