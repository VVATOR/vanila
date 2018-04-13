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

    start = () => {
        console.log("start");
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
        start,
        stop,
        create
    }
})();


const factoryMove = (() => {

    fromRightToLeft = () => {
        console.log("fromRightToLeft");
        // factoryA.getInstance(TYPE_CLOUD);
        let list = [];

        list = [...document.querySelectorAll(".bird")];
        setInterval(() => {
           
            list.forEach(element => {
                let offset = parseInt(element.style.left);
                element.style.left = (offset - 10) + "px";
               // console.log(element.style.left + "  aa  " + offset);
            })
        }, 50);



    };

    fromTopToDown = () => {
        console.log("fromTopToDown");
    };

    return {
        fromRightToLeft,
        fromTopToDown
    }
})();