const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');
const historicoTarefas = document.querySelector('.historico-tarefas'); // Supondo que exista uma div para o histórico

function criaLi() {
  const li = document.createElement('li');
  return li;
}

inputTarefa.addEventListener('keypress', function(e) {
  if (e.keyCode === 13) {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
  }
});

function limpaInput() {
  inputTarefa.value = '';
  inputTarefa.focus();
}

function criaBotaoApagar(li) {
  li.innerText += ' ';
  const botaoApagar = document.createElement('button');
  botaoApagar.innerText = 'Apagar';
  botaoApagar.setAttribute('class', 'apagar');
  botaoApagar.setAttribute('title', 'Apagar esta tarefa'); //MSG na tarefa
  li.appendChild(botaoApagar);
}

function criaTarefa(textoInput) {
  const li = criaLi();
  li.innerText = textoInput;
  tarefas.appendChild(li);
  limpaInput();
  criaBotaoApagar(li);
  salvarTarefas();
}

btnTarefa.addEventListener('click', function() {
  if (!inputTarefa.value) return;
  criaTarefa(inputTarefa.value);
});

document.addEventListener('click', function(e) {
  const el = e.target;

  if (el.classList.contains('apagar')) {
    const tarefaTexto = el.parentElement.innerText.replace('Apagar', '').trim();
    adicionarAoHistorico(tarefaTexto);
    el.parentElement.remove();
    salvarTarefas();
    salvarHistorico();
  }
});

function salvarTarefas() {
  const liTarefas = tarefas.querySelectorAll('li');
  const listaDeTarefas = [];

  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
    listaDeTarefas.push(tarefaTexto);
  }

  const tarefasJSON = JSON.stringify(listaDeTarefas);
  localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefasSalvas() {
  const tarefas = localStorage.getItem('tarefas');
  if (tarefas) {
    const listaDeTarefas = JSON.parse(tarefas);
    for (let tarefa of listaDeTarefas) {
      criaTarefa(tarefa);
    }
  }
}

// Função para adicionar tarefas apagadas ao histórico
function adicionarAoHistorico(tarefa) {
  const historico = JSON.parse(localStorage.getItem('historicoTarefas')) || [];
  historico.push(tarefa);
  localStorage.setItem('historicoTarefas', JSON.stringify(historico));
}

// Função para salvar o histórico
function salvarHistorico() {
  const historicoTarefasList = JSON.parse(localStorage.getItem('historicoTarefas')) || [];
  historicoTarefas.innerHTML = ''; // Limpa o histórico visual para evitar duplicação

  historicoTarefasList.forEach(tarefa => {
    const li = document.createElement('li');
    li.innerText = tarefa;
    historicoTarefas.appendChild(li);
  });
}

// Adiciona o histórico e as tarefas salvas ao carregar a página
adicionaTarefasSalvas();
salvarHistorico();

// Função para limpar o histórico
function limparHistorico() {
  localStorage.removeItem('historicoTarefas'); // Remove do localStorage
  historicoTarefas.innerHTML = ''; // Limpa a exibição do histórico na página
}

// Evento para o botão de limpar o histórico
const btnLimparHistorico = document.querySelector('.btn-limpar-historico');
btnLimparHistorico.addEventListener('click', limparHistorico);

function criaTarefa(textoInput) {
  const li = criaLi();

  // Captura a data e a hora atuais
  const data = new Date();
  const horario = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()} - ${data.getHours()}:${data.getMinutes()}`;

  // Adiciona o texto da tarefa e o horário
  li.innerHTML = `${textoInput} <span class="horario">(${horario})</span>`;

  tarefas.appendChild(li);
  limpaInput();
  criaBotaoApagar(li);
  salvarTarefas();
}

