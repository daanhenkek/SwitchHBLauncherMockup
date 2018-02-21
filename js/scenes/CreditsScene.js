import {LogoWidget} from "../objects/Logo";
import {Scene} from "../Scene";
import {ClockWidget} from "../objects/Clock";

export class CreditsScene extends Scene {
    constructor() {
        super(35);

        this.logo = new LogoWidget();
        this.clock = new ClockWidget(true);
    }

    drawForeground(canvas, context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        // context.fillStyle = 'red';
        // context.fillRect(500, 100, 200, 400);
    }

    drawBackground(canvas, context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        //context.fillRect(5, 10, 1100, 700);
        this.clock.draw(canvas, context);
    }

    handleInput(key) {
        if (!this.doInput)
            return;
        switch (key) {
            case "b":
                window.menu.switchScenes(0);
                break;
        }
    }
}