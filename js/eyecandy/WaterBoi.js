export default class WaterBoi {
    constructor(renderer) {
        this.renderer = renderer;

        this.x = undefined;
        this.y = undefined;
        this.width = undefined;
        this.height = undefined;

        this.level = undefined;

        this.waves = [
            new Wave("#7A77EF", this),
            new Wave("#77B5EF", this),
            new Wave("#77EFCA", this),
            new Wave("#758ED1", this),
            new Wave("#77D8EF", this)
        ];

        this.recalculate();
    }

    recalculate() {
        this.width = this.renderer.canvas.width;
        this.height = this.renderer.canvas.height / 2.6;
        this.x = 0;
        this.y = this.renderer.canvas.height - this.height;

        this.level = this.height / 2;
        this.resolution = this.width / 2;

        for (let i = 0; i < this.waves.length; i++)
            this.waves[i].recalculate();
    }

    draw() {
        for (let i = 0; i < this.waves.length; i++)
            this.waves[i].draw();
    }
}

class Wave {
    constructor(fillStyle, manager) {
        this.manager = manager;
        this.fillStyle = fillStyle;

        this.i = 0;
    }

    recalculate() {
        this.offset = this.manager.y / 15 * Math.random();
    }

    draw() {
        let context = this.manager.renderer.context;

        context.beginPath();

        context.moveTo(0, this.manager.y + this.manager.level);

        let y;
        for (let i = 0; i < this.manager.width; i++) {
            y = Math.sin(i * 0.007 + this.i + this.offset * 15) * this.manager.height / 15 + this.manager.height / 40 - this.offset;
            //Half assed attempt at cooler waves
            //y = Math.sin(i + this.i * 0.001) * Math.cos(1.5 * i) * this.manager.height / 15 + this.manager.height / 40 - this.offset;;
            context.lineTo(i, this.manager.y + y);
        }

        this.i += this.offset / 1000;

        context.lineTo(this.manager.width, this.manager.y + this.manager.height);
        context.lineTo(0, this.manager.y + this.manager.height);

        context.save();
        context.globalAlpha = 0.25;
        context.fillStyle = this.fillStyle;
        context.closePath();
        context.fill();
        context.restore();
    }
}