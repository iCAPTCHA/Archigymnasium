import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
const firebaseConfig = {
    apiKey: "AIzaSyAZ8K3W4UanXmV3uLpceMyM9kscRH-PrHU",
    authDomain: "rickserv-53dbc.firebaseapp.com",
    projectId: "rickserv-53dbc",
    storageBucket: "rickserv-53dbc.firebasestorage.app",
    messagingSenderId: "133846845705",
    appId: "1:133846845705:web:f1e8194fadd0eed7a56bd8",
    measurementId: "G-PL21C2HCHK"
}
const url = window.location.href
const parameters = url.split('?')[1].split('&')
const uuid = parameters[0].replace('uuid=','')
const mail = parameters[1].replace('mail=','')

document.getElementById('emailSpan').innerText = mail



async function getIp() {
    const response = await fetch('https://ipinfo.io/json');
    const data = await response.json();
    return data.ip; // Correctly return the `ip` field from the JSON response
}
function getDeviceData(){
    return {
        platform: navigator.platform,
        userAgent:navigator.userAgent,
        language:navigator.language,
        appName:navigator.appName,
        appVersion:navigator.appVersion,
        cookies:navigator.cookieEnabled
    }
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const cDate = new Date()
const rck = ref(database, "/"+cDate.getTime());

var newEntry
getIp()
 .then(ip => {
    newEntry = {
    timestamp: cDate.toISOString(),   
    ip: ip,
    uuid: uuid,
    deviceData: getDeviceData(),
    success:false,
    mail:mail
};
console.log('sending',newEntry)
set(rck, newEntry)
})
 .catch(e=> {
    newEntry = {
        timestamp: cDate.toISOString(),   
        ip: null,
        uuid: uuid,
        deviceData: getDeviceData(),
        success:false,
        mail:mail
    };
    console.log('sending without ip',newEntry)
    set(rck, newEntry)
 })
function markAsSuccess(){
    newEntry.success=true
    set(rck, newEntry)
}

function buttonPress(){
    markAsSuccess()
    document.querySelectorAll('*:not(body,video,html)').forEach(item=>{item.style.display = 'none'})
    document.querySelector('video').style.display = 'unset'
    const video = document.querySelector('video')
    video.addEventListener('canplay', () => {
        video.play();
    });
}
window.buttonPress = buttonPress
