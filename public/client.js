function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function getRecommendation(itemQuery){
    var rcookie = getCookie('rcookie');
    if(!rcookie){
        rcookie = create_UUID();
        setCookie('rcookie', rcookie, 30);
    }
    var urlParams = new URLSearchParams(window.location.search);
    var itemId = urlParams.get(itemQuery);
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost", false);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var datas = "userId="+rcookie+"&itemId="+itemId;
    xhttp.send(datas);
    var datas = xhttp.responseText
    return datas;
}

var rcookie = getCookie('rcookie');
if(!rcookie){
    rcookie = create_UUID();
    setCookie('rcookie', rcookie, 30);
}
console.log('팡고 추천 솔루션 UUID : ' + rcookie);