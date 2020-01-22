var can = document.getElementById('myCanvas');
can.height = 700; can.width = 700;
var ctx = can.getContext('2d');
let target = new Image();
target.src = 'https://mdn.mozillademos.org/files/1456/Canvas_sun.png';
var points = document.getElementById("points").innerHTML;
let x = 10, y = 100;
this.pistex = 0;
this.pistey = 0;
var value = 0;
this.ballSize = 2 * Math.PI;

ctx.clearRect(x,y,can.width,can.height);
    ctx.fillStyle = "rgba(34,45,23,0.4)";
    ctx.fillRect(0, 0, can.width, can.height);

let xvelocity = 0;
  let yvelocity = 0;

  //Alustetaan kiihtyvyysanturi, joka mittaa puhelimen asentoa ja liikettä
let accelerometer = new Accelerometer({frequency: 60});
accelerometer.addEventListener('reading', e => {
    //console.log("Acceleration along the X-axis " + accelerometer.x);
    //console.log("Acceleration along the Y-axis " + accelerometer.y);
    //console.log("Acceleration along the Z-axis " + accelerometer.z);
   
    xvelocity = xvelocity + accelerometer.x;
    yvelocity = yvelocity + accelerometer.y;
  
  
  });
  

  accelerometer.start();
  function draw() {
    
    x = parseInt(x + xvelocity / 1000);
    y = parseInt(y + yvelocity / 1000);
  
    bounceCheck();
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
    value = value + 1;
    var a = value.toString();
    //pointsHeader.innerText = value;
    document.getElementById("points").innerHTML = "Moi";
    document.getElementById("points2").innerHTML = a;
    //x += 2;
    ctx.fillStyle = "rgba(34,45,23,0.4)";
    ctx.fillRect(0, 0, can.width, can.height);
   // ctx.drawImage(target, 0, 0, 300, 300);
   //Piirretään canvas uudelleen tasaisin väliajoin, luo liikkumisen animaation
    requestAnimationFrame(draw);
    
    
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
          xvelocity = -xvelocity;
          
          console.log("muutettu xvelocity " + x);
      }
      //Mikäli pallo on menossa rajojen ulkopuolelle alhaalta, vaihdetaan suunta
      if(y < 0){
          y = 0;
        yvelocity = -yvelocity;
        console.log("muutettu y " + y);
    }
    //Mikäli pallo on menossa rajojen ulkopuolelle oikealta vaihdetaan suunta
    if(x > can.width){
        x = can.width -50;
        xvelocity = -xvelocity;
       console.log("muutettu x" + x);
    }
    //Mikäli pallo on menossa rajojen ulkopuolelle ylhäältä, vaihdetaan suunta
    if(y > can.height){
        y = can.height -50;
        yvelocity = -yvelocity;
        console.log("muutettu y " + y);
    }
    //Tarkistetaan törmääkö pallo pisteobjektiin
    if(distance < ballSize + 50) {
      console.log("törmäys");
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
  
  value += parseInt(points,10) + 500;
  //pointsHeader.innerText = value;
  points.innerHTML = value;
//document.body.appendChild(pointsHeader);
  console.log("tuhottu");
  ctx.clearRect(this.pistex,this.pistey,50,50);
  newPoint();
}
newPoint();
draw();



