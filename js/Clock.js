export class Clock {
    constructor(renderer) {
        this.renderer = renderer;
        this.time = new Date();
        this.hour12 = false;

        this.recalculate();
    }

    update() {
        this.time = new Date();
        this.hours = this.time.getHours();
        this.minutes = this.time.getMinutes();

        if (this.hour12)
            this.hours %= 12;
        else {
            if (this.hours < 10)
                this.hours = "0" + this.hours.toString();
        }

        if (this.minutes < 10)
            this.minutes = "0" + this.minutes.toString();
    }

    draw() {
        let text = this.hours + ":" + this.minutes;

        this.renderer.context.fillStyle = 'white';
        this.renderer.context.font = this.renderer.perw(2.5) + 'px interUI';
        this.renderer.context.textBaseline = 'top';
        this.renderer.context.fillText(text, this.x, this.y, this.width);
    }

    recalculate() {
        this.x = this.renderer.perw(85);
        this.y = this.renderer.perh(5);

        this.width = this.renderer.perw(15);
        this.height = this.renderer.perh(8);
    }
}