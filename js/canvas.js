// ─── OCEAN CANVAS : FISH + BUBBLES + PARTICLES ───────────────────────────────
const cv = document.getElementById('ocean-canvas');
const cx = cv.getContext('2d');
let W, H;

function resize() {
  W = cv.width  = window.innerWidth;
  H = cv.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Particles (plankton glow)
const particles = Array.from({length:60}, () => ({
  x: Math.random()*W, y: Math.random()*H,
  r: Math.random()*1.5+0.3,
  vx: (Math.random()-0.5)*0.15,
  vy: (Math.random()-0.5)*0.12,
  alpha: Math.random()*0.3+0.05,
  pulse: Math.random()*Math.PI*2
}));

// Bubbles
const bubbles = Array.from({length:18}, () => ({
  x: Math.random()*W, y: Math.random()*H + H,
  r: Math.random()*4+1,
  speed: Math.random()*0.4+0.15,
  wobble: Math.random()*Math.PI*2,
  alpha: Math.random()*0.25+0.05
}));

// Fish
const FISH_SHAPES = [
  // shape: draw function with cx, size, color
  (x,y,sz,col) => {
    // Simple fish: body ellipse + tail
    cx.save(); cx.translate(x,y);
    cx.beginPath(); cx.ellipse(0,0,sz,sz*0.45,0,0,Math.PI*2);
    cx.fillStyle = col; cx.fill();
    cx.beginPath(); cx.moveTo(-sz*0.7,0); cx.lineTo(-sz*1.2,-sz*0.5); cx.lineTo(-sz*1.2,sz*0.5); cx.closePath();
    cx.fill();
    // Eye
    cx.beginPath(); cx.arc(sz*0.4, -sz*0.1, sz*0.1, 0, Math.PI*2);
    cx.fillStyle='rgba(0,229,255,0.6)'; cx.fill();
    cx.restore();
  }
];

const fishes = Array.from({length:8}, (_, i) => ({
  x: Math.random() < 0.5 ? -100 : W+100,
  y: Math.random()*H*0.7 + H*0.1,
  size: Math.random()*14+7,
  speed: Math.random()*0.5+0.2,
  dir: Math.random() < 0.5 ? 1 : -1,
  color: `rgba(0,${150+Math.floor(Math.random()*80)},${170+Math.floor(Math.random()*60)},${0.08+Math.random()*0.12})`,
  wobbleY: Math.random()*Math.PI*2,
  wobbleSpeed: Math.random()*0.02+0.008,
  startY: 0
}));
fishes.forEach(f => { f.x = f.dir===1 ? -f.size*2 : W+f.size*2; f.startY = f.y; });

function drawOcean(t) {
  cx.clearRect(0,0,W,H);

  // Deep gradient
  const grad = cx.createLinearGradient(0,0,0,H);
  grad.addColorStop(0,  'rgba(2,13,20,0)');
  grad.addColorStop(0.3,'rgba(4,24,42,0.3)');
  grad.addColorStop(1,  'rgba(2,8,16,0.6)');
  cx.fillStyle = grad; cx.fillRect(0,0,W,H);

  // Caustic light beams
  for(let i=0;i<4;i++){
    const bx = (W*0.1 + W*0.2*i) + Math.sin(t*0.0003+i)*30;
    const bg = cx.createLinearGradient(bx,0,bx+40,H*0.7);
    bg.addColorStop(0,'rgba(0,229,255,0.025)');
    bg.addColorStop(1,'rgba(0,229,255,0)');
    cx.beginPath();
    cx.moveTo(bx,0); cx.lineTo(bx+60,H*0.7); cx.lineTo(bx+20,H*0.7); cx.lineTo(bx-30,0);
    cx.closePath(); cx.fillStyle=bg; cx.fill();
  }

  // Particles
  particles.forEach(p => {
    p.pulse += 0.015;
    p.x += p.vx; p.y += p.vy;
    if(p.x<0) p.x=W; if(p.x>W) p.x=0;
    if(p.y<0) p.y=H; if(p.y>H) p.y=0;
    const a = p.alpha*(0.6+0.4*Math.sin(p.pulse));
    cx.beginPath(); cx.arc(p.x,p.y,p.r,0,Math.PI*2);
    cx.fillStyle=`rgba(0,229,255,${a})`; cx.fill();
  });

  // Bubbles
  bubbles.forEach(b => {
    b.y -= b.speed;
    b.wobble += 0.03;
    const bx = b.x + Math.sin(b.wobble)*3;
    if(b.y < -20) { b.y = H+20; b.x = Math.random()*W; }
    cx.beginPath(); cx.arc(bx,b.y,b.r,0,Math.PI*2);
    cx.strokeStyle=`rgba(0,229,255,${b.alpha*0.8})`; cx.lineWidth=0.8; cx.stroke();
    cx.beginPath(); cx.arc(bx-b.r*0.3, b.y-b.r*0.3, b.r*0.25, 0, Math.PI*2);
    cx.fillStyle=`rgba(176,232,226,${b.alpha*0.5})`; cx.fill();
  });

  // Fish
  fishes.forEach(f => {
    f.wobbleY += f.wobbleSpeed;
    f.x += f.speed * f.dir;
    f.y = f.startY + Math.sin(f.wobbleY)*12;

    if(f.dir===1 && f.x > W+f.size*2) {
      f.x = -f.size*2; f.startY = Math.random()*H*0.7+H*0.05;
    }
    if(f.dir===-1 && f.x < -f.size*2) {
      f.x = W+f.size*2; f.startY = Math.random()*H*0.7+H*0.05;
    }

    cx.save();
    cx.translate(f.x, f.y);
    if(f.dir===-1) cx.scale(-1,1);

    // Body
    cx.beginPath(); cx.ellipse(0,0,f.size,f.size*0.42,0,0,Math.PI*2);
    cx.fillStyle=f.color; cx.fill();
    // Tail
    cx.beginPath(); cx.moveTo(-f.size*0.7,0);
    cx.lineTo(-f.size*1.25,-f.size*0.48); cx.lineTo(-f.size*1.25,f.size*0.48); cx.closePath();
    cx.fillStyle=f.color; cx.fill();
    // Fin top
    cx.beginPath(); cx.moveTo(0,-f.size*0.4); cx.lineTo(f.size*0.2,-f.size*0.75); cx.lineTo(-f.size*0.3,-f.size*0.4); cx.closePath();
    cx.fillStyle=f.color; cx.fill();
    // Eye glow
    cx.beginPath(); cx.arc(f.size*0.42,-f.size*0.08,f.size*0.1,0,Math.PI*2);
    cx.fillStyle='rgba(0,229,255,0.5)'; cx.fill();
    cx.restore();
  });
}

let animT = 0;
function loop(t) {
  animT = t;
  drawOcean(t);
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

