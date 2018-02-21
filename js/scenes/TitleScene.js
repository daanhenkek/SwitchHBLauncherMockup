import {LogoWidget} from "../objects/Logo";
import {Scene} from "../Scene";

export class TitleScene extends Scene{
    constructor() {
        super(-9);

        this.logo = new LogoWidget();
    }

    drawForeground(canvas, context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    drawBackground(canvas, context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        this.logo.draw(canvas, context);
    }

    handleInput(key) {
        if (!this.doInput)
            return;
        switch (key) {
            case "a":
            case "start":
                window.menu.switchScenes(1);
                break;
        }
    }
}