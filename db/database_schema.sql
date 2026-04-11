-- Modelo conceitual e lógico para CineTech Flow
-- Usando SQLite como banco relacional

-- Tabela Filmes
CREATE TABLE Filmes (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Titulo TEXT NOT NULL,
    Genero TEXT,
    Duracao INTEGER, -- em minutos
    Sinopse TEXT,
    DataLancamento DATE
);

-- Tabela Sessoes
CREATE TABLE Sessoes (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    FilmeId INTEGER,
    Horario DATETIME,
    Sala TEXT,
    Capacidade INTEGER,
    FOREIGN KEY (FilmeId) REFERENCES Filmes(Id)
);

-- Tabela Usuarios
CREATE TABLE Usuarios (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Nome TEXT NOT NULL,
    Email TEXT UNIQUE,
    Senha TEXT,
    Tipo TEXT -- 'Cliente' ou 'Administrador'
);

-- Tabela Ingressos
CREATE TABLE Ingressos (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    SessaoId INTEGER,
    UsuarioId INTEGER,
    Poltrona TEXT,
    Preco DECIMAL(10,2),
    DataCompra DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (SessaoId) REFERENCES Sessoes(Id),
    FOREIGN KEY (UsuarioId) REFERENCES Usuarios(Id)
);

-- Tabela Combos
CREATE TABLE Combos (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Nome TEXT,
    Descricao TEXT,
    Preco DECIMAL(10,2)
);

-- Tabela Pagamentos
CREATE TABLE Pagamentos (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    IngressoId INTEGER,
    Valor DECIMAL(10,2),
    Metodo TEXT, -- 'Cartao', 'Pix', etc.
    Status TEXT, -- 'Aprovado', 'Pendente'
    FOREIGN KEY (IngressoId) REFERENCES Ingressos(Id)
);

-- Recurso NoSQL: Armazenar logs de escolha de poltronas em JSON (simulado em coluna TEXT)
ALTER TABLE Ingressos ADD COLUMN LogPoltronas TEXT; -- JSON com histórico de seleções

-- Consultas principais
-- Listar filmes em cartaz
SELECT * FROM Filmes WHERE DataLancamento <= date('now');

-- Verificar assentos disponíveis para uma sessão
SELECT Poltrona FROM Ingressos WHERE SessaoId = ?;

-- Vender ingresso (inserir)
INSERT INTO Ingressos (SessaoId, UsuarioId, Poltrona, Preco) VALUES (?, ?, ?, ?);