
/* Nesse código, teremos 4 funções principais: addTask(), removeTask(button), saveTasks(), loadTasks().  */

document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let input = document.getElementById("taskInput"); /* obtém o texto digitado no input */
    let taskText = input.value.trim(); /* o .trim() remove espaços extras antes e dps do texto */
    if (taskText === "") return; /* se não digitou NamedNodeMap, a função para */

    let li = document.createElement("li"); /* cria um novo elemento de item de lista para representar a tarefa */
    li.innerHTML = `${taskText} <button onclick="removeTask(this)">x</button>`; /* taskText pega o texto da tarefa. o button acrescenta um botão "X" para excluir*/
    li.addEventListener("click", () => li.classList.toggle("done")); /* add um evento que, ao clicar, adiciona a classe "done" para riscar o texto */

    document.getElementById("taskList").appendChild(li); /* o <li> é add dentro da <ul> */
    saveTasks(); /* chama a função no localStorage */
    input.value = ""; /* limpa o campo do input pra digitar outra coisa */
}

function removeTask(button) {
    button.parentElement.remove(); /* remove o <li> correspondente ao botão */
    saveTasks();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {  /* pega todas as tarefas da lista */
        tasks.push({ text: li.textContent.slice(0, -1), done: li.classList.contains("done") }); /* o ...slice pega o texto da tarefa e remove o X do botão. já o .contains verifica se a tarefa está concluída. */
    });

    localStorage.setItem("tasks", JSON.stringify(tasks)); /* salva o array tasks no localStorage */
}

function loadTasks() {
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || []; /* se não houver tarefas salvas, savedtasks será um array vazio */
}

savedTasks.forEach(task => {
    let li = document.createElement("li");
    li.innerHTML = `${task.text} <button onclick="removeTask(this)">x</button>`;
    if (task.done) li.classList.add("done");
    li.addEventListener("click", () => {
        li.classList.toggle("done");
        saveTasks();
    });

    document.getElementById("taskList").appendChild(li);
});


