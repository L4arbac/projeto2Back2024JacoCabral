const Venda = require('../model/Venda');
const User = require('../model/User');
const Cafe = require('../model/Cafe');
const CafeService = require('./CafeService');

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

  async listVendas(limite , pagina ) {
    try {
      const validLimites = [5, 10, 30];
      if (!validLimites.includes(limite)) {
          throw new Error("Limite inválido. Os valores possíveis são 5, 10 ou 30.");
      }

     
      const offset = (pagina - 1) * limite;
      return await Venda.findAll({
        include: [User, Cafe],
        limit: limite,   
        offset: offset
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
  },

  async balanco(){
    try{

      const vendas = Venda.findAll();
      let total = 0;

      for(let venda of vendas){  
        total+=venda.total;
      }
      return total;

    }catch(error){
      throw new Error(`Erro ao gerar o balanço: ${error.message}`)
    }
  },

  async RankCafe(){
    try {

      const vendas = await Venda.findAll({ include: [Cafe] });

      const cafeCount = {};
 
      vendas.forEach(venda => {
        venda.Cafes.forEach(cafe => {
          if (cafeCount[cafe.id]) {
            cafeCount[cafe.id] += venda.quantidade;
          } else {
            cafeCount[cafe.id] = venda.quantidade;
          }
        });
      });

      const cafeRank = Object.entries(cafeCount)
        .sort((a, b) => b[1] - a[1]) 
        .map(async ([cafeId, totalVendas]) => {
          const cafe = await CafeService.getCafeById(cafeId);
          return { cafe: cafe.nome, totalVendas };
        });

      
      return await Promise.all(cafeRank);
    } catch (error) {
      throw new Error(`Erro ao gerar ranking dos cafés: ${error.message}`);
    }


  }
};

module.exports = vendaService;
