const IngredienteService = require("../service/IngredienteService");
const authMiddleware = require("../auth/authMiddleware");

class IngredienteController {
  async createIngrediente(req, res) {
    // #swagger.tags = ['Ingredientes']
    // #swagger.description = 'Endpoint para criar um novo ingrediente.'
    authMiddleware.authenticateToken(req, res, async () => {
      try {
        if (req.user.adm) {
          const ingrediente = await IngredienteService.createIngrediente(req.body);
          res.status(201).json({
            message: "Ingrediente criado com sucesso!",
            data: ingrediente,
          });
        } else {
          res.status(403).json({
            message: "Ação não autorizada. Somente administradores podem realizar este processo.",
          });
        }
      } catch (error) {
        res.status(500).json({ 
          message: "Erro ao criar ingrediente.",
          error: error.message 
        });
      }
    });
  }

  async updateIngrediente(req, res) {
    // #swagger.tags = ['Ingredientes']
    // #swagger.description = 'Endpoint para atualizar um ingrediente existente pelo ID.'
    authMiddleware.authenticateToken(req, res, async () => {
      try {
        if (req.user.adm) {
          const { id } = req.params;
          const updatedIngrediente = await IngredienteService.updateIngrediente(id, req.body);
          res.status(200).json({
            message: "Ingrediente atualizado com sucesso!",
            data: updatedIngrediente,
          });
        } else {
          res.status(403).json({
            message: "Ação não autorizada. Somente administradores podem realizar este processo.",
          });
        }
      } catch (error) {
        res.status(500).json({ 
          message: "Erro ao atualizar ingrediente.",
          error: error.message 
        });
      }
    });
  }

  async listIngredientes(req, res) {
    // #swagger.tags = ['Ingredientes']
    // #swagger.description = 'Endpoint para listar todos os ingredientes com paginação.'
    authMiddleware.authenticateToken(req, res, async () => {
      try {
        if (req.user.adm) {
          const limite = parseInt(req.query.limite) || 5;  
          const pagina = parseInt(req.query.pagina) || 1; 
    
          if (![5, 10, 30].includes(limite)) {
            return res.status(400).json({ message: "Limite inválido. Os valores possíveis são 5, 10 ou 30." });
          }

          const ingredientes = await IngredienteService.listIngredientes(limite, pagina);
          res.status(200).json({
            message: "Lista de ingredientes recuperada com sucesso!",
            data: ingredientes,
          });
        } else {
          res.status(403).json({
            message: "Ação não autorizada. Somente administradores podem realizar este processo.",
          });
        }
      } catch (error) {
        res.status(500).json({ 
          message: "Erro ao listar ingredientes.",
          error: error.message 
        });
      }
    });
  }

  async getIngredienteById(req, res) {
    // #swagger.tags = ['Ingredientes']
    // #swagger.description = 'Endpoint para recuperar um ingrediente pelo ID.'
    authMiddleware.authenticateToken(req, res, async () => {
      try {
        if (req.user.adm) {
          const { id } = req.params;
          const ingrediente = await IngredienteService.getIngredienteById(id);
          if (!ingrediente) {
            return res.status(404).json({ 
              message: "Ingrediente não encontrado." 
            });
          }
          res.status(200).json({
            message: "Ingrediente recuperado com sucesso!",
            data: ingrediente,
          });
        } else {
          res.status(403).json({
            message: "Ação não autorizada. Somente administradores podem realizar este processo.",
          });
        }
      } catch (error) {
        res.status(500).json({ 
          message: "Erro ao recuperar ingrediente.",
          error: error.message 
        });
      }
    });
  }

  async deleteIngrediente(req, res) {
    // #swagger.tags = ['Ingredientes']
    // #swagger.description = 'Endpoint para deletar um ingrediente pelo ID.'
    authMiddleware.authenticateToken(req, res, async () => {
      try {
        if (req.user.adm) {
          const { id } = req.params;
          await IngredienteService.deleteIngrediente(id);
          res.status(204).json({
            message: "Ingrediente deletado com sucesso!",
          });
        } else {
          res.status(403).json({
            message: "Ação não autorizada. Somente administradores podem realizar este processo.",
          });
        }
      } catch (error) {
        res.status(500).json({ 
          message: "Erro ao deletar ingrediente.",
          error: error.message 
        });
      }
    });
  }
}

module.exports = new IngredienteController();
