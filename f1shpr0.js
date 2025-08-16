(async function(){
  const logBox = document.getElementById('log');
  const game   = document.getElementById('gameFrame');
  const menu   = document.getElementById('f1Menu');

  function log(msg){
    const t = new Date().toLocaleTimeString();
    logBox.innerHTML = `[${t}] ${msg}<br>` + logBox.innerHTML;
  }

  function focusGame() { game.contentWindow.focus(); }

  // === Load item DB ===
  let itemsDB = {};
  try {
    const res = await fetch("items.json");
    itemsDB = await res.json();
    log("Loaded " + Object.keys(itemsDB).length + " items.");
  } catch(e) {
    log("Failed to load items.json: " + e);
  }

  // === Crafting logic ===
  function canCraft(item) {
    return itemsDB[item] && itemsDB[item].craftable;
  }

  function getRecipe(item) {
    return canCraft(item) ? itemsDB[item].recipe : null;
  }

  function getOutput(item) {
    return canCraft(item) ? itemsDB[item].output : 1;
  }

  // === Pathfinding (very simple) ===
  function simplePathfind(start, goal) {
    log(`Pathfinding from ${JSON.stringify(start)} → ${JSON.stringify(goal)}`);
    // Placeholder: straight-line path
    let path = [];
    let [x,y,z] = start;
    const [gx,gy,gz] = goal;
    while (x !== gx || y !== gy || z !== gz) {
      if (x < gx) x++; else if (x > gx) x--;
      if (y < gy) y++; else if (y > gy) y--;
      if (z < gz) z++; else if (z > gz) z--;
      path.push([x,y,z]);
    }
    return path;
  }

  // === Prompt System (from Step 2) ===
  function showPrompt(title, placeholder, callback) {
    const overlay = document.createElement('div');
    overlay.style = `
      position: fixed; top:0; left:0; width:100%; height:100%;
      background: rgba(0,0,0,0.5); display:flex;
      align-items:center; justify-content:center; z-index:10000;
    `;

    const box = document.createElement('div');
    box.style = `
      background:#222; padding:20px; border-radius:12px;
      color:white; min-width:300px; text-align:center;
    `;

    const h = document.createElement('h3');
    h.innerText = title;

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = placeholder;
    input.style = "width:90%; padding:5px; margin:10px;";

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
  document.getElementById('btnGet').onclick = ()=>{
    showPrompt("Get Item", "Enter item name", (val)=>{
      if (canCraft(val)) {
        log(`"${val}" is craftable. Recipe:`);
        console.table(getRecipe(val));
        log(`Bot will gather needed resources and craft ${getOutput(val)} ${val}`);
      } else {
        log(`"${val}" is not directly craftable. Bot will try to mine/loot it.`);
      }
    });
  };

  document.getElementById('btnGoto').onclick = ()=>{
    showPrompt("Goto", "Enter coordinates (x y z)", (val)=>{
      const coords = val.split(" ").map(Number);
      const path = simplePathfind([0,64,0], coords); // assume player start pos (0,64,0)
      log("Generated path with " + path.length + " steps.");
    });
  };

  document.getElementById('btnTrack').onclick = ()=>{
    showPrompt("Track Player", "Enter player name", (val)=>{
      log("Tracking player: " + val + " (not implemented yet)");
    });
  };

  document.getElementById('btnBuild').onclick = ()=>{
    log("Opening build planner (canvas editor next step)");
  };

  // === Hotkeys ===
  document.addEventListener('keydown', e=>{
    if (e.code==='ShiftRight') { menu.style.display='block'; }
    if (e.code==='ControlRight') { menu.style.display='none'; focusGame(); }
  });

  document.addEventListener('click', e=>{
    if (!menu.contains(e.target)) { focusGame(); }
  });

  game.addEventListener('load', ()=>{ log('Eaglercraft loaded in iframe'); focusGame(); });
})();
