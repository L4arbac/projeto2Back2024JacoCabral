const vendaService = require("../service/VendaService");
const authMiddleware = require("../auth/authMiddleware");

class VendaController {
  async createVenda(req, res) {
    // #swagger.tags = ['Vendas']
    // #swagger.description = 'Endpoint para criar uma nova venda.'
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
    // #swagger.tags = ['Vendas']
    // #swagger.description = 'Endpoint para listar todas as vendas com paginação.'
    authMiddleware.authenticateToken(req, res, async () => {
      try {
        const limite = parseInt(req.query.limite) || 5;  
        const pagina = parseInt(req.query.pagina) || 1; 
  
        if (![5, 10, 30].includes(limite)) {
            return res.status(400).json({ message: "Limite inválido. Os valores possíveis são 5, 10 ou 30." });
        }
        const vendas = await vendaService.listVendas(limite, pagina);
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
    // #swagger.tags = ['Vendas']
    // #swagger.description = 'Endpoint para recuperar uma venda pelo ID.'
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
    // #swagger.tags = ['Vendas']
    // #swagger.description = 'Endpoint para atualizar uma venda existente pelo ID.'
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
    // #swagger.tags = ['Vendas']
    // #swagger.description = 'Endpoint para deletar uma venda pelo ID.'
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
  
  async balanco(req, res){
    // #swagger.tags = ['Vendas']
    // #swagger.description = 'Endpoint para gerar o balanço das vendas.'
    authMiddleware.authenticateToken(req, res, async () => {
      try{
        if(req.user.adm){

          const balanco = await vendaService.balanco();

          res.status(200).json({
            message: "Balanço gerado com sucesso.",
            balanco: balanco ,
          });

        }else{

          return res.status(403).json({
            message: "Ação não autorizada. Somente administradores podem realizar este processo.",
          });
        }

      }catch(error){
        res.status(500).json({
          message: `Erro ao realizar o balanço: ${error.message}`,
        });
      }
    });
  }

  async RankCafe(req, res){
    // #swagger.tags = ['Vendas']
    // #swagger.description = 'Endpoint para recuperar o rank dos cafés mais vendidos.'
    authMiddleware.authenticateToken(req, res, async () => {
      try{
    
          const rank = await vendaService.RankCafe();

          res.status(200).json({
            message: "Ranking dos cafés mais vendidos gerado com sucesso!",
            rank: rank ,
          });

      }catch(error){
        res.status(500).json({
          message: "Erro ao gerar ranking dos cafés",
          error: error.message,
        });
      }
    });
  }

}

module.exports = new VendaController();
