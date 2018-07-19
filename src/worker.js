'use strict'

const queue = require('block-queue');

class Worker {
    constructor(robot, work, workInterval, onMessage, queueSize) {
        this.robot = robot;
        this.worker = setInterval(work, workInterval * 1000);
        this.messageQueue = queue(queueSize ? queueSize : 1, onMessage);
    }

    postMessage(message) {
        this.messageQueue.push(message);
    }
}

module.exports = Worker