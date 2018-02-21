import {animate} from "./lib";

export class Scene {
    constructor(waterHeight) {
        this.doUpdate = false;
        this.doInput = false;
        this.waterHeight = waterHeight;
    }

    startUpdating() {
        this.doUpdate = true;
    }

    stopUpdating() {
        this.doUpdate = false;
    }

    transitionTo(menu, callback) {
        const length = 3000;

        menu.foregroundCanvas.style.display = 'block';
        animate('easeLinear', length / 10, 0, 1, value => {
            menu.foregroundCanvas.style.opacity = value;
        });

        animate("easeOutElastic", length, menu.waterWidget.baseHeight, menu.waterWidget.canvas.height / 100 * this.waterHeight, value => {
            menu.waterWidget.baseHeight = value;
        }, () => {
            this.startUpdating();
            this.doInput = true;
            if (callback)
                callback();
        })
    }

    handleInput(key) {
        console.log(key);
    }

    transitionFrom(menu, callback) {
        const length = 1500;

        this.doInput = false;

        animate('easeLinear', length / 10, 1, 0, value => {
            menu.foregroundCanvas.style.opacity = value;
        }, () => {
            menu.foregroundCanvas.style.display = 'none';
        });

        animate("easeInOutElastic", length, menu.waterWidget.baseHeight, menu.waterWidget.canvas.height, value => {
            menu.waterWidget.baseHeight = value;
        }, () => {
            this.stopUpdating();
            if (callback)
                callback();
        });
    }
}