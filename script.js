const count = document.getElementById("sponsor-count");
const sponsorsList = document.getElementById("sponsor-list");
function getCount() {
  const oReq = new XMLHttpRequest();

  function reqListener() {

    txtCount = JSON.parse(this.responseText).count;
    count.innerText = txtCount == 1 ? "1 sponsor" : txtCount + " sponsors";
  }

  oReq.addEventListener("load", reqListener);
  oReq.open("GET", "https://sponsors.trnck.dev/filiptronicek/count");
  oReq.send();
}
function getSponsors() {
  const oReq = new XMLHttpRequest();

  function reqListener() {
    txtCount = JSON.parse(this.responseText);
    for(let t of txtCount) {
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
  oReq.open("GET", "https://sponsors.trnck.dev/filiptronicek/sponsors");
  oReq.send();
}
getCount();
getSponsors();