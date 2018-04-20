let mass = [
    {
        //"id":"str",
        "mas1": [1, 2, 3]
    },
    {
        "id": "str2",
        "mas2": [4, 5, 6]
    },
    {
        //"id":"str3",
        "mas3": [7, 8, 9]
    }
];

let t = mass[1];

let tr = () => {
    t.mas2.forEach(
        (value, index) => {
            if (index % 2 !== 0) {
                return
            } else {
                console.log("+++" + value);
            }
        }
    )
}


let r = [1,2,3];
let w = [4,5,6];
[r] = [w];

console.log(r);























/*

t.operation = () => {
    console.log("qqq");
};

t.operation();
*/
//console.log(mass);

