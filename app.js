var can = document.getElementById('myCanvas');
can.height = 700; can.width = 700;
var ctx = can.getContext('2d');
let target = new Image();
target.src = 'https://mdn.mozillademos.org/files/1456/Canvas_sun.png';
let points = document.getElementById("points").innerHTML;
let x = 10, y = 100;
this.pistex = 50;
this.pistey = 140;
let value = 0;
//let points = 0;
//let pointsHeader = document.getElementById('points');
this.ballSize = 2 * Math.PI;
//ctx.fillStyle = "black";
//ctx.fillRect(700, 100, 100, 100);
ctx.clearRect(x,y,can.width,can.height);
    ctx.fillStyle = "rgba(34,45,23,0.4)";
    ctx.fillRect(0, 0, can.width, can.height);

let xvelocity = 0;
  let yvelocity = 0;

let accelerometer = new Accelerometer({frequency: 60});
accelerometer.addEventListener('reading', e => {
    //console.log("Acceleration along the X-axis " + accelerometer.x);
    //console.log("Acceleration along the Y-axis " + accelerometer.y);
    //console.log("Acceleration along the Z-axis " + accelerometer.z);
   
    xvelocity = accelerometer.x;
    yvelocity = accelerometer.y;
  
  
  });
  

  accelerometer.start();
  function draw() {
    
    x = parseInt(x + xvelocity / 1000);
    y = parseInt(y + yvelocity / 1000);
  
    bounceCheck();
    ctx.beginPath();
    ctx.fillStyle = 'rgba(250,0,0,0.4)';
    ctx.fillRect(this.pistex,  this.pistey , 50, 50);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, 20, 0, this.ballSize );
    ctx.fillStyle = 'rgba(250,0,0,0.4)';
    ctx.fill();

    x += 2;
    ctx.fillStyle = "rgba(34,45,23,0.4)";
    ctx.fillRect(0, 0, can.width, can.height);
   // ctx.drawImage(target, 0, 0, 300, 300);
    requestAnimationFrame(draw);
    
    
}

function bounceCheck(){
  let collisionx = x - this.pistex;
let collisiony = y - this.pistey;
var distance = Math.sqrt(collisionx *collisionx + collisiony * collisiony);


    if(x <0){
        x = 0;
          xvelocity = -xvelocity;
          
          console.log("muutettu xvelocity " + x);
      }
      if(y < 0){
          y = 0;
        yvelocity = -yvelocity;
        console.log("muutettu y " + y);
    }
    if(x > can.width){
        x = can.width -50;
        xvelocity = -xvelocity;
       console.log("muutettu x" + x);
    }
    if(y > can.height){
        y = can.height -50;
        yvelocity = -yvelocity;
        console.log("muutettu y " + y);
    }
    if(distance < ballSize + 50) {
      console.log("törmäys");
      destroyPoint();
      
    }
   
}
function newPoint(){
  console.log("tässä pistex" + pistex);
  this.pistex = Math.random() * can.width;
  this.pistey = Math.random() * can.height;
  console.log("tässä pistex" + pistex);
 
}
function destroyPoint(){
  
  value += parseInt(points,10) + 500;
  //pointsHeader.innerText = value;
  document.getElementById("points").innerHTML = value;
//document.body.appendChild(pointsHeader);
  console.log("tuhottu");
  ctx.clearRect(this.pistex,this.pistey,50,50);
  newPoint();
}
newPoint();
draw();



