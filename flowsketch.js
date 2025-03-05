let pointsFlow = [];
let font;
let particles = [];
let numParticles = 1800; 
let maxLife = 255; 
let circles = []; 

function preload() {
  font = loadFont('Myriad Pro.otf'); 
}

function setup() {
  createCanvas(600, 600);
  pointsFlow = font.textToPoints('Flow', 150, 300, 150, { sampleFactor: 0.1 });

  
  for (let i = 0; i < 30; i++) {  
    circles.push(new Circle());
   
}
}

function draw() {
  //background color
  let deepTeal = color(0, 153, 204);   
  let deepBlue = color(0, 0, 139);     
  let lightCyan = color(364, 255, 255); 

  
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1); 

    let c;
    if (inter < 0.5) {
      
      let subInter = map(inter, 0, 0.5, 0, 1);
      c = lerpColor(deepBlue, deepTeal, subInter);
    } else {
      
      let subInter = map(inter, 0.5, 1, 0, 1);
      c = lerpColor(deepTeal, lightCyan, subInter);
    }

   
    stroke(c);
    line(0, y, width, y);
  }
     noStroke()
  
  //bubbles
  for (let i = 0; i < circles.length; i++) {
    circles[i].update();
    circles[i].show();
  }
  
  noStroke();
  fill(255);
  
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.update(); 
    p.show(); 

    
    if (p.alpha <= 0) {
      particles.splice(i, 1);
    }
  }

  
  if (frameCount % 3 === 0) { 
    particles.push(new Particle());
  }
  
  for (let i = 0; i < pointsFlow.length; i++) {
    let p = pointsFlow[i];
    let yOffset = sin(frameCount * 0.05 + p.x * 0.05 + mouseX * 0.01) * 10;
    ellipse(p.x, p.y + yOffset, 5, 5);
    
  }
}


class Particle {
  constructor() {
    
    let edge = floor(random(2)); 
    this.pos = createVector(0, 0); 
    this.speed = random(1, 2); 
    this.angle = random(TWO_PI); 
    this.lifetime = 255; 
    this.alpha = this.lifetime; 
    this.noiseOffset = random(1000); 

    
    if (edge == 0) {
      this.pos.x = 0;
      this.pos.y = random(height); 
    } else if (edge == 1) {
      this.pos.x = width;
      this.pos.y = random(height); 
    }
  }

  update() {
    //white moving spots in the background
    let angleNoise = noise(this.noiseOffset) * TWO_PI * 0.5; 
    let direction = p5.Vector.fromAngle(angleNoise);
    direction.setMag(this.speed); 
    this.pos.add(direction); 

    this.noiseOffset += 0.005; 

    
    this.alpha = map(this.lifetime, 0, maxLife, 0, 255);
    this.lifetime--; 
  }

  show() {
    stroke(255, this.alpha); 
    strokeWeight(1); 
    point(this.pos.x, this.pos.y); 
  }
}


class Circle {
  //bubbles' motions
  constructor() {
    this.x = random(width);  
    this.y = random(height); 
    this.size = random(20, 50);  
    this.alpha = random(20, 100);  
    this.speedX = random(-1, 1);  
    this.speedY = random(-1, 1);  
  }

  update() {
    this.x += this.speedX;  
    this.y += this.speedY;  

    
    if (this.x > width || this.x < 0) {
      this.speedX *= -1;
    }
    if (this.y > height || this.y < 0) {
      this.speedY *= -1;
    }
  }

  show() {
    fill(255, this.alpha);  
    ellipse(this.x, this.y, this.size, this.size);  
  }
}




 
 

