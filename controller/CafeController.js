const CafeService = require("../service/CafeService");

const CafeController = {
  async create(req, res) {
    try {
      const { nome, descricao,preco } = req.body;
      const cafe = await CafeService.createCafe(nome, descricao,preco);
      res.status(201).json(cafe);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const cafes = await CafeService.getAllCafes();
      res.status(200).json(cafes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const cafe = await CafeService.getCafeById(id);
      res.status(200).json(cafe);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const cafe = await CafeService.updateCafe(id, updates);
      res.status(200).json(cafe);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const cafe = await CafeService.deleteCafe(id);
      res.status(200).json(cafe);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
};

module.exports = CafeController;
