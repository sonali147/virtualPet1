var database;
var dogImg, happyDogImg;
var dog, happyDog, foodS, foodStock;

function preload(){
    dogImg = loadImage("Dog.png");
    happyDogImg = loadImage("happydog.png");
}

function setup(){
    var canvas = createCanvas(500,500);
    database = firebase.database();

    dog = createSprite(250,250);
    dog.addImage(dogImg);
    dog.scale = 0.5;

    foodStock = database.ref("food");
    foodStock.on("value", readStock);
}

function draw(){
    background(46, 139, 87);
    drawSprites();
    fill("white");
    if(foodS !== undefined){
        textSize(20);
        text("Food Stock : " + foodS, 170, 50);
    }
    textSize(15);
    text("Note: Press UP Arrow to feed SHIFU", 120, 20);
}

function keyPressed(){
    if(keyCode === UP_ARROW){
        if(foodS !== undefined){
            deductStock();
            dog.addImage(happyDogImg);
        }
    }
}

function readStock(snapshot){
    foodS = snapshot.val();
    console.log(foodS);
}

function deductStock(){
    foodS -= 1;
    database.ref("/").update({
        food: foodS
    })
}
