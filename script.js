/* ===== إعدادات: غيّري هذه القيم ===== */
const WA_NUMBER = "+967737000023";   // رقم واتساب بالصيغة الدولية بدون + مثل 9677xxxxxxx
const IG = "https://www.instagram.com/rovanaboutique?exln=MW8waGxodmVraWVsaQ==";

/* ===== المنتجات (ضعي مسار الصورة في img إن وجد) ===== */
const items = [
  {t:"وشاح وردي بالورود المطرزة", c:"وشاح", d:"وشاح وردي ناعم بورد مطرز يدوياً بالخيط والخرز لإطلالة رقيقة.", c1:"#e8b9bd", c2:"#b5445a", img:"images/p1.jpg"},
  {t:"وشاح أسود بحبات الكريستال", c:"وشاح", d:"وشاح أسود مزين بفراشات من الكريستال اللامع لإطلالة مسائية مميزة.", c1:"#3a3a3a", c2:"#050505", img:"images/p2.jpg"},
  {t:"وشاح أحمر مطرز بالنجوم", c:"وشاح", d:"وشاح دافئ بلون أحمر جذاب مطرز بنقوش فلكية دقيقة، يناسب الإطلالات الشتوية.", c1:"#d9372f", c2:"#7e1414", img:"images/p3.jpg"},
  {t:"حجاب أسود بأزهار الكوكتيل البيضاء", c:"حجاب", d:"حجاب أسود أنيق مطرز على الأطراف بأزهار بيضاء دقيقة، مثالي للمناسبات.", c1:"#34402c", c2:"#0b0b12", img:"images/p4.jpg"},
  {t:"حجاب كحلي مطرز بالزهور", c:"حجاب", d:"حجاب كحلي بنقوش ثلجية مطرزة يدوياً.", c1:"#2b4a8f", c2:"#101a44", img:"images/p5.jpg"},
  {t:"حجاب أبيض بالزهور البرتقالية", c:"حجاب", d:"حجاب أبيض ناعم بزهور برتقالية مطرزة يدوياً.", c1:"#f7efe8", c2:"#e0a272", img:"images/p6.jpg"}
];
/* ===== صور المعرض (منفصلة تماماً عن المنتجات) =====
   أضيفي أو احذفي ما تشائين. t = وصف الصورة، img = مسار الصورة */
const gallery = [
  {t:"تطريز زهور على وشاح كريمي",   c1:"#f4ece4", c2:"#e8a07d", img:"images/p7.jpg"},
  {t:"عباءة مطرزة بالأزهار",        c1:"#b99a85", c2:"#6b4a3a", img:"images/p8.jpg"},
  {t:"قميص مطرز بالزهور",           c1:"#efe7df", c2:"#b9a690", img:"images/p9.jpg"},
  {t:"تفاصيل الكريستال",            c1:"#2f2f2f", c2:"#000000", img:"images/p10.jpg"},
  {t:"غرز يدوية دقيقة",             c1:"#e8b9bd", c2:"#8a3d6b", img:"images/p11.jpg"},
  {t:"ورود مطرزة بالخيط",           c1:"#d9bccb", c2:"#5e2748", img:"images/p12.jpg"},
  {t:"نقوش شتوية",                  c1:"#2b4a8f", c2:"#101a44", img:"images/p13.jpg"}
];

const wa = txt => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(txt)}`;
const ph = (a,b,img,alt) => `<div class="ph" style="--c1:${a};--c2:${b}">${img?`<img src="${img}" alt="${alt}" loading="lazy">`:''}</div>`;

/* بطاقات المنتجات */
document.getElementById('pgrid').innerHTML = items.map(p => `
  <article class="prod">
    <div class="pic">${ph(p.c1,p.c2,p.img,p.t)}</div>
    <div class="pbody">
      <span class="tag">${p.c}</span>
      <h3>${p.t}</h3>
      <p>${p.d}</p>
      <a class="btn fill" href="${wa('أرغب بطلب: '+p.t)}"><svg><use href="#wa"/></svg> اطلبي هذه القطعة</a>
    </div>
  </article>`).join('');

/* المعرض */
const all = gallery;
document.getElementById('grid').innerHTML = all.map((p,i) => `
  <div class="tile" tabindex="0" data-i="${i}" role="button" aria-label="${p.t}">${ph(p.c1,p.c2,p.img,p.t)}<span>${p.t}</span></div>`).join('');

/* Lightbox */
const lb = document.getElementById('lb'), box = document.getElementById('lbBox'), cap = document.getElementById('lbCap');
function openLb(i){const p=all[i];box.style.setProperty('--c',`linear-gradient(150deg,${p.c1},${p.c2})`);box.style.background=`linear-gradient(150deg,${p.c1},${p.c2})`;
  box.querySelectorAll('img').forEach(x=>x.remove());
  if(p.img){const im=document.createElement('img');im.src=p.img;im.alt=p.t;im.style.cssText='position:absolute;inset:0;width:100%;height:100%;object-fit:cover';box.prepend(im)}
  cap.textContent=p.t;lb.classList.add('on')}
document.getElementById('grid').addEventListener('click',e=>{const t=e.target.closest('.tile');if(t)openLb(t.dataset.i)});
document.getElementById('grid').addEventListener('keydown',e=>{if(e.key==='Enter'){const t=e.target.closest('.tile');if(t)openLb(t.dataset.i)}});
lb.addEventListener('click',()=>lb.classList.remove('on'));
document.addEventListener('keydown',e=>{if(e.key==='Escape')lb.classList.remove('on')});

/* القائمة */
const nav=document.getElementById('nav'), mb=document.getElementById('menuBtn');
mb.addEventListener('click',()=>{const o=nav.classList.toggle('open');mb.setAttribute('aria-expanded',o)});
nav.addEventListener('click',e=>{if(e.target.tagName==='A')nav.classList.remove('open')});

/* النموذج: يفتح واتساب برسالة جاهزة. للإرسال على بريدك استبدليه بخدمة مثل Formspree */
document.getElementById('form').addEventListener('submit',e=>{
  e.preventDefault();
  const f=new FormData(e.target);
  const msg=`الاسم: ${f.get('name')}\nالبريد: ${f.get('email')}\n السلام عليكم,كم سعر هذه القطعة ${f.get('message')}`;
  document.getElementById('ok').style.display='block';
  window.open(wa(msg),'_blank');
  e.target.reset();
});


/* ================= Animations ================= */
document.documentElement.classList.add('js');

/* شريط التقدم */
const bar=document.createElement('div');bar.className='progress';document.body.prepend(bar);
addEventListener('scroll',()=>{
  const h=document.documentElement;
  bar.style.transform=`scaleX(${h.scrollTop/(h.scrollHeight-h.clientHeight||1)})`;
},{passive:true});

/* النجوم: لف كل نجمة داخل span */
document.querySelectorAll('.stars').forEach(s=>{
  s.innerHTML=[...s.textContent].map((c,i)=>`<span style="--i:${i}">${c}</span>`).join('');
});

/* ظهور عند التمرير */
const targets=document.querySelectorAll('section:not(.hero) .eyebrow, section:not(.hero) h2, section:not(.hero) .lead, section:not(.hero) .bar-d, .card, .prod, .rev, .row, .tile, .form, .ticks li, .story-grid .arch, .story-grid .btn, .fgrid > *, .brand');
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){const t=e.target;t.classList.add('in');io.unobserve(t);
    /* بعد انتهاء الظهور نزيل الخاصية لتعمل حركات التحويم بسلاسة */
    setTimeout(()=>{t.removeAttribute('data-reveal');t.style.removeProperty('--d')},1400)}
}),{threshold:.15,rootMargin:'0px 0px -40px 0px'});
targets.forEach(el=>{
  el.setAttribute('data-reveal','');
  if(el.matches('.bar-d'))el.removeAttribute('data-reveal');
  /* تأخير متدرج للعناصر المتجاورة */
  const sibs=[...el.parentElement.children].filter(x=>x.matches('.card,.prod,.rev,.row,.tile,li'));
  const i=sibs.indexOf(el);
  if(i>-1)el.style.setProperty('--d',(i%4)*0.1+'s');
  io.observe(el);
});
