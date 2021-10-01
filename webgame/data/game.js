var w = window.innerWidth;
var h = window.innerHeight;

var bullet_s = 0;

var ran = Math.random() * (2) + -1;

var my_var;

var score = 0;

var health = 3;

var en_end = setInterval(alertFunc, 10);
  
var lev_y = 1;

var mySound;

var m_lef;

var m_rig;

var f_lef = 0;

var f_rig = 0;

function alertFunc() {
    var en = document.getElementById("enm");
    move_enemy(en, ran);
}


document.onkeydown = function(event){
    
    
    var x = event.keyCode
    
    
    if(x == 39 && f_lef == 0){
        m_lef = setInterval(moveLeft, 10); 
        f_lef = 1;
    }
    if (x == 37 && f_rig == 0) {
        m_rig = setInterval(moveRight, 10);
        f_rig = 1;
    }
    
}

document.onkeyup = function(event){
    
    var x = event.keyCode
    


    if (x == 32 && health > 0) {
        my_bullet()
        
    }
    if(x == 39){
        clearInterval(m_lef);
        f_lef = 0;
    }
    if(x == 37){
        clearInterval(m_rig);
        f_rig = 0;
    }
}


function moveLeft(element) {
    var element = document.getElementById("sp");
    var elStyle = window.getComputedStyle(element);
    var topValue = elStyle.getPropertyValue("left").replace("px", "");
    if (topValue < 3 * w / 4 - 80) {
        element.style.left = (Number(topValue) + 3) + "px";
    }
    
  }

function moveRight(element) {
    var element = document.getElementById("sp");
    var elStyle = window.getComputedStyle(element);
    var topValue = elStyle.getPropertyValue( "left").replace("px", "");
    if(topValue > w / 4){
        element.style.left = (Number(topValue) - 3) + "px";
    }
    
  }

var g = 0

function move_enemy(element, x){
    var elStyle = window.getComputedStyle(element);
    var topValue = elStyle.getPropertyValue( "left").replace("px", "");
    
    if(topValue > w / 4 && topValue < 3 * w / 4 - 64){
        element.style.left = (Number(topValue) + x) + "px";
        g = 0
    }
    if(g == 0){
    if(topValue <= w /4 || topValue >= 3 * w / 4 - 64){
        ran *= -1;
        if(topValue <= w / 4)
        element.style.left = (Number(topValue) + 10) + "px";
        if(topValue >= 3 * w / 4 - 64)
        element.style.left = (Number(topValue) - 10) + "px";
        g = 1;
    }}
    var dow = window.getComputedStyle(element);
    var tp = dow.getPropertyValue( "bottom").replace("px", "");
    element.style.bottom = (Number(tp) - lev_y) + "px";

    if(tp < 0){
        y_r = Math.random() * (20) + 80;
        element.style.bottom = y_r + "%";
        ran = Math.random() * (2) + -1;
        health -= 1;
        
        var st = "Health: " + health;
        document.getElementById("hel").innerHTML = st;
        r = Math.random() * (40) + 25;
        element.style.left = r + "%";
        console.log(r);
        if(health == 0)
        game_o();
    }

}

function my_bullet(){
    
    var bu = document.getElementById("bull");
    var pl = document.getElementById("sp");
    var elStyle = window.getComputedStyle(pl);
    if(bullet_s == 0){
    var topValue = elStyle.getPropertyValue("left").replace("px", "");
    
    bu.style.left = (Number(topValue) + 18) + "px";
    bu.style.visibility = "visible";
     my_var = setInterval(bullet_r, 10);  }
    bullet_s = 1;
    
}

function bullet_r(){
    var bu = document.getElementById("bull");
    move_bullet(bu);
}

function move_bullet(element){
    
    var dow = window.getComputedStyle(element);
    var tp = dow.getPropertyValue( "bottom").replace("px", "");
    element.style.bottom = (Number(tp) + 5) + "px";
    if(tp > h){
        element.style.bottom = 5 + "%";
        bullet_s = 0;
        element.style.visibility = "hidden";
        clearInterval(my_var)
    }
    var en = document.getElementById("enm");
    var es = window.getComputedStyle(en);
    
    var x1 = Number(dow.getPropertyValue( "left").replace("px", ""));
    var y1 = Number(dow.getPropertyValue( "bottom").replace("px", ""));
    
    var x2 = Number(es.getPropertyValue( "left").replace("px", ""));
    var y2 = Number(es.getPropertyValue( "bottom").replace("px", ""));
    
    if (x1<x2 - 10 + 64 && x1 > x2 - 20 && y1 < y2 + 20 && y1 > y2) {
        element.style.bottom = 5 + "%";
        bullet_s = 0;
        element.style.visibility = "hidden";
        clearInterval(my_var)
        y_r = Math.random() * (20) + 80;
        en.style.bottom = y_r + "%";
        ran = Math.random() * (2) + -1;
        score += 1;
        var st = "Your Score: " + score;
        document.getElementById("s_c").innerHTML = st;
        lev_y += 0.1
        r = Math.random() * (40) + 25;
        en.style.left = r + "%";
        mySound = new sound("expo.wav");
        mySound.play();
    }
}

function game_o(){
    document.getElementById("sp").style.visibility = "hidden";
    document.getElementById("enm").style.visibility = "hidden";
    document.getElementById("g_o").style.visibility = "visible";
    document.getElementById("but").style.visibility = "visible";
    clearInterval(en_end);
}

function play(){
    health = 3;
    score = 0;
    document.getElementById("sp").style.visibility = "visible";
    document.getElementById("enm").style.visibility = "visible";
    document.getElementById("g_o").style.visibility = "hidden";
    document.getElementById("but").style.visibility = "hidden";
    var st = "Health: " + health;
        document.getElementById("hel").innerHTML = st;
    var st = "Your Score: " + score;
        document.getElementById("s_c").innerHTML = st;
    lev_y = 1;
    document.getElementById("enm").style.bottom = "90%";
    en_end = setInterval(alertFunc, 10);
}


class sound {
    constructor(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        this.play = function () {
            this.sound.play();
        };
        this.stop = function () {
            this.sound.pause();
        };
    }
}

