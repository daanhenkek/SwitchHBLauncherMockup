import WaterBoi from './eyecandy/WaterBoi';
import {Clock} from "./Clock";
import {getTitleDB} from "./titleDB";
import {CurrentTitleDescription} from "./CurrentTitleDescription";

class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');

        this.waveBoi = new WaterBoi(this);
        this.currentTitleDescription = new CurrentTitleDescription(this);
        this.clock = new Clock(this);

        requestAnimationFrame(this.tick.bind(this));
    }

    clearScreen() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    perw(amnt) {
        return this.canvas.width / 100 * amnt;
    }

    perh(amnt) {
        return this.canvas.height / 100 * amnt;
    }

    tick() {
        requestAnimationFrame(this.tick.bind(this));

        this.update();
        this.draw();
    }

    update() {
        this.clock.update();
    }

    draw() {
        this.clearScreen();
        this.context.fillStyle = '#2d3742';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.waveBoi.draw();
        this.currentTitleDescription.draw();
        this.clock.draw();
    }

    recalculate() {
        this.waveBoi.recalculate();
        this.currentTitleDescription.recalculate();
        this.clock.recalculate();
    }

    truncateString(string, endThing, font, maxLengthInPixels) {
        this.context.font = font;
        let hasTruncated = false;

        while (this.context.measureText(string).width + this.context.measureText(endThing).width > maxLengthInPixels) {
            string = string.substring(0, string.length - 1);
            hasTruncated = true;
        }

        if (hasTruncated)
            string += endThing;

        return string;
    }

    splitString(string, font, maxLengthInPixels) {
        let lines = [];
        let words = string.split(' ');
        let line = '';

        for (let i = 0; i < words.length; i++) {
            let testLine = line + words[i] + ' ';
            if (this.context.measureText(testLine).width > maxLengthInPixels && i > 0) {
                lines.push(line);
                line = words[i] + ' ';
            } else {
                line = testLine;
            }
        }

        lines.push(line);
        return lines;
    }
}

window.addEventListener('load', () => {
    window.titleDB = getTitleDB();

    setInterval(function () {
        window.renderer.currentTitleDescription.currentTitle++;
    }, 2000);
    window.renderer = new Renderer(document.querySelector('#canvas'));
});