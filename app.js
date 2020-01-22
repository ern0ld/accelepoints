var can = document.getElementById('myCanvas');
can.height = 1000; can.width = 1300;
var ctx = can.getContext('2d');
let x = 10, y = 100;
//ctx.fillStyle = "black";
//ctx.fillRect(700, 100, 100, 100);
let xvelocity = 0;
  let yvelocity = 0;

let accelerometer = new Accelerometer({frequency: 60});
accelerometer.addEventListener('reading', e => {
   // console.log("Acceleration along the X-axis " + accelerometer.x);
    //console.log("Acceleration along the Y-axis " + accelerometer.y);
    //console.log("Acceleration along the Z-axis " + accelerometer.z);
   
    xvelocity = xvelocity + accelerometer.x;
    yvelocity = yvelocity + accelerometer.y;
  
  
  });
  

  accelerometer.start();
  function draw() {
      
    x = parseInt(x + xvelocity / 50);
    y = parseInt(y + yvelocity / 50);
    bounceCheck();
      
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(250,0,0,0.4)';
    ctx.fill();

    //x += 2;
    ctx.fillStyle = "rgba(34,45,23,0.4)";
    ctx.fillRect(0, 0, can.width, can.height);
    //requestAnimationFrame(draw);
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
}
function newPoint(){
  
    ctx.fillStyle = "yellow";
    ctx.fillRect(Math.random * can.height, Math.random * can.width , 50, 50);
  

}
newPoint();
newPoint();
draw();


