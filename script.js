(function(){var c=document.getElementById('clock');if(!c)return;
function t(){c.textContent=new Date().toLocaleTimeString('en-US')}t();setInterval(t,1000);})();
