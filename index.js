const H_LINE_START = 1024;
const H_LINE_FINAL = 0;
const W_LINE_START = 768;
const W_LINE_FINAL = 100;

const TYPE_CLOUD = "cloud";
const TYPE_BIRD = "bird";
const TYPE_PLANE = "plane";
const TYPE_FUEL = "fuel";
const TYPE_STAR = "star";

const TYPE_CLOUD_P = 100;
const TYPE_BIRD_P = 80;
const TYPE_PLANE_P = 0;
const TYPE_FUEL_P = 20;
const TYPE_STAR_P = 70;

let score_star = 0;


let list = [TYPE_CLOUD, TYPE_BIRD, TYPE_PLANE, TYPE_FUEL, TYPE_STAR];
let list_p = [TYPE_CLOUD_P, TYPE_BIRD_P, TYPE_PLANE_P, TYPE_FUEL_P, TYPE_STAR_P];


function getRandom(min, max) {
    let r = Math.floor(Math.random() * (max - min)) + min;
    return r;
}

const factoryA = (() => {
    getInstance = (objectType) => {
        return this.privateElementGenerator(objectType);
    }

    privateElementGenerator = (className) => {
        let baseKoef = getRandom(0, 100);
        let index = 0;
        for (let i = 0; i < list.length; i++) {
            if (className === list[i])
                index = i;
        }
        if (baseKoef >= list_p[index]) {
            return false;
        }

        let isCorrect = false;

        list.forEach((element) => {
            if (element === className)
                isCorrect = true;
        });

        if (!isCorrect) {
            className = TYPE_CLOUD;
        }
        console.log(className + " create");
        let obj = document.createElement("div");
        let text = document.createTextNode(className);
        obj.setAttribute("class", className);


        if (className === TYPE_BIRD) {
            obj.setAttribute("style", "top: " + getRandom(50, 750) + "px; left: " + 1040 + "px");
        } if (className === TYPE_CLOUD) {
            obj.setAttribute("style", "top: " + getRandom(50, 750) + "px; left: " + 1040 + "px");
        } if (className === TYPE_FUEL) {
            obj.setAttribute("style", "top: -190px; left: " + getRandom(50, 1000) + "px");
        } if (className === TYPE_STAR) {
            obj.setAttribute("style", "top: -190px; left: " + getRandom(50, 1000) + "px");
        } if (className === TYPE_PLANE) {
            return;
        }

        obj.appendChild(text);
        let root = document.getElementById("root");
        root.appendChild(obj);
    }

    return {
        getInstance
    }
})();

const lifecycle = (() => {

    startAnimation = () => {
        console.log("create");

        factoryMove.fromTopToDown();
        factoryMove.fromRightToLeft();
    }

    start = () => {
        console.log("start");


        let idInterval = setInterval(() => {

            lifecycle.create();
            factoryMove.fromTopToDown();
            factoryMove.fromRightToLeft(); //ускоряет

        }, 1000);
    }

    stop = () => {
        console.log("stop");


        //ajax
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                alert(this.responseText);
                let tableRecord = JSON.parse(this.responseText);
                tableRecord.sort((a,b)=>{
                    return b.stars-a.stars;
                });
                alert(JSON.stringify(tableRecord));
                let tr = document.querySelector("#tableRecord");
                let r = "";
                tableRecord.forEach((element)=>{
                    r+="<h5>"+element.stars+" "+element.name+"</h5>"
                });
                tr.innerHTML=r;
            }
        }
        xhr.open("GET", "http://ws1/index.php?resultTable="+JSON.stringify(resultTable), true);
        xhr.send();

    }

    create = () => {
        console.log("create");
        console.log(list[3]);

        let value = getRandom(0, list.length);
        factoryA.getInstance(list[value]);
    }

    addFuel = () => {
        return score__fuel += 10;
    }


    changeFontSize = (command) => {
        let el = document.querySelector('*');
        let style = window.getComputedStyle(el, null).getPropertyValue('font-size');
        let fontSize = parseFloat(style); 
        if (command === "plus") { 
            if (fontSize < 20){          
                el.style.fontSize = (fontSize + 3) + 'px';      
            }
        }else{  
            if (fontSize > 5){           
                el.style.fontSize = (fontSize - 3) + 'px';
            }
        }
    }

    addToCookies = () => {
        document.cookie = "resultTableItem=a" + resultTableItem + ";";
        alert(document.cookie);
        console.log(document.cookie)
    }


    

    return {
        startAnimation,
        start,
        stop,
        create,
        addFuel,
        addToCookies,
        changeFontSize
    }
})();

const factoryMove = (() => {

    destroyObj = (list_array, i, element) => {
        if (element.parentNode == null) return;
        list_array.splice(i, 1);
        element.parentNode.removeChild(element);
    }

    fromRightToLeft = () => {
        let list_bird = [];
        list_bird = [...document.querySelectorAll(".bird")];
        let idIntervalBird = setInterval(() => {
            list_bird.forEach((element, index, object) => {
                if (!isCrash(element)) {
                    let offset = parseInt(element.style.left);
                    if (offset > -200) {
                        element.style.left = (offset - 3) + "px";
                    } else {
                        clearInterval(idIntervalBird);
                        destroyObj(object, index, element);
                    }
                } else {
                    // let obj1 = {
                    //     x: parseInt(element.style.left),
                    //     y: parseInt(element.style.top),
                    //     width: parseInt(element.style.left) - parseInt(element.offsetWidth),
                    //     height: parseInt(element.style.top) + parseInt(element.offsetHeight)
                    // };
                    clearInterval(idIntervalBird);
                    destroyObj(object, index, element);
                }
            })
        }, 30);


        let list_cloud = [];
        list_cloud = [...document.querySelectorAll(".cloud")];
        list_cloud.forEach((element, index, object) => {
            let idIntervalCloud = setInterval(() => {
                let offset = parseInt(element.style.left);
                if (offset > -200) {
                    element.style.left = (offset - 1) + "px";
                } else {
                    clearInterval(idIntervalCloud);
                    destroyObj(object, index, element);
                }
            }, 3);
         })
    };


    fromTopToDown = () => {
        let list_star = [];

        list_star = [...document.querySelectorAll(".star")];
        list_star.forEach((element, index, object) => {
            let idIntervalStar = setInterval(() => {
                if (!isCrash(element)) {
                    let offset = parseInt(element.style.top);
                    if (offset < 788) {
                        element.style.top = (offset + 1) + "px";
                    } else {
                        clearInterval(idIntervalStar);
                        destroyObj(object, index, element);
                    }
                } else {
                    clearInterval(idIntervalStar);
                    destroyObj(object, index, element);
                    document.getElementById('score__star').innerHTML = (score_star += 1);
                }
            }, 20);
        });


        let list_fuel = [];

        list_fuel = [...document.querySelectorAll(".fuel")];
        list_fuel.forEach((element, index, object) => {
            let idIntervalFuel = setInterval(() => {
                if (!isCrash(element)) {
                    let offset = parseInt(element.style.top);
                    if (offset < 788) {
                        element.style.top = (offset + 1) + "px";
                    } else {
                        clearInterval(idIntervalFuel);
                        destroyObj(object, index, element);
                    }
                } else {
                    clearInterval(idIntervalFuel);
                    document.getElementById('score__fuel').innerHTML = (score__fuel += 50);
                    destroyObj(object, index, element);
                }
            }, 20);
        });
    };

    getAnimation = (typeObj) => {
        switch (typeObj) {
            case TYPE_CLOUD:
            case TYPE_BIRD:


            case TYPE_FUEL:
            case TYPE_STAR:


            case TYPE_PLANE:
            default:

                break;
        }
    }

    return {
        fromRightToLeft,
        fromTopToDown,
        getAnimation
    }
})();









//////////////////////////////////
function initPlanePosition() {
    px1 = parseInt(plane.style.left);
    px2 = parseInt(plane.offsetWidth);
    py1 = parseInt(plane.style.top);
    py2 = parseInt(plane.offsetHeight);
}

var px1 = 0;
var px2 = 0;
var py1 = 0;
var py2 = 0;


// сейчас залабаем метод который будет отвечать за столкновение 
///можно позвонить))
///ок

function isCrash(element) {
    let obj1 = {
        x: parseInt(element.style.left),
        y: parseInt(element.style.top),
        width: parseInt(element.offsetWidth),
        height: parseInt(element.offsetHeight)
    };
    let obj2 = {
        x: px1,
        y: py1,
        width: px2,
        height: py2
    };

    let xColl = false;
    let yColl = false;

    if ((obj1.x + obj1.width >= obj2.x) && (obj1.x <= obj2.x + obj2.width)) xColl = true;
    if ((obj1.y + obj1.height >= obj2.y) && (obj1.y <= obj2.y + obj2.height)) yColl = true;

    if (xColl & yColl) {
        return true;
    }
    return false;
}

const factoryMovePlane = (() => {
    planeUp = () => {
        let offset = parseInt(plane.style.top);
        if (offset > 0) {
            plane.style.top = (offset - 7) + 'px';
        }
       // plane.style.transform = "rotate(-45deg);";
        // Standard syntax
        plane.style.transform = "rotate(-10deg)";
        this.drawPosition();
    }

    planeDown = () => {
        let offset = parseInt(plane.style.top);
        if (offset => 0) {
            if (offset < 620) {
                plane.style.top = (offset + 7) + 'px';
            }
        }
        plane.style.transform = "rotate(10deg)";
        this.drawPosition();
    }

    planeLeft = () => {
        let offset = parseInt(plane.style.left);
        if (offset > 0) {
            plane.style.left = (offset - 7) + 'px';
        }
        this.drawPosition();
    }

    planeRight = () => {
        let offset = parseInt(plane.style.left);
        if (offset => 0) {
            if (offset < 860) {
                plane.style.left = (offset + 7) + 'px';
            }
        }
        this.drawPosition();
    }

    drawPosition = () => {
        initPlanePosition();
        let pos = document.querySelector("#position");
        pos.innerHTML = px1 + ":" + py1 + "; " + px2 + ":" + py2;
    }

    planeDefault = () => {
        plane.style.transform = "rotate(0deg)";
    }
    return {
        planeUp,
        planeDown,
        planeLeft,
        planeRight,
        planeDefault
    }
})();


//TIMER
let s = 0;
let m = 0;
setInterval(() => {
    s++;
    if (s === 60) {
        s = 0;
        m++
    }
    if (s < 10) {
        document.getElementById('timer').innerHTML = (m + ":0" + s);
    } else {
        document.getElementById('timer').innerHTML = (m + ":" + s);
    }
}, 1000);

//Обратный таймер

let score__fuel = 10;
let mm = 0;
let pidTimer = setInterval(() => {
    if (score__fuel === 0) {
        // alert("GameOver");
        gameOver();
        return clearInterval(pidTimer);
    }
    score__fuel--;

    let sss = score__fuel % 60;
    let mmm = Math.floor(score__fuel / 60);
    if (sss % 60 == 0) {
        sss = 0;
        if (mmm > 0) {
            mmm--;
        }
    }
    if (sss < 10) {
        document.getElementById('score__fuel').innerHTML = (mmm + ":0" + sss);
    } else {
        document.getElementById('score__fuel').innerHTML = (mmm + ":" + sss);
    }
}, 1000);

//gameover

function gameOver() {
    prompt("Вы проиграли, напишите Ваше имя чтобы попасть в таблицу рекордов!!!");
}



//UP SHIFT
// function changeFontSize(command) {
//     if (command === "plus") {
//         let fSize = document.querySelector('score__fuel');
//         fSize.style.fontSize = (parseInt(fSize.style.fontSize) + 2) + "px";
//         alert(fSize.style.fontSize + "d");
//     }
// };



//MUSIC
// document.getElementById('btn_sound').onclick = function(){
//     let myAudio = document.getElementById('myaudio');
//     if (myAudio.paused == true){
//         document.getElementById('myaudio').play();
//         this.style.backgroundImage = "url('image/audio_on.png')";
//     } else if(myAudio.paused == false){
//        document.getElementById('myaudio').pause();
//        this.style.backgroundImage = "url('image/audio_off.png')";
//     }


//PAUSE
function modalPause() {
    var txt;
    if (confirm("Вы находитесь в режиме паузы, нажмите ок для продолжения игры! И отмена для того чтобы начать игру заново")) {
        txt = "Продолжить";
    } else {
        txt = "Заново";
        location.reload();
    }
}

///animation proive
$('.prove').fadeIn('slow');


////MODAL
// function showModal() {
//     var modalWin = document.getElementById('root');
//     modalWin.style.display = 'block';
//     var dontModal = document.getElementById('popup');
//     dontModal.style.display = 'none';
// }

//




//TABLE

let resultTable = [];
resultTable.push( {
    name: "xxx",
    time: "4:40",
    stars: 250
});
resultTable.push( {
    name: "bbb",
    time: "4:40",
    stars: 234
});
resultTable.push( {
    name: "ccc",
    time: "4:40",
    stars: 10
});
resultTable.push( {
    name: "aaa",
    time: "4:40",
    stars: 1
});
resultTable.push( {
    name: "TTre",
    time: "4:40",
    stars: 234
});


console.log(JSON.stringify(resultTable));


/// 

