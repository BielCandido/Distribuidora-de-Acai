import mysql from "mysql2/promise"
export const getTamanhos = async (_, res) => {
  console.log('Recebida requisição para /api/tamanhos');
  try {
    var x = await executeSQL("SELECT * FROM tamanho");
    return res.status(200).send({
      data: x.map((item) => ({
        id: item.id,
        nome: item.tipo,
        valor: item.valor,
      })),
    });
  } catch (error) {
    console.error('Erro ao buscar tamanhos:', error);
    return res.status(500).send({ error: 'Erro ao buscar tamanhos' });
  }
};

export const getTipos = async (_, res) => {
  console.log('Recebida requisição para /api/tipos');
  try {
    var y = await executeSQL("SELECT * FROM tipo_acai ORDER BY valor");
    return res.status(200).send({
      data: y.map((item1) => ({
        id: item1.id,
        nome: item1.tipo,
        valor: item1.valor,
      })),
    });
  } catch (error) {
    console.error('Erro ao buscar tipos:', error);
    return res.status(500).send({ error: 'Erro ao buscar tipos' });
  }
};

export const getRelatorioPedidos = async (_, res) =>{
    var resultado= await executeSQL(`
    SELECT
        PED.id id_pedido,
        date_format(PED.data_pedido, '%d/%m/%Y - %H:%i') AS data_pedido,
        PROD.valor_total,
        TAM.tipo tamanho,
        TIPO.tipo
    FROM pedido PED
    JOIN produto PROD ON PROD.pedidos_id = PED.id
    JOIN tamanho TAM ON TAM.id = PROD.tamanho_id 
    JOIN tipo_acai TIPO ON TIPO.id = PROD.tipo_acai_id
    ORDER BY PED.id`)
    return res.send(200, {
        data: resultado
    })
}

export const postPedido = async (req, res) => {
    var tipo = await executeSQL("SELECT valor FROM tipo_acai WHERE id=?", [req.body.tipo])
    var tamanho = await executeSQL("SELECT valor FROM tamanho WHERE id=?", [req.body.tamanho])

    var valorTotal = parseFloat(tipo[0].valor)+parseFloat(tamanho[0].valor)

    var resultado = await executeSQL("INSERT INTO pedido (data_pedido) VALUES (now());")
    var pedidoId = resultado.insertId;
    var resultado2 = await executeSQL("INSERT INTO produto (tamanho_id, tipo_acai_id, pedidos_id, valor_total) VALUES (? , ? , ?, ?);", [req.body.tamanho, req.body.tipo, pedidoId, valorTotal])

 

// INSERT INTO pedido (data_pedido) VALUES (now());
// INSERT INTO produto (tamanho_id, tipo_acai_id, pedidos_id, valor_total) VALUES (1 , 1 , last_insert_id(), 20);
   return res.send(200, {
    data: {
        id: resultado2.insertId
    }
   })
}

export const deletePedido = async(req, res) => {
    var idPedido = req.params.id

    var deleteProduto = "DELETE FROM produto where pedidos_id=?;"
    var deletePedido = "DELETE FROM pedido where id=?;"

    await executeSQL(deleteProduto, [idPedido])
    await executeSQL(deletePedido, [idPedido])

    return res.send(200, {data: {
        status: "OK"
    }})
}

async function executeSQL(query, params = []) {
  console.log('Tentando conectar ao MySQL...');
  const connection = await mysql.createConnection({
    host: 'localhost', // Certifique-se de que o host está correto
    user: 'root',      // Substitua pelo usuário correto
    password: '2wsxXSW@', // Substitua pela senha correta
    database: 'db_acaiteria', // Substitua pelo nome correto do banco de dados
    port: 3306         // Certifique-se de que a porta está correta
  });

  try {
    console.log('Conexão com MySQL estabelecida.');
    const [rows, fields] = await connection.execute(query, params);
    return rows;
  } catch (err) {
    console.error('Erro ao executar SQL:', err);
    throw err;
  } finally {
    await connection.end();
    console.log('Conexão com MySQL encerrada.');
  }
}