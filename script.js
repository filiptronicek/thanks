const count = document.getElementById("sponsor-count");

function reqListener() {
txtCount = JSON.parse(this.responseText).count;
  count.innerText =  txtCount == 1 ? "1 sponsor" : txtCount+" sponsors";
}

const oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", "https://sponsors.trnck.dev/filiptronicek/count");
oReq.send();