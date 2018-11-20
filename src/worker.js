'use strict'

class Worker {
    constructor(robot, workerName, work, workInterval) {
        this.robot = robot;
        this.name = workerName;        
        this.worker = setInterval(async () => {
            let workQueue = this.getWorkQueue();
            let toSaveWorkQueue = await work(workQueue);
            this.robot.brain.set(this.name, JSON.stringify(toSaveWorkQueue));
        }, workInterval * 1000);
    }

    postMessage(message) {
        let workQueue = this.getWorkQueue();
        workQueue.push(message);

        this.robot.brain.set(this.name, JSON.stringify(workQueue));
    }

    getWorkQueue() {
        let workQueueJson = this.robot.brain.get(this.name);

        //Probably should add more validity checks here
        if(!workQueueJson) {
            workQueueJson = '[]';
        }

        return JSON.parse(workQueueJson);
    }
}

module.exports = Worker