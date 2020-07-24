const fs = require('fs');

class Task{

    constructor({description, isCompleted = false}){
        this.description = description;
        this.isCompleted = isCompleted;
    }

    set Description (description){
        this.description = description ? description.trim() 
                         : '';
    }

    static updateTask(task){

        if(!(task instanceof Task)){
            throw 'El argumento pasado no es de tipo Task'
        }

        const tasks = Task.readTaskFile();
        
        let msg = 'No se pudo actualizar';

        if(tasks){

            const index = tasks.findIndex((t) => t.description === task.description);
            
            if(index >= 0){
                tasks[index].isCompleted = task.isCompleted;
                msg = "Tarea actualizada";
                Task.writeJsonInFile(tasks, true);
            } 
            
        }

        return msg;

    }

    static writeTask(task){

        if(!(task instanceof Task)){
            throw 'El argumento pasado no es de tipo Task'
        }

        const isExistsFile = fs.existsSync('\data.json')

        let tasks = task;

        if(isExistsFile){

            tasks = Task.readTaskFile();

            tasks.push(task);

        }

        this.writeJsonInFile(tasks, tasks != task );          

    }

    static writeJsonInFile (obj, updating = false)  {

        const obj_json = JSON.stringify(obj);

        fs.writeFileSync('\data.json',`{"tasks":${updating ? obj_json : `[${ obj_json }]`}}`);

    }

    static readTaskFile(all = true){

        const buffer = fs.readFileSync('\data.json');

        const dataJson = JSON.parse(buffer.toLocaleString());

        const { tasks } = dataJson;

        return !all ? tasks.filter(t => !t.isCompleted) : tasks;

    }

}

module.exports = {
    Task
}