var can = document.getElementById('myCanvas');
can.height = 700; can.width = 700;
var ctx = can.getContext('2d');
let x = 10, y = 100;
this.pistex = 50;
this.pistey = 140;
let points = 0;
let pointsHeader = document.getElementById('points');

//ctx.fillStyle = "black";
//ctx.fillRect(700, 100, 100, 100);
let xvelocity = 0;
  let yvelocity = 0;

let accelerometer = new Accelerometer({frequency: 60});
accelerometer.addEventListener('reading', e => {
    //console.log("Acceleration along the X-axis " + accelerometer.x);
    //console.log("Acceleration along the Y-axis " + accelerometer.y);
    //console.log("Acceleration along the Z-axis " + accelerometer.z);
   
    xvelocity = xvelocity + accelerometer.x;
    yvelocity = yvelocity + accelerometer.y;
  
  
  });
  

  accelerometer.start();
  function newPoint(){
    console.log("tässä pistex" + pistex);
    this.pistex = Math.random() * can.width;
    this.pistey = Math.random() * can.height;
    console.log("tässä pistex" + pistex);
    ctx.beginPath();
      ctx.fillStyle = 'rgba(250,0,0,0.4)';
      ctx.fillRect(this.pistex,  this.pistey , 50, 50);
      ctx.fill();
      ctx.restore();
      
  }
  function draw() {
      
    x = parseInt(x + xvelocity / 50);
    y = parseInt(y + yvelocity / 50);
    bounceCheck();
      
    this.pistex = Math.random() * can.width;
    this.pistey = Math.random() * can.height;
    console.log("tässä pistex" + pistex);
    ctx.beginPath();
      ctx.fillStyle = 'rgba(250,0,0,0.4)';
      ctx.fillRect(this.pistex,  this.pistey , 50, 50);
      ctx.fill();

    //x += 2;
    ctx.fillStyle = "rgba(34,45,23,0.4)";
    ctx.fillRect(0, 0, can.width, can.height);
    requestAnimationFrame(draw);
    //ctx.clearRect(0,0,can.width,can.height);
}
function bounceCheck(){
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
    if(x == pistex && y == pistey) {
      destroyPoint();
    }
}

function destroyPoint(){
  points += 1;
  pointsHeader.innerText = points;
document.body.appendChild(pointsHeader);
  console.log("tuhottu");
  ctx.clearRect(this.pistex,this.pistey,50,50);
  newPoint();
}

draw();
newPoint();


