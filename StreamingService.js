import chalk from "chalk";
import { randomNumber } from "./index.js";
const warning = chalk.hex("#FFA500").underline;
export default class StreamingService {
    constructor(name, shows = [], viewsByShowNames = new Map(), showsList = []) {
        this.name = name;
        this.shows = shows;
        this.viewsByShowNames = viewsByShowNames;
        this.showsList = showsList;
    }
    addShow(show) {
        if (!this.showsList.includes(show.name)) {
            this.showsList.push(show.name);
            this.shows.push(show);
            this.viewsByShowNames.set(show.name, randomNumber(0, 1000));
            return this.viewsByShowNames;
        }
        else {
            return warning(`${show.name}  already have been in platform`);
        }
    }
    getMostViewedShowsOfYear(year = `2022`, list = false) {
        let sortByYear = this.shows
            .filter((el) => el.releaseDate.split(`-`)[2] == year)
            .getMostViewed(this.viewsByShowNames);
        if (list)
            console.log(helperList(sortByYear, this.viewsByShowNames, year));
        return !!sortByYear.length ? sortByYear : `Empty most viewed year`;
    }
    getMostViewedShowsOfGenre(genre, list = false) {
        let sortByGenre = this.shows
            .filter((el) => el.genre === genre)
            .getMostViewed(this.viewsByShowNames);
        if (list)
            console.log(helperList(sortByGenre, this.viewsByShowNames, genre));
        return !!sortByGenre.length ? sortByGenre : `Empty most viewed genre`;
    }
}
Array.prototype.getMostViewed = function (sort) {
    const thisArray = this;
    return thisArray
        .sort((a, b) => sort.get(b.name) - sort.get(a.name))
        .slice(0, 10);
};
function helperList(arr, viewsByShowNames, title) {
    let newArr = arr.map((el) => {
        return {
            name: el.name,
            views: viewsByShowNames.get(el.name),
        };
    });
    let res = newArr
        .sort((a, b) => b.views - a.views)
        .reduce((acc, el, i) => acc + ` ${i + 1}. ${el.name} (${el.views} view) \n`, title + `\n`);
    return res;
}
