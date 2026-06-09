// datacenter.js — vanilla SVG datacenter, driven by progress (0–11)
(function () {

  var DC_STYLES = [
    '@keyframes dcFadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}',
    '@keyframes dcBlink{0%,42%,58%,100%{opacity:1}50%{opacity:.04}}',
    '@keyframes dcStatusBlink{0%,87%,100%{opacity:1}90%,97%{opacity:.04}}',
    '@keyframes dcPulse{0%,100%{opacity:.08}50%{opacity:.32}}',
    '@keyframes dcRingFade{0%{opacity:0}20%{opacity:.75}80%{opacity:.08}100%{opacity:0}}',
    '@keyframes dcLedFlicker{0%,94%,100%{opacity:.9}95%,98%{opacity:.3}}',
    '.dc-in{animation:dcFadeUp .55s ease both}',
    '.dc-blink{animation:dcBlink 1.8s ease-in-out infinite}',
    '.dc-status{animation:dcStatusBlink 3.2s ease infinite}',
    '.dc-pulse{animation:dcPulse 2.8s ease-in-out infinite}',
    '.dc-ring{animation:dcRingFade 2.4s ease-out infinite}',
    '.dc-led-g{animation:dcLedFlicker 4s ease infinite}',
    '.dc-led-b{animation:dcLedFlicker 4s ease infinite .7s}',
  ].join('');

  var STARS = [
    [14,12,.9,.4],[44,26,1,.5],[76,9,.8,.35],[112,20,1,.45],
    [148,7,.8,.3],[178,33,.9,.5],[220,14,.8,.35],[258,24,1,.45],
    [295,10,.9,.4],[328,28,.8,.35],[362,13,1,.4],[384,22,.8,.5],
    [52,55,.7,.28],[132,60,.8,.32],[202,46,.7,.25],[316,52,.9,.38],
    [382,45,.7,.25],[22,70,.8,.28],[94,78,.7,.22],[250,68,.8,.3],
  ];

  var WINS = [
    {x:123,y:136},{x:181,y:136},{x:239,y:136},
    {x:123,y:182},{x:181,y:182},{x:239,y:182},
  ];

  function range(n) { return Array.from({length:n},function(_,i){return i;}); }

  function buildSVG(progress) {
    var show = function(n){ return progress >= n; };
    var p = [];
    var add = function(s){ p.push(s); };

    add('<svg viewBox="0 0 400 300" style="width:100%;display:block" role="img" aria-label="Datacenter construction: '+ progress +' of 11 sessions">');
    add('<defs>');
    add('<filter id="dcGlow" x="-60%" y="-60%" width="220%" height="220%">');
    add('<feGaussianBlur stdDeviation="3.5" result="blur"/>');
    add('<feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>');
    add('<filter id="dcSoftGlow" x="-100%" y="-100%" width="300%" height="300%">');
    add('<feGaussianBlur stdDeviation="7" result="blur"/>');
    add('<feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>');
    add('</defs>');

    // Sky
    add('<rect width="400" height="248" fill="#060918"/>');
    // Moon crescent
    add('<circle cx="362" cy="28" r="15" fill="#1a2848"/>');
    add('<circle cx="371" cy="22" r="13" fill="#060918"/>');
    // Stars
    STARS.forEach(function(s){ add('<circle cx="'+s[0]+'" cy="'+s[1]+'" r="'+s[2]+'" fill="#fff" opacity="'+s[3]+'"/>'); });
    // City silhouette
    [[6,22,16],[30,14,10],[50,32,20],[82,19,12],[344,28,18],[364,14,10],[382,24,14],[396,10,8]].forEach(function(c){
      add('<rect x="'+c[0]+'" y="'+(244-c[1])+'" width="'+c[2]+'" height="'+c[1]+'" fill="#090f1e" opacity=".55"/>');
    });
    // Ground
    add('<rect y="244" width="400" height="56" fill="#090f1c"/>');
    add('<rect y="242" width="400" height="5" fill="#0d1728"/>');
    // Paving slabs
    if (show(2)) { [112,160,208,256].forEach(function(x){ add('<line x1="'+x+'" y1="246" x2="'+x+'" y2="300" stroke="#0c1525" stroke-width=".8" opacity=".7"/>'); }); }

    // ── Stage 1: Survey pegs + tape + sign ─────────────────────
    if (show(1)) {
      add('<g class="dc-in">');
      add('<rect x="80" y="231" width="4" height="15" fill="#c8a030"/>');
      add('<rect x="76" y="231" width="12" height="3" fill="#c8a030"/>');
      add('<rect x="316" y="231" width="4" height="15" fill="#c8a030"/>');
      add('<rect x="312" y="231" width="12" height="3" fill="#c8a030"/>');
      add('<line x1="84" y1="237" x2="316" y2="237" stroke="#910000" stroke-width="2" stroke-dasharray="12,7" opacity=".85"/>');
      add('<rect x="197" y="214" width="6" height="32" fill="#b09050"/>');
      add('<rect x="156" y="190" width="88" height="30" rx="2" fill="#0a1020" stroke="#910000" stroke-width="2"/>');
      add('<rect x="158" y="192" width="84" height="26" rx="1" fill="#0d1428"/>');
      add('<text x="200" y="207" text-anchor="middle" fill="#910000" font-size="8" font-family="monospace" font-weight="bold" letter-spacing="1.5">SITE WORK</text>');
      add('<text x="200" y="216" text-anchor="middle" fill="#910000" font-size="5" font-family="monospace" letter-spacing=".8" opacity=".65">AUTHORISED ENTRY ONLY</text>');
      add('</g>');
    }

    // ── Stage 2: Foundation ─────────────────────────────────────
    if (show(2)) {
      add('<g class="dc-in">');
      add('<rect x="100" y="238" width="200" height="9" rx="1" fill="#141e30" stroke="#1e2e46" stroke-width="1.5"/>');
      [114,135,156,180,200,220,244,265,286].forEach(function(x){
        add('<circle cx="'+x+'" cy="243" r="2.5" fill="#1e3048" opacity=".8"/>');
      });
      add('<text x="200" y="256" text-anchor="middle" fill="#1e2e46" font-size="4.8" font-family="monospace" letter-spacing="1.2" opacity=".7">FOUNDATION</text>');
      add('</g>');
    }

    // ── Stage 3: Steel frame ─────────────────────────────────────
    if (show(3)) {
      add('<g class="dc-in">');
      [105,162,200,238,295].forEach(function(x){ add('<rect x="'+(x-2.5)+'" y="128" width="5" height="115" fill="#1c3050"/>'); });
      [128,174,220].forEach(function(y){ add('<rect x="105" y="'+(y-2)+'" width="190" height="4" fill="#1c3050"/>'); });
      add('<line x1="105" y1="128" x2="162" y2="174" stroke="#142236" stroke-width="1.8"/>');
      add('<line x1="162" y1="128" x2="105" y2="174" stroke="#142236" stroke-width="1.8"/>');
      add('<line x1="238" y1="128" x2="295" y2="174" stroke="#142236" stroke-width="1.8"/>');
      add('<line x1="295" y1="128" x2="238" y2="174" stroke="#142236" stroke-width="1.8"/>');
      range(20).forEach(function(i){ var x=107+i*9; add('<line x1="'+x+'" y1="174" x2="'+x+'" y2="220" stroke="#0f1c2c" stroke-width=".8" opacity=".55"/>'); });
      add('</g>');
    }

    // ── Stage 4: Walls (covers sign via paint order) ────────────
    if (show(4)) {
      add('<g class="dc-in">');
      add('<rect x="105" y="128" width="190" height="116" fill="#0d1525" stroke="#1a2840" stroke-width="1.5"/>');
      [152,200,248].forEach(function(x){ add('<line x1="'+x+'" y1="128" x2="'+x+'" y2="244" stroke="#0f1930" stroke-width=".8" opacity=".6"/>'); });
      add('<line x1="105" y1="184" x2="295" y2="184" stroke="#0f1930" stroke-width=".9" opacity=".6"/>');
      add('</g>');
    }

    // ── Stage 5: Roof ────────────────────────────────────────────
    if (show(5)) {
      add('<g class="dc-in">');
      add('<rect x="100" y="116" width="200" height="16" rx="1" fill="#111e32" stroke="#1e2e48" stroke-width="1.5"/>');
      add('<rect x="100" y="116" width="200" height="5" fill="#161e32"/>');
      range(13).forEach(function(i){ var x=106+i*14; add('<line x1="'+x+'" y1="121" x2="'+x+'" y2="130" stroke="#1a2840" stroke-width=".7" opacity=".5"/>'); });
      add('</g>');
    }

    // ── Stage 6: Dark windows + door ────────────────────────────
    if (show(6) && !show(10)) {
      add('<g class="dc-in">');
      WINS.forEach(function(w){
        add('<rect x="'+w.x+'" y="'+w.y+'" width="38" height="30" rx="1" fill="#08101e" stroke="#1a2840" stroke-width="1"/>');
        add('<line x1="'+(w.x+19)+'" y1="'+w.y+'" x2="'+(w.x+19)+'" y2="'+(w.y+30)+'" stroke="#101928" stroke-width=".7"/>');
        add('<line x1="'+w.x+'" y1="'+(w.y+15)+'" x2="'+(w.x+38)+'" y2="'+(w.y+15)+'" stroke="#101928" stroke-width=".7"/>');
      });
      add('<rect x="178" y="206" width="44" height="38" rx="1" fill="#08101e" stroke="#1a2840" stroke-width="1"/>');
      add('<line x1="200" y1="206" x2="200" y2="244" stroke="#101928" stroke-width=".7"/>');
      add('<rect x="213" y="218" width="4" height="10" rx="1" fill="#1a2840"/>');
      add('</g>');
    }

    // ── Stage 7: HVAC ─────────────────────────────────────────────
    if (show(7)) {
      add('<g class="dc-in">');
      add('<rect x="114" y="99" width="62" height="19" rx="2" fill="#0e1828" stroke="#1a2840" stroke-width="1.2"/>');
      range(10).forEach(function(i){ var x=120+i*5; add('<line x1="'+x+'" y1="101" x2="'+x+'" y2="116" stroke="#1a2840" stroke-width=".9"/>'); });
      add('<circle cx="144" cy="109" r="6.5" fill="none" stroke="#1a2840" stroke-width="1.2"/>');
      add('<circle cx="144" cy="109" r="2" fill="#121c2e"/>');
      add('<rect x="224" y="99" width="62" height="19" rx="2" fill="#0e1828" stroke="#1a2840" stroke-width="1.2"/>');
      range(10).forEach(function(i){ var x=230+i*5; add('<line x1="'+x+'" y1="101" x2="'+x+'" y2="116" stroke="#1a2840" stroke-width=".9"/>'); });
      add('<circle cx="254" cy="109" r="6.5" fill="none" stroke="#1a2840" stroke-width="1.2"/>');
      add('<circle cx="254" cy="109" r="2" fill="#121c2e"/>');
      add('</g>');
    }

    // ── Stage 8: Utility pole + transformer ──────────────────────
    if (show(8)) {
      add('<g class="dc-in">');
      add('<rect x="22" y="148" width="6" height="98" fill="#131e30"/>');
      add('<rect x="13" y="166" width="26" height="5" fill="#131e30"/>');
      add('<circle cx="16" cy="169" r="3.5" fill="#0e1828" stroke="#1a2840" stroke-width="1"/>');
      add('<circle cx="36" cy="169" r="3.5" fill="#0e1828" stroke="#1a2840" stroke-width="1"/>');
      add('<path d="M16,173 C40,186 78,194 105,202" fill="none" stroke="#1a2840" stroke-width="1.3"/>');
      add('<path d="M36,173 C58,184 82,190 105,198" fill="none" stroke="#1a2840" stroke-width="1.3"/>');
      add('<rect x="30" y="206" width="60" height="42" rx="2" fill="#0c1522" stroke="#1a2840" stroke-width="1.5"/>');
      add('<rect x="36" y="213" width="21" height="15" rx="1" fill="#080e1c" stroke="#141e30" stroke-width="1"/>');
      add('<rect x="63" y="213" width="21" height="15" rx="1" fill="#080e1c" stroke="#141e30" stroke-width="1"/>');
      range(16).forEach(function(i){ var x=(31+i*3.7).toFixed(1); add('<line x1="'+x+'" y1="249" x2="'+x+'" y2="246" stroke="#1a2840" stroke-width="1.2"/>'); });
      add('<text x="60" y="256" text-anchor="middle" fill="#1a2840" font-size="5" font-family="monospace" letter-spacing=".8">XFMR</text>');
      add('</g>');
    }

    // ── Stage 9: Generator ────────────────────────────────────────
    if (show(9)) {
      add('<g class="dc-in">');
      add('<rect x="292" y="222" width="35" height="5" rx="1" fill="#131e30"/>');
      add('<rect x="322" y="207" width="68" height="40" rx="2" fill="#0c1522" stroke="#1a2840" stroke-width="1.5"/>');
      range(6).forEach(function(i){ add('<rect x="328" y="'+(213+i*5)+'" width="42" height="3.5" rx=".8" fill="#080e1c" stroke="#141e30" stroke-width=".8"/>'); });
      add('<rect x="368" y="192" width="10" height="20" rx="1" fill="#0f1828"/>');
      add('<rect x="365" y="190" width="16" height="5" rx="1" fill="#131e30"/>');
      add('<text x="356" y="256" text-anchor="middle" fill="#1a2840" font-size="5" font-family="monospace" letter-spacing=".8">GEN SET</text>');
      add('</g>');
    }

    // ── Stage 10: Live — lit windows, accents, sign ───────────────
    if (show(10)) {
      add('<g class="dc-in">');
      WINS.forEach(function(w){
        add('<g filter="url(#dcGlow)">');
        add('<rect x="'+w.x+'" y="'+w.y+'" width="38" height="30" rx="1" fill="#122848" stroke="#2a5080" stroke-width="1"/>');
        [0,1,2].forEach(function(r){ add('<rect x="'+(w.x+3+r*12)+'" y="'+(w.y+3)+'" width="10" height="24" rx="1" fill="#091828" stroke="#1a3350" stroke-width=".5"/>'); });
        add('<circle cx="'+(w.x+8)+'" cy="'+(w.y+8)+'" r="1.6" fill="#00e87a" class="dc-led-g"/>');
        add('<circle cx="'+(w.x+20)+'" cy="'+(w.y+8)+'" r="1.6" fill="#00e87a" class="dc-led-g"/>');
        add('<circle cx="'+(w.x+32)+'" cy="'+(w.y+8)+'" r="1.6" fill="#5ab4ff" class="dc-led-b"/>');
        add('<circle cx="'+(w.x+8)+'" cy="'+(w.y+16)+'" r="1.6" fill="#5ab4ff" class="dc-led-b"/>');
        add('<circle cx="'+(w.x+20)+'" cy="'+(w.y+16)+'" r="1.6" fill="#00e87a" class="dc-led-g"/>');
        add('<circle cx="'+(w.x+32)+'" cy="'+(w.y+16)+'" r="1.6" fill="#00e87a" class="dc-led-g"/>');
        add('<circle cx="'+(w.x+8)+'" cy="'+(w.y+24)+'" r="1.6" fill="#5ab4ff" class="dc-led-b"/>');
        add('<circle cx="'+(w.x+20)+'" cy="'+(w.y+24)+'" r="1.6" fill="#ff6060"/>');
        add('</g>');
      });
      add('<rect x="178" y="206" width="44" height="38" rx="1" fill="#0a1a2e" stroke="#2a4060" stroke-width="1"/>');
      add('<line x1="200" y1="206" x2="200" y2="244" stroke="#152030" stroke-width=".8"/>');
      add('<rect x="213" y="218" width="4" height="10" rx="1" fill="#910000"/>');
      add('<rect x="193" y="202" width="14" height="5" rx="1" fill="#910000"/>');
      add('<path d="M191,207 L183,220 L217,220 L209,207Z" fill="#910000" opacity=".07"/>');
      add('<rect x="105" y="238" width="190" height="4" fill="#910000" opacity=".6"/>');
      add('<rect x="104" y="230" width="8" height="8" rx="1" fill="#0c1422" stroke="#1a2840" stroke-width=".8"/>');
      add('<circle cx="108" cy="234" r="3" fill="#910000" filter="url(#dcGlow)"/>');
      add('<rect x="288" y="230" width="8" height="8" rx="1" fill="#0c1422" stroke="#1a2840" stroke-width=".8"/>');
      add('<circle cx="292" cy="234" r="3" fill="#910000" filter="url(#dcGlow)"/>');
      add('<rect x="138" y="117" width="124" height="13" rx="1" fill="#080e1c" stroke="#910000" stroke-width="1.5"/>');
      add('<text x="200" y="127.5" text-anchor="middle" fill="#910000" font-size="7" font-family="monospace" font-weight="bold" letter-spacing="2">DATA CENTER</text>');
      add('</g>');
    }

    // ── Stage 11: Antenna, blinks, transmission rings ─────────────
    if (show(11)) {
      add('<g>');
      WINS.forEach(function(w, i){
        add('<rect x="'+w.x+'" y="'+w.y+'" width="38" height="30" rx="1" fill="#3a70c0" class="dc-pulse" style="animation-delay:'+(i*0.46).toFixed(2)+'s"/>');
      });
      add('<circle cx="108" cy="234" r="4.5" fill="#910000" class="dc-status" filter="url(#dcSoftGlow)"/>');
      add('<circle cx="292" cy="234" r="4.5" fill="#910000" class="dc-status" style="animation-delay:.9s" filter="url(#dcSoftGlow)"/>');
      add('<rect x="198" y="86" width="4" height="31" fill="#1a2e48"/>');
      add('<rect x="193" y="99" width="14" height="3" fill="#1a2e48"/>');
      add('<rect x="190" y="95" width="20" height="2.5" fill="#1a2e48"/>');
      add('<circle cx="200" cy="86" r="4" fill="#910000" class="dc-blink" filter="url(#dcGlow)"/>');
      [8,15,22,30].forEach(function(r, i){
        add('<circle cx="200" cy="86" r="'+r+'" fill="none" stroke="#910000" stroke-width="'+(1.8-i*0.35).toFixed(2)+'" class="dc-ring" style="animation-delay:'+(i*0.58).toFixed(2)+'s"/>');
      });
      add('<rect x="138" y="117" width="124" height="13" rx="1" fill="#910000" class="dc-pulse" style="animation-delay:1.4s"/>');
      add('</g>');
    }

    add('</svg>');
    return p.join('');
  }

  function injectStyles() {
    if (document.getElementById('dc-styles')) return;
    var s = document.createElement('style');
    s.id = 'dc-styles';
    s.textContent = DC_STYLES;
    document.head.appendChild(s);
  }

  window.renderDatacenter = function (container, progress) {
    injectStyles();
    if (container.dataset.dcProgress === String(progress)) return;
    container.dataset.dcProgress = String(progress);
    container.innerHTML = buildSVG(progress);
  };

})();
