// Minimal F1shPr0 boot — Chromebook-friendly
(function(){
  const logBox = document.getElementById('log');
  const game   = document.getElementById('gameFrame');
  const menu   = document.getElementById('f1Menu');

  function log(msg){
    const t = new Date().toLocaleTimeString();
    logBox.innerHTML = `[${t}] ${msg}<br>` + logBox.innerHTML;
  }

  // Helper: focus game
  function focusGame() {
    game.contentWindow.focus();
  }

  // Wire stub buttons so you can see clicks work
  document.getElementById('btnGet').onclick   = ()=>{ log('Get: coming in Step 2'); focusGame(); };
  document.getElementById('btnGoto').onclick  = ()=>{ log('Goto: coming in Step 2'); focusGame(); };
  document.getElementById('btnTrack').onclick = ()=>{ log('Track: coming in Step 2'); focusGame(); };
  document.getElementById('btnBuild').onclick = ()=>{ log('Build: coming in Step 2'); focusGame(); };

  // Hotkeys: open/close overlay
  document.addEventListener('keydown', e=>{
    if (e.code==='ShiftRight') { menu.style.display='block'; }
    if (e.code==='ControlRight') { menu.style.display='none'; focusGame(); }
  });

  // When you click anywhere outside the overlay, give focus back to game
  document.addEventListener('click', e=>{
    if (!menu.contains(e.target)) {
      focusGame();
    }
  });

  game.addEventListener('load', ()=>{ log('Eaglercraft loaded in iframe'); focusGame(); });
})();
