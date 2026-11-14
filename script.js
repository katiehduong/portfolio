(function(){var c=document.getElementById('clock');if(!c)return;
function t(){c.textContent=new Date().toLocaleTimeString('en-US')}t();setInterval(t,1000);})();

/* scrollspy */
(function(){
var ticking=false;
function spy(){
ticking=false;
var nav=[].slice.call(document.querySelectorAll('.toc')).filter(function(n){return n.getClientRects().length})[0];
if(!nav)return;
function secId(a){var d=a.getAttribute('data-sec');if(d)return d;var h=a.getAttribute('href')||'';return h.charAt(0)==='#'&&h.length>1?h.slice(1):null}
var links=[].slice.call(nav.querySelectorAll('a')).filter(function(a){return !a.classList.contains('home')&&secId(a)});
if(!links.length)return;
var root=nav.closest('.view')||document,line=window.innerHeight*0.35,cur=links[0];
links.forEach(function(a){var el=root.querySelector('#'+secId(a));if(el&&el.getBoundingClientRect().top<=line)cur=a;});
if(window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-4)cur=links[links.length-1];
links.forEach(function(a){var on=a===cur;a.classList.toggle('active',on);if(on)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});
}
function req(){if(!ticking){ticking=true;requestAnimationFrame(spy)}}
addEventListener('scroll',req,{passive:true});addEventListener('resize',req);addEventListener('hashchange',req);addEventListener('load',req);spy();
})();

/* tocdrawer */
(function(){
if(!document.querySelector('.case>.toc'))return;
var tog=document.createElement('button');tog.className='toc-toggle';tog.type='button';
tog.setAttribute('aria-label','Toggle section navigation');tog.setAttribute('aria-expanded','false');
tog.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';
var bd=document.createElement('div');bd.className='toc-backdrop';
document.body.appendChild(bd);document.body.appendChild(tog);
function all(){return [].slice.call(document.querySelectorAll('.case>.toc'))}
function nav(){return all().filter(function(n){return n.getClientRects().length})[0]}
function set(open){var n=nav();all().forEach(function(x){x.classList.remove('open')});var on=!!(n&&open);if(on)n.classList.add('open');tog.setAttribute('aria-expanded',String(on));bd.classList.toggle('show',on)}
function sync(){tog.classList.toggle('off',!nav())}
tog.addEventListener('click',function(){set(tog.getAttribute('aria-expanded')!=='true')});
bd.addEventListener('click',function(){set(false)});
document.addEventListener('keydown',function(e){if(e.key==='Escape')set(false)});
document.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('.case>.toc a'))set(false)});
addEventListener('hashchange',function(){set(false);sync()});sync();
})();
