// Cinemark Flow - Sistema de Reserva de Ingressos (Mobile)
const usuarios = JSON.parse(localStorage.getItem('cinemark_usuarios')) || [];
let usuarioLogado = JSON.parse(localStorage.getItem('cinemark_usuarioLogado')) || null;
const pedido = { filme: null, sessao: null, poltrona: null, combo: null };

const filmes = [
  {
    id: 1,
    titulo: 'Velozes e Furiosos: Rumo ao Futuro',
    genero: 'Ação',
    duracao: 142,
    classIndicativa: '14',
    sinopse: 'Corrida e adrenalina em realidades múltiplas.',
    cartaz: 'https://via.placeholder.com/200x300?text=Fast+X',
    sessoes: [
      { id: 101, horario: '13:00', sala: 'Sala XD', capacidade: 50, ocupados: ['A1', 'A4', 'B5', 'C2'] },
      { id: 102, horario: '16:40', sala: 'Sala XD', capacidade: 50, ocupados: ['A2', 'B1'] }
    ]
  },
  {
    id: 2,
    titulo: 'Avatar: A Lenda de Aang',
    genero: 'Fantasia',
    duracao: 172,
    classIndicativa: '10',
    sinopse: 'O mundo do elemento e a saga do escolhido.',
    cartaz: 'https://via.placeholder.com/200x300?text=Avatar',
    sessoes: [
      { id: 201, horario: '14:30', sala: 'Sala 2D', capacidade: 50, ocupados: ['A3', 'A5', 'D4'] },
      { id: 202, horario: '18:00', sala: 'Sala 3D', capacidade: 50, ocupados: ['B2', 'E1'] }
    ]
  },
  {
    id: 3,
    titulo: 'Oppenheimer',
    genero: 'Drama',
    duracao: 180,
    classIndicativa: '16',
    sinopse: 'A história do pai da bomba atômica e suas consequências.',
    cartaz: 'https://via.placeholder.com/200x300?text=Oppenheimer',
    sessoes: [
      { id: 301, horario: '16:10', sala: 'Sala 3', capacidade: 50, ocupados: ['A1', 'A3', 'B1'] },
      { id: 302, horario: '21:00', sala: 'Sala 3', capacidade: 50, ocupados: ['C2', 'D4'] }
    ]
  },
  {
    id: 4,
    titulo: 'Top Gun: Maverick',
    genero: 'Ação',
    duracao: 131,
    classIndicativa: '12',
    sinopse: 'Maverick enfrenta novos desafios e rivais no topo dos céus.',
    cartaz: 'https://via.placeholder.com/200x300?text=TopGun',
    sessoes: [
      { id: 401, horario: '13:30', sala: 'Sala 1', capacidade: 60, ocupados: ['A1', 'A2', 'A3', 'B4'] },
      { id: 402, horario: '19:00', sala: 'Sala 1', capacidade: 60, ocupados: ['A10', 'B8'] }
    ]
  }
];

const combos = [
  { id: 1, nome: 'Combo Solo', descricao: 'Pipoca média + refrigerante 300ml', preco: 19.9 },
  { id: 2, nome: 'Combo Duplo', descricao: 'Pipoca grande + refrigerante 2x 500ml', preco: 34.9 },
  { id: 3, nome: 'Combo Família', descricao: 'Pipoca gigante + 4 refrigerantes', preco: 62.9 }
];

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const mostrarSecao = (id) => {
  document.querySelectorAll('.pagina').forEach((section) => section.classList.remove('ativo'));
  const target = document.getElementById(id);
  if (!target) {
    return;
  }

  target.classList.add('ativo');
  window.scrollTo({ top: 0, behavior: isMobile ? 'smooth' : 'auto' });
};

const criarCartaoFilme = (filme) => {
  const card = document.createElement('article');
  card.className = 'filme-card';

  card.innerHTML = `
    <img src="${filme.cartaz}" alt="${filme.titulo}">
    <div class="info">
      <p class="tag">${filme.genero}</p>
      <h3>${filme.titulo}</h3>
      <p>${filme.sinopse}</p>
      <p>Duração: ${filme.duracao} min | ${filme.classIndicativa}+</p>
      <button class="btn" type="button">Ver detalhes</button>
    </div>
  `;

  card.querySelector('button').addEventListener('click', () => visualizarFilme(filme.id));
  return card;
};

const listarFilmes = (lista) => {
  const container = document.getElementById('lista-filmes');
  container.innerHTML = '';
  lista.forEach((filme) => container.appendChild(criarCartaoFilme(filme)));
};

const preencherGenero = () => {
  const select = document.getElementById('filtro-genero');
  select.innerHTML = '<option value="">Todos</option>';

  const generos = [...new Set(filmes.map((filme) => filme.genero))];
  generos.forEach((genero) => {
    const option = document.createElement('option');
    option.value = genero;
    option.textContent = genero;
    select.appendChild(option);
  });
};

const filtrarFilmes = () => {
  const termo = document.getElementById('filtro-busca').value.toLowerCase();
  const genero = document.getElementById('filtro-genero').value;

  let resultado = filmes.filter((filme) => filme.titulo.toLowerCase().includes(termo));
  if (genero) {
    resultado = resultado.filter((filme) => filme.genero === genero);
  }

  listarFilmes(resultado);
};

const visualizarFilme = (id) => {
  const filme = filmes.find((item) => item.id === id);
  if (!filme) {
    return;
  }

  pedido.filme = filme;
  pedido.sessao = null;
  pedido.poltrona = null;
  pedido.combo = null;

  const detalhes = document.getElementById('detalhes-conteudo');
  detalhes.innerHTML = `
    <h2>${filme.titulo}</h2>
    <p>${filme.sinopse}</p>
    <p>Gênero: ${filme.genero} | Duração: ${filme.duracao} min | ${filme.classIndicativa}+</p>
    <h3>Sessões</h3>
    <div class="lista-filmes" id="sessoes-rod"></div>
  `;

  const rod = document.getElementById('sessoes-rod');
  rod.innerHTML = '';

  filme.sessoes.forEach((sessao) => {
    const card = document.createElement('div');
    card.className = 'filme-card';

    const vagas = sessao.capacidade - sessao.ocupados.length;
    card.innerHTML = `
      <div class="info">
        <h3>${sessao.horario} - ${sessao.sala}</h3>
        <p>Vagas: ${vagas}</p>
        <button class="btn" type="button">Selecionar</button>
      </div>
    `;

    card.querySelector('button').addEventListener('click', () => escolherSessao(filme.id, sessao.id));
    rod.appendChild(card);
  });

  mostrarSecao('detalhes');
};

const escolherSessao = (idFilme, idSessao) => {
  if (!usuarioLogado) {
    alert('Faça login para reservar.');
    mostrarSecao('login');
    return;
  }

  const filme = filmes.find((item) => item.id === idFilme);
  const sessao = filme.sessoes.find((item) => item.id === idSessao);

  pedido.filme = filme;
  pedido.sessao = sessao;
  pedido.poltrona = null;
  pedido.combo = null;

  renderizarMapaPoltronas();
  mostrarSecao('poltronas');
};

const renderizarMapaPoltronas = () => {
  const sessao = pedido.sessao;
  if (!sessao) {
    return;
  }

  const info = document.getElementById('sessao-info');
  info.textContent = `${pedido.filme.titulo} - ${sessao.horario} (${sessao.sala})`;

  const mapa = document.getElementById('mapa-poltronas');
  mapa.innerHTML = '';
  sessao.ocupados = sessao.ocupados || [];

  for (let i = 1; i <= 5; i += 1) {
    for (let j = 1; j <= 10; j += 1) {
      const codigo = `${String.fromCharCode(64 + i)}${j}`;
      const btn = document.createElement('button');
      btn.className = 'poltrona';
      btn.type = 'button';
      btn.textContent = codigo;

      if (sessao.ocupados.includes(codigo)) {
        btn.classList.add('ocupada');
        btn.disabled = true;
      } else {
        btn.addEventListener('click', () => selecionarPoltrona(codigo, btn));
      }

      mapa.appendChild(btn);
    }
  }

  const comboSelect = document.getElementById('combo-select');
  comboSelect.innerHTML = '<option value="0">Sem combo</option>';
  combos.forEach((combo) => {
    const option = document.createElement('option');
    option.value = combo.id;
    option.textContent = `${combo.nome} - R$ ${combo.preco.toFixed(2)}`;
    comboSelect.appendChild(option);
  });

  document.getElementById('poltrona-selecionada').textContent = 'Poltrona selecionada: nenhuma';
  document.getElementById('btn-pagamento').disabled = true;
};

const selecionarPoltrona = (codigo, botao) => {
  document.querySelectorAll('.poltrona').forEach((item) => item.classList.remove('selecionada'));
  botao.classList.add('selecionada');
  pedido.poltrona = codigo;
  document.getElementById('poltrona-selecionada').textContent = `Poltrona selecionada: ${codigo}`;
  document.getElementById('btn-pagamento').disabled = false;
};

const preencherOfertas = () => {
  const cont = document.getElementById('ofertas-grid');
  cont.innerHTML = '';

  combos.forEach((combo) => {
    const card = document.createElement('div');
    card.className = 'oferta-card';
    card.innerHTML = `
      <h3>${combo.nome}</h3>
      <p>${combo.descricao}</p>
      <p><strong>R$ ${combo.preco.toFixed(2)}</strong></p>
    `;
    cont.appendChild(card);
  });
};

const confirmarCompra = (event) => {
  event.preventDefault();
  if (!pedido.filme || !pedido.sessao || !pedido.poltrona) {
    alert('Selecione uma sessão e poltrona antes de finalizar a compra.');
    return;
  }

  const nome = document.getElementById('nome-checkout').value.trim();
  const email = document.getElementById('email-checkout').value.trim();
  const pag = document.getElementById('pagamento-select').value;
  const comboId = Number(document.getElementById('combo-select').value);

  pedido.combo = comboId === 0 ? null : combos.find((combo) => combo.id === comboId);
  const preco = 28 + (pedido.combo ? pedido.combo.preco : 0);

  if (!pedido.sessao.ocupados.includes(pedido.poltrona)) {
    pedido.sessao.ocupados.push(pedido.poltrona);
  }

  const mensagem = `${nome}, seu ingresso foi confirmado:\n${pedido.filme.titulo} às ${pedido.sessao.horario}\nPoltrona: ${pedido.poltrona}\nCombo: ${pedido.combo ? pedido.combo.nome : 'Nenhum'}\nTotal: R$ ${preco.toFixed(2)} (${pag})`;
  document.getElementById('mensagem-confirmacao').textContent = mensagem;

  const vendas = JSON.parse(localStorage.getItem('cinemark_vendas') || '[]');
  vendas.push({
    nome,
    email,
    filme: pedido.filme.titulo,
    sessao: pedido.sessao.horario,
    poltrona: pedido.poltrona,
    combo: pedido.combo ? pedido.combo.nome : 'Nenhum',
    total: preco,
    data: new Date().toISOString()
  });

  localStorage.setItem('cinemark_vendas', JSON.stringify(vendas));
  mostrarSecao('confirmacao');
};

const login = (event) => {
  event.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const senha = document.getElementById('login-senha').value;
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!emailValido) {
    alert('Email inválido.');
    return;
  }

  const usuario = usuarios.find((item) => item.email === email && item.senha === senha);
  if (!usuario) {
    alert('Email ou senha incorretos.');
    return;
  }

  usuarioLogado = usuario;
  localStorage.setItem('cinemark_usuarioLogado', JSON.stringify(usuarioLogado));
  atualizarNav();
  mostrarSecao('home');
};

const cadastro = (event) => {
  event.preventDefault();
  const nome = document.getElementById('cadastro-nome').value.trim();
  const email = document.getElementById('cadastro-email').value.trim();
  const senha = document.getElementById('cadastro-senha').value;
  const emailValido = /^[^\s@]+@[^\s@]+\.(com(\.br)?)$/i.test(email);

  if (!emailValido) {
    alert('Email inválido. Deve terminar com .com ou .com.br.');
    return;
  }

  if (usuarios.some((item) => item.email === email)) {
    alert('Email já cadastrado');
    return;
  }

  usuarios.push({ nome, email, senha });
  localStorage.setItem('cinemark_usuarios', JSON.stringify(usuarios));
  alert('Cadastro concluído. Faça login!');
  document.getElementById('cadastro-nome').value = '';
  document.getElementById('cadastro-email').value = '';
  document.getElementById('cadastro-senha').value = '';
  mostrarSecao('login');
};

const atualizarNav = () => {
  const navLogin = document.getElementById('nav-login');
  navLogin.textContent = usuarioLogado ? `Olá, ${usuarioLogado.nome}` : 'Login';
};

const logout = () => {
  usuarioLogado = null;
  localStorage.removeItem('cinemark_usuarioLogado');
  atualizarNav();
  mostrarSecao('home');
};

const ativarVLibras = () => {
  const tentarAbrir = () => {
    const vlibrasButton = document.querySelector('[vw-access-button]');
    if (vlibrasButton instanceof HTMLElement) {
      vlibrasButton.click();
      return true;
    }
    return false;
  };

  if (tentarAbrir()) {
    return true;
  }

  const interval = setInterval(() => {
    if (tentarAbrir()) {
      clearInterval(interval);
    }
  }, 250);

  setTimeout(() => clearInterval(interval), 5000);
  return false;
};

const abrirLibras = () => {
  if (!ativarVLibras()) {
    document.getElementById('libras-modal').classList.remove('oculto');
  }
};

const fecharLibras = () => document.getElementById('libras-modal').classList.add('oculto');

const iniciar = () => {
  preencherGenero();
  listarFilmes(filmes);
  preencherOfertas();
  atualizarNav();

  document.getElementById('nav-home').addEventListener('click', () => mostrarSecao('home'));
  document.getElementById('nav-filmes').addEventListener('click', () => {
    listarFilmes(filmes);
    mostrarSecao('filmes');
  });
  document.getElementById('nav-ofertas').addEventListener('click', () => mostrarSecao('ofertas'));
  document.getElementById('nav-login').addEventListener('click', () => {
    if (usuarioLogado) {
      logout();
    } else {
      mostrarSecao('login');
    }
  });

  document.getElementById('btn-cartaz').addEventListener('click', () => {
    listarFilmes(filmes);
    mostrarSecao('filmes');
  });

  document.getElementById('btn-voltar-filmes').addEventListener('click', () => mostrarSecao('home'));
  document.getElementById('btn-voltar-detalhes').addEventListener('click', () => mostrarSecao('filmes'));
  document.getElementById('btn-voltar-poltronas').addEventListener('click', () => mostrarSecao('detalhes'));
  document.getElementById('btn-voltar-checkout').addEventListener('click', () => mostrarSecao('poltronas'));
  document.getElementById('btn-voltar-ofertas').addEventListener('click', () => mostrarSecao('home'));
  document.getElementById('btn-voltar-inicio').addEventListener('click', () => mostrarSecao('home'));

  document.getElementById('filtro-busca').addEventListener('input', filtrarFilmes);
  document.getElementById('filtro-genero').addEventListener('change', filtrarFilmes);

  document.getElementById('btn-pagamento').addEventListener('click', () => mostrarSecao('checkout'));
  document.getElementById('form-checkout').addEventListener('submit', confirmarCompra);
  document.getElementById('form-login').addEventListener('submit', login);
  document.getElementById('form-cadastro').addEventListener('submit', cadastro);

  document.getElementById('btn-fechar-libras').addEventListener('click', fecharLibras);
};

document.addEventListener('DOMContentLoaded', iniciar);
window.addEventListener('load', () => {
  if (!document.querySelector('.pagina.ativo')) {
    iniciar();
  }
});
