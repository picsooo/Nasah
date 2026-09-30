const IC={
 check:'<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
 warn:'<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></svg>',
 phone:'<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>',
 mail:'<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
 pin:'<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
 fb:'<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
 doc:'<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></svg>'
};
function burst(cls,n=16,fill){let d='';const R=100,r=74;for(let i=0;i<n*2;i++){const a=Math.PI*i/n-Math.PI/2,q=i%2?r:R;d+=(i?'L':'M')+(100+q*Math.cos(a)).toFixed(1)+' '+(100+q*Math.sin(a)).toFixed(1)}
 return '<svg class="'+cls+'" viewBox="0 0 200 200" aria-hidden="true"><path d="'+d+'Z" fill="'+(fill||'currentColor')+'"/></svg>'}
const A=s=>String(s).replace(/"/g,'&quot;');
function pimg(k,cls){const p=P[k];return p.img?'<img class="cut '+(cls||'')+'" src="'+p.img+'" alt="'+A(p.name)+'" loading="lazy">':'<img class="phot '+(cls||'')+'" src="'+p.post+'" alt="'+A(p.name)+'" loading="lazy">'}

// interactive bubbles
function Bubbles(cv){
 const host=cv.parentElement,ctx=cv.getContext('2d');let W,H,dpr=Math.min(devicePixelRatio||1,2),bs=[],ps=[],rg=[],vis=true,last=0,mx=-999,my=-999;
 const red=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const N=+cv.dataset.n||(innerWidth<700?18:40);
 const size=()=>{const r=host.getBoundingClientRect();W=r.width;H=r.height;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)};
 const mk=(fresh,x,y)=>{const r=4+Math.pow(Math.random(),2.3)*48;return{x:x??Math.random()*W,y:y??(fresh?Math.random()*H:H+r+Math.random()*100),r,vy:.25+Math.random()*.7+(48-r)/100,ph:Math.random()*6.28,sw:.4+Math.random(),hue:Math.random()}};
 size();for(let i=0;i<N;i++)bs.push(mk(true));addEventListener('resize',size);
 new IntersectionObserver(e=>{vis=e[0].isIntersecting;if(vis)requestAnimationFrame(loop)}).observe(host);
 host.addEventListener('pointermove',e=>{const r=host.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top});
 host.addEventListener('pointerleave',()=>{mx=my=-999});
 host.addEventListener('pointerdown',e=>{if(e.target.closest('a,button,input,select,textarea,label'))return;const r=host.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
  let hit=-1,best=1e9;bs.forEach((b,i)=>{const d=Math.hypot(b.x-x,b.y-y);if(d<b.r+14&&d<best){best=d;hit=i}});
  if(hit>=0){pop(bs[hit]);bs.splice(hit,1);bs.push(mk(false));cnt()}else{for(let k=0;k<5;k++)bs.push(mk(false,x+(Math.random()-.5)*50,y+(Math.random()-.5)*24));if(bs.length>N+40)bs.splice(0,5)}});
 function cnt(){const c=document.getElementById('popc');if(c){c.textContent=+c.textContent+1;c.parentElement.classList.add('on')}}
 function pop(b){rg.push({x:b.x,y:b.y,r:b.r,a:.9});for(let i=0;i<16;i++){const a=Math.random()*6.28,s=1.5+Math.random()*3.4;ps.push({x:b.x,y:b.y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-1,r:1+Math.random()*2.8,a:1})}}
 function loop(t){if(!vis)return;const dt=Math.min(32,t-last||16)/16;last=t;ctx.clearRect(0,0,W,H);
  bs.forEach((b,i)=>{if(!red){b.y-=b.vy*dt;b.x+=Math.sin(t/1000*b.sw+b.ph)*.45*dt}const dx=b.x-mx,dy=b.y-my,d=Math.hypot(dx,dy)||1;if(d<b.r+90){b.x+=dx/d*(1-d/(b.r+90))*3*dt;b.y+=dy/d*(1-d/(b.r+90))*1.5*dt}
   if(b.y<-b.r-10)bs[i]=mk(false);
   const g=ctx.createRadialGradient(b.x-b.r*.38,b.y-b.r*.38,b.r*.05,b.x,b.y,b.r);g.addColorStop(0,'rgba(255,255,255,.92)');g.addColorStop(.25,'rgba(255,255,255,.22)');g.addColorStop(.72,b.hue>.7?'rgba(255,214,10,.14)':b.hue>.45?'rgba(255,120,200,.10)':'rgba(120,200,255,.12)');g.addColorStop(1,'rgba(255,255,255,.6)');
   ctx.beginPath();ctx.arc(b.x,b.y,b.r,0,6.283);ctx.fillStyle=g;ctx.fill();ctx.lineWidth=1.2;ctx.strokeStyle='rgba(255,255,255,.6)';ctx.stroke();
   ctx.beginPath();ctx.arc(b.x-b.r*.35,b.y-b.r*.4,b.r*.15,0,6.283);ctx.fillStyle='rgba(255,255,255,.9)';ctx.fill()});
  ps=ps.filter(p=>p.a>.03);ps.forEach(p=>{p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=.12*dt;p.a-=.03*dt;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,6.283);ctx.fillStyle='rgba(255,255,255,'+p.a+')';ctx.fill()});
  rg=rg.filter(r=>r.a>.03);rg.forEach(r=>{r.r+=2.2*dt;r.a-=.06*dt;ctx.beginPath();ctx.arc(r.x,r.y,r.r,0,6.283);ctx.lineWidth=2;ctx.strokeStyle='rgba(255,255,255,'+r.a+')';ctx.stroke()});
  requestAnimationFrame(loop)}
 requestAnimationFrame(loop);
}

const App=(()=>{
 let lang='fr';try{lang=localStorage.getItem('nassah_lang')||'fr'}catch(e){}
 const collect=()=>{document.querySelectorAll('[data-ar]').forEach(e=>{if(e.dataset.fr===undefined)e.dataset.fr=e.innerHTML});document.querySelectorAll('[data-ar-ph]').forEach(e=>{if(e.dataset.frPh===undefined)e.dataset.frPh=e.getAttribute('placeholder')||''})};
 const apply=()=>{document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';
  document.querySelectorAll('[data-ar]').forEach(e=>e.innerHTML=lang==='ar'?e.dataset.ar:e.dataset.fr);
  document.querySelectorAll('[data-ar-ph]').forEach(e=>e.setAttribute('placeholder',lang==='ar'?e.dataset.arPh:e.dataset.frPh));
  document.querySelectorAll('.lang').forEach(b=>b.textContent=lang==='ar'?'FR':'عربي')};
 const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.1});
 const misc=()=>{
  document.querySelectorAll('.mq:not([data-ok])').forEach(el=>{el.dataset.ok=1;const h=el.dataset.w.split('|').map(w=>'<b>'+w+'</b>'+burst('st',10)).join('');el.innerHTML='<div>'+h.repeat(3)+'</div><div aria-hidden="true">'+h.repeat(3)+'</div>'});
  document.querySelectorAll('.rv:not([data-o])').forEach(el=>{el.dataset.o=1;io.observe(el)});
  document.querySelectorAll('canvas.bcanvas:not([data-ok])').forEach(c=>{c.dataset.ok=1;Bubbles(c)});
 };
 const refresh=()=>{misc();collect();apply()};
 const set=l=>{lang=l;try{localStorage.setItem('nassah_lang',l)}catch(e){}apply();document.dispatchEvent(new Event('langchange'))};
 return{refresh,set,t:(fr,ar)=>lang==='ar'?ar:fr,get:()=>lang};
})();
const L=(fr,ar)=>App.t(fr,ar);

// header + footer
(function(){
 const home=document.body.dataset.home==='1',pre=home?'':'index.html';
 const nav=[['#gamme','Produits','منتجاتنا'],['#conseiller','Conseiller','المرشد'],['#histoire','60 ans','60 سنة'],['revendeurs.html','Revendeurs','الموزّعون'],['#contact','Contact','اتصلوا بنا']];
 const href=h=>h.startsWith('#')?pre+h:h;
 const h=document.getElementById('hdr');
 if(h)h.innerHTML='<a class="skip" href="#main" data-ar="انتقلوا إلى المحتوى">Aller au contenu</a><header class="top'+(home?'':' solid')+'" id="top-h"><a class="logo" href="index.html" aria-label="Nassah — accueil"><img src="img/logo-nassah.png" alt="Nassah"></a><nav>'+nav.map(n=>'<a href="'+href(n[0])+'" data-ar="'+n[2]+'">'+n[1]+'</a>').join('')+'</nav><div class="hr"><button class="lang" type="button">عربي</button><a class="btn sm" href="'+href('#contact')+'" data-ar="اطلبوا عرضا">Devenir revendeur</a><button class="burger" type="button" aria-label="Menu">☰</button></div></header><div class="menu" id="menu"><button class="mx" type="button" aria-label="Fermer">✕</button>'+nav.map(n=>'<a href="'+href(n[0])+'" data-ar="'+n[2]+'">'+n[1]+'</a>').join('')+'</div><div class="prog" id="prog"></div>';
 const f=document.getElementById('ftr');
 if(f)f.innerHTML='<footer class="ft"><div class="wrap"><div class="fg"><div><img src="img/logo-nassah.png" alt="Nassah" class="flogo"><p data-ar="ناصح، منتجات التنظيف المنزلية والصناعية منذ 1965. صناعة جزائرية، إخوة سكوتي.">Nassah, produits d\'entretien ménagers et industriels depuis 1965. Fabrication algérienne, SEKOUTI Frères.</p></div><div><h4 data-ar="المنتجات">Produits</h4>'+ORDER.slice(0,6).map(k=>'<a href="produit.html?p='+k+'" data-ar="'+A(P[k].ar)+'">'+P[k].name+'</a>').join('')+'</div><div><h4 data-ar="المزيد">Plus</h4>'+ORDER.slice(6).map(k=>'<a href="produit.html?p='+k+'" data-ar="'+A(P[k].ar)+'">'+P[k].name+'</a>').join('')+'</div><div><h4 data-ar="اتصلوا بنا">Contact</h4><a href="'+CONTACT.tel+'">'+CONTACT.phone+'</a><a href="mailto:'+CONTACT.mail+'">'+CONTACT.mail+'</a><a href="'+CONTACT.map+'" target="_blank" rel="noopener" data-ar="'+CONTACT.addrAr+'">'+CONTACT.addr+'</a><a href="revendeurs.html" data-ar="فضاء الموزّعين">Espace revendeurs</a></div></div><div class="fb"><span>© <span id="yr"></span> Nassah · SEKOUTI Frères</span><span data-ar="نموذج موقع من إنجاز Webminds">Maquette réalisée par Webminds</span></div></div></footer>';
 const yr=document.getElementById('yr');if(yr)yr.textContent=new Date().getFullYear();
 document.addEventListener('click',e=>{if(e.target.closest('.lang'))App.set(App.get()==='ar'?'fr':'ar');const m=document.getElementById('menu');if(e.target.closest('.burger'))m.classList.add('open');if(e.target.closest('.mx')||e.target.closest('.menu a'))m.classList.remove('open')});
 const th=document.getElementById('top-h'),pg=document.getElementById('prog');
 addEventListener('scroll',()=>{const y=scrollY;if(home&&th)th.classList.toggle('solid',y>60);if(pg)pg.style.width=(y/(document.documentElement.scrollHeight-innerHeight)*100)+'%'},{passive:true});
})();
function okForm(f,fr,ar){const b=f.querySelector('button[type=submit]');b.textContent=L(fr,ar);b.disabled=true;b.classList.add('done');setTimeout(()=>{f.reset();b.disabled=false;b.classList.remove('done');App.refresh()},3200)}
