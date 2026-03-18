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

// ── Détection du thème ────────────────────────────────────────────────────────
function isLight() {
  return document.body.classList.contains('ocean-light');
}

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

// Fish — couleurs adaptables selon thème
const fishes = Array.from({length:8}, (_, i) => ({
  x: Math.random() < 0.5 ? -100 : W+100,
  y: Math.random()*H*0.7 + H*0.1,
  size: Math.random()*14+7,
  speed: Math.random()*0.5+0.2,
  dir: Math.random() < 0.5 ? 1 : -1,
  hue: 150+Math.floor(Math.random()*80),   // vert-cyan
  sat: 170+Math.floor(Math.random()*60),   // bleu
  wobbleY: Math.random()*Math.PI*2,
  wobbleSpeed: Math.random()*0.02+0.008,
  startY: 0
}));
fishes.forEach(f => { f.x = f.dir===1 ? -f.size*2 : W+f.size*2; f.startY = f.y; });

function drawOcean(t) {
  cx.clearRect(0,0,W,H);
  const light = isLight();

  // ── Fond dégradé ────────────────────────────────────────
  if (light) {
    const grad = cx.createLinearGradient(0,0,0,H);
    grad.addColorStop(0,   'rgba(140,205,235,0)');
    grad.addColorStop(0.4, 'rgba(100,180,220,0.30)');
    grad.addColorStop(1,   'rgba(50,140,190,0.55)');
    cx.fillStyle = grad; cx.fillRect(0,0,W,H);
  } else {
    const grad = cx.createLinearGradient(0,0,0,H);
    grad.addColorStop(0,  'rgba(2,13,20,0)');
    grad.addColorStop(0.3,'rgba(4,24,42,0.3)');
    grad.addColorStop(1,  'rgba(2,8,16,0.6)');
    cx.fillStyle = grad; cx.fillRect(0,0,W,H);
  }

  // ── Rayons caustiques ───────────────────────────────────
  for(let i=0;i<6;i++){
    const bx = (W*0.05 + W*0.18*i) + Math.sin(t*0.0003+i*1.1)*40;
    const width = 40 + Math.sin(t*0.0002+i)*20;

    let bg;
    if (light) {
      // Mode lumineux : rayons jaune-blanc bien visibles partant du haut
      bg = cx.createLinearGradient(bx, 0, bx + width*0.6, H*0.85);
      bg.addColorStop(0,   'rgba(255,245,180,0.45)');
      bg.addColorStop(0.3, 'rgba(160,220,250,0.28)');
      bg.addColorStop(0.7, 'rgba(80,180,220,0.14)');
      bg.addColorStop(1,   'rgba(80,180,220,0)');
    } else {
      bg = cx.createLinearGradient(bx, 0, bx+40, H*0.7);
      bg.addColorStop(0,'rgba(0,229,255,0.03)');
      bg.addColorStop(1,'rgba(0,229,255,0)');
    }

    cx.beginPath();
    cx.moveTo(bx, 0);
    cx.lineTo(bx + width*1.2, H*0.85);
    cx.lineTo(bx + width*0.4, H*0.85);
    cx.lineTo(bx - width*0.5, 0);
    cx.closePath();
    cx.fillStyle = bg;
    cx.fill();
  }

  // ── Reflet de surface (mode lumineux seulement) ─────────
  if (light) {
    const surfaceGrad = cx.createLinearGradient(0, 0, 0, 80);
    surfaceGrad.addColorStop(0, 'rgba(255,255,220,0.18)');
    surfaceGrad.addColorStop(1, 'rgba(255,255,220,0)');
    cx.fillStyle = surfaceGrad;
    cx.fillRect(0, 0, W, 80);

    // Ondulations de surface
    cx.strokeStyle = 'rgba(255,255,200,0.25)';
    cx.lineWidth = 1.5;
    for(let w=0; w<4; w++){
      cx.beginPath();
      for(let x=0; x<W; x+=4){
        const y = 12 + w*10 + Math.sin((x*0.015) + t*0.0008 + w*0.8)*4;
        w===0 && x===0 ? cx.moveTo(x,y) : cx.lineTo(x,y);
      }
      cx.stroke();
    }
  }

  // ── Particules ──────────────────────────────────────────
  particles.forEach(p => {
    p.pulse += 0.015;
    p.x += p.vx; p.y += p.vy;
    if(p.x<0) p.x=W; if(p.x>W) p.x=0;
    if(p.y<0) p.y=H; if(p.y>H) p.y=0;
    const a = p.alpha*(0.6+0.4*Math.sin(p.pulse));
    cx.beginPath(); cx.arc(p.x,p.y,p.r,0,Math.PI*2);
    cx.fillStyle = light
      ? `rgba(0,100,160,${a*1.8})`
      : `rgba(0,229,255,${a})`;
    cx.fill();
  });

  // ── Bulles ──────────────────────────────────────────────
  bubbles.forEach(b => {
    b.y -= b.speed;
    b.wobble += 0.03;
    const bx = b.x + Math.sin(b.wobble)*3;
    if(b.y < -20) { b.y = H+20; b.x = Math.random()*W; }
    const strokeC = light
      ? `rgba(0,100,160,${b.alpha*1.4})`
      : `rgba(0,229,255,${b.alpha*0.8})`;
    const fillC = light
      ? `rgba(255,255,255,${b.alpha*0.7})`
      : `rgba(176,232,226,${b.alpha*0.5})`;
    cx.beginPath(); cx.arc(bx,b.y,b.r,0,Math.PI*2);
    cx.strokeStyle=strokeC; cx.lineWidth=0.8; cx.stroke();
    cx.beginPath(); cx.arc(bx-b.r*0.3, b.y-b.r*0.3, b.r*0.25, 0, Math.PI*2);
    cx.fillStyle=fillC; cx.fill();
  });

  // ── Poissons ────────────────────────────────────────────
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

    // Couleur adaptée selon le thème — bien visible dans les 2 modes
    let bodyColor, eyeColor, finColor;
    if (light) {
      // Poissons colorés, opaques, visibles sur fond clair
      const palette = [
        [0, 120, 180],    // bleu ocean
        [0, 150, 130],    // teal
        [20, 100, 160],   // bleu foncé
        [0, 130, 100],    // vert mer
        [60, 100, 180],   // bleu-violet
      ];
      const c = palette[Math.abs(Math.floor(f.hue)) % palette.length];
      bodyColor  = `rgba(${c[0]},${c[1]},${c[2]},0.55)`;
      eyeColor   = `rgba(0,60,120,0.85)`;
      finColor   = `rgba(${c[0]},${c[1]+30},${c[2]},0.65)`;
    } else {
      bodyColor  = `rgba(0,${f.hue},${f.sat},${0.08+Math.random()*0.01})`;
      eyeColor   = 'rgba(0,229,255,0.5)';
      finColor   = `rgba(0,${f.hue},${f.sat},${0.08+Math.random()*0.01})`;
    }

    cx.save();
    cx.translate(f.x, f.y);
    if(f.dir===-1) cx.scale(-1,1);

    // Corps
    cx.beginPath(); cx.ellipse(0,0,f.size,f.size*0.42,0,0,Math.PI*2);
    cx.fillStyle=bodyColor; cx.fill();
    // Queue
    cx.beginPath(); cx.moveTo(-f.size*0.7,0);
    cx.lineTo(-f.size*1.25,-f.size*0.48); cx.lineTo(-f.size*1.25,f.size*0.48); cx.closePath();
    cx.fillStyle=bodyColor; cx.fill();
    // Nageoire dorsale
    cx.beginPath(); cx.moveTo(0,-f.size*0.4); cx.lineTo(f.size*0.2,-f.size*0.75); cx.lineTo(-f.size*0.3,-f.size*0.4); cx.closePath();
    cx.fillStyle=finColor; cx.fill();
    // Oeil
    cx.beginPath(); cx.arc(f.size*0.42,-f.size*0.08,f.size*0.12,0,Math.PI*2);
    cx.fillStyle=eyeColor; cx.fill();
    // Reflet oeil
    cx.beginPath(); cx.arc(f.size*0.45,-f.size*0.12,f.size*0.05,0,Math.PI*2);
    cx.fillStyle='rgba(255,255,255,0.8)'; cx.fill();

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
