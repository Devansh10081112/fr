let database;
let dog, mood = "hungry";
let feed, add;
let fedTime, lastFed, min, h, t;
let NAme, Name;
let state = "start";

function preload() {
  // bg
  bg = loadImage('Assets/bg.png');
  // dog_idle animation
  idle = loadAnimation('Assets/idle1.png', 'Assets/idle2.png', 'Assets/idle3.png', 'Assets/idle4.png');
  // dog_happy image
  happy = loadImage("Assets/happy.png");
  // loading pixelated font
  pixel = loadFont("Assets/Pixel.ttf");
}

function setup() {
  // creating canvas 
  createCanvas(1000, 1000);
  // initialising database
  database = firebase.database();
  // creating object of Food class
  food = new Food();

  // creating the feed button
  feed = createButton('🐶Feed🐶');
  feed.position(950, 950);
  // styling the button
  feed.size(180, 50);
  feed.style('font-size: 32px');
  feed.style('background-color:#2e7bff');
  feed.style('border-radius: 12px');
  feed.style('color:#ffffff');
  feed.mousePressed(Feed);
  // creating the add button
  add = createButton('🍼Add🍼');
  add.position(1150, 950);
  add.size(150, 50);
  // styling the button
  add.style('font-size: 32px');
  add.style('background-color:#1cd922');
  add.style('border-radius: 12px');
  add.style('color:#ffffff');
  add.mousePressed(() => {
    food.addFood(foodStock)
  });

  Start();

  // character of a dog
  dog = createSprite(width / 2, 650);
  dog.addAnimation("idle", idle);
  dog.addImage("happy", happy);
  dog.scale = 0.5;
  // name of dog
  NAme = database.ref('Name');
  NAme.on("value", (data) => {
    Name = data.val();
  });

  // keeping track of time
  fedTime = database.ref('Time');
  fedTime.on("value", function (data) {
    lastFed = data.val();
  });
}

function draw() {
  background(bg);

  if (frameCount % 500 == 0 && mood == "happy") {
    dog.changeAnimation('idle', idle);
    mood = "hungry";
  }
  food.display();

  drawSprites();

  stroke(150);
  strokeWeight(3);
  textSize(32);
  textFont(pixel);
  text("Last Time Fed - " + lastFed, 10, 60);
  if (mood == "happy") {
    textFont(pixel);
    textSize(26);
    stroke(255,0,0);
    fill("Yellow");
    text(Name + " : Woof ! 🐶", 430, 520);
  }
}

function Feed() {
  if (mood == "hungry") {
    mood = "happy";
    dog.changeImage('happy', happy);
    food.updateFoodStock(foodStock);
    time();
  }
}

function time() {
  h = hour();
  min = minute();
  t = "AM";

  if (min < 10)
    min = "0" + minute();

  if (h > 12) {
    h = hour() - 12;
    t = "PM";
  }
  lastFed = (String)(h + " : " + min + " " + t);
  database.ref('/').update({
    Time: lastFed
  });
}

function NAME() {
  database.ref('/').update({
    Name: input.value()
  });
  sub.hide();
  input.hide();
}

function Start() {
  // input box for pet name
  input = createInput('🐾🐕Pet Name🐕🐾');
  input.position(980, 120);
  input.size(350, 50);
  // styling the box
  input.style('font-size: 32px');
  input.style('background-color:');
  input.style('background-color:#ad07fa');
  input.style('color:#ffffff');
  // creating the change-name button
  sub = createButton('🥰 Name ! 🥰');
  sub.position(1110, 180);
  sub.size(220, 50);
  // styling the button
  sub.style('font-size: 26px');
  sub.style('background-color:#1cd922');
  sub.style('border-radius: 12px');
  sub.style('color:#ffffff');
  sub.mousePressed(NAME);
}
