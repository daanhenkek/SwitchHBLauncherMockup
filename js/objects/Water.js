export class WaterWidget {
    constructor() {
        this.canvas = document.querySelector('#waterCanvas');
        this.context = this.canvas.getContext('2d');

        this.waves = [
            new Wave("#516EAD", "#516EAD", 0, -17, 160),
            new Wave("#6783C9", "#6783C9", 8, 13.5, 156),
            new Wave("#429A9F", "#429A9F", 14, -12.5, 152),
            new Wave("#67ffff", "#5cb0e2", 24, 11, 148)
        ];

        this.timer = 0;
        this.amplitude = 8;
        this.animationQueue = [];
        this.isAnimating = false;
    }

    animateTo(height, time) {
        let self = this;

        if (time === undefined)
            time = 3000;

        this.animationQueue.push(anime({
            targets: this,
            baseHeight: height,
            duration: time,
            delay: 300,
            elasticity: 200,
            autoplay: false,
            complete: () => {
                console.log(height);
                self.baseHeight = height;
                console.log("DONE");
                if (self.animationQueue.length > 0) {
                    let animation = self.animationQueue.shift();
                    animation.play();
                    console.log(animation.baseHeight);
                } else {
                    self.isAnimating = false;
                }
            }
        }));
    }

    animateToTop() {
        this.animateTo(this.canvas.height, 2000);
    }

    setResolution(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;

        this.baseHeight = this.canvas.height;
    }

    draw() {
        if (this.isAnimating === false && this.animationQueue.length > 0) {
            console.log("PLAYING");
            let anim = this.animationQueue.shift();
            anim.play();
            console.log(anim.baseHeight);
            this.isAnimating = true;
        }

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.waves.forEach((wave) => {
            wave.draw(this.canvas, this.context, this.timer, this.amplitude, this.baseHeight);
        });

        this.timer += 0.025;
    }
}

class Wave {
    constructor(color1, color2, phase, speed, baseHeight) {
        this.color1 = color1;
        this.color2 = color2;

        this.phase = phase;
        this.speed = speed;
        this.waveHeight = baseHeight;
    }

    draw(canvas, context, timer, amplitude, baseHeight) {
        let height = canvas.height - this.waveHeight - baseHeight;

        context.beginPath();

        context.moveTo(0, canvas.height);

        for (let x = 0; x <= canvas.width; x++) {
            let wave_y = Math.sin(x * this.speed / canvas.width + timer + this.phase) * amplitude + height;

            context.lineTo(x, wave_y);
        }

        context.lineTo(canvas.width, canvas.height);
        context.lineTo(0, canvas.height);
        context.fillStyle = colorToGradient(this.color1, this.color2, context, canvas);
        context.fill();
        context.closePath();
    }
}

function colorToGradient(color1, color2, context, canvas) {
    let gradient = context.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(0.5, color1);
    gradient.addColorStop(1, color2);
    return gradient;
}