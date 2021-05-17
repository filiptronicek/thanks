const count = document.getElementById("sponsor-count");
const sponsorsList = document.getElementById("sponsor-list");
const donorsList = document.getElementById("donor-list");

const user = "filiptronicek";

index = 0;

let updateSlash = setInterval(() => {
  index++;
  if (index % 2 == 0) {
    count.innerText = "\\";
  } else {
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
  oReq.open("GET", `https://sponsors.trnck.dev/count/${user}`);
  oReq.send();
}
function getTwt(twitter_username) {
  if (twitter_username)
    return (
      `<a href="https://twitter.com/${twitter_username}" target="blank"><i class="fa fa-twitter"></i></a>`
    );
  else return "";
}
function getSite(site) {
  if (site) {
    if (!site.match(/^https|http:\/\/.{1,256}/g)) {
      site = `http://${site}`;
    }
    return (
      `<a href="${site}" target="blank"><i class="fa fa-link"></i></a>`
    );
  }
  else return "";
}
function getSponsors() {
  const oReq = new XMLHttpRequest();

  function reqListener() {
    txtCount = JSON.parse(this.responseText).sponsors;
    for (const t of txtCount) {
      sponsorsList.innerHTML += `
      <li class="sponsor"> <a href="${t.profile}">
        ${t.details.name || t.handle}
          <br>
            <img src="https://trnck.dev/proxy?url=${t.avatar}" alt="sponsor: ${t.login}" width="60">
        </a>
          <br>
        ${getTwt(t.details.twitter_username)} ${getSite(t.details.blog)}<br>
      </li>
      `;
    }
  }

  oReq.addEventListener("load", reqListener);
  oReq.open("GET", `https://sponsors.trnck.dev/sponsors/${user}`);
  oReq.send();
}
function getDonors() {
  const oReq = new XMLHttpRequest();

  function reqListener() {
    txtCount = JSON.parse(this.responseText).users;
    for (let t of txtCount) {
      donorsList.innerHTML += `
      <li class="sponsor"> <a href="${t.web}">
        ${t.name || t.handle}
          <br>
            <img src="https://trnck.dev/proxy?url=${t.avatar}" width="60" alt="donator: ${t.name}">
        </a>
          <br>
        ${getTwt(t.twitter)} ${getSite(t.web)}<br>
      </li>
      `;
    }
  }

  oReq.addEventListener("load", reqListener);
  oReq.open("GET", `donors.json`);
  oReq.send();
}
getDonors();
getCount();
getSponsors();
