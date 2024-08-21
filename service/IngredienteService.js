const Ingrediente = require('../model/Ingrediente');

class IngredienteService {
    async createIngrediente(data) {
        return await Ingrediente.create(data);
    }

    async updateIngrediente(id, data) {
        const ingrediente = await Ingrediente.findByPk(id);
        if (!ingrediente) throw new Error('Ingrediente não encontrado');
        return await ingrediente.update(data);
    }

    async listIngredientes() {
        return await Ingrediente.findAll();
    }

    async getIngredienteById(id) {
        return await Ingrediente.findByPk(id);
    }

    async deleteIngrediente(id) {
        const ingrediente = await Ingrediente.findByPk(id);
        if (!ingrediente) throw new Error('Ingrediente não encontrado');
        return await ingrediente.destroy();
    }
}

module.exports = new IngredienteService();
