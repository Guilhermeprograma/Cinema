# PIM III - CineTech Flow

## Resumo
Este projeto apresenta o desenvolvimento de um sistema web completo para o cinema fictício "CineTech Flow", abrangendo todas as etapas exigidas no Manual PIM III da UNIP. O sistema inclui frontend responsivo, backend em C# com POO, modelagem de dados relacional e NoSQL, engenharia de software ágil, UX/UI design, machine learning para previsão de público, e estratégias de comunicação e acessibilidade com LIBRAS.

## Abstract
This project presents the development of a complete web system for the fictional cinema "CineTech Flow", covering all stages required in the PIM III Manual of UNIP. The system includes responsive frontend, C# backend with OOP, relational and NoSQL data modeling, agile software engineering, UX/UI design, machine learning for audience prediction, and communication strategies and accessibility with LIBRAS.

## Introdução
O entretenimento cinematográfico é um setor em crescimento, e a digitalização oferece oportunidades para melhorar a experiência do usuário. O CineTech Flow resolve problemas como filas e falta de assentos preferenciais através de um sistema online de venda de ingressos, seleção de poltronas e combos.

## Desenvolvimento

### Etapa 1: Negócio Fictício
- **Nome**: CineTech Flow
- **Segmento**: Entretenimento / Exibição cinematográfica
- **Público-alvo**: Jovens e adultos de 16 a 40 anos, residentes em área metropolitana
- **Serviços**: Venda de ingressos online, escolha de poltronas, compra de combos de pipoca e bebida
- **Problema resolvido**: Evitar filas, garantir assentos preferenciais, oferecer praticidade na compra de combos.

### Etapa 2: Engenharia de Software Ágil
**Backlog de Histórias de Usuário:**
1. Como usuário, quero ver a lista de filmes em cartaz para escolher qual assistir.
2. Como usuário, quero ver os horários disponíveis para um filme selecionado.
3. Como usuário, quero selecionar uma poltrona no mapa interativo.
4. Como usuário, quero adicionar um combo ao meu pedido.
5. Como usuário, quero fazer login/cadastro para salvar meus dados.
6. Como administrador, quero cadastrar novos filmes.
7. Como administrador, quero criar novas sessões.
8. Como administrador, quero visualizar relatórios de vendas.

**Requisitos Funcionais:**
- Cadastro e login de usuários.
- Listagem e seleção de filmes e horários.
- Seleção de poltronas e combos.
- Processamento de pagamentos simulados.

**Requisitos Não Funcionais:**
- Responsividade para dispositivos móveis.
- Segurança de dados (encriptação de senhas).
- Performance: tempo de resposta < 2s.

**Iterações (Sprints):**
- **Sprint 1**: Desenvolvimento do frontend básico e backend de usuários. Critérios: Login funcional, listagem de filmes.
- **Sprint 2**: Integração de sessões e poltronas. Critérios: Seleção de horário e poltrona, mapa interativo.
- **Sprint 3**: Finalização com combos, pagamentos e ML. Critérios: Checkout completo, relatório de previsões.

### Etapa 3: Modelagem de Dados
**Modelo Conceitual:**
- Entidades: Filmes, Sessões, Usuários, Ingressos, Combos, Pagamentos.
- Relacionamentos: Um filme tem muitas sessões; uma sessão tem muitos ingressos; etc.

**Modelo Lógico:** Ver schema.sql no diretório database.

**Justificativa:** Banco relacional (SQLite) para dados estruturados como vendas e usuários. Recurso NoSQL (JSON em coluna) para logs flexíveis de poltronas.

**Consultas:**
- Listar filmes: SELECT * FROM Filmes WHERE DataLancamento <= date('now');
- Assentos disponíveis: SELECT Poltrona FROM Ingressos WHERE SessaoId = ?;
- Vender ingresso: INSERT INTO Ingressos (SessaoId, UsuarioId, Poltrona, Preco) VALUES (?, ?, ?, ?);

### Etapa 4: Back-end com POO (C#)
Ver Classes.cs no diretório backend.

Exemplo de uso:
```csharp
Cliente cliente = new Cliente("João", "joao@email.com", "senha123", "123456789");
cliente.ExibirPerfil();

Ingresso ingresso = new Ingresso { Filme = "Aventura", TemCombo = true };
Console.WriteLine($"Total: {ingresso.CalcularTotal()}"); // 40.00
```

### Etapa 5: Front-end Responsivo
Ver arquivos em frontend/. Usa CSS Grid/Flexbox e media queries para mobile-first.

### Etapa 6: UX e UI Design
**Personas:**
- Carlos, 28 anos, solteiro, vai ao cinema todo fim de semana para relaxar.
- Mariana, 35 anos, mãe de dois filhos, leva a família para filmes infantis.

**Wireframes (ASCII):**
Home:
```
+-------------------+
| CineTech Flow    |
+-------------------+
| Filmes em Cartaz |
| [Filme 1] [Filme 2] |
+-------------------+
```

**Fluxos:** Selecionar filme → Horários → Poltrona → Combo → Pagar.

### Etapa 7: Machine Learning e Análise de Dados
Ver previsao.py em ml/. Usa regressão linear simples para prever ocupação baseada em dia e gênero.

Relatório: Filmes com maior ocupação prevista: Comédia Romântica (90%), Aventura Espacial (85%).

### Etapa 8: Comunicação, Liderança, LIBRAS
**Estratégias:** Daily meetings simuladas via chat, quadro Kanban no Trello.

**Negociação:** Priorizar mapa de poltronas sobre fidelidade para melhor UX.

**LIBRAS:** Botão na página que abre modal com vídeo/avatar explicando funcionalidades em LIBRAS (simulado com texto + link).

### Etapa 9: Integração Final
Sistema integrado: Frontend consome API simulada em JSON. Limitações: Pagamento simulado. Melhorias: App mobile, ML real com TensorFlow.

## Conclusão
O projeto demonstra competência em todas as áreas exigidas, resultando em um sistema funcional e educacional.

## Referências
SILVA, J. Engenharia de Software Ágil. São Paulo: Editora UNIP, 2023.
MICROSOFT. Documentação C#. Disponível em: <https://docs.microsoft.com/dotnet/csharp>. Acesso em: 31 mar. 2026.