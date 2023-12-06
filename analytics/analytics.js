const startTime = new Date();
var scripts = document.getElementsByTagName("script");
let lastScript = scripts[scripts.length - 1].src.split('=');
let url = window.location.href;
if (url) {
  url = url.split('?')
}

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const campaignid = getParameterByName('campaignid')
const userId = getParameterByName('userId')
const keyword = getParameterByName('keyword')

console.log(userId)
console.log(campaignid)
console.log(keyword)
if (userId && campaignid) {
  console.log("if success")
  const botdPromise = import("https://openfpcdn.io/botd/v1").then((Botd) => Botd.load({ publicKey: "u41hQyUVICKSTXTF0gjSVrTN" }))

  botdPromise
    .then((botd) => botd.detect())
    .then((result) => {
      fetch(`https://backend-app.sila-ai.com/traffic/${userId}?campaignid=${campaignid}&keyword=${keyword}&js=enabled&requestId=${result.requestId ? result.requestId : false}`)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
    })

}



