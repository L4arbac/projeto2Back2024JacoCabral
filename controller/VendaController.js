const vendaService = require('../service/VendaService');

class VendaController {
  async createVenda(req, res) {
    try {
      const { userId, cafeIds, quantidade, total } = req.body;

      if (!userId || !cafeIds || !quantidade || !total) {
        return res.status(400).json({ message: 'Dados insuficientes para criar uma venda.' });
      }

      const venda = await vendaService.createVenda(userId, cafeIds, quantidade, total);
      res.status(201).json(venda);
    } catch (error) {
      res.status(500).json({ message: `Erro ao criar venda: ${error.message}` });
    }
  }

  async listVendas(req, res) {
    try {
      const vendas = await vendaService.listVendas();
      res.status(200).json(vendas);
    } catch (error) {
      res.status(500).json({ message: `Erro ao listar vendas: ${error.message}` });
    }
  }

  async getVendaById(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const venda = await vendaService.getVendaById(id);
      
      if (!venda) {
        return res.status(404).json({ message: 'Venda não encontrada.' });
      }

      res.status(200).json(venda);
    } catch (error) {
      res.status(500).json({ message: `Erro ao buscar venda: ${error.message}` });
    }
  }

  async updateVenda(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const updates = req.body;

      const venda = await vendaService.updateVenda(id, updates);
      
      if (!venda) {
        return res.status(404).json({ message: 'Venda não encontrada.' });
      }

      res.status(200).json(venda);
    } catch (error) {
      res.status(500).json({ message: `Erro ao atualizar venda: ${error.message}` });
    }
  }

  async deleteVenda(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const venda = await vendaService.deleteVenda(id);
      
      if (!venda) {
        return res.status(404).json({ message: 'Venda não encontrada.' });
      }

      res.status(200).json({ message: 'Venda deletada com sucesso.' });
    } catch (error) {
      res.status(500).json({ message: `Erro ao deletar venda: ${error.message}` });
    }
  }
}

module.exports = new VendaController();
