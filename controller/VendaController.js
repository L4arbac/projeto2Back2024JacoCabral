const vendaService = require("../service/VendaService");
const authMiddleware = require("../auth/authMiddleware");

class VendaController {
  async createVenda(req, res) {
    authMiddleware.authenticateToken(req, res, async () => {
      try {
        const { userId, cafeIds, quantidade, total } = req.body;

        if (!userId || !cafeIds || !quantidade || !total) {
          return res.status(400).json({
            message: "Dados insuficientes para criar uma venda. Verifique se todos os campos obrigatórios foram preenchidos.",
          });
        }

        const venda = await vendaService.createVenda(userId, cafeIds, quantidade, total);
        res.status(201).json({
          message: "Venda criada com sucesso!",
          data: venda,
        });
      } catch (error) {
        res.status(500).json({
          message: `Erro ao criar venda: ${error.message}`,
        });
      }
    });
  }

  async listVendas(req, res) {
    authMiddleware.authenticateToken(req, res, async () => {
      try {
        const vendas = await vendaService.listVendas();
        res.status(200).json({
          message: "Lista de vendas recuperada com sucesso!",
          data: vendas,
        });
      } catch (error) {
        res.status(500).json({
          message: `Erro ao listar vendas: ${error.message}`,
        });
      }
    });
  }

  async getVendaById(req, res) {
    authMiddleware.authenticateToken(req, res, async () => {
      try {
        const id = parseInt(req.params.id, 10);
        const venda = await vendaService.getVendaById(id);

        if (!venda) {
          return res.status(404).json({
            message: "Venda não encontrada.",
          });
        }

        res.status(200).json({
          message: "Venda recuperada com sucesso!",
          data: venda,
        });
      } catch (error) {
        res.status(500).json({
          message: `Erro ao buscar venda: ${error.message}`,
        });
      }
    });
  }

  async updateVenda(req, res) {
    authMiddleware.authenticateToken(req, res, async () => {
      try {
        if (req.user.adm) {
          const id = parseInt(req.params.id, 10);
          const updates = req.body;

          const venda = await vendaService.updateVenda(id, updates);

          if (!venda) {
            return res.status(404).json({
              message: "Venda não encontrada.",
            });
          }

          res.status(200).json({
            message: "Venda atualizada com sucesso!",
            data: venda,
          });
        } else {
          res.status(403).json({
            message: "Ação não autorizada. Somente administradores podem realizar este processo.",
          });
        }
      } catch (error) {
        res.status(500).json({
          message: `Erro ao atualizar venda: ${error.message}`,
        });
      }
    });
  }

  async deleteVenda(req, res) {
    authMiddleware.authenticateToken(req, res, async () => {
      try {
        if (req.user.adm) {
          const id = parseInt(req.params.id, 10);
          const venda = await vendaService.deleteVenda(id);

          if (!venda) {
            return res.status(404).json({
              message: "Venda não encontrada.",
            });
          }

          res.status(200).json({
            message: "Venda deletada com sucesso.",
          });
        } else {
          res.status(403).json({
            message: "Ação não autorizada. Somente administradores podem realizar este processo.",
          });
        }
      } catch (error) {
        res.status(500).json({
          message: `Erro ao deletar venda: ${error.message}`,
        });
      }
    });
  }
}

module.exports = new VendaController();
