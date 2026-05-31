// ═══════════════════════════════════════════════════
//  PARTICLES — Portfolio Yohan IRIBARREN
// ═══════════════════════════════════════════════════
(function() {
  var canvas, ctx, particles = [], raf, active = false;

  function initCanvas() {
    canvas = document.getElementById('modal-canvas');
    if (canvas) { ctx = canvas.getContext('2d'); resizeCanvas(); window.addEventListener('resize', resizeCanvas); }
  }
  function resizeCanvas() {
    var box = document.getElementById('modal-box');
    if (box && canvas) { canvas.width = box.offsetWidth; canvas.height = box.offsetHeight; }
  }
  function isLight() { return document.body.classList.contains('ocean-light'); }
  function createParticles() {
    particles = [];
    var w = canvas.width, h = canvas.height;
    for (var i=0;i<18;i++) particles.push({type:'bubble',x:Math.random()*w,y:h+Math.random()*h*0.5,r:Math.random()*3.5+0.8,speed:Math.random()*0.5+0.2,wobble:Math.random()*Math.PI*2,alpha:Math.random()*0.3+0.08});
    for (var j=0;j<25;j++) particles.push({type:'plankton',x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.2+0.3,vx:(Math.random()-0.5)*0.25,vy:(Math.random()-0.5)*0.2,pulse:Math.random()*Math.PI*2,alpha:Math.random()*0.25+0.06});
    for (var k=0;k<4;k++) particles.push({type:'ray',x:w*0.1+w*0.25*k,phase:Math.random()*Math.PI*2,alpha:Math.random()*0.06+0.02,width:30+Math.random()*30});
  }
  function drawFrame(t) {
    if (!active||!canvas||!ctx) return;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    var w=canvas.width,h=canvas.height,light=isLight();
    particles.forEach(function(p) {
      if(p.type==='bubble'){p.y-=p.speed;p.wobble+=0.025;var bx=p.x+Math.sin(p.wobble)*3;if(p.y<-20){p.y=h+20;p.x=Math.random()*w;}ctx.beginPath();ctx.arc(bx,p.y,p.r,0,Math.PI*2);ctx.strokeStyle=light?'rgba(0,100,160,'+(p.alpha*1.6)+')':'rgba(0,229,255,'+(p.alpha*0.9)+')';ctx.lineWidth=0.7;ctx.stroke();}
      else if(p.type==='plankton'){p.pulse+=0.018;p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=w;if(p.x>w)p.x=0;if(p.y<0)p.y=h;if(p.y>h)p.y=0;var a=p.alpha*(0.5+0.5*Math.sin(p.pulse));ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=light?'rgba(0,100,160,'+(a*2)+')':'rgba(0,229,255,'+a+')';ctx.fill();}
      else if(p.type==='ray'){var bx2=p.x+Math.sin(t*0.0004+p.phase)*25;var grad=ctx.createLinearGradient(bx2,0,bx2+p.width*0.5,h*0.6);if(light){grad.addColorStop(0,'rgba(255,245,180,'+(p.alpha*3.5)+')');grad.addColorStop(0.5,'rgba(160,220,250,'+(p.alpha*1.5)+')');grad.addColorStop(1,'rgba(80,180,220,0)');}else{grad.addColorStop(0,'rgba(0,229,255,'+(p.alpha*1.5)+')');grad.addColorStop(1,'rgba(0,229,255,0)');}ctx.beginPath();ctx.moveTo(bx2,0);ctx.lineTo(bx2+p.width,h*0.6);ctx.lineTo(bx2+p.width*0.4,h*0.6);ctx.lineTo(bx2-p.width*0.4,0);ctx.closePath();ctx.fillStyle=grad;ctx.fill();}
    });
    raf = requestAnimationFrame(drawFrame);
  }

  window._particlesStart = function() {
    if (active) return;
    active = true; resizeCanvas(); createParticles(); raf = requestAnimationFrame(drawFrame);
  };
  window._particlesStop = function() {
    active = false;
    if (raf) cancelAnimationFrame(raf);
    if (ctx && canvas) ctx.clearRect(0,0,canvas.width,canvas.height);
  };

  document.addEventListener('DOMContentLoaded', initCanvas);
})();
