const Ingrediente = require('../model/Ingrediente');

class IngredienteService {

    async createIngrediente(data) {
        try {
            return await Ingrediente.create(data);
        } catch (error) {
            throw new Error(`Erro ao criar ingrediente: ${error.message}`);
        }
    }

    async updateIngrediente(id, data) {
        try {
            const ingrediente = await Ingrediente.findByPk(id);
            if (!ingrediente) throw new Error('Ingrediente não encontrado');
            return await ingrediente.update(data);
        } catch (error) {
            throw new Error(`Erro ao atualizar ingrediente: ${error.message}`);
        }
    }

    async listIngredientes(limite , pagina ) {
        try {
            const validLimites = [5, 10, 30];
            if (!validLimites.includes(limite)) {
                throw new Error("Limite inválido. Os valores possíveis são 5, 10 ou 30.");
            }
      
           
            const offset = (pagina - 1) * limite;
            return await Ingrediente.findAll({
                limit: limite,   
                offset: offset   
            });
        } catch (error) {
            throw new Error(`Erro ao listar ingredientes: ${error.message}`);
        }
    }

    async getIngredienteById(id) {
        try {
            return await Ingrediente.findByPk(id);
        } catch (error) {
            throw new Error(`Erro ao buscar ingrediente por ID: ${error.message}`);
        }
    }

    async getIngredienteByName(nome) {
        try {
            return await Ingrediente.findOne({ where: { nome } });
        } catch (error) {
            throw new Error(`Erro ao buscar ingrediente por nome: ${error.message}`);
        }
    }

    async deleteIngrediente(id) {
        try {
            const ingrediente = await Ingrediente.findByPk(id);
            if (!ingrediente) throw new Error('Ingrediente não encontrado');
            return await ingrediente.destroy();
        } catch (error) {
            throw new Error(`Erro ao deletar ingrediente: ${error.message}`);
        }
    }
}

module.exports = new IngredienteService();
