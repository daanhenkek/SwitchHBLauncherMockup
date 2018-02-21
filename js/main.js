import {WaterWidget} from "./objects/Water";
import {TitleScene} from "./TitleScene";

class Menu {
    constructor() {
        this.container = document.querySelector('#appContainer');
        this.sceneCanvas = document.querySelector('#sceneCanvas');
        this.sceneContext = this.sceneCanvas.getContext('2d');

        this.waterWidget = new WaterWidget();

        this.scenes = [
            new TitleScene()
        ];
        this.currentScene = 0;

        this.setResolution(1280, 720);
    }

    setResolution(width, height) {
        this.width = width;
        this.height = height;

        this.sceneCanvas.width = width;
        this.sceneCanvas.height = height;

        this.waterWidget.setResolution(width, height);
        this.scenes[this.currentScene].transitionTo(this);
    }

    draw() {
        this.waterWidget.draw();
        this.scenes[this.currentScene].draw(this.sceneCanvas, this.sceneContext);
    }
}

window.addEventListener('load', () => {
    window.menu = new Menu();

    function tick() {
        requestAnimationFrame(tick);
        window.menu.draw();
    }

    requestAnimationFrame(tick);

    let waveHeightSlider = document.querySelector('#waveHeight');
    waveHeightSlider.addEventListener('click', () => {
        window.menu.waterWidget.baseHeight = waveHeightSlider.value;
    });

    let up = false;
    document.querySelector('#waveAnimation').addEventListener('click', () => {
        if (up)
            window.menu.scenes[window.menu.currentScene].transitionTo(window.menu);
        else
            window.menu.waterWidget.animateToTop();

        up = !up;
    });
});

// window.onerror = function (message) {
//     alert(message);
// };