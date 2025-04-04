CREATE SCHEMA IF NOT EXISTS db_acaiteria DEFAULT CHARACTER SET utf8 ;
USE db_acaiteria ;

CREATE TABLE IF NOT EXISTS db_acaiteria.tamanho (
  id INT NOT NULL AUTO_INCREMENT,
  tipo VARCHAR(60) NOT NULL,
  valor DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (id));


CREATE TABLE IF NOT EXISTS db_acaiteria.tipo_acai (
  id INT NOT NULL AUTO_INCREMENT,
  tipo VARCHAR(45) NOT NULL,
  valor DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (id));

CREATE TABLE IF NOT EXISTS db_acaiteria.pedido (
  id INT NOT NULL AUTO_INCREMENT,
  data_pedido DATETIME NOT NULL,
  PRIMARY KEY (id));

CREATE TABLE IF NOT EXISTS db_acaiteria.produto (
  id INT NOT NULL AUTO_INCREMENT,
  tamanho_id INT NOT NULL,
  tipo_acai_id INT NOT NULL,
  pedidos_id INT NOT NULL,
  valor_total DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_tamanho_acai
    FOREIGN KEY (tamanho_id)
    REFERENCES db_acaiteria.tamanho (id),
  CONSTRAINT fk_tipos_acai_acai
    FOREIGN KEY (tipo_acai_id)
    REFERENCES db_acaiteria.tipo_acai (id),
  CONSTRAINT fk_produto_pedidos1
    FOREIGN KEY (pedidos_id)
    REFERENCES db_acaiteria.pedido (id));


-- INSERT TIPO DE AÇAI

INSERT INTO tipo_acai (tipo, valor) VALUES ('Tradicional', 5);
INSERT INTO tipo_acai (tipo, valor) VALUES ('Morango', 8.50);
INSERT INTO tipo_acai (tipo, valor) VALUES ('Cupuaçu', 9.50);
INSERT INTO tipo_acai (tipo, valor) VALUES ('Banana', 7.50);
INSERT INTO tipo_acai (tipo, valor) VALUES ('Guaraná', 6);
INSERT INTO tipo_acai (tipo, valor) VALUES ('Zero', 10);

-- INSERT TAMANHOS DE ACAI

INSERT INTO tamanho (tipo, valor) VALUES ('1 Litro', 15);
INSERT INTO tamanho (tipo, valor) VALUES ('2 Litros', 22);
INSERT INTO tamanho (tipo, valor) VALUES ('5 Litros', 40);
INSERT INTO tamanho (tipo, valor) VALUES ('8 Litros', 75);
INSERT INTO tamanho (tipo, valor) VALUES ('10 Litros', 85);
INSERT INTO tamanho (tipo, valor) VALUES ('20 Litros', 170);
