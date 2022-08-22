const count = document.getElementById("sponsor-count");
const sponsorsList = document.getElementById("sponsor-list");
const donorsList = document.getElementById("donor-list");

const user = "filiptronicek";
const sponsorsApi = "https://ghs.vercel.app/";

let index = 0;

const updateSlash = setInterval(() => {
  index++;
  if (index % 2 == 0) {
    count.innerText = "\\";
  } else {
    count.innerText = "/";
  }
}, 300);

async function getCount() {
  const sponsorsResponse = await fetch(`${sponsorsApi}count/${user}`)

  clearInterval(updateSlash);

  if (!sponsorsResponse.ok) {
    console.error("Error loading sponsors: ", sponsorsResponse.statusText)
  }

  const data = await sponsorsResponse.json();
  const sponsorsCount = data.sponsors.count;
  count.innerText = sponsorsCount === 1 ? "1 sponsor" : sponsorsCount + " sponsors";
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
  oReq.open("GET", `${sponsorsApi}sponsors/${user}`);
  oReq.send();
}
function getDonors() {
  const oReq = new XMLHttpRequest();

  function reqListener() {
    txtCount = JSON.parse(this.responseText).users;
    for (const donor of txtCount) {
      donorsList.innerHTML += `
      <li class="sponsor"> <a href="${donor.web}">
        ${donor.name || donor.handle}
          <br>
            <img src="https://trnck.dev/proxy?url=${donor.avatar}" width="60" alt="donator: ${donor.name}">
        </a>
          <br>
        ${getTwt(donor.twitter)} ${getSite(donor.web)}<br>
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
