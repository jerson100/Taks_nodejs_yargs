const description = {
    alias: 'd',
    demand: true,
    desc: 'Descripción de la tarea'
};

const yargs = require('yargs')
    .command('crear','Crea un elemento por hacer',
        {
            description
        }
    )
    .command('actualizar','Actualiza el estado completado de una tarea',
        {
            description,
            isCompleted: {
                alias: 'i',
                demand: true,
                default: true,
                desc: 'Indica si la tarea está completada'
            }
        }
    )
    .command('listar','Lista todas las tareas que no están completadas',{})
    .help()
    .argv;
    
module.exports = {
    yargs
};