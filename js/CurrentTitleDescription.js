export class CurrentTitleDescription {
    constructor(renderer) {
        this.renderer = renderer;
        this.currentTitle = 0;

        this.recalculate();
    }

    getCurrentTitle() {
        return window.titleDB.getTitle(this.currentTitle);
    }

    recalculate() {
        this.offsetXText = this.renderer.perw(10);
        this.offsetYText = this.renderer.perh(20);
    }

    draw() {
        let title = this.getCurrentTitle();

        this.renderer.context.fillStyle = 'white';
        this.renderer.context.font = this.renderer.perw(3) + 'px interUI';
        this.renderer.context.textBaseline = 'top';
        this.renderer.context.fillText(this.renderer.truncateString(title.name, "...", this.renderer.context.font, this.renderer.perw(40)), this.offsetXText, this.offsetYText);

        this.renderer.context.fillStyle = 'white';
        this.renderer.context.font = this.renderer.perw(1.5) + 'px interUI';
        this.renderer.context.textBaseline = 'top';
        let lines = this.renderer.splitString(title.description, this.renderer.context.font, this.renderer.perw(40));
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];

            let yOffset = i;

            if (i >= 3) {
                line = line.substr(0, line.length - 1);
                line += '...';
                i = lines.length;
            }

            this.renderer.context.fillText(line, this.offsetXText, this.offsetYText + this.renderer.perh(8) + this.renderer.perh(3) * yOffset);
        }

        this.renderer.context.fillText(this.renderer.truncateString("Author:     " + title.author, "...", this.renderer.context.font, this.renderer.perw(40)), this.offsetXText, this.offsetYText + this.renderer.perh(8) + this.renderer.perh(3) * 6);
        this.renderer.context.fillText(this.renderer.truncateString("Version:   " + title.version, "...", this.renderer.context.font, this.renderer.perw(40)), this.offsetXText, this.offsetYText + this.renderer.perh(8) + this.renderer.perh(3) * 7);
        this.renderer.context.fillText(this.renderer.truncateString("Size:         " + title.size, "...", this.renderer.context.font, this.renderer.perw(40)), this.offsetXText, this.offsetYText + this.renderer.perh(8) + this.renderer.perh(3) * 8);

        this.renderer.context.drawImage(title.icon, this.renderer.perw(65), this.offsetYText)
    }
}