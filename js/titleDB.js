class TitleDB {
    constructor() {
        this.titles = [];
    }

    addTitle(title) {
        this.titles.push(title);
    }

    getTitle(index) {
        index %= this.titles.length;
        return this.titles[index];
    }
}

class Title {
    constructor(name, size, author, version, description, icon) {
        this.name = name;
        this.size = size;
        this.version = version;
        this.author = author;
        this.description = description;
        this.icon = icon;
    }
}

export function getTitleDB() {
    let db = new TitleDB();

    let img = new Image();
    img.src = 'gfx/icon.png';

    db.addTitle(new Title(
        "The Homebrew Launcher",
        "24 MB",
        "Ayy lmao",
        "19.02.2018",
        "A HTML5 mockup of a cool looking Homebrew Launncher layout. This description automatically cuts off and shit and it's really cool :D",
        img
    ));
    db.addTitle(new Title(
        "Title #2",
        "64 MB",
        "hax wen",
        "1.2.3",
        "This is a dummy title that's only used to test the UI of this application!",
        img
    ));
    db.addTitle(new Title(
        "Title #3",
        "17 MB",
        "yes",
        "1.9",
        "This is a dummy title that's only used to test the UI of this application!",
        img
    ));
    db.addTitle(new Title(
        "Title #4",
        "32 MB",
        "ey ey",
        "0.1",
        "This is a dummy title that's only used to test the UI of this application!",
        img
        ));
    db.addTitle(new Title(
        "Title #5",
        "36 MB",
        "mr",
        "19.02.2018",
        "This is a dummy title that's only used to test the UI of this application!",
        img
    ));

    return db;
}