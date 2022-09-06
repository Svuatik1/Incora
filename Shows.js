import { randomNumber } from "./index.js";
export class Show {
    name;
    genre;
    releaseDate;
    constructor(name, genre = `drama`, releaseDate = `1-1-2005`) {
        this.name = name;
        this.genre = genre;
        this.releaseDate = releaseDate;
    }
    getDuration() {
        return `${randomNumber(30, 200)} min`;
    }
}
export class Movie extends Show {
    name;
    genre;
    releaseDate;
    constructor(name, genre, releaseDate) {
        super(name, genre, releaseDate);
        this.name = name;
        this.genre = genre;
        this.releaseDate = releaseDate;
    }
}
export class Episode extends Show {
    name;
    genre;
    releaseDate;
    constructor(name, genre, releaseDate) {
        super(name, genre, releaseDate);
        this.name = name;
        this.genre = genre;
        this.releaseDate = releaseDate;
    }
}
export class Series extends Show {
    name;
    genre;
    releaseDate;
    episodes;
    constructor(name, genre, releaseDate, episodes) {
        super(name, genre, releaseDate);
        this.name = name;
        this.genre = genre;
        this.releaseDate = releaseDate;
        this.episodes = episodes;
    }
}
