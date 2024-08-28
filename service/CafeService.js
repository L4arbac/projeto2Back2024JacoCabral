const Cafe = require("../model/Cafe");
const Ingrediente = require("../model/Ingrediente")

const CafeService = {
  async createCafe(nome, descricao, preco, ingredienteIds) {
    try {
      const cafe = await Cafe.create({ nome,descricao, preco });
      await cafe.addIngredientes(ingredienteIds);
      return cafe;
    } catch (error) {
      throw new Error(`Erro ao criar café: ${error.message}`);
    }
  },

  async getAllCafes(limite , pagina ) {
    try {

      
      const validLimites = [5, 10, 30];
      if (!validLimites.includes(limite)) {
          throw new Error("Limite inválido. Os valores possíveis são 5, 10 ou 30.");
      }

     
      const offset = (pagina - 1) * limite;

      
      const cafes = await Cafe.findAll({
          limit: limite,   
          offset: offset   
      });

      return cafes;
    } catch (error) {
      throw new Error(`Erro ao listar cafés: ${error.message}`);
    }
  },

  async getCafeById(id) {
    try {
      const cafe = await Cafe.findByPk(id,{
        include: [Ingrediente]
      });
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
