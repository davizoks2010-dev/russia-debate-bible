/* ============================================================
   app.js — Init master + efeitos (counter, relógio, ticker, FX)
   КРЕМЛЬ · v2.0
   ============================================================ */

import { initState } from './state.js';
import { bindAuth } from './auth.js';
import { bindNav, bindHotkeys } from './nav.js';
import { bindSword } from './sword.js';
import { initIntel } from './intel.js';
import { initArsenal } from './arsenal.js';
import { initShield } from './shield.js';
import { initGenerator } from './generator.js';
import { bindSpeech, refreshPin, renderSpeechList } from './speech.js';
import { bindRed } from './red.js';
import { initFiles } from './files.js';

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

  refreshPin();
  renderSpeechList();

  /* Inicializa ícones */
  if (window.lucide) lucide.createIcons();

  /* Efeitos globais */
  initClock();
  initFX();
});

/* ============================================================
   RELÓGIO DE MOSCOU
   ============================================================ */

function initClock() {
  const update = () => {
    const now = new Date();
    /* UTC+3 Moscou */
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
   FX — cursor + tilt + magnet + ticker + WebGL (preservado)
   ============================================================ */

function initFX() {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = matchMedia('(pointer: coarse)').matches;

  /* WebGL plasma */
  initWebGLPlasma(reduced);

  /* Cursor custom */
  if (!coarse) initCustomCursor();

  /* Tilt 3D nos cards */
  if (!coarse) initCardTilt();

  /* Magnético nos botões */
  if (!coarse) initMagneticButtons();

  /* Ticker de decretos */
  initTicker();

  /* Contadores animados */
  initCounters();
}

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
    '  float t=u_time*0.035;',
    '  vec2 m=(u_mouse/u_res)*2.0-1.0;',
    '  vec2 p=q*1.35+vec2(t,-t*0.7)+m*0.10;',
    '  float n=fbm(p);',
    '  float n2=fbm(q*2.1-vec2(-t*0.6,t*0.9));',
    '  float clouds=mix(n,n2,0.5);',
    '  vec3 base=vec3(0.030,0.030,0.040);',
    '  vec3 blue=vec3(0.0,0.22,0.65);',
    '  vec3 red=vec3(0.83,0.17,0.12);',
    '  vec3 white=vec3(0.92,0.92,0.96);',
    '  float y=uv.y+(clouds-0.5)*0.22;',
    '  vec3 band=mix(red, blue, smoothstep(0.30,0.62,y));',
    '  band=mix(band, white, smoothstep(0.66,1.0,y));',
    '  vec3 col=base + band*(0.10+0.30*clouds);',
    '  float vg=1.0-length(uv*2.0-1.0)*0.28;',
    '  col*=clamp(vg,0.0,1.0);',
    '  gl_FragColor=vec4(col,1.0);',
    '}'
  ].join('\n');

  function compile(type, src) { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; }
  const prog = gl.createProgram();
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, vs));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(prog);
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
  document.addEventListener('visibilitychange', () => { visible = !document.hidden; if (visible && reduced) render(0); });
  requestAnimationFrame(render);
  cv.classList.add('ready');
}

function initCustomCursor() {
  const ring = document.getElementById('fxCursor');
  const dot  = document.getElementById('fxCursorDot');
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
  const hov = 'a,button,.tac-card,.glass-tac,.nav-item,.bn-item,.chip,[onclick],input,select,.d-pin,.pin-item,label';
  document.addEventListener('mouseover', (e) => { if (e.target.closest && e.target.closest(hov)) ring.classList.add('active'); });
  document.addEventListener('mouseout', (e) => { if (e.target.closest && e.target.closest(hov)) ring.classList.remove('active'); });
}

function initCardTilt() {
  let cur = null;
  document.addEventListener('mousemove', (e) => {
    const card = e.target.closest && e.target.closest('.tac-card');
    if (card !== cur) { if (cur) cur.style.transform = ''; cur = card; }
    if (!card) return;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${px * 5}deg) rotateX(${-py * 5}deg) translateY(-3px)`;
  });
}

function initMagneticButtons() {
  let mag = null;
  document.addEventListener('mousemove', (e) => {
    const m = e.target.closest && e.target.closest('.btn-tac,.btn-red');
    if (m !== mag) { if (mag) mag.style.transform = ''; mag = m; }
    if (!m) return;
    const r = m.getBoundingClientRect();
    m.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * 0.28}px,${(e.clientY - (r.top + r.height / 2)) * 0.28}px)`;
  });
}

function initTicker() {
  const app = document.getElementById('appShell');
  if (!app) return;
  const decrees = [
    'PROTEÇÃO DA CRIANÇA','SOBERANIA NACIONAL','APLICAÇÃO UNIFORME DO DIH',
    'SEM INTERVENÇÃO UNILATERAL','CORREDORES SOB O CSNU','NÃO-SELETIVIDADE',
    'PRESUNÇÃO DA INOCÊNCIA','AUTODETERMINAÇÃO','PAZ PELA SOBERANIA',
  ];
  const seg = decrees.map((d) => `<span><i>◆</i> <b>${d}</b></span>`).join('');
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

function initCounters() {
  document.querySelectorAll('.counter[data-target]').forEach((el) => {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    const target = +el.dataset.target;
    let cur = 0;
    const dur = 1100;
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