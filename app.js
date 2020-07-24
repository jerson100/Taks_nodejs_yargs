const { yargs } = require('./yargs');
const { Task } = require('./task');

switch (yargs._[0]) {
    case 'crear':
        agregarTask(yargs);
        break;
    case 'actualizar':
        updateTask(yargs);
        break;
    case 'listar':
        listar();
        break;
}

function agregarTask({description}){

    const t = new Task({description});

    Task.writeTask(t);

    console.log('Tarea creaada');

}

function updateTask({description,isCompleted}){

    const t = new Task({description,isCompleted});

    console.log(Task.updateTask(t));

}


function listar(){

    console.log(Task.readTaskFile(false));

}