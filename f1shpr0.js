// Minimal F1shPr0 boot — no network fetches (Chromebook-friendly)
(function(){
  const logBox = document.getElementById('log');
  function log(msg){
    const t = new Date().toLocaleTimeString();
    logBox.innerHTML = `[${t}] ${msg}<br>` + logBox.innerHTML;
  }

  // Wire stub buttons so you can see clicks work
  document.getElementById('btnGet').onclick   = ()=>log('Get: coming in Step 2');
  document.getElementById('btnGoto').onclick  = ()=>log('Goto: coming in Step 2');
  document.getElementById('btnTrack').onclick = ()=>log('Track: coming in Step 2');
  document.getElementById('btnBuild').onclick = ()=>log('Build: coming in Step 2');

  // Focus the game so keys/mouse go to the iframe when you click the world
  const game = document.getElementById('gameFrame');
  game.addEventListener('load', ()=>log('Eaglercraft loaded in iframe'));
})();
