/* ============================================================
   app.js — Init master + efeitos rituais (WebGL dourado, dust, glyphs, audio)
   КРЕМЛЬ · Imperial Ritus v3.0
   "O que é selado com sangue, permanece."
   ============================================================ */

import { initState } from './state.js';
import { DATA } from './data.js';
import { bindAuth } from './auth.js';
import { bindNav, bindHotkeys, go } from './nav.js';
import { bindSword } from './sword.js';
import { initIntel } from './intel.js';
import { initArsenal } from './arsenal.js';
import { initShield } from './shield.js';
import { initGenerator } from './generator.js';
import { bindSpeech, refreshPin, renderSpeechList } from './speech.js';
import { bindRed } from './red.js';
import { initFiles } from './files.js';
import { initDocuments } from './documents.js';
import { initDoctrine } from './doctrine.js';
import { initResolutions } from './resolutions.js';
import { initPautas } from './pautas.js';

document.addEventListener('DOMContentLoaded', () => {
  initState();
  bindAuth();
  bindNav();
  bindHotkeys();
  bindSword();
  bindSpeech();
  bindRed();
  initIntel();
  initArsenal();
  initShield();
  initGenerator();
  initFiles();
  initDocuments();
  initDoctrine();
  initResolutions();
  initPautas();

  refreshPin();
  renderSpeechList();

  /* Ícones */
  if (window.lucide) lucide.createIcons();

  /* Efeitos globais */
  initClock();
  initFX();

  /* Vinheta de transição entre seções (expõe para nav.js) */
  window.__ritual = window.__ritual || {};
  window.__ritual.playTransition = playSectionVignette;
  window.__ritual.playSwordUnsheathe = playSwordSound;
  window.__ritual.playBell = playMonasticBell;
  window.__ritual.playWaxBreak = playWaxBreak;

  /* DEV: ?dev=1 pula o gateway (apenas para capturas/screenshot) */
  if (location.search.includes('dev=1') || location.hash === '#dev') {
    setTimeout(() => {
      const gw = document.getElementById('securityGateway');
      const app = document.getElementById('appShell');
      if (gw && app) {
        gw.classList.add('hidden');
        app.classList.remove('hidden');
        app.style.opacity = '1';
      }
    }, 250);
  }
});

/* ============================================================
   RELÓGIO DE MOSCOU
   ============================================================ */

function initClock() {
  const update = () => {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const msk = new Date(utc + (3 * 3600000));
    const hh = String(msk.getHours()).padStart(2, '0');
    const mm = String(msk.getMinutes()).padStart(2, '0');
    const ss = String(msk.getSeconds()).padStart(2, '0');
    const txt = `${hh}:${mm}:${ss} МСК`;
    document.querySelectorAll('#sessionClock, #heroClock').forEach((el) => el.textContent = txt);
  };
  update();
  setInterval(update, 1000);
}

/* ============================================================
   FX — cursor + tilt + magnet + ticker + WebGL + dust + glyphs + audio
   ============================================================ */

function initFX() {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse  = matchMedia('(pointer: coarse)').matches;

  initWebGLPlasma(reduced);
  initDustCanvas(reduced);
  if (!coarse) initCustomCursor();
  if (!coarse) initCardTilt();
  if (!coarse) initMagneticButtons();
  initTicker();
  initUrgencyTicker();
  initCounters();
}

/* ============================================================
   WEBGL — plasma dourado cerimonial
   ============================================================ */

function initWebGLPlasma(reduced) {
  const cv = document.getElementById('bgCanvas');
  if (!cv) return;
  const gl = cv.getContext('webgl') || cv.getContext('experimental-webgl');
  if (!gl) { cv.style.display = 'none'; return; }

  const vs = 'attribute vec2 p; void main(){ gl_Position=vec4(p,0.0,1.0); }';
  const fs = [
    'precision mediump float;',
    'uniform float u_time; uniform vec2 u_res; uniform vec2 u_mouse;',
    'float hash(vec2 q){ return fract(sin(dot(q,vec2(127.1,311.7)))*43758.5453); }',
    'float noise(vec2 q){ vec2 i=floor(q),f=fract(q); vec2 u=f*f*(3.0-2.0*f);',
    '  return mix(mix(hash(i),hash(i+vec2(1.0,0.0)),u.x),mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0,1.0)),u.x),u.y); }',
    'float fbm(vec2 q){ float v=0.0,a=0.5; for(int i=0;i<5;i++){ v+=a*noise(q); q=q*2.02; a*=0.5; } return v; }',
    'void main(){',
    '  vec2 uv=gl_FragCoord.xy/u_res.xy; vec2 q=uv; q.x*=u_res.x/u_res.y;',
    '  float t=u_time*0.028;',
    '  vec2 m=(u_mouse/u_res)*2.0-1.0;',
    '  vec2 p=q*1.2+vec2(t,-t*0.7)+m*0.08;',
    '  float n=fbm(p);',
    '  float n2=fbm(q*2.0-vec2(-t*0.6,t*0.9));',
    '  float clouds=mix(n,n2,0.5);',
    /* Base: tinta preta quente */
    '  vec3 base=vec3(0.025,0.022,0.020);',
    /* Ouro litúrgico */
    '  vec3 gold=vec3(0.792,0.635,0.290);',
    /* Ouro brilhante */
    '  vec3 goldB=vec3(0.957,0.847,0.541);',
    /* Carmesim profundo */
    '  vec3 crimson=vec3(0.478,0.078,0.078);',
    '  float y=uv.y+(clouds-0.5)*0.20;',
    /* Gradiente vertical: carmesim → ouro → branco-osso */
    '  vec3 band=mix(crimson*0.55, gold, smoothstep(0.20,0.55,y));',
    '  band=mix(band, goldB, smoothstep(0.55,0.95,y));',
    '  vec3 col=base + band*(0.12+0.32*clouds);',
    /* Vinheta radial */
    '  float vg=1.0-length(uv*2.0-1.0)*0.35;',
    '  col*=clamp(vg,0.0,1.0);',
    /* Pulsação rítmica do dourado */
    '  col += gold*0.04*sin(u_time*0.5 + uv.x*3.0);',
    '  gl_FragColor=vec4(col,1.0);',
    '}'
  ].join('\n');

  function compile(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.warn(gl.getShaderInfoLog(s));
    return s;
  }
  const prog = gl.createProgram();
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, vs));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) console.warn(gl.getProgramInfoLog(prog));
  gl.useProgram(prog);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const uTime = gl.getUniformLocation(prog, 'u_time'),
        uRes  = gl.getUniformLocation(prog, 'u_res'),
        uMouse= gl.getUniformLocation(prog, 'u_mouse');

  let mx = 0, my = 0, tmx = 0, tmy = 0, visible = true;
  function resize() {
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    const w = Math.max(2, Math.floor(innerWidth * dpr * 0.7));
    const h = Math.max(2, Math.floor(innerHeight * dpr * 0.7));
    if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
    gl.viewport(0, 0, cv.width, cv.height);
  }
  addEventListener('mousemove', (e) => { tmx = e.clientX; tmy = innerHeight - e.clientY; });
  function render(time) {
    mx += (tmx - mx) * 0.05; my += (tmy - my) * 0.05;
    gl.uniform1f(uTime, reduced ? 0 : time * 0.001);
    gl.uniform2f(uRes, cv.width, cv.height);
    gl.uniform2f(uMouse, mx * (cv.width / innerWidth), my * (cv.height / innerHeight));
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    if (!reduced && visible) requestAnimationFrame(render);
  }
  resize();
  addEventListener('resize', resize);
  document.addEventListener('visibilitychange', () => {
    visible = !document.hidden;
    if (visible && reduced) render(0);
  });
  requestAnimationFrame(render);
  cv.classList.add('ready');
}

/* ============================================================
   DUST CANVAS — partículas de pó dourado subindo da base
   ============================================================ */

function initDustCanvas(reduced) {
  const cv = document.getElementById('dustCanvas');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  if (!ctx) return;

  let W = 0, H = 0;
  const N = reduced ? 0 : 64;
  const motes = [];

  function resize() {
    W = cv.width = innerWidth;
    H = cv.height = innerHeight;
  }
  resize();
  addEventListener('resize', resize);

  for (let i = 0; i < N; i++) {
    motes.push({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - .5) * .15,
      vy: -.15 - Math.random() * .35,
      r: .4 + Math.random() * 1.4,
      a: .15 + Math.random() * .55,
      phase: Math.random() * Math.PI * 2,
    });
  }

  function step() {
    ctx.clearRect(0, 0, W, H);
    for (const m of motes) {
      m.x += m.vx + Math.sin((m.phase += 0.012)) * 0.18;
      m.y += m.vy;
      if (m.y < -8) { m.y = H + 8; m.x = Math.random() * W; }
      if (m.x < -8) m.x = W + 8;
      if (m.x > W + 8) m.x = -8;

      const g = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r * 4);
      g.addColorStop(0, `rgba(244,216,138,${m.a})`);
      g.addColorStop(1, 'rgba(244,216,138,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(m.x, m.y, m.r * 4, 0, Math.PI * 2);
      ctx.fill();
    }
    if (!reduced) requestAnimationFrame(step);
  }
  cv.classList.add('ready');
  if (!reduced) requestAnimationFrame(step);
}

/* ============================================================
   CURSOR RITUAL — anel + dot (sem trail, sem glyphs)
   ============================================================ */

function initCustomCursor() {
  const ring  = document.getElementById('fxCursor');
  const dot   = document.getElementById('fxCursorDot');
  if (!ring || !dot) return;

  let rx = 0, ry = 0, tx = 0, ty = 0;

  addEventListener('mousemove', (e) => {
    tx = e.clientX; ty = e.clientY;
    dot.style.transform = `translate(${tx}px,${ty}px) translate(-50%,-50%)`;
  });

  (function loop() {
    rx += (tx - rx) * 0.18; ry += (ty - ry) * 0.18;
    ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  })();

  const hov = 'a,button,.tac-card,.glass-tac,.nav-item,.bn-item,.chip,[onclick],input,select,.d-pin,.pin-item,label,.blade-tab,.cmd-pill';
  document.addEventListener('mouseover', (e) => { if (e.target.closest && e.target.closest(hov)) ring.classList.add('active'); });
  document.addEventListener('mouseout',  (e) => { if (e.target.closest && e.target.closest(hov)) ring.classList.remove('active'); });
}

/* ============================================================
   CARD TILT — inclinação 3D
   ============================================================ */

function initCardTilt() {
  let cur = null;
  document.addEventListener('mousemove', (e) => {
    const card = e.target.closest && e.target.closest('.tac-card');
    if (card !== cur) { if (cur) cur.style.transform = ''; cur = card; }
    if (!card) return;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${px * 5}deg) rotateX(${-py * 5}deg) translateY(-4px)`;
  });
}

/* ============================================================
   MAGNETIC BUTTONS
   ============================================================ */

function initMagneticButtons() {
  let mag = null;
  document.addEventListener('mousemove', (e) => {
    const m = e.target.closest && e.target.closest('.btn-tac,.btn-red,.wax-seal');
    if (m !== mag) { if (mag) mag.style.transform = ''; mag = m; }
    if (!m) return;
    const r = m.getBoundingClientRect();
    m.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * 0.28}px,${(e.clientY - (r.top + r.height / 2)) * 0.28}px)`;
  });
}

/* ============================================================
   TICKER — éditos imperiais
   ============================================================ */

function initTicker() {
  const app = document.getElementById('appShell');
  if (!app) return;
  const decrees = [
    'PROTEÇÃO DA CRIANÇA','SOBERANIA NACIONAL','APLICAÇÃO UNIFORME DO DIH',
    'SEM INTERVENÇÃO UNILATERAL','CORREDORES SOB O CSNU','NÃO-SELETIVIDADE',
    'PRESUNÇÃO DA INOCÊNCIA','AUTODETERMINAÇÃO','PAZ PELA SOBERANIA',
  ];
  const seg = decrees.map((d) => `<span><i>❦</i> <b>${d}</b></span>`).join('');
  const t = document.createElement('div');
  t.className = 'fx-ticker';
  t.setAttribute('aria-hidden', 'true');
  t.innerHTML = `<div class="fx-ticker-track">${seg}${seg}</div>`;
  const show = () => {
    if (!app.classList.contains('hidden') && !app.dataset.ticker) {
      app.insertBefore(t, app.firstChild);
      app.dataset.ticker = '1';
    }
  };
  if (!app.classList.contains('hidden')) show();
  else {
    const mo = new MutationObserver(() => {
      if (!app.classList.contains('hidden')) { show(); mo.disconnect(); }
    });
    mo.observe(app, { attributes: true, attributeFilter: ['class'] });
  }
}

/* ============================================================
   TICKER URGENTE — Comunicado contínuo (war room)
   ============================================================ */
function initUrgencyTicker() {
  const track = document.getElementById('tickerTrack');
  if (!track) return;
  const COMMS = [
    'Último selo quebrado: nenhuma moção para o Sudão foi protocolada nesta sessão.',
    'Informe OTAN-Mediterrâneo: TUR/EGY/GRC operam vigilância conjunta — soberania cipriota sob pressão.',
    'Vetado na AG: proposta russa de protocolo de proteção de cadeias energéticas. Resultado: 47 contra, 54 a favor, 36 abstenções.',
    'Seletividade humanitária detectada: manchete Gaza, silêncio Khartoum.',
    'AUKUS · QUAD · IPEF: blocos beligerantes em formação. O Indo-Pacífico não é quintal.',
    'Françafrique: coleção de hoje do que plantou ontem.',
    'Sahel-AES: Bamako, Niamey, Ouagadougou escolheram. Soberania não se pede licença.',
    'Opep+ declarou: cadeias energéticas exigem cooperação. Sanções unilaterais violam.',
    'LAWS: humanidade em zona opaca. Tratado vinculante é prioridade russa.',
    'Multipolaridade é fato. BRICS não é contra ninguém — é a favor de uma arquitetura de equidade.',
    'Memorando de Budapeste (1994): compromisso EUA/RU/UK de respeitar fronteiras da Ucrânia. Quem rompeu?',
    'Resolução 2728 íntegra: cessar-fogo, corredores auditáveis. A Rússia apoia.',
    'Lista da Vergonha: verificação, não acusação. Nenhum país sem contraditório.',
    'Fome no Iêmen: 21 milhões necessitam de assistência. Onde estão os corredores?',
  ];
  const now = new Date();
  const msk = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Moscow' });
  const items = COMMS.map((c) => `<span>${c}</span>`).join('');
  track.innerHTML = `<strong style="color:var(--crimson-bright); margin-right:1rem">[${msk} МСК]</strong>${items}`;
  if (window.lucide) lucide.createIcons();
}

/* ============================================================
   COUNTERS — numeração animada
   ============================================================ */

function initCounters() {
  /* Resolve counters dinâmicos via DATA */
  const totalConflicts = DATA.conflicts?.length ?? 0;
  const totalAttacks   = DATA.conflicts?.reduce((s, c) => s + (c.attacks?.length || 0), 0) ?? 0;
  const totalDefenses  = DATA.conflicts?.reduce((s, c) => s + (c.defenses?.length || 0), 0) ?? 0;
  const totalLines     = DATA.conflicts?.reduce(
    (s, c) => s + (c.defenses?.length || 0) + (c.attacks?.length || 0), 0) ?? 0;

  const dyn = {
    'dynamic-conflicts': totalConflicts,
    'dynamic-attacks':   totalAttacks,
    'dynamic-defenses':  totalDefenses,
    'dynamic-lines':     totalLines,
  };

  document.querySelectorAll('.counter[data-target]').forEach((el) => {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    const key = el.dataset.target;
    const target = key in dyn ? dyn[key] : (+key || 0);
    const dur = 1200;
    const start = performance.now();
    function step(now) {
      const t = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - t, 3);
      el.textContent = String(Math.round(target * e)).padStart(2, '0');
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = String(target).padStart(2, '0');
    }
    requestAnimationFrame(step);
  });
}

/* ============================================================
   RITUAL GLYPHS — desativados (removidos por solicitação)
   ============================================================ */

// (efeito desativado) sigilos eslavos que seguiam o mouse
function initRitualGlyphs() { /* no-op */ }

/* ============================================================
   VINHETA DE TRANSIÇÃO — entre seções
   ============================================================ */

function playSectionVignette() {
  let v = document.getElementById('sectionVignette');
  if (!v) {
    v = document.createElement('div');
    v.id = 'sectionVignette';
    v.className = 'section-vignette';
    document.body.appendChild(v);
  }
  v.classList.add('active');
  setTimeout(() => v.classList.remove('active'), 850);
  playSwordSound();
}

/* ============================================================
   AUDIO — Web Audio API: sino monástico, espada, cera
   ============================================================ */

let _ctx = null;
function audio() {
  if (!_ctx) {
    try { _ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {}
  }
  if (_ctx && _ctx.state === 'suspended') _ctx.resume().catch(() => {});
  return _ctx;
}

/* Sino monástico grave (Protocolo Ω) */
function playMonasticBell() {
  const ctx = audio(); if (!ctx) return;
  const now = ctx.currentTime;

  /* Camada 1 — sine grave (o corpo do sino) */
  const o1 = ctx.createOscillator();
  const g1 = ctx.createGain();
  o1.type = 'sine';
  o1.frequency.setValueAtTime(98, now); /* G2 */
  o1.frequency.exponentialRampToValueAtTime(82, now + 2.8);
  g1.gain.setValueAtTime(0.0001, now);
  g1.gain.exponentialRampToValueAtTime(0.45, now + 0.02);
  g1.gain.exponentialRampToValueAtTime(0.0001, now + 3.0);
  o1.connect(g1).connect(ctx.destination);
  o1.start(now); o1.stop(now + 3.0);

  /* Camada 2 — parcial harmônica (o brilho) */
  const o2 = ctx.createOscillator();
  const g2 = ctx.createGain();
  o2.type = 'triangle';
  o2.frequency.setValueAtTime(294, now); /* D4 */
  o2.frequency.exponentialRampToValueAtTime(246, now + 2.6);
  g2.gain.setValueAtTime(0.0001, now);
  g2.gain.exponentialRampToValueAtTime(0.18, now + 0.04);
  g2.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);
  o2.connect(g2).connect(ctx.destination);
  o2.start(now); o2.stop(now + 2.4);

  /* Camada 3 — ruído marcial (impacto do badalo) */
  const buf = ctx.createBuffer(1, ctx.sampleRate * 0.15, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 3);
  }
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const ng = ctx.createGain();
  ng.gain.setValueAtTime(0.25, now);
  ng.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
  const nf = ctx.createBiquadFilter();
  nf.type = 'lowpass';
  nf.frequency.value = 600;
  src.connect(nf).connect(ng).connect(ctx.destination);
  src.start(now); src.stop(now + 0.2);
}

/* Som de espada desembainhando — chime metálico agudo */
function playSwordSound() {
  const ctx = audio(); if (!ctx) return;
  const now = ctx.currentTime;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = 'triangle';
  o.frequency.setValueAtTime(1240, now);
  o.frequency.exponentialRampToValueAtTime(2480, now + 0.18);
  o.frequency.exponentialRampToValueAtTime(620, now + 0.45);
  g.gain.setValueAtTime(0.0001, now);
  g.gain.exponentialRampToValueAtTime(0.18, now + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
  o.connect(g).connect(ctx.destination);
  o.start(now); o.stop(now + 0.5);

  /* Brilho extra */
  const o2 = ctx.createOscillator();
  const g2 = ctx.createGain();
  o2.type = 'sine';
  o2.frequency.setValueAtTime(3720, now);
  g2.gain.setValueAtTime(0.0001, now);
  g2.gain.exponentialRampToValueAtTime(0.06, now + 0.005);
  g2.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
  o2.connect(g2).connect(ctx.destination);
  o2.start(now); o2.stop(now + 0.3);
}

/* Selo de cera quebrando — impacto grave + crack */
function playWaxBreak() {
  const ctx = audio(); if (!ctx) return;
  const now = ctx.currentTime;

  /* Impacto grave */
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = 'sine';
  o.frequency.setValueAtTime(180, now);
  o.frequency.exponentialRampToValueAtTime(60, now + 0.4);
  g.gain.setValueAtTime(0.0001, now);
  g.gain.exponentialRampToValueAtTime(0.5, now + 0.005);
  g.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
  o.connect(g).connect(ctx.destination);
  o.start(now); o.stop(now + 0.5);

  /* Crack — ruído curto filtrado */
  const buf = ctx.createBuffer(1, ctx.sampleRate * 0.08, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 4);
  }
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const f = ctx.createBiquadFilter();
  f.type = 'bandpass';
  f.frequency.value = 3500;
  f.Q.value = 4;
  const ng = ctx.createGain();
  ng.gain.setValueAtTime(0.35, now);
  ng.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
  src.connect(f).connect(ng).connect(ctx.destination);
  src.start(now); src.stop(now + 0.1);
}

/* Sino monástico grave — reserva ritualística */
function playBell() {
  const ctx = audio(); if (!ctx) return;
  const now = ctx.currentTime;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = 'sine';
  o.frequency.setValueAtTime(180, now);
  g.gain.setValueAtTime(0.0001, now);
  g.gain.exponentialRampToValueAtTime(0.4, now + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
  o.connect(g).connect(ctx.destination);
  o.start(now); o.stop(now + 1.2);
}