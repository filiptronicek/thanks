const count = document.getElementById("sponsor-count");
const sponsorsList = document.getElementById("sponsor-list");

const user = "filiptronicek";

index = 0;

let updateSlash = setInterval(() => {
    index++;
    if(index % 2 == 0) {
      count.innerText = "\\";
    } else{
      count.innerText = "/";
    }
}, 300);

function getCount() {
  const oReq = new XMLHttpRequest();

  function reqListener() {
    txtCount = JSON.parse(this.responseText).sponsors.count;
    clearInterval(updateSlash);
    count.innerText = txtCount == 1 ? "1 sponsor" : txtCount + " sponsors";
  }

  oReq.addEventListener("load", reqListener);
  oReq.open("GET", `https://sponsors.trnck.dev/${user}/count`);
  oReq.send();
}
function getTwt(twitter_username) {
  if (twitter_username)
    return (
      '<a href="https://twitter.com/' +
      twitter_username +
      '" target="blank"><i class="fa fa-twitter"></i></a>'
    );
  else return "";
}
function getSite(site) {
  if (site) return '<a href="' + site + '" target="blank"><i class="fa fa-link"></i></a>';
  else return "";
}
function getSponsors() {
  const oReq = new XMLHttpRequest();

  function reqListener() {
    txtCount = JSON.parse(this.responseText).sponsors;
    for (let t of txtCount) {
      sponsorsList.innerHTML += `
      <li class="sponsor"> <a href="${t.profile}">
        ${t.details.name || t.handle} 
          <br>
            <img src="${t.avatar}"> 
        </a>
          <br>
        ${getTwt(t.details.twitter_username)} ${getSite(t.details.blog)}<br>
      </li>
      `;
    }
  }

  oReq.addEventListener("load", reqListener);
  oReq.open("GET", `https://sponsors.trnck.dev/${user}/sponsors`);
  oReq.send();
}
getCount();
getSponsors();
