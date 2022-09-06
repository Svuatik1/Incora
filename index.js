import { Show, Movie, Episode, Series } from "./Shows.js";
import StreamingService from "./StreamingService.js";
import Subscription from "./Subscription.js";
import User from "./User.js";
import data from "./shows.json" assert { type: "json" };
export const randomNumber = (start, end) => {
  return +(Math.random() * (end - start) + start).toFixed(0);
};

function time() {
  let releaseDate;
  let year = randomNumber(2005, new Date().getFullYear());
  if (year === new Date().getFullYear()) {
    let month = randomNumber(1, new Date().getMonth() + 1);
    if (month === new Date().getMonth() + 1) {
      let day = randomNumber(1, new Date().getDate() + 1);
      releaseDate = `${day}-${month}-${year}`;
    } else releaseDate = `${randomNumber(1, 30)}-${month}-${year}`;
  } else releaseDate = `${randomNumber(1, 30)}-${randomNumber(1, 12)}-${year}`;
  return releaseDate;
}

let user = new User();
let genres = {
  action: "action",
  comedy: "comedy",
  drama: "drama",
  fantasy: "fantasy",
  horror: "horror",
  mystery: "mystery",
  romance: "romance",
  thriller: "thriller",
};
let netflix = new StreamingService("Netflix");
let megogo = new StreamingService("Megogo");
let shows = [Show, Movie, Episode, Series];
let streamingServices = [netflix, megogo];

for (let i = 1; i <= 50; i++) {
  let name = data.shows[randomNumber(0, data.shows.length - 1)];
  let show = shows[randomNumber(0, shows.length - 1)];
  let service =
    streamingServices[randomNumber(0, streamingServices.length - 1)];
  let genre =
    Object.keys(genres)[randomNumber(0, Object.keys(genres).length - 1)];
  let releaseDate = time();
  show === Series
    ? service.addShow(
        new Series(`${name}`, genre, releaseDate, randomNumber(1, 20))
      )
    : service.addShow(new show(`${name}`, genre, releaseDate));
}

let netflixSubs = new Subscription(netflix);
let megogoSubs = new Subscription(megogo);

console.log(user.subscribe(netflixSubs));
console.log(user.subscribe(megogoSubs));
console.log(user.subscribe(megogoSubs)); //have same subscr
console.log(
  netflix.addShow(new Movie("Home alone", genres.comedy, `17-11-2006`))
);
console.log(
  netflix.addShow(new Movie("Home alone", genres.comedy, `17-11-2006`))
); // have same show
console.log(megogoSubs.watch("Home alone 2")); //dosn't have show
console.log(netflixSubs.getRecommendationByGenre(genres.horror));
console.log(netflixSubs.getRecommendationTrending());
console.log(netflix.getMostViewedShowsOfGenre(genres.romance, true));
console.log(netflix.getMostViewedShowsOfYear("2006", true));
console.log(
  netflix.viewsByShowNames.get(
    netflix.getMostViewedShowsOfYear("2006", true)[0].name
  )
);
console.log(
  netflixSubs.watch(netflix.getMostViewedShowsOfYear("2006")[0].name)
);
console.log(
  netflix.viewsByShowNames.get(
    netflix.getMostViewedShowsOfYear("2006")[0]?.name
  )
);
console.log(
  netflixSubs.watch(netflix.getMostViewedShowsOfYear("2006")[0].name)
);
console.log(
  netflixSubs.watch(netflix.getMostViewedShowsOfYear("2006")[0].name)
);
console.log(
  netflix.viewsByShowNames.get(netflix.getMostViewedShowsOfYear("2006")[0].name)
);
