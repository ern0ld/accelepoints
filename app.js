var can = document.getElementById('myCanvas');
can.height = "500"; can.width = "400";
var ctx = can.getContext('2d');
var points = document.getElementById("points").innerHTML;
var sphere = document.getElementById('sphere1');
sphere.hidden = true;
var x = can.width/2, y = can.height/2;
this.pistex = 0;
this.pistey = 0;
var value = 0;
var timeoutID;
this.ballSize = 2 * Math.PI;
var mic;
  var sliderBottom, sliderTop;
  var sound = false;
var voiceMode = false;

ctx.clearRect(x,y,can.width,can.height);
    ctx.fillStyle = "rgba(34,45,23,0.4)";
    ctx.fillRect(0, 0, can.width, can.height);

var xvelocity = 0;
  var yvelocity = 0;
  var acceleX = 0;
  var acceleY = 0;

  //Alustetaan kiihtyvyysanturi, joka mittaa puhelimen asentoa ja liikettä
var accelerometer = null;
try { accelerometer = new Accelerometer({frequency: 60});
accelerometer.addEventListener('reading', e => {
   
    acceleX = accelerometer.x;
    acceleY = accelerometer.y;
    });

 
  accelerometer.start();
}
//Mikäli kiihtyvyysanturin käyttöönottaminen ei onnistu, vaihdetaan ääniohjaukseen
catch(error) {
  console.log("Vaihdetaan ääniohjaukseen");
  voiceMode = true;
  drawVoice();
}

  function drawVoice(){
    //Tarkastellaan seinään osumista
    bounceCheck();
    //p5-kirjasto tarjoaa keinot mikrofonin äänen seuraamisen
  var vol = mic.getLevel();
    //raja-arvot äänen voimakkuuksille
    var thresholdTopY = sliderTopY.value();
    var thresholdBottomY = sliderBottomY.value();
    var thresholdTopX = sliderTopX.value();
    var thresholdBottomX = sliderBottomX.value();
    console.log("Tässä X topsliderin value" + sliderTopX.value());
  //mikäli ääni on oikealla voimakkuudella, liikutetaan y-akselilla
    if (vol < thresholdTopY && vol > thresholdBottomX && !sound) {
      y -= 2;
        }
   
    if (vol < thresholdBottomY) {
     y +=1;
     sound = false;
    }
      //mikäli ääni on oikealla voimakkuudella, liikutetaan x-akselilla

    if (vol < thresholdTopX && vol > thresholdBottomX && !sound) {
      x -= 2;
      
      
    }
   
    if (vol < thresholdBottomX) {
      x +=1;
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


//kiihtyvyysanturin piirtotoiminnot
  function draw2() {
    
   
    bounceCheck();
   // ctx.drawImage(target, 0, 0, 300, 300);
   //Piirretään canvas uudelleen tasaisin väliajoin, luo liikkumisen animaation
    
   
    //kiihtyvyysanturi toimittaa tietoa ja muutetaan pallon sijainti sen perusteella
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
//Alun säätö, p5-kirjasto vaatii setup-funktion ohjelman käynnistyksessä
function setup(){
  //mikäli äänimode päällä, luodaan sliderit ja asetetaan niille arvot p5-kirjaston avulla, muuten siirrytään kiihtyvyysanturin piirtotoimintoon
  if(voiceMode) {
  sliderTopX = createSlider(0, 1, 0.15, 0.01);
  sliderBottomX = createSlider(0, 1, 0.01, 0.01);
  //sliderTop.addEventListener("slide", () => console.log(sliderTop.value));
  sliderTopY = createSlider(0, 1, 0.3, 0.01);
  sliderBottomY = createSlider(0, 1, 0.15, 0.01);
  
  mic = new p5.AudioIn();
  mic.start();
  drawVoice();
}

else{/*newPoint();
  mic = new p5.AudioIn();
  mic.start();*/
draw2();
}

}

//Törmäyksen tarkistus
function bounceCheck(){
  //luodaan muuttujat törmäyspisteen löytämiseksi
  var collisionx = x - this.pistex;
var collisiony = y - this.pistey;
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
     //tuhotaan pisteobjekti
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
  //luodaan uusi pisteobjekti
  newPoint();
}

setup();




