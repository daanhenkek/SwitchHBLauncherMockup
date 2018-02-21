export class ClockWidget {
    constructor(do12hours) {
        this.do12hours = do12hours;
    }

    draw(canvas, context) {
        context.font = '32px interUI';
        context.fillStyle = 'white';
        context.textBaseline = 'top';
        context.fillText(this.getTimestring(), 0, 0)
    }

    getTimestring() {
        let time = new Date();
        let hours = time.getHours();
        let minutes = time.getMinutes();

        if (minutes < 10)
            minutes = "0" + minutes.toString();

        let suffix;
        if (this.do12hours) {
            suffix = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
        }

        return hours + ':' + minutes + (' ' + this.do12hours ? suffix : '');
    }
}