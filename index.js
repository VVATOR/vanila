const TYPE_CLOUD = "cloud";
const TYPE_BIRD = "bird";
const TYPE_PLANE = "plane";
const TYPE_FUEL = "fuel";
const TYPE_STAR = "star";

const TYPE_CLOUD_P = 100;
const TYPE_BIRD_P = 50;
const TYPE_PLANE_P = 0;
const TYPE_FUEL_P = 30;
const TYPE_STAR_P = 70;

let score__star = { value: 0 };
let score__fuel = { value: 1 };

let list = [TYPE_CLOUD, TYPE_BIRD, TYPE_PLANE, TYPE_FUEL, TYPE_STAR];
let list_p = [TYPE_CLOUD_P, TYPE_BIRD_P, TYPE_PLANE_P, TYPE_FUEL_P, TYPE_STAR_P];

function getRandom(min, max) {
    let r = Math.floor(Math.random() * (max - min)) + min;
    return r;
}

const factoryA = (() => {

    getInstance = (className) => {
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
        let obj = document.createElement("div");
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

        let root = document.getElementById("root");
        root.appendChild(obj);

        let jsObj = {
            type: className,
            html: obj
        }
        return jsObj
    }

    return {
        getInstance
    }
})();

let endGame = true;
let srartGameInterval;
const lifecycle = (() => {
 
    startAnimation = () => {
    }

    start = () => {
        myAudio.play();
        timer();
        backTimer();
        console.log("start");
        if (endGame === true){
            srartGameInterval = setInterval(() => {
                lifecycle.create();
            }, 500);
        } 
    }

    stop = () => {
        console.log("stop");
        //ajax
        // let xhr = new XMLHttpRequest();
        // xhr.onreadystatechange = function () {
        //     if (this.readyState == 4 && this.status == 200) {
        //         alert(this.responseText);
        //         let tableRecord = JSON.parse(this.responseText);
        //         tableRecord.sort((a, b) => {
        //             return b.stars - a.stars;
        //         });
        //         alert(JSON.stringify(tableRecord));
        //         let tr = document.querySelector("#tableRecord");
        //         let r = "";
        //         tableRecord.forEach((element) => {
        //             r += "<h5>" + element.stars + " " + element.name + "</h5>"
        //         });
        //         tr.innerHTML = r;
        //     }
        // }
        // xhr.open("GET", "http://ws1/index.php?resultTable=" + JSON.stringify(resultTable), true);
        // xhr.send();
    }

    create = () => {
        console.log("create");

        let value = getRandom(0, list.length);
        let jsObj = factoryA.getInstance(list[value]);

        jsObj = factoryMove.getAnimation(jsObj);
    }

    addFuel = () => {
        return score__fuel += 10;
    }

    changeFontSize = (command) => {
      //  let img = document.querySelector('#img_score_fuel');
      //  let listImg = document.querySelectorAll('img')

        let el = document.querySelector('*');
       // let imgW = parseFloat(window.getComputedStyle(img, null).getPropertyValue('width'));
        let sizeFont = parseFloat(window.getComputedStyle(el, null).getPropertyValue('font-size'));
        if (command === "plus") {
            if (sizeFont < 20) {
               // img.style.width = (imgW + 1) + 'px';
                el.style.fontSize = (sizeFont + 3) + 'px';
            }
        } else {
            if (sizeFont > 5) {
               // img.style.width = (imgW - 2) + 'px';
                el.style.fontSize = (sizeFont - 2) + 'px';
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
    moveFromTopTemplateONE = (jsObj, offsetValue, scoreAddValue, score__obj) => {
        let element = jsObj.html;
        let idIntervalElement = setInterval(() => {
            if (!isCrash(jsObj)) {
                let offset = parseInt(element.style.top);
                if (offset < 788) {
                    element.style.top = (offset + offsetValue) + "px";
                } else {
                    clearInterval(idIntervalElement);
                    destroyObjONE(element);
                }
            } else {
                clearInterval(idIntervalElement);
                destroyObjONE(element);
                document.getElementById('score__' + jsObj.type).innerHTML = (score__obj.value += scoreAddValue);
            }
        }, 20);
    }

    moveFromRightTemplateONE = (jsObj, offsetValue, elementForCrash, speed) => {
        let element = jsObj.html;
        let idIntervalElement = setInterval(() => {
            if (!isCrash(jsObj) || !elementForCrash) {
                let offset = parseInt(element.style.left);
                if (offset > -200) {
                    element.style.left = (offset - offsetValue) + "px";
                } else {
                    clearInterval(idIntervalElement);
                    destroyObjONE(element);
                }
            } else {
                clearInterval(idIntervalElement);
                destroyObjONE(plane);
                gameOver();
            }
        }, speed);
    }

    destroyObjONE = (element) => {
        if (element.parentNode == null) return;
        element.parentNode.removeChild(element);
    }

    getAnimation = (jsObj) => {
        let speed = 30;
        let elementForCrash = false;
        switch (jsObj.type) {
            case TYPE_CLOUD:
                speed = 3;
                elementForCrash = false;
                moveFromRightTemplateONE(jsObj, 1, elementForCrash, speed);
                break;
            case TYPE_BIRD:
                speed = 30;
                elementForCrash = true;
                moveFromRightTemplateONE(jsObj, 3, elementForCrash, speed);
                break;
            case TYPE_FUEL:
                moveFromTopTemplateONE(jsObj, 1, 10, score__fuel);
                break;
            case TYPE_STAR:
                moveFromTopTemplateONE(jsObj, 1, 1, score__star);
                break;
            default:
                break;
        }
    }
    return {
        getAnimation
    }
})();

//////////////////////////////////

let jsonPlane = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
};
function initPlanePosition() {
    jsonPlane = {
        x: parseInt(plane.style.left),
        y: parseInt(plane.style.top),
        width: parseInt(plane.offsetWidth),
        height: parseInt(plane.offsetHeight)
    };
}

function isCrash(jsonObj) {
    let element =jsonObj.html;
    let obj1 = {
        x: parseInt(element.style.left),
        y: parseInt(element.style.top),
        width: parseInt(element.offsetWidth),
        height: parseInt(element.offsetHeight)
    };

    let xColl = false;
    let yColl = false;

    if ((obj1.x + obj1.width >= jsonPlane.x) && (obj1.x <= jsonPlane.x + jsonPlane.width)) xColl = true;
    if ((obj1.y + obj1.height >= jsonPlane.y) && (obj1.y <= jsonPlane.y + jsonPlane.height)) yColl = true;

    if (xColl & yColl) {
        try{
            console.log(jsonObj.type);
            let audio = document.querySelector('#'+jsonObj.type + "Audio");
            audio.play();
        } catch (err) {

        }
        return true;
    }
    return false;
}

///////////////////////

const factoryMovePlane = (() => {
    planeUp = () => {
        let offset = parseInt(plane.style.top);
        if (offset > 0) {
            plane.style.top = (offset - 7) + 'px';
        }
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
        //pos.innerHTML = px1 + ":" + py1 + "; " + px2 + ":" + py2;
        //jsonPlane
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
function timer() {
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
}



//Обратный таймер

function backTimer() {
    let mm = 0;
    let pidTimer = setInterval(() => {
        if (score__fuel.value === 0) {
            // alert("GameOver");
            gameOver();
            return clearInterval(pidTimer);
        }
        score__fuel.value--;

        let sss = score__fuel.value % 60;
        let mmm = Math.floor(score__fuel.value / 60);
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
}

//gameover

function gameOver() {
    
    endGame = false;
    $( "#gaveoverbox" ).slideDown( "slow" );
    $(".btn").css("display","none");
    $(".score").css("display","none");
    $(".bird").css("display","none");

    let MyDiv1 = document.getElementById('score__star');
	let MyDiv2 = document.getElementById('showscor');
    MyDiv2.innerHTML = MyDiv1.innerHTML;
    

    var MyDiv3 = document.getElementById('timer');
	var MyDiv4 = document.getElementById('time');
    MyDiv4.innerHTML = MyDiv3.innerHTML;

    myAudio.pause();
    clearInterval(srartGameInterval);
}

function table(){
    $( "#tablebox" ).slideDown( "slow" );
    $("#gaveoverbox").fadeOut();
    drawTableResult();
}
//MUSIC in html

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

//TABLE
let resultTable = [{
    name: "xxx",
    time: "4:40",
    stars: 250
},
{
    name: "bbb",
    time: "4:40",
    stars: 234
},
{
    name: "ccc",
    time: "4:40",
    stars: 10
}];
console.log(JSON.stringify(resultTable));

function drawTableResult(){
    let rows ="";
    let aa = [...resultTable];
    aa.forEach((element)=>{
        rows += "<tr>";

        rows+= "<td>" + element.name+ "</td>"
        rows+= "<td>" + element.stars+ "</td>"
        rows+= "<td>" + element.time+ "</td>"
        
        rows += "</tr>";
    });
    document.querySelector('#tableResult').innerHTML = rows;

}

