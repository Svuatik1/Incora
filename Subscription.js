import chalk from "chalk";
import { randomNumber } from "./index.js";
const warning = chalk.bgRed.underline.bold;
const warningOrange = chalk.hex("#FFA500").underline;
export default class Subscription {
  streamingService;
  constructor(streamingService) {
    this.streamingService = streamingService;
  }
  watch(showName) {
    let views = this.streamingService.viewsByShowNames;
    if (views.has(showName)) {
      views.set(showName, views.get(showName) + 1);
      return `Watch ${showName} on ${this.streamingService.name}`;
    } else
      return warning(`${this.streamingService.name} doesn't have ${showName}`);
  }
  getRecommendationTrending() {
    return this.streamingService.getMostViewedShowsOfYear() !==
      `Empty most viewed year`
      ? this.streamingService
          .getMostViewedShowsOfYear()
          .getRecommendation(
            this.streamingService.getMostViewedShowsOfYear().length
          )
      : warningOrange(`Empty recommendations by 2022`);
  }
  getRecommendationByGenre(genre) {
    return this.streamingService.getMostViewedShowsOfGenre(genre) !==
      `Empty most viewed genre`
      ? this.streamingService
          .getMostViewedShowsOfGenre(genre)
          .getRecommendation(
            this.streamingService.getMostViewedShowsOfGenre(genre).length
          )
      : warningOrange(`Empty recommendations by genre`);
  }
}

Array.prototype.getRecommendation = function (length) {
  const thisArray = this;
  return thisArray.sort(
    (a, b) =>
      +b.getDuration().split(" min")[0] - +a.getDuration().split(" min")[0]
  )[randomNumber(0, length - 1)];
};
