var can = document.getElementById('myCanvas');
can.height = 700; can.width = 700;
var ctx = can.getContext('2d');
let target = new Image();
target.src = 'https://mdn.mozillademos.org/files/1456/Canvas_sun.png';
var points = document.getElementById("points").innerHTML;
let sphere = document.getElementById('sphere1');
sphere.hidden = true;
let x = can.width/2, y = can.height/2;
this.pistex = 0;
this.pistey = 0;
var value = 0;
var timeoutID;
this.ballSize = 2 * Math.PI;
let mic;
  let sliderBottom, sliderTop;
  let sound = false;
let voiceMode = false;

ctx.clearRect(x,y,can.width,can.height);
    ctx.fillStyle = "rgba(34,45,23,0.4)";
    ctx.fillRect(0, 0, can.width, can.height);

let xvelocity = 0;
  let yvelocity = 0;
  let acceleX = 0;
  let acceleY = 0;

  //Alustetaan kiihtyvyysanturi, joka mittaa puhelimen asentoa ja liikettä
let accelerometer = null;
try { accelerometer = new Accelerometer({frequency: 60});
accelerometer.addEventListener('reading', e => {
    //console.log("Acceleration along the X-axis " + accelerometer.x);
    //console.log("Acceleration along the Y-axis " + accelerometer.y);
    //console.log("Acceleration along the Z-axis " + accelerometer.z);
    acceleX = accelerometer.x;
    acceleY = accelerometer.y;
    /*if(x == 0 && y == 0){
      x = acceleX;
      y = acceleY;
    }*/
  
    
  
  
  });

 
  accelerometer.start();
}
catch(error) {
  console.log("Vaihdetaan ääniohjaukseen");
  voiceMode = true;
  drawVoice();
}

  function drawVoice(){
    bounceCheck();
  var vol = mic.getLevel();
    var thresholdTopY = 0.001;
    var thresholdBottomY = 0.0001;
    var thresholdTopX = 0.0003;
    var thresholdBottomX = 0.001;
    //console.log(vol);
    //console.log("Yvelocity " + yvelocity)
    xvelocity = xvelocity + acceleX;
    yvelocity = yvelocity - acceleY;
    //console.log("Xvelocity" + xvelocity);
    //console.log("Yvelocity " + yvelocity)
    if (vol > thresholdTopY && !sound) {
      y -= 2;
      
      
    }
   
    if (vol < thresholdBottomY) {
      y +=2;
     sound = false;
    }
    if (vol > thresholdTopX && !sound) {
      x -= 2;
      
      
    }
   
    if (vol < thresholdBottomX) {
      x +=2;
     sound = false;
    }

    
    //Luodaan pisteobjekti canvakselle
    ctx.beginPath();
    ctx.fillStyle = 'rgba(250,0,0,0.4)';
    ctx.fillRect(this.pistex,  this.pistey , 50, 50);
    ctx.fill();

    //Luodaan liikuteltava pallo canvakselle
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, this.ballSize );
    ctx.fillStyle = 'rgba(250,0,0,0.4)';
    ctx.fill();
    
    //x += 2;
    ctx.fillStyle = "rgba(34,45,23,0.4)";
    ctx.fillRect(0, 0, can.width, can.height);
     

    requestAnimationFrame(drawVoice);
}



  function draw2() {
  
    bounceCheck();
  
    
    
   // ctx.drawImage(target, 0, 0, 300, 300);
   //Piirretään canvas uudelleen tasaisin väliajoin, luo liikkumisen animaation
    
   
    //console.log(vol);
    //console.log("Yvelocity " + yvelocity)
    xvelocity = xvelocity + acceleX;
    yvelocity = yvelocity - acceleY;
     x = parseInt(x + xvelocity / 100);
    y = parseInt(y + yvelocity / 100);
  
    
    //Luodaan pisteobjekti canvakselle
    ctx.beginPath();
    ctx.fillStyle = 'rgba(250,0,0,0.4)';
    ctx.fillRect(this.pistex,  this.pistey , 50, 50);
    ctx.fill();

    //Luodaan liikuteltava pallo canvakselle
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, this.ballSize );
    ctx.fillStyle = 'rgba(250,0,0,0.4)';
    ctx.fill();
    
    //x += 2;
    ctx.fillStyle = "rgba(34,45,23,0.4)";
    ctx.fillRect(0, 0, can.width, can.height);
     
  
    requestAnimationFrame(draw2);
}

function setup(){
  if(voiceMode) {
  sliderTop = createSlider(0, 1, 0.3, 0.01);
  sliderBottom = createSlider(0, 1, 0.1, 0.01);
  mic = new p5.AudioIn();
  mic.start();
  drawVoice();
}

else{newPoint();

draw2();
}

}

//Törmäyksen tarkistus
function bounceCheck(){
  //luodaan muuttujat törmäyspisteen löytämiseksi
  let collisionx = x - this.pistex;
let collisiony = y - this.pistey;
var distance = Math.sqrt(collisionx *collisionx + collisiony * collisiony);

//Mikäli pallo on menossa rajojen ulkopuolelle vasemmalta, vaihdetaan suunta
    if(x <0){
        x = 0;
          xvelocity = -xvelocity * 0.50;
          
          //console.log("xVelocity on :" + xvelocity );
      }
      //Mikäli pallo on menossa rajojen ulkopuolelle ylhäältä, vaihdetaan suunta
      if(y < 0){
          y = 0;
        yvelocity = -yvelocity * 0.50;
        //console.log("yVelocity on :" + yvelocity );
    }
    //Mikäli pallo on menossa rajojen ulkopuolelle oikealta vaihdetaan suunta
    if(x > can.width-20){
        x = can.width -20;
        xvelocity = -xvelocity * 0.50;
       //console.log("xVelocity on :" + xvelocity );
    }
    //Mikäli pallo on menossa rajojen ulkopuolelle alhaalta, vaihdetaan suunta
    if(y > can.height-20){
        y = can.height -20;
        yvelocity = -yvelocity* 0.50;
        //console.log("yVelocity on :" + yvelocity );
    }
    //Tarkistetaan törmääkö pallo pisteobjektiin
    if(distance < ballSize + 50) {
     // console.log("törmäys");
      destroyPoint();
      
      
    }
   
}
//luo uudet satunnaiset koordinaatit pisteobjektille
function newPoint(){

  this.pistex = Math.random() * (can.width - 50);
  this.pistey = Math.random() * (can.height - 50);
 
}
//tuhoaa edellisen pisteobjektin mikäli siihen on osuttu. Lisää pisteitä pääsivulle
function destroyPoint(){
  
  value = value + 1;
    var a = value.toString();
    //pointsHeader.innerText = value;
    document.getElementById("points").innerHTML = a;
  //pointsHeader.innerText = value;
  points.innerHTML = value;
//document.body.appendChild(pointsHeader);
  console.log("tuhottu");
  ctx.clearRect(this.pistex,this.pistey,50,50);
  newPoint();
}
setup();




