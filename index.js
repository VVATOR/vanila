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
            if(className === list[i])
            index=i;            
        }
        if(baseKoef>=list_p[index]){
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


          

        if(className === TYPE_BIRD){
            obj.setAttribute("style", "top: " + getRandom(50, 750) + "px; left: " + 1040 + "px");
        } if(className === TYPE_CLOUD){
            obj.setAttribute("style", "top: " + getRandom(50, 750) + "px; left: " + 1040 + "px");
        } if(className === TYPE_FUEL){          
            obj.setAttribute("style", "top: -190px; left: " + getRandom(50, 1000) + "px");
        } if(className === TYPE_STAR){
            obj.setAttribute("style", "top: -190px; left: " + getRandom(50, 1000) + "px");
        }  if(className === TYPE_PLANE){
            return;
        }


       // obj.setAttribute("style", "top: " + getRandom(1, 1024) + "px; left: " + getRandom(1, 768) + "px");
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
    }

    create = () => {
        console.log("create");
        console.log(list[3]);

        let value = getRandom(0, list.length);

        


        factoryA.getInstance(list[value]);
    }

    addFuel = () => {
        return ss+=10;
    }

    return {
        startAnimation,
        start,
        stop,
        create,
        addFuel
    }
})();






const factoryMove = (() => {

    destroyObj = (list_array, i,element) =>{
  
        if ( element.parentNode==null) return;
        list_array.splice(i,1);
        element.parentNode.removeChild(element);      
    }

    fromRightToLeft = () => {
        console.log("fromRightToLeft");
        // factoryA.getInstance(TYPE_CLOUD);
        let list_bird = [];

        list_bird = [...document.querySelectorAll(".bird")];
        setInterval(() => {

           
            list_bird.forEach((element, index, object) => {
                if(!XXX(element,plane)){

                //if(isCrash(element)){
                    let offset = parseInt(element.style.left);
                    if (offset > -200) {
                        element.style.left = (offset - 3) + "px";
                        // console.log(element.style.left + "  aa  " + offset);
                    }else{
                        destroyObj(object, index, element);
                    }
                    // console.log(element.style.left + "  aa  " + offset);
               // }
                }else{
                    destroyObj(object, index, element);
                }
            })
            
        }, 30);


        let list_cloud = [];
        list_cloud = [...document.querySelectorAll(".cloud")];
        setInterval(() => {
            
            list_cloud.forEach((element, index, object) => {

                let offset = parseInt(element.style.left);
                if (offset > -200) {
                    element.style.left = (offset - 1) + "px";
                   
                    // console.log(element.style.left + "  aa  " + offset);
                } else{
                    destroyObj(object, index, element);
                }
                // console.log(element.style.left + "  aa  " + offset);
            })
        }, 3);
    };

    
    fromTopToDown = () => {
        console.log("fromTopToDown");
        let list = [];

        // list = [...document.querySelectorAll(".bird")];
        // list.forEach(element => {
        //     let idInterval = setInterval(() => {

        //         let offset = parseInt(element.style.top);
        //         if (offset < 768) {
        //             element.style.top = (offset + 10) + "px";
        //             // console.log(element.style.left + "  aa  " + offset);
        //         }
        //     }, getRandom(10, 1000));
        //     /*  let offset = parseInt(element.style.top);
        //       if (offset > 700) {
        //           let b = document.getElementById("root");
        //           b.removeChild(element);
        //           clearInterval(idInterval);
        //           console.log(element.style.left + "  aa  " + offset);
        //       }*/
        // });

                    
        let list_star = [];

        list_star = [...document.querySelectorAll(".star")];
        list_star.forEach((element, index, object) => {
            let idInterval = setInterval(() => {
                if(!XXX(element,plane)){

                let offset = parseInt(element.style.top);
                if (offset < 788) {
                    element.style.top = (offset + 1) + "px";
                    // console.log(element.style.left + "  aa  " + offset);
                }else{
                    destroyObj(object, index, element);
                }
            }else{
                clearInterval(idInterval);
                document.getElementById('score__star').innerHTML = (score_star +=50);
                destroyObj(object, index, element);
            }
            }, 20);
        });
        
                            
        let list_fuel = [];

        list_fuel = [...document.querySelectorAll(".fuel")];
        list_fuel.forEach((element, index, object) => {
            let idInterval = setInterval(() => {

                let offset = parseInt(element.style.top);
                if (offset < 788) {
                    element.style.top = (offset + 1) + "px";
                    // console.log(element.style.left + "  aa  " + offset);
                }else{
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
function init(){
    px1 = parseInt(plane.style.left);
    px2 = parseInt(plane.style.left) +  parseInt(plane.offsetWidth);
    py1 = parseInt(plane.style.top);
    py2 = parseInt(plane.style.top)  +  parseInt(plane.offsetHeight);
}

var px1 =0;
var px2 =0;
var py1 =0;
var py2 =0;


// сейчас залабаем метод который будет отвечать за столкновение 
///можно позвонить))
///ок

function XXX(element, plane){

    let obj1 = {
        x: parseInt(element.style.left),
        y: parseInt(element.style.top),
        width:parseInt(element.style.left) -  parseInt(element.offsetWidth),
        height:parseInt(element.style.top)  +  parseInt(element.offsetHeight)
    };
    let obj2 = {
        x: parseInt(plane.style.left),
        y: parseInt(plane.style.top),
        width:parseInt(plane.style.left) -  parseInt(plane.offsetWidth),
        height:parseInt(plane.style.top)  +  parseInt(plane.offsetHeight)
    };



    let xColl = false;
    let yColl = false;

    if((obj1.x + obj1.width >=obj2.x)&&(obj1.x <=obj2.x + obj2.width)) xColl =true;
    if((obj1.y + obj1.height >=obj2.y)&&(obj1.y <=obj2.y + obj2.height)) yColl =true;

        if(xColl&yColl) {
            return true;
        }
        return false;
}

function isCrash(element){
    let ex1 = parseInt(element.style.left);
    let ex2 = parseInt(element.style.left) +  parseInt(element.offsetWidth);
    let ey1 = parseInt(element.style.top);
    let ey2 = parseInt(element.style.top)  +  parseInt(element.offsetHeight);
    console.log( ex1-px2 ) 
   
    return ( (parseInt(element.offsetWidth) + parseInt(plane.offsetWidth)) < ex2-px1  )
    //&&
    //( (parseInt(element.offsetHeight) + parseInt(element.style.top)) > (py1 + parseInt(plane.offsetHeight)) )
    ;
    /*if(ey1<py1<ey2 && ex1<px1<ex2){
        console.log(ey1<py1<ey2 && ex1<px1<ex2)
        return false;
    }
    console.log(ey1<py1<ey2 && ex1<px1<ex2)
    return true;*/

}




const factoryMovePlane = (() =>{
    planeUp = () => {
        let offset = parseInt(plane.style.top);
        if(offset > 0){
            plane.style.top = (offset - 5) +'px';
            // plane.style.top = (parseInt(plane.style.top) - 20) +'px';
        }
    }

    planeDown = () => {
        let offset = parseInt(plane.style.top);
        if(offset => 0){
            if(offset < 620){
                plane.style.top = (offset + 5) +'px';
            }
            // plane.style.top = (parseInt(plane.style.top) - 20) +'px';
        }
        // plane.style.top = (parseInt(plane.style.top) + 20) +'px';
    }

    ///// left right

    planeLeft = () => {
        let offset = parseInt(plane.style.left);
        if(offset > 0 ){
            plane.style.left = (offset - 5) +'px';
        }
        // plane.style.left = (parseInt(plane.style.left) - 20) +'px';
    }

    planeRight = () => {
        let offset = parseInt(plane.style.left);
        console.log(offset);
        if(offset => 0){
            if (offset < 860){
                plane.style.left = (offset + 5) +'px';
            }
        }
        // plane.style.left = (parseInt(plane.style.left) + 20) +'px';
    }

    return {
        planeUp,
        planeDown,
        planeLeft,
        planeRight
    }
})();


//TIMER
let s=0;
let m=0;
setInterval(()=>{
s++;
if(s===60){
   s=0;
   m++
}
if(s<10){
    document.getElementById('timer').innerHTML = (m + ":0" + s);
}else{
    document.getElementById('timer').innerHTML = (m + ":" + s);
}
},1000);

//Обратный таймер

let ss= 10;
let mm=0;
let pidTimer = setInterval(()=> {
    if (ss===0){
        alert("GameOver");
        return clearInterval(pidTimer);
    }
    ss--;

    let sss = ss % 60;
    let mmm = Math.floor(ss / 60);
    if (sss % 60 == 0){
        sss=0;
        if (mmm > 0){
            mmm--;
        }
    }
    if(sss<10){
        document.getElementById('score__fuel').innerHTML = (mmm + ":0" + sss);
    }else{
        document.getElementById('score__fuel').innerHTML = (mmm + ":" + sss);
    }
},1000);

//UP SHIFT
function changeFontSize(command){
    if(command === "plus"){
        let fSize = document.querySelector('score__fuel');
        fSize.style.fontSize = (parseInt(fSize.style.fontSize)+ 2) + "px";
        alert(fSize.style.fontSize + "d");
    }
};



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



////MODAL
function showModal(){
    var modalWin = document.getElementById('root');
    modalWin.style.display = 'block';
    var dontModal = document.getElementById('popup');
    dontModal.style.display = 'none';
}

