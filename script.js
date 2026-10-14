let listElements = document.querySelector("#app ul");
let inputElements = document.querySelector("#app input");
let buttonElements = document.querySelector("#app button");

let tarefas = [];
try {
    const dados = JSON.parse(localStorage.getItem('@listaTarefas'));
    if (Array.isArray(dados)) tarefas = dados.filter(item => typeof item === 'string');
} catch {
    // Permite usar a lista mesmo com dados inválidos ou armazenamento indisponível.
}

function renderTarefas(){
    listElements.innerHTML = "";

    tarefas.forEach((todo, posicao) =>{
        let liElement = document.createElement ("li");
        let tarefaText = document.createTextNode (todo);

        let linkElement = document.createElement("button");
        linkElement.type = 'button';
        linkElement.setAttribute('aria-label', 'Excluir tarefa: ' + todo);

        let linkText = document.createTextNode("Excluir");
        linkElement.appendChild(linkText);



        linkElement.addEventListener('click', () => deletarTarefa(posicao));

        liElement.appendChild(tarefaText);
        liElement.appendChild(linkElement);
        listElements.appendChild(liElement);

    })
}

renderTarefas();

function adicionarTarefas(){
    if(inputElements.value.trim() === ''){
        alert('Digite uma tarefa');
        return false;
    }else{
        let novaTarefa = inputElements.value.trim();
        tarefas.push(novaTarefa);
        inputElements.value = '';

        renderTarefas();
        salvarDados();
    }

}

buttonElements.onclick = adicionarTarefas;
inputElements.addEventListener('keydown', event => {
    if (event.key === 'Enter') adicionarTarefas();
});

function deletarTarefa(posicao){
    tarefas.splice(posicao, 1);
    renderTarefas();
    salvarDados();
}

function salvarDados(){
    try {
        localStorage.setItem('@listaTarefas', JSON.stringify(tarefas));
    } catch {
        alert('Não foi possível salvar. As tarefas ficarão disponíveis apenas nesta sessão.');
    }
}
