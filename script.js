let link = document.getElementById('page_link');
let target_number = document.getElementById('target_number');
let visit_times_list = Array(300).fill(0);
let visit_times_element = document.getElementById('visited_times');

let sentence_denial_days = 0;
let days_num = document.getElementById('days_num');
let add_days_num = document.getElementById('add_days_num');

let current_point = 0;
let point_num = document.getElementById('point_num');
let add_point_num = document.getElementById('add_point_num');


function randint(min, max){
    return Math.floor(Math.random()*(max-min+1) + min);
}


function gen_url(){
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
    [url, num] = gen_url();
    link.setAttribute('href', url);
    visit_times_list[num] += 1;
    visit_times_element.innerHTML = `Page = ${num}, (${visit_times_list[num]} times now)`;

    return 0;
}


function add_point(){
    num = parseInt(add_point_num.value);
    add_point_num.value = '';

    if (!isNaN(num)){
        current_point += num;
        point_num.innerHTML = `Current your points: ${current_point} point`;
    }
    
    return 0;
}

