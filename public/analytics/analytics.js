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

if (userId && campaignid) {
  fetch(`https://tracking-app.sila-ai.com/traffic/${userId}?campaignid=${campaignid}&keyword=${keyword}`)
    .then(response => {
      console.log(response.json())
    })

}