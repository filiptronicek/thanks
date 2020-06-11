const count = document.getElementById("sponsor-count");
const sponsorsList = document.getElementById("sponsor-list");

const user = "filiptronicek";

function getCount() {
  const oReq = new XMLHttpRequest();

  function reqListener() {
    txtCount = JSON.parse(this.responseText).sponsors.count;
    count.innerText = txtCount == 1 ? "1 sponsor" : txtCount + " sponsors";
  }

  oReq.addEventListener("load", reqListener);
  oReq.open("GET", `https://sponsors.trnck.dev/${user}/count`);
  oReq.send();
}
function getSponsors() {
  const oReq = new XMLHttpRequest();

  function reqListener() {
    txtCount = JSON.parse(this.responseText).sponsors;
    for (let t of txtCount) {
      sponsorsList.innerHTML += `
      <li class="sponsor"> <a href="${t.profile}">
        ${t.handle} 
          <br>
        <img src="${t.avatar}"> 
        </a>
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
