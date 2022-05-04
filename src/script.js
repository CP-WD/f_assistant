let link = document.getElementById('page_link');
let target_number = document.getElementById('target_number');
let visit_times_list = Array(300).fill(0);
let visit_times_element = document.getElementById('visited_times');

let current_days = 0;
let days_num = document.getElementById('days_num');
let add_days_num = document.getElementById('add_days_num');

let current_point = 0;
let point_num = document.getElementById('point_num');
let add_point_num = document.getElementById('add_point_num');

let cookie = initCookie();


function genInitialCookie(){
    return new Map([
        ["visitedTimes", new Array(300).fill(0)],
        ["days", 0],
        ["point", 0],
        ["alreadyVisited", 1]
    ]);
}


function getCookieMap(){
    let cookie = new Map();
    const rawCookie = document.cookie.split('; ');
    rawCookie.forEach(element => {
        e = element.split('=')
        if(e[0] === "visitedTimes"){
            cookie.set(e[0], e[1].split(',').map(x => Number(x)));
        }
        else{
            cookie.set(e[0], Number(e[1]));
        }
    });
    return cookie;
} 


function delCookie(){
    target = document.cookie.split(';');
    target.forEach(element => {
        document.cookie = `${element.split('=')[0]}=; max-age=0`;
    })
    cookie = genInitialCookie();
}


function initCookie(){
    if (document.cookie.split(';').indexOf(" alreadyVisited=1") === -1){
        return genInitialCookie();
    }
    else{
        return getCookieMap();
    }
}


function mapToCookieStrList(argMap){
    let cookieList = Array();
    for(let entry of argMap.entries()){
        cookieList[cookieList.length] = `${entry.join('=')};max-age=60*60*24*7`;
    };
    return cookieList
}


function updateCookie(){
    target = document.cookie.split(';');
    target.forEach(element => {
        document.cookie = `${element.split('=')[0]}=; max-age=0`;
    })
    mapToCookieStrList(cookie).forEach(string => {
        document.cookie = string;
    });
}


function applyCookie(){
    cookie.keys
}


function randint(min, max){
    return Math.floor(Math.random()*(max-min+1) + min);
}


function genUrlAndIndex(){
    if (target_number.value == ""){
        randnum = randint(4, 206);
        return [`https://milovana.com/webteases/showtease.php?id=41749&p=${randnum}#t`, randnum];
    }
    else{
        target_val = target_number.value;
        return [`https://milovana.com/webteases/showtease.php?id=41749&p=${target_val}#t`, target_val];
    }
}


function change_url(target){
    [url, num] = genUrlAndIndex();
    link.setAttribute('href', url);
    visit_times_list = cookie.get("visitedTimes");
    visit_times_list[num] += 1;
    visit_times_element.innerHTML = `Page = ${num} (${visit_times_list[num]} times now)`;
    target_number.value = '';
    cookie.set("visitedTimes", visit_times_list);
    updateCookie();

    return 0;
}


function add_days(){
    num = parseInt(add_days_num.value);
    add_days_num.value = '';

    if (!isNaN(num)){
        current_days = cookie.get("days") + num;
        days_num.innerHTML = `Current denial sentence: ${current_days} days`;
        cookie.set("days", current_days);
        updateCookie();
    }
    
    return 0;
}


function add_point(){
    num = parseInt(add_point_num.value);
    add_point_num.value = '';

    if (!isNaN(num)){
        current_point = cookie.get("point") + num;
        point_num.innerHTML = `Current your points: ${current_point} point`;
        cookie.set("point", current_point);
        updateCookie();
    }
    
    return 0;
}
