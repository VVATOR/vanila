const H_LINE_START = 1024;
const H_LINE_FINAL = 0;
const W_LINE_START = 768;
const W_LINE_FINAL = 100;

const TYPE_CLOUD = "cloud";
const TYPE_BIRD = "bird";
const TYPE_PLANE = "plane";
const TYPE_FUEL = "fuel";
const TYPE_STAR = "star";

let list = [TYPE_CLOUD, TYPE_BIRD, TYPE_PLANE, TYPE_FUEL, TYPE_STAR];

function getRandom(min, max) {
    let r = Math.floor(Math.random() * (max - min)) + min;
    return r;
}

const factoryA = (() => {
    getInstance = (objectType) => {
        return this.privateElementGenerator(objectType);
    }

    privateElementGenerator = (className) => {
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
        obj.setAttribute("style", "top: " + getRandom(1, 1024) + "px; left: " + getRandom(1, 768) + "px");
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
            factoryMove.fromRightToLeft();

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

    return {
        startAnimation,
        start,
        stop,
        create
    }
})();






const factoryMove = (() => {

    fromRightToLeft = () => {
        console.log("fromRightToLeft");
        // factoryA.getInstance(TYPE_CLOUD);
        let list_bird = [];

        list_bird = [...document.querySelectorAll(".bird")];
        setInterval(() => {

           
            list_bird.forEach(element => {
                if(isCrash(element)){
                    let offset = parseInt(element.style.left);
                    if (offset > 0) {
                        element.style.left = (offset - 10) + "px";
                        // console.log(element.style.left + "  aa  " + offset);
                    }
                    // console.log(element.style.left + "  aa  " + offset);
                }
            })
            
        }, 90);


        let list_cloud = [];
        list_cloud = [...document.querySelectorAll(".cloud")];
        setInterval(() => {
            
            list_cloud.forEach(element => {

                let offset = parseInt(element.style.left);
                if (offset > -200) {
                    element.style.left = (offset - 1) + "px";
                    // console.log(element.style.left + "  aa  " + offset);
                }
                // console.log(element.style.left + "  aa  " + offset);
            })
        }, 10);
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
        list_star.forEach(element => {
            let idInterval = setInterval(() => {

                let offset = parseInt(element.style.top);
                if (offset < 768) {
                    element.style.top = (offset + 1) + "px";
                    // console.log(element.style.left + "  aa  " + offset);
                }
            }, 5);
        });

                            
        let list_fuel = [];

        list_fuel = [...document.querySelectorAll(".fuel")];
        list_fuel.forEach(element => {
            let idInterval = setInterval(() => {

                let offset = parseInt(element.style.top);
                if (offset < 768) {
                    element.style.top = (offset + 1) + "px";
                    // console.log(element.style.left + "  aa  " + offset);
                }
            }, 10);
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
   var plane = document.querySelector('#plane');
    px1 = parseInt(plane.style.left);
    px2 = parseInt(plane.style.left) +  parseInt(plane.offsetWidth);
    py1 = parseInt(plane.style.top);
    py2 = parseInt(plane.style.top)  +  parseInt(plane.offsetHeight);
}

var px1 =0;
var px2 =0;
var py1 =0;
var py2 =0;


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


function planeUp(){
    plane.style.top = (parseInt(plane.style.top) - 20) +'px';
}

function planeDown(){
    plane.style.top = (parseInt(plane.style.top) + 20) +'px';
}

