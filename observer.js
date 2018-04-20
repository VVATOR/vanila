//// Publisher 
function Publisher() {
    this.subscribers = [];
}
Publisher.prototype.delivery = (data) => {
    this.subscribers.forEach((fn) => {
          fn(data);
      });
      return this;
  }
Function.prototype.subscribe = (publisher) => {
    publisher.subscribers.push(this);
    return this;
}

let Google = new Publisher;

let Obj1 = function(from) {
    console.log("obj1 " + from);
}

let Obj2 =function(from) {
    console.log("obj2 " + from);
}

let Obj3 = function(from) {
    console.log("obj3 " + from);
}






Obj1.subscribe(Google);
Obj2.subscribe(Google);
Obj3.subscribe(Google);


Google.delivery("search request 0").delivery("search request 1").delivery("search request 2");





