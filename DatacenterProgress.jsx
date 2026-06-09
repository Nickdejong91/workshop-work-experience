// DatacenterProgress.jsx
// Props: progress (0–11) — driven externally, no internal state

const STYLES = `
  @keyframes dcFadeUp {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes dcBlink {
    0%, 42%, 58%, 100% { opacity: 1; }
    50% { opacity: 0.04; }
  }
  @keyframes dcStatusBlink {
    0%, 87%, 100% { opacity: 1; }
    90%, 97%      { opacity: 0.04; }
  }
  @keyframes dcPulse {
    0%, 100% { opacity: 0.08; }
    50%      { opacity: 0.32; }
  }
  @keyframes dcRingFade {
    0%   { opacity: 0; }
    20%  { opacity: 0.75; }
    80%  { opacity: 0.08; }
    100% { opacity: 0; }
  }
  @keyframes dcLedFlicker {
    0%, 94%, 100% { opacity: 0.9; }
    95%, 98%      { opacity: 0.3; }
  }
  .dc-in        { animation: dcFadeUp 0.55s ease both; }
  .dc-blink     { animation: dcBlink 1.8s ease-in-out infinite; }
  .dc-status    { animation: dcStatusBlink 3.2s ease infinite; }
  .dc-pulse     { animation: dcPulse 2.8s ease-in-out infinite; }
  .dc-ring      { animation: dcRingFade 2.4s ease-out infinite; }
  .dc-led-g     { animation: dcLedFlicker 4s ease infinite; }
  .dc-led-b     { animation: dcLedFlicker 4s ease infinite 0.7s; }
`;

// Star field — pre-computed so it's stable
const STARS = [
  [14,12,0.9,0.4],[44,26,1,0.5],[76,9,0.8,0.35],[112,20,1,0.45],
  [148,7,0.8,0.3],[178,33,0.9,0.5],[220,14,0.8,0.35],[258,24,1,0.45],
  [295,10,0.9,0.4],[328,28,0.8,0.35],[362,13,1,0.4],[384,22,0.8,0.5],
  [52,55,0.7,0.28],[132,60,0.8,0.32],[202,46,0.7,0.25],[316,52,0.9,0.38],
  [382,45,0.7,0.25],[22,70,0.8,0.28],[94,78,0.7,0.22],[250,68,0.8,0.3],
];

// Window grid: 3 cols × 2 rows, centred in building (x 105–295)
const WINS = [
  { x: 123, y: 136 }, { x: 181, y: 136 }, { x: 239, y: 136 },
  { x: 123, y: 182 }, { x: 181, y: 182 }, { x: 239, y: 182 },
];

export default function DatacenterProgress({ progress = 0 }) {
  const show = n => progress >= n;

  return (
    <div className="w-full rounded-xl overflow-hidden bg-[#060918]">
      <svg
        viewBox="0 0 400 300"
        style={{ width: '100%', display: 'block' }}
        role="img"
        aria-label={`Datacenter construction progress: ${progress} of 11 sessions complete`}
      >
        <defs>
          <style>{STYLES}</style>

          {/* Glow filter for lit elements */}
          <filter id="dcGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Softer ambient glow */}
          <filter id="dcSoftGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Sky ────────────────────────────────────────────── */}
        <rect width="400" height="248" fill="#060918" />

        {/* Moon — crescent via overlap */}
        <circle cx="362" cy="28" r="15" fill="#1a2848" />
        <circle cx="371" cy="22" r="13" fill="#060918" />

        {/* Stars */}
        {STARS.map(([cx, cy, r, op], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill="#fff" opacity={op} />
        ))}

        {/* Distant city silhouette */}
        {[[6,22,16],[30,14,10],[50,32,20],[82,19,12],
          [344,28,18],[364,14,10],[382,24,14],[396,10,8]
        ].map(([x, h, w], i) => (
          <rect key={i} x={x} y={244 - h} width={w} height={h} fill="#090f1e" opacity="0.55" />
        ))}

        {/* ── Ground ──────────────────────────────────────────── */}
        <rect y="244" width="400" height="56" fill="#090f1c" />
        <rect y="242" width="400" height="5"  fill="#0d1728" />

        {/* Paving slabs when construction starts */}
        {show(2) && [112,160,208,256].map(x => (
          <line key={x} x1={x} y1="246" x2={x} y2="300" stroke="#0c1525" strokeWidth="0.8" opacity="0.7" />
        ))}

        {/* ────────────────────────────────────────────────────── */}
        {/* STAGE 1 — Survey pegs, barrier tape, site sign       */}
        {/* ────────────────────────────────────────────────────── */}
        {show(1) && (
          <g className="dc-in">
            {/* Left peg */}
            <rect x="80" y="231" width="4" height="15" fill="#c8a030" />
            <rect x="76" y="231" width="12" height="3"  fill="#c8a030" />
            {/* Right peg */}
            <rect x="316" y="231" width="4" height="15" fill="#c8a030" />
            <rect x="312" y="231" width="12" height="3"  fill="#c8a030" />

            {/* Site boundary — red/yellow hazard tape */}
            <line x1="84" y1="237" x2="316" y2="237"
              stroke="#910000" strokeWidth="2"
              strokeDasharray="12,7" opacity="0.85" />

            {/* Site sign (inside future building footprint — will be covered by walls) */}
            <rect x="197" y="214" width="6"  height="32" fill="#b09050" />
            <rect x="156" y="190" width="88" height="30" rx="2"
              fill="#0a1020" stroke="#910000" strokeWidth="2" />
            <rect x="158" y="192" width="84" height="26" rx="1" fill="#0d1428" />
            <text x="200" y="207" textAnchor="middle"
              fill="#910000" fontSize="8" fontFamily="monospace" fontWeight="bold" letterSpacing="1.5">
              SITE WORK
            </text>
            <text x="200" y="216" textAnchor="middle"
              fill="#910000" fontSize="5" fontFamily="monospace" letterSpacing="0.8" opacity="0.65">
              AUTHORISED ENTRY ONLY
            </text>
          </g>
        )}

        {/* ────────────────────────────────────────────────────── */}
        {/* STAGE 2 — Foundation slab                            */}
        {/* ────────────────────────────────────────────────────── */}
        {show(2) && (
          <g className="dc-in">
            <rect x="100" y="238" width="200" height="9" rx="1"
              fill="#141e30" stroke="#1e2e46" strokeWidth="1.5" />
            {/* Rebar dots */}
            {[114,135,156,180,200,220,244,265,286].map(x => (
              <circle key={x} cx={x} cy="243" r="2.5" fill="#1e3048" opacity="0.8" />
            ))}
            <text x="200" y="256" textAnchor="middle"
              fill="#1e2e46" fontSize="4.8" fontFamily="monospace" letterSpacing="1.2" opacity="0.7">
              FOUNDATION
            </text>
          </g>
        )}

        {/* ────────────────────────────────────────────────────── */}
        {/* STAGE 3 — Steel skeleton                             */}
        {/* ────────────────────────────────────────────────────── */}
        {show(3) && (
          <g className="dc-in">
            {/* Vertical columns */}
            {[105, 162, 200, 238, 295].map(x => (
              <rect key={x} x={x - 2.5} y={128} width="5" height="115" fill="#1c3050" />
            ))}
            {/* Horizontal beams */}
            {[128, 174, 220].map(y => (
              <rect key={y} x="105" y={y - 2} width="190" height="4" fill="#1c3050" />
            ))}
            {/* Cross bracing — left bay */}
            <line x1="105" y1="128" x2="162" y2="174" stroke="#142236" strokeWidth="1.8" />
            <line x1="162" y1="128" x2="105" y2="174" stroke="#142236" strokeWidth="1.8" />
            {/* Cross bracing — right bay */}
            <line x1="238" y1="128" x2="295" y2="174" stroke="#142236" strokeWidth="1.8" />
            <line x1="295" y1="128" x2="238" y2="174" stroke="#142236" strokeWidth="1.8" />
            {/* Floor deck hash marks */}
            {Array.from({ length: 20 }, (_, i) => 107 + i * 9).map(x => (
              <line key={x} x1={x} y1="174" x2={x} y2="220"
                stroke="#0f1c2c" strokeWidth="0.8" opacity="0.55" />
            ))}
          </g>
        )}

        {/* ────────────────────────────────────────────────────── */}
        {/* STAGE 4 — Exterior walls (covers sign + frame)       */}
        {/* ────────────────────────────────────────────────────── */}
        {show(4) && (
          <g className="dc-in">
            <rect x="105" y="128" width="190" height="116"
              fill="#0d1525" stroke="#1a2840" strokeWidth="1.5" />
            {/* Vertical panel seams */}
            {[152, 200, 248].map(x => (
              <line key={x} x1={x} y1="128" x2={x} y2="244"
                stroke="#0f1930" strokeWidth="0.8" opacity="0.6" />
            ))}
            {/* Horizontal floor band */}
            <line x1="105" y1="184" x2="295" y2="184"
              stroke="#0f1930" strokeWidth="0.9" opacity="0.6" />
          </g>
        )}

        {/* ────────────────────────────────────────────────────── */}
        {/* STAGE 5 — Roof                                       */}
        {/* ────────────────────────────────────────────────────── */}
        {show(5) && (
          <g className="dc-in">
            <rect x="100" y="116" width="200" height="16" rx="1"
              fill="#111e32" stroke="#1e2e48" strokeWidth="1.5" />
            {/* Parapet cap */}
            <rect x="100" y="116" width="200" height="5" fill="#161e32" />
            {/* Roof surface texture */}
            {Array.from({ length: 13 }, (_, i) => 106 + i * 14).map(x => (
              <line key={x} x1={x} y1="121" x2={x} y2="130"
                stroke="#1a2840" strokeWidth="0.7" opacity="0.5" />
            ))}
          </g>
        )}

        {/* ────────────────────────────────────────────────────── */}
        {/* STAGE 6 — Dark windows + door                        */}
        {/* ────────────────────────────────────────────────────── */}
        {show(6) && !show(10) && (
          <g className="dc-in">
            {WINS.map((w, i) => (
              <g key={i}>
                <rect x={w.x} y={w.y} width="38" height="30" rx="1"
                  fill="#08101e" stroke="#1a2840" strokeWidth="1" />
                <line x1={w.x + 19} y1={w.y}      x2={w.x + 19} y2={w.y + 30} stroke="#101928" strokeWidth="0.7" />
                <line x1={w.x}      y1={w.y + 15} x2={w.x + 38} y2={w.y + 15} stroke="#101928" strokeWidth="0.7" />
              </g>
            ))}
            {/* Door */}
            <rect x="178" y="206" width="44" height="38" rx="1"
              fill="#08101e" stroke="#1a2840" strokeWidth="1" />
            <line x1="200" y1="206" x2="200" y2="244" stroke="#101928" strokeWidth="0.7" />
            <rect x="213" y="218" width="4" height="10" rx="1" fill="#1a2840" />
          </g>
        )}

        {/* ────────────────────────────────────────────────────── */}
        {/* STAGE 7 — Rooftop HVAC cooling units                 */}
        {/* ────────────────────────────────────────────────────── */}
        {show(7) && (
          <g className="dc-in">
            {/* Unit 1 */}
            <rect x="114" y="99" width="62" height="19" rx="2"
              fill="#0e1828" stroke="#1a2840" strokeWidth="1.2" />
            {Array.from({ length: 10 }, (_, i) => 120 + i * 5).map(x => (
              <line key={x} x1={x} y1="101" x2={x} y2="116" stroke="#1a2840" strokeWidth="0.9" />
            ))}
            <circle cx="144" cy="109" r="6.5" fill="none" stroke="#1a2840" strokeWidth="1.2" />
            <circle cx="144" cy="109" r="2"   fill="#121c2e" />

            {/* Unit 2 */}
            <rect x="224" y="99" width="62" height="19" rx="2"
              fill="#0e1828" stroke="#1a2840" strokeWidth="1.2" />
            {Array.from({ length: 10 }, (_, i) => 230 + i * 5).map(x => (
              <line key={x} x1={x} y1="101" x2={x} y2="116" stroke="#1a2840" strokeWidth="0.9" />
            ))}
            <circle cx="254" cy="109" r="6.5" fill="none" stroke="#1a2840" strokeWidth="1.2" />
            <circle cx="254" cy="109" r="2"   fill="#121c2e" />
          </g>
        )}

        {/* ────────────────────────────────────────────────────── */}
        {/* STAGE 8 — Utility pole + catenary + transformer      */}
        {/* ────────────────────────────────────────────────────── */}
        {show(8) && (
          <g className="dc-in">
            {/* Utility pole */}
            <rect x="22" y="148" width="6" height="98" fill="#131e30" />
            <rect x="13" y="166" width="26" height="5"  fill="#131e30" />
            <circle cx="16" cy="169" r="3.5" fill="#0e1828" stroke="#1a2840" strokeWidth="1" />
            <circle cx="36" cy="169" r="3.5" fill="#0e1828" stroke="#1a2840" strokeWidth="1" />

            {/* Catenary power lines */}
            <path d="M16,173 C40,186 78,194 105,202"
              fill="none" stroke="#1a2840" strokeWidth="1.3" />
            <path d="M36,173 C58,184 82,190 105,198"
              fill="none" stroke="#1a2840" strokeWidth="1.3" />

            {/* Transformer */}
            <rect x="30" y="206" width="60" height="42" rx="2"
              fill="#0c1522" stroke="#1a2840" strokeWidth="1.5" />
            <rect x="36" y="213" width="21" height="15" rx="1"
              fill="#080e1c" stroke="#141e30" strokeWidth="1" />
            <rect x="63" y="213" width="21" height="15" rx="1"
              fill="#080e1c" stroke="#141e30" strokeWidth="1" />
            {/* Cooling fins */}
            {Array.from({ length: 16 }, (_, i) => 31 + i * 3.7).map(x => (
              <line key={x} x1={x} y1="249" x2={x} y2="246"
                stroke="#1a2840" strokeWidth="1.2" />
            ))}
            <text x="60" y="256" textAnchor="middle"
              fill="#1a2840" fontSize="5" fontFamily="monospace" letterSpacing="0.8">XFMR</text>
          </g>
        )}

        {/* ────────────────────────────────────────────────────── */}
        {/* STAGE 9 — Generator set                              */}
        {/* ────────────────────────────────────────────────────── */}
        {show(9) && (
          <g className="dc-in">
            {/* Conduit from building */}
            <rect x="292" y="222" width="35" height="5" rx="1" fill="#131e30" />

            {/* Generator body */}
            <rect x="322" y="207" width="68" height="40" rx="2"
              fill="#0c1522" stroke="#1a2840" strokeWidth="1.5" />
            {/* Louvres */}
            {Array.from({ length: 6 }, (_, i) => i).map(i => (
              <rect key={i} x="328" y={213 + i * 5} width="42" height="3.5" rx="0.8"
                fill="#080e1c" stroke="#141e30" strokeWidth="0.8" />
            ))}
            {/* Exhaust stack */}
            <rect x="368" y="192" width="10" height="20" rx="1" fill="#0f1828" />
            <rect x="365" y="190" width="16" height="5" rx="1" fill="#131e30" />

            <text x="356" y="256" textAnchor="middle"
              fill="#1a2840" fontSize="5" fontFamily="monospace" letterSpacing="0.8">GEN SET</text>
          </g>
        )}

        {/* ────────────────────────────────────────────────────── */}
        {/* STAGE 10 — Live: lit windows, racks, signage, accents */}
        {/* ────────────────────────────────────────────────────── */}
        {show(10) && (
          <g className="dc-in">
            {/* Lit windows with server rack silhouettes */}
            {WINS.map((w, i) => (
              <g key={i} filter="url(#dcGlow)">
                {/* Window glass — blue-lit */}
                <rect x={w.x} y={w.y} width="38" height="30" rx="1"
                  fill="#122848" stroke="#2a5080" strokeWidth="1" />
                {/* Three server rack units */}
                {[0, 1, 2].map(r => (
                  <rect key={r}
                    x={w.x + 3 + r * 12} y={w.y + 3}
                    width="10" height="24" rx="1"
                    fill="#091828" stroke="#1a3350" strokeWidth="0.5" />
                ))}
                {/* Rack status LEDs */}
                <circle cx={w.x + 8}  cy={w.y + 8}  r="1.6" fill="#00e87a" className="dc-led-g" />
                <circle cx={w.x + 20} cy={w.y + 8}  r="1.6" fill="#00e87a" className="dc-led-g" />
                <circle cx={w.x + 32} cy={w.y + 8}  r="1.6" fill="#5ab4ff" className="dc-led-b" />
                <circle cx={w.x + 8}  cy={w.y + 16} r="1.6" fill="#5ab4ff" className="dc-led-b" />
                <circle cx={w.x + 20} cy={w.y + 16} r="1.6" fill="#00e87a" className="dc-led-g" />
                <circle cx={w.x + 32} cy={w.y + 16} r="1.6" fill="#00e87a" className="dc-led-g" />
                <circle cx={w.x + 8}  cy={w.y + 24} r="1.6" fill="#5ab4ff" className="dc-led-b" />
                <circle cx={w.x + 20} cy={w.y + 24} r="1.6" fill="#ff6060" />
              </g>
            ))}

            {/* Lit door */}
            <rect x="178" y="206" width="44" height="38" rx="1"
              fill="#0a1a2e" stroke="#2a4060" strokeWidth="1" />
            <line x1="200" y1="206" x2="200" y2="244" stroke="#152030" strokeWidth="0.8" />
            <rect x="213" y="218" width="4" height="10" rx="1" fill="#910000" />

            {/* Entrance light — #910000 sconce above door */}
            <rect x="193" y="202" width="14" height="5" rx="1" fill="#910000" />
            <path d="M191,207 L183,220 L217,220 L209,207Z" fill="#910000" opacity="0.07" />

            {/* Red accent stripe at base */}
            <rect x="105" y="238" width="190" height="4" fill="#910000" opacity="0.6" />

            {/* Corner status light housings */}
            <rect x="104" y="230" width="8" height="8" rx="1" fill="#0c1422" stroke="#1a2840" strokeWidth="0.8" />
            <circle cx="108" cy="234" r="3" fill="#910000" filter="url(#dcGlow)" />
            <rect x="288" y="230" width="8" height="8" rx="1" fill="#0c1422" stroke="#1a2840" strokeWidth="0.8" />
            <circle cx="292" cy="234" r="3" fill="#910000" filter="url(#dcGlow)" />

            {/* Parapet sign */}
            <rect x="138" y="117" width="124" height="13" rx="1"
              fill="#080e1c" stroke="#910000" strokeWidth="1.5" />
            <text x="200" y="127.5" textAnchor="middle"
              fill="#910000" fontSize="7" fontFamily="monospace" fontWeight="bold" letterSpacing="2">
              DATA CENTER
            </text>
          </g>
        )}

        {/* ────────────────────────────────────────────────────── */}
        {/* STAGE 11 — Fully live: antenna, blinks, ambient glow  */}
        {/* ────────────────────────────────────────────────────── */}
        {show(11) && (
          <g>
            {/* Ambient window pulse — layered over lit windows */}
            {WINS.map((w, i) => (
              <rect key={i}
                x={w.x} y={w.y} width="38" height="30" rx="1"
                fill="#3a70c0"
                className="dc-pulse"
                style={{ animationDelay: `${i * 0.46}s` }}
              />
            ))}

            {/* Blinking corner lights */}
            <circle cx="108" cy="234" r="4.5" fill="#910000"
              className="dc-status" filter="url(#dcSoftGlow)" />
            <circle cx="292" cy="234" r="4.5" fill="#910000"
              className="dc-status" filter="url(#dcSoftGlow)"
              style={{ animationDelay: '0.9s' }} />

            {/* Comms antenna */}
            <rect x="198" y="86" width="4" height="31" fill="#1a2e48" />
            <rect x="193" y="99" width="14" height="3" fill="#1a2e48" />
            <rect x="190" y="95" width="20" height="2.5" fill="#1a2e48" />

            {/* Beacon — top of antenna */}
            <circle cx="200" cy="86" r="4" fill="#910000"
              className="dc-blink" filter="url(#dcGlow)" />

            {/* Transmission rings */}
            {[8, 15, 22, 30].map((r, i) => (
              <circle key={r} cx="200" cy="86"
                r={r} fill="none"
                stroke="#910000" strokeWidth={1.8 - i * 0.35}
                className="dc-ring"
                style={{ animationDelay: `${i * 0.58}s` }}
              />
            ))}

            {/* Sign ambient pulse */}
            <rect x="138" y="117" width="124" height="13" rx="1"
              fill="#910000" opacity="0"
              className="dc-pulse"
              style={{ animationDelay: '1.4s' }}
            />
          </g>
        )}

      </svg>
    </div>
  );
}
