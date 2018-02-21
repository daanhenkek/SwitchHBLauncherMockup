export class LogoWidget {
    constructor() {
        this.image = new Image();
        this.image.src = 'gfx/logo_wip.png'
    }

    draw(canvas, context) {
        let middle_x = canvas.width / 2;
        let middle_y = canvas.height / 2.5;

        let width, height;
        let imageAspect = this.image.width / this.image.height;
        let canvasAspect = canvas.width / canvas.height;

        if (imageAspect < canvasAspect) {
            height = canvas.height;
            width = this.image.width * (height / this.image.height);
        } else {
            width = canvas.width;
            height = this.image.height * (width / this.image.width);
        }

        width *= 0.7;
        height *= 0.7;

        context.fillStyle = 'blue';
        context.drawImage(this.image, middle_x - width/2, middle_y - height/2, width, height);
    }
}