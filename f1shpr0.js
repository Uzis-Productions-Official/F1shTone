(function(){
  const logBox = document.getElementById('log');
  const game   = document.getElementById('gameFrame');
  const menu   = document.getElementById('f1Menu');

  function log(msg){
    const t = new Date().toLocaleTimeString();
    logBox.innerHTML = `[${t}] ${msg}<br>` + logBox.innerHTML;
  }

  function focusGame() {
    game.contentWindow.focus();
  }

  // === Prompt system ===
  function showPrompt(title, placeholder, callback) {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'rgba(0,0,0,0.5)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '10000';

    const box = document.createElement('div');
    box.style.background = '#222';
    box.style.padding = '20px';
    box.style.borderRadius = '12px';
    box.style.color = 'white';
    box.style.minWidth = '300px';
    box.style.textAlign = 'center';

    const h = document.createElement('h3');
    h.innerText = title;

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = placeholder;
    input.style.width = '90%';
    input.style.padding = '5px';
    input.style.margin = '10px';

    const btn = document.createElement('button');
    btn.innerText = 'Confirm';
    btn.style.padding = '6px 12px';

    btn.onclick = () => {
      callback(input.value);
      document.body.removeChild(overlay);
      focusGame();
    };

    box.appendChild(h);
    box.appendChild(input);
    box.appendChild(btn);
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    input.focus();
  }

  // === Wire buttons ===
  document.getElementById('btnGet').onclick   = ()=>{
    showPrompt("Get Item", "Enter item name", (val)=>{
      log("Planning how to get item: " + val);
      // Later: check items.json, plan gather/craft
    });
  };

  document.getElementById('btnGoto').onclick  = ()=>{
    showPrompt("Goto", "Enter coordinates (x y z)", (val)=>{
      log("Planning path to coordinates: " + val);
      // Later: pathfinding to coords
    });
  };

  document.getElementById('btnTrack').onclick = ()=>{
    showPrompt("Track Player", "Enter player name", (val)=>{
      log("Tracking player: " + val);
      // Later: find player entity in world
    });
  };

  document.getElementById('btnBuild').onclick = ()=>{
    log("Opening build planner (canvas editor coming next step)");
    // TODO: open canvas editor
  };

  // === Hotkeys ===
  document.addEventListener('keydown', e=>{
    if (e.code==='ShiftRight') { menu.style.display='block'; }
    if (e.code==='ControlRight') { menu.style.display='none'; focusGame(); }
  });

  document.addEventListener('click', e=>{
    if (!menu.contains(e.target)) {
      focusGame();
    }
  });

  game.addEventListener('load', ()=>{ log('Eaglercraft loaded in iframe'); focusGame(); });
})();
