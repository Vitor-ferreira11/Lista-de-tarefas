let listElements = document.querySelector("#app ul");
let inputElements = document.querySelector("#app input");
let buttonElements = document.querySelector("#app button");

let tarefas = JSON.parse(localStorage.getItem("@listaTarefas")) || [];

function renderTarefas(){
    listElements.innerHTML = "";

    tarefas.map((todo) =>{
        let liElement = document.createElement ("li");
        let tarefaText = document.createTextNode (todo);

        let linkElement = document.createElement("a");
        linkElement.setAttribute("href", "#")
        
        let linkText = document.createTextNode("Excluir");
        linkElement.appendChild(linkText);

        let posicao = tarefas.indexOf(todo);

        linkElement.setAttribute("onclick", `deletarTarefa(${posicao})`)

        liElement.appendChild(tarefaText);
        liElement.appendChild(linkElement);
        listElements.appendChild(liElement);

    })
}

renderTarefas();

function adicionarTarefas(){
    if(inputElements.value === ''){
        alert('Digite uma tarefa');
        return false;
    }else{
        let novaTarefa = inputElements.value;
        tarefas.push(novaTarefa);
        inputElements.value = '';

        renderTarefas();
        salvarDados();
    }
       
}

buttonElements.onclick = adicionarTarefas;

function deletarTarefa(posicao){
    tarefas.splice(posicao, 1);
    renderTarefas();
    salvarDados();
}

function salvarDados(){
    localStorage.setItem("@listaTarefas", JSON.stringify(tarefas))
}