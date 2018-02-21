import {LogoWidget} from "./objects/Logo";

export class TitleScene {
    constructor() {
        this.logo = new LogoWidget();
    }

    transitionTo(menu) {
        console.log()
        menu.waterWidget.animateTo(menu.waterWidget.canvas.height / 15);
    }

    draw(canvas, context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        this.logo.draw(canvas, context);
    }
}