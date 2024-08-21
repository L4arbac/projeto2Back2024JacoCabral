const userService = require("../service/UserService");
const cafeService = require("../service/CafeService")
const vendaService = require("../service/VendaService")

class startScript {

  
  async run(req,res) {
  // criando usuários
    try {

      const usersData = [{ "nome": "João Silva", "idade": 30, "cpf": "123.456.789-00", "usuario": "joao.silva", "senha": "senha123" },
        { "nome": "Maria Oliveira", "idade": 28, "cpf": "234.567.890-11", "usuario": "maria.oliveira", "senha": "senha456" },
        { "nome": "Pedro Souza", "idade": 35, "cpf": "345.678.901-22", "usuario": "pedro.souza", "senha": "senha789" },
        { "nome": "Ana Santos", "idade": 22, "cpf": "456.789.012-33", "usuario": "ana.santos", "senha": "senha012" },
        { "nome": "Carlos Lima", "idade": 40, "cpf": "567.890.123-44", "usuario": "carlos.lima", "senha": "senha345" },
        { "nome": "Fernanda Costa", "idade": 31, "cpf": "678.901.234-55", "usuario": "fernanda.costa", "senha": "senha678" },
        { "nome": "Rafael Pereira", "idade": 29, "cpf": "789.012.345-66", "usuario": "rafael.pereira", "senha": "senha901" },
        { "nome": "Juliana Martins", "idade": 33, "cpf": "890.123.456-77", "usuario": "juliana.martins", "senha": "senha234" },
        { "nome": "Roberto Almeida", "idade": 27, "cpf": "901.234.567-88", "usuario": "roberto.almeida", "senha": "senha567" },
        { "nome": "Patrícia Lima", "idade": 26, "cpf": "012.345.678-99", "usuario": "patricia.lima", "senha": "senha890" }
    ];
      let user = null;

      for (let userData of usersData) {

        user = await userService.getUserByUsuario(userData.usuario);

        if (!user) {

          await userService.createUser(
            userData.nome,
            userData.idade,
            userData.cpf,
            userData.usuario,
            userData.senha,
            false
          );

        }
      }

      //tornando um usuário ADM
      const adm = await userService.getUserByUsuario("patricia.lima");
      await userService.updateUserFree(adm.id, {  "adm": true});

     
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao popular a tabela de users no banco", error: error.message });
    }


    // criando cafes
    try{
      const cafesData = [
        { "nome": "Café Expresso", "descricao": "Um café expresso forte e encorpado.", "preco": 5.00 },
        { "nome": "Café Americano", "descricao": "Café diluído com água quente.", "preco": 4.50 },
        { "nome": "Café Latte", "descricao": "Café expresso com leite vaporizado.", "preco": 6.00 },
        { "nome": "Café Mocha", "descricao": "Café com chocolate e creme.", "preco": 6.50 },
        { "nome": "Café Cappuccino", "descricao": "Café expresso com espuma de leite.", "preco": 5.50 },
        { "nome": "Café Macchiato", "descricao": "Café expresso com uma pequena quantidade de leite.", "preco": 5.00 },
        { "nome": "Café Au Lait", "descricao": "Café filtrado com leite vaporizado.", "preco": 5.75 },
        { "nome": "Café Ristretto", "descricao": "Versão mais forte e menor do café expresso.", "preco": 5.25 },
        { "nome": "Café Cortado", "descricao": "Café expresso com um pouco de leite.", "preco": 5.00 },
        { "nome": "Café Irish", "descricao": "Café com um toque de uísque irlandês.", "preco": 7.00 }
      ];

      for (let cafeData of cafesData) {

        let cafe = await cafeService.getCafeByName(cafeData.nome);

        if (!cafe) {
          await cafeService.createCafe(cafeData.nome,cafeData.descricao, cafeData.preco);
        }
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao popular a tabela de cafe no banco", error: error.message });
    }


    try {
      const vendasData = [
        { usuario: 'joao.silva', cafeNames: ['Café Expresso'] },
        { usuario: 'maria.oliveira', cafeNames: ['Café Latte', 'Café Mocha'] },
        { usuario: 'pedro.souza', cafeNames: ['Café Macchiato'] },
        { usuario: 'ana.santos', cafeNames: ['Café Ristretto', 'Café Cortado']},
        { usuario: 'carlos.lima', cafeNames: ['Café Irish', 'Café Expresso'] },
        { usuario: 'fernanda.costa', cafeNames: [ 'Café Latte'] },
        { usuario: 'rafael.pereira', cafeNames: ['Café Mocha', 'Café Cappuccino','Café Macchiato'] },
        { usuario: 'juliana.martins', cafeNames: ['Café Macchiato', 'Café Au Lait'] },
        { usuario: 'roberto.almeida', cafeNames: ['Café Ristretto', 'Café Cortado'] },
        { usuario: 'patricia.lima', cafeNames: ['Café Irish', 'Café Expresso', 'Café Americano'] }
      ];

      for (let vendaData of vendasData) {
        // Obtém o usuário pelo nome de usuário
        const user = await userService.getUserByUsuario(vendaData.usuario);
        if (!user) {
          throw new Error(`Usuário com nome de usuário "${vendaData.usuario}" não encontrado.`);
        }
        // Obtém preços e IDs dos cafés e calcula o total
        let total = 0;
        const cafeIds = [];
        const cafeQuantities = {};

        for (const cafeName of vendaData.cafeNames) {
          const cafe = await cafeService.getCafeByName(cafeName);
          if (!cafe) {
            throw new Error(`Café com nome "${cafeName}" não encontrado.`);
          }

          cafeIds.push(cafe.id);
          total += cafe.preco; 
        }

        // Cria a venda
        await vendaService.createVenda(
          user.id, 
          cafeIds,
          vendaData.cafeNames.length, 
          total
        );
      }

    
    } catch (error) {
      res.status(500).json({
        message: "Erro ao adicionar vendas",
        error: error.message
      });
    }



    res.status(200).json({
      message: "Banco populado com sucesso!"
    });
  }
}

module.exports = new startScript();
