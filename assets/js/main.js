/* =========================================================
   Web Dev — สคริปต์หลักของสื่อการเรียนรู้
   - ไอคอน (SVG sprite), ธีม auto/light/dark
   - พื้นหลังโค้ดลอย, ตัวพิมพ์ในส่วนหัว
   - เครื่องเล่นแอนิเมชันทีละขั้น (.anim)
   - แท็บ, การ์ดพลิก, แบบทดสอบ, ใบงาน, ความก้าวหน้า
   - ตัวแยก URL, ตัวแก้ไขโค้ดสด
   ========================================================= */
(() => {
  'use strict';
  const root = document.documentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* ignore */ } }
  };

  /* ---------- Icons ---------- */
  const ICONS = {
    monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
    laptop: '<rect x="4" y="4" width="16" height="11" rx="1.5"/><path d="M2 19h20"/>',
    phone: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
    server: '<rect x="3" y="3" width="18" height="7" rx="1.5"/><rect x="3" y="14" width="18" height="7" rx="1.5"/><path d="M7 6.5h.01M7 17.5h.01M11 6.5h6M11 17.5h6"/>',
    database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20a15 15 0 0 1 0-20"/>',
    cloud: '<path d="M17.5 19H8a6 6 0 1 1 5.7-7.9A4.5 4.5 0 1 1 17.5 19z"/>',
    router: '<rect x="2" y="14" width="20" height="7" rx="2"/><path d="M6 17.5h.01M10 17.5h.01M15 14V9"/><path d="M12 6.5a4 4 0 0 1 6 0M9.5 4a7.5 7.5 0 0 1 11 0"/>',
    switch: '<rect x="2" y="8" width="20" height="8" rx="2"/><path d="M6 12h.01M9 12h.01M12 12h.01M15 12h.01M18 12h.01"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>',
    lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    unlock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 7.8-1"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>',
    code: '<path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2 20a7 7 0 0 1 14 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 13.5a7 7 0 0 1 4 6.5"/>',
    spy: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/><path d="M7 8h10"/><path d="M5 5.5h14"/>',
    palette: '<path d="M12 2a10 10 0 1 0 0 20c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.3 0-1.1.9-2 2-2h2.4A4.6 4.6 0 0 0 22 10.8C22 5.9 17.5 2 12 2z"/><circle cx="7.5" cy="11" r="1.2"/><circle cx="10.5" cy="7" r="1.2"/><circle cx="15" cy="7.5" r="1.2"/>',
    cog: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
    check: '<path d="M20 6L9 17l-5-5"/>',
    x: '<path d="M18 6L6 18M6 6l12 12"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    'arrow-l': '<path d="M19 12H5M11 18l-6-6 6-6"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
    auto: '<circle cx="12" cy="12" r="9"/><path d="M12 3v18" /><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" stroke="none"/>',
    box: '<path d="M21 8l-9-5-9 5v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    layers: '<path d="M12 2L2 7l10 5 10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>',
    sitemap: '<rect x="9" y="2" width="6" height="5" rx="1"/><rect x="2" y="17" width="6" height="5" rx="1"/><rect x="16" y="17" width="6" height="5" rx="1"/><path d="M12 7v5M5 17v-5h14v5"/>',
    rocket: '<path d="M5 15c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9a2.2 2.2 0 0 0-2.9-.1z"/><path d="M12 15l-3-3a22 22 0 0 1 2-4A12.9 12.9 0 0 1 22 2c0 2.7-.8 7.5-6 11a22 22 0 0 1-4 2z"/><path d="M9 12H4s.5-3 2-4c1.6-1.1 5 0 5 0M12 15v5s3-.5 4-2c1.1-1.6 0-5 0-5"/>',
    wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',
    bug: '<rect x="8" y="6" width="8" height="14" rx="4"/><path d="M12 20v-9M3 13h5M16 13h5M4 7l4 2M20 7l-4 2M4 19l4-2M20 19l-4-2M9 3l1.5 3M15 3l-1.5 3"/>',
    pencil: '<path d="M17 3a2.8 2.8 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5z"/>',
    play: '<path d="M7 4.5l12 7.5-12 7.5z" fill="currentColor"/>',
    pause: '<path d="M7 5h3v14H7zM14 5h3v14h-3z" fill="currentColor" stroke="none"/>',
    prev: '<path d="M15 18l-6-6 6-6"/>',
    next: '<path d="M9 18l6-6-6-6"/>',
    restart: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 6L2 7"/>',
    video: '<rect x="2" y="6" width="14" height="12" rx="2"/><path d="M16 10l6-4v12l-6-4"/>',
    game: '<rect x="2" y="6" width="20" height="12" rx="4"/><path d="M6 12h4M8 10v4M15 11h.01M18 13h.01"/>',
    chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    building: '<rect x="4" y="2" width="16" height="20" rx="1"/><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/>',
    home: '<path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
    cart: '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.7 12.4a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L22 7H6"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
    bulb: '<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V16h8v-1.3A7 7 0 0 0 12 2z"/>',
    alert: '<path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    flag: '<path d="M4 22V4M4 4h13l-2 4 2 4H4"/>',
    terminal: '<rect x="2" y="3" width="20" height="18" rx="2"/><path d="M7 9l3 3-3 3M13 15h4"/>',
    heart: '<path d="M12 21s-8-4.5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6.5-8 11-8 11z"/>',
    coffee: '<path d="M17 8h1a4 4 0 0 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z"/><path d="M6 2v3M10 2v3M14 2v3"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
    folder: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
    layout: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
    clipboard: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 13l2 2 4-4"/>',
    help: '<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
    zap: '<path d="M13 2L3 14h9l-1 8 10-12h-9z"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    star: '<path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
    printer: '<path d="M6 9V2h12v7"/><rect x="2" y="9" width="20" height="9" rx="2"/><rect x="6" y="14" width="12" height="8"/>',
    map: '<path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4z"/><path d="M8 2v16M16 6v16"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>',
    cap: '<path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
    tree: '<circle cx="12" cy="4" r="2"/><circle cx="5" cy="20" r="2"/><circle cx="12" cy="20" r="2"/><circle cx="19" cy="20" r="2"/><path d="M12 6v12M12 10H5v8M12 10h7v8"/>',
    hand: '<path d="M18 11V6a2 2 0 0 0-4 0v5M14 10V4a2 2 0 0 0-4 0v6M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.9-6-2.4L2.4 16a2 2 0 0 1 2.8-2.8L7 15"/>'
  };
  const sprite = Object.entries(ICONS).map(([k, v]) => `<symbol id="i-${k}" viewBox="0 0 24 24">${v}</symbol>`).join('');
  document.body.insertAdjacentHTML('afterbegin', `<svg width="0" height="0" style="position:absolute" aria-hidden="true">${sprite}</svg>`);
  const icon = (n, cls = '') => `<svg class="ic ${cls}" aria-hidden="true"><use href="#i-${n}"/></svg>`;
  // <i data-i="name"></i> → inline icon
  document.querySelectorAll('i[data-i]').forEach(el => { el.outerHTML = icon(el.dataset.i, el.className); });

  /* ---------- Top bar actions: background-code toggle + light/dark toggle ---------- */
  const themeBtn = document.querySelector('.theme-btn');
  let actions = null;
  if (themeBtn) {
    actions = document.createElement('div');
    actions.className = 'top-actions';
    themeBtn.parentNode.insertBefore(actions, themeBtn);
    actions.appendChild(themeBtn);
  }

  /* Theme: two states (light ↔ dark). Until the viewer chooses, follow the system setting. */
  const sysDark = window.matchMedia('(prefers-color-scheme: dark)');
  let chosen = store.get('wd-theme', null);
  if (chosen !== 'light' && chosen !== 'dark') chosen = null;
  const current = () => chosen || (sysDark.matches ? 'dark' : 'light');
  function applyTheme() {
    const t = current();
    root.setAttribute('data-theme', t);
    if (!themeBtn) return;
    themeBtn.innerHTML = t === 'dark' ? `${icon('moon')}<span class="lbl">โหมดมืด</span>` : `${icon('sun')}<span class="lbl">โหมดสว่าง</span>`;
    themeBtn.setAttribute('aria-label', t === 'dark' ? 'ตอนนี้โหมดมืด — กดเพื่อเปลี่ยนเป็นโหมดสว่าง' : 'ตอนนี้โหมดสว่าง — กดเพื่อเปลี่ยนเป็นโหมดมืด');
    themeBtn.title = themeBtn.getAttribute('aria-label');
  }
  applyTheme();
  themeBtn && themeBtn.addEventListener('click', () => {
    chosen = current() === 'dark' ? 'light' : 'dark';
    store.set('wd-theme', chosen);
    applyTheme();
  });
  sysDark.addEventListener && sysDark.addEventListener('change', () => { if (!chosen) applyTheme(); });

  /* ---------- Floating code background (can be paused) ---------- */
  const SNIPS = [
    '<!DOCTYPE html>', 'GET /index.html HTTP/1.1', 'HTTP/1.1 200 OK', 'nslookup www.example.ac.th',
    'ping 8.8.8.8', '<meta charset="UTF-8">', 'body { margin: 0; }', 'fetch("/api/news")',
    '01001000 01010100 01001101 01001100', '<a href="about.html">', 'Host: www.example.ac.th',
    'Content-Type: text/html', 'git push origin main', '<h1>Hello Web</h1>', 'display: flex;',
    'https://', '192.168.1.10', 'DNS → 203.0.113.10', 'console.log("สวัสดี")', '<link rel="stylesheet">',
    'SYN → SYN-ACK → ACK', 'cd htdocs/', 'TLS 1.3 handshake ✓', '404 Not Found', 'localhost:8080'
  ];
  const COLORS = ['#f97316', '#ec4899', '#a855f7', '#0d9488'];
  const bgLayer = document.querySelector('.bg');
  const bgFloat = document.querySelector('.bg .floaters');
  let bgPaused = store.get('wd-bg-paused', reduced);
  const wait = (fn, ms) => setTimeout(() => (bgPaused ? wait(fn, 300) : fn()), ms);
  if (bgFloat && actions) {
    const bgBtn = document.createElement('button');
    bgBtn.type = 'button';
    bgBtn.className = 'theme-btn bg-btn';
    const paintBg = () => {
      bgLayer && bgLayer.classList.toggle('paused', bgPaused);
      bgBtn.innerHTML = bgPaused ? `${icon('play')}<span class="lbl">เล่นโค้ดพื้นหลัง</span>` : `${icon('pause')}<span class="lbl">หยุดโค้ดพื้นหลัง</span>`;
      bgBtn.setAttribute('aria-pressed', String(bgPaused));
      bgBtn.setAttribute('aria-label', bgPaused ? 'เล่นโค้ดที่วิ่งบนพื้นหลัง' : 'หยุดโค้ดที่วิ่งบนพื้นหลัง');
      bgBtn.title = bgBtn.getAttribute('aria-label');
    };
    bgBtn.addEventListener('click', () => { bgPaused = !bgPaused; store.set('wd-bg-paused', bgPaused); paintBg(); });
    actions.insertBefore(bgBtn, themeBtn);
    paintBg();
  }
  if (bgFloat) {
    const count = window.innerWidth < 700 ? 7 : 15;
    const rnd = (a, b) => a + Math.random() * (b - a);
    const place = el => {
      el.style.left = rnd(1, 82) + 'vw';
      el.style.top = rnd(3, 95) + 'vh';
      el.style.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    };
    for (let k = 0; k < count; k++) {
      const el = document.createElement('div');
      el.className = 'floater';
      bgFloat.appendChild(el);
      place(el);
      el.textContent = SNIPS[Math.floor(Math.random() * SNIPS.length)];
      const cycle = () => {
        const text = SNIPS[Math.floor(Math.random() * SNIPS.length)];
        el.classList.remove('fade'); el.textContent = ''; place(el);
        let c = 0;
        const t = setInterval(() => {
          if (bgPaused) return;               // freeze while paused
          el.textContent = text.slice(0, ++c);
          if (c >= text.length) {
            clearInterval(t);
            wait(() => { el.classList.add('fade'); wait(cycle, 1100); }, rnd(2500, 6000));
          }
        }, rnd(45, 95));
      };
      wait(cycle, rnd(0, 4000));
    }
  }

  /* ---------- Typer ---------- */
  document.querySelectorAll('[data-typer]').forEach(el => {
    const words = el.dataset.typer.split('|');
    if (reduced) { el.textContent = words[0]; return; }
    let w = 0, c = 0, del = false;
    const tick = () => {
      const word = words[w];
      c += del ? -1 : 1;
      el.textContent = word.slice(0, c);
      let wait = del ? 35 : 75;
      if (!del && c === word.length) { del = true; wait = 1800; }
      else if (del && c === 0) { del = false; w = (w + 1) % words.length; wait = 400; }
      setTimeout(tick, wait);
    };
    tick();
  });

  /* ---------- Step animation engine ---------- */
  const parseSet = s => {
    const out = new Set();
    String(s).split(',').forEach(part => {
      part = part.trim(); if (!part) return;
      if (part.includes('-')) { const [a, b] = part.split('-').map(Number); for (let x = a; x <= b; x++) out.add(x); }
      else out.add(Number(part));
    });
    return out;
  };

  document.querySelectorAll('.anim').forEach(fig => {
    const stage = fig.querySelector('.stage');
    const caps = [...fig.querySelectorAll('.anim-steps > li')];
    const n = caps.length;
    if (!stage || !n) return;
    const speedBase = Number(fig.dataset.ms || 3600);
    let speed = 1;
    const items = [...stage.querySelectorAll('[data-in],[data-only],[data-hl]')].map(el => ({
      el,
      inAt: el.dataset.in ? Number(el.dataset.in) : null,
      only: el.dataset.only ? parseSet(el.dataset.only) : null,
      hl: el.dataset.hl ? parseSet(el.dataset.hl) : null
    }));

    const ctrl = document.createElement('div');
    ctrl.className = 'anim-ctrl';
    ctrl.innerHTML = `
      <button type="button" class="b-restart" aria-label="เริ่มใหม่">${icon('restart')}</button>
      <button type="button" class="b-prev" aria-label="ขั้นก่อนหน้า">${icon('prev')}</button>
      <button type="button" class="play" aria-label="เล่น">${icon('play')}</button>
      <button type="button" class="b-next" aria-label="ขั้นถัดไป">${icon('next')}</button>
      <div class="bar"><span></span></div>
      <button type="button" class="speed" aria-label="ความเร็ว">1x</button>
      <span class="count">0 / ${n}</span>`;
    stage.after(ctrl);
    const $ = s => ctrl.querySelector(s);
    const bPlay = $('.play'), bPrev = $('.b-prev'), bNext = $('.b-next'), bar = $('.bar span'), count = $('.count');

    let i = 0, timer = null, playing = false;
    function render() {
      stage.dataset.step = i;
      items.forEach(it => {
        let on = true;
        if (it.inAt !== null) on = i >= it.inAt;
        if (it.only) on = on && it.only.has(i);
        if (it.inAt !== null || it.only) {
          if (it.el.classList.contains('on') && on && it.el.classList.contains('flyer')) {
            // keep animation running
          }
          it.el.classList.toggle('on', on);
        }
        if (it.hl) it.el.classList.toggle('hl', it.hl.has(i));
      });
      caps.forEach((c, k) => {
        c.classList.toggle('active', k === i - 1);
        c.classList.toggle('done', k < i - 1);
      });
      bar.style.width = (i / n * 100) + '%';
      count.textContent = `${i} / ${n}`;
      bPrev.disabled = i <= 0;
      bNext.disabled = i >= n;
      fig.dispatchEvent(new CustomEvent('stepchange', { detail: { step: i } }));
    }
    function setPlayIcon() {
      bPlay.innerHTML = icon(playing ? 'pause' : (i >= n ? 'restart' : 'play'));
      bPlay.setAttribute('aria-label', playing ? 'หยุด' : 'เล่น');
    }
    function schedule() {
      clearTimeout(timer);
      if (!playing) return;
      const cur = caps[i - 1];
      const wait = i === 0 ? 350 : Number((cur && cur.dataset.ms) || speedBase) / speed;
      timer = setTimeout(() => {
        if (i >= n) { stop(); return; }
        i++; render(); schedule(); setPlayIcon();
      }, wait);
    }
    function play() { if (i >= n) { i = 0; render(); } playing = true; setPlayIcon(); schedule(); }
    function stop() { playing = false; clearTimeout(timer); setPlayIcon(); }
    function go(k) { i = Math.max(0, Math.min(n, k)); render(); if (playing) schedule(); setPlayIcon(); }

    bPlay.addEventListener('click', () => (playing ? stop() : play()));
    bNext.addEventListener('click', () => { stop(); go(i + 1); });
    bPrev.addEventListener('click', () => { stop(); go(i - 1); });
    $('.b-restart').addEventListener('click', () => { go(0); play(); });
    $('.speed').addEventListener('click', e => {
      speed = speed === 1 ? 1.5 : speed === 1.5 ? 0.6 : 1;
      e.currentTarget.textContent = (speed === 0.6 ? '0.5' : speed) + 'x';
    });
    caps.forEach((c, k) => {
      c.tabIndex = 0;
      c.addEventListener('click', () => { stop(); go(k + 1); });
      c.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); stop(); go(k + 1); } });
    });
    fig.anim = { go, play, stop, get step() { return i; } };
    render(); setPlayIcon();

    if (fig.dataset.start) { go(Number(fig.dataset.start)); }
    if (!reduced && fig.dataset.autoplay !== 'false') {
      const io = new IntersectionObserver(es => {
        es.forEach(e => {
          if (e.isIntersecting && e.intersectionRatio > .45) { if (i === 0) play(); io.disconnect(); }
        });
      }, { threshold: [0, .45, .8] });
      io.observe(stage);
    } else if (i === 0) { go(1); }
  });

  /* ---------- Tabs ---------- */
  document.querySelectorAll('.tabs').forEach(t => {
    const btns = [...t.querySelectorAll('[role="tab"]')];
    const panels = [...t.querySelectorAll('.tab-panel')];
    const show = id => {
      btns.forEach(b => b.setAttribute('aria-selected', String(b.dataset.tab === id)));
      panels.forEach(p => p.classList.toggle('active', p.dataset.panel === id));
    };
    btns.forEach(b => b.addEventListener('click', () => show(b.dataset.tab)));
    if (btns[0]) show(btns[0].dataset.tab);
  });

  /* ---------- Flip cards ---------- */
  document.querySelectorAll('.flip').forEach(f => f.addEventListener('click', () => f.classList.toggle('flipped')));

  /* ---------- Quiz ---------- */
  document.querySelectorAll('.quiz').forEach(qz => {
    const qs = [...qz.querySelectorAll('.q')];
    const scoreEl = qz.querySelector('.quiz-score');
    const key = qz.dataset.quiz ? 'wd-quiz-' + qz.dataset.quiz : null;
    const update = () => {
      const done = qs.filter(q => q.classList.contains('answered')).length;
      const right = qs.filter(q => q.classList.contains('is-right')).length;
      if (!scoreEl) return;
      if (done < qs.length) { scoreEl.textContent = `ตอบแล้ว ${done}/${qs.length} ข้อ · ถูก ${right} ข้อ`; return; }
      const pct = Math.round(right / qs.length * 100);
      const msg = pct >= 80 ? 'ยอดเยี่ยม! เข้าใจดีมาก 🎉' : pct >= 60 ? 'ผ่าน! ลองทบทวนข้อที่ผิดอีกนิด 👍' : 'ลองย้อนกลับไปดูแอนิเมชันอีกครั้ง แล้วทำใหม่นะ 💪';
      scoreEl.textContent = `คะแนน ${right}/${qs.length} (${pct}%) — ${msg}`;
      if (key) { const best = store.get(key, 0); if (right > best) store.set(key, right); }
    };
    qs.forEach((q, qi) => {
      const ans = Number(q.dataset.a);
      const opts = [...q.querySelectorAll('.opts button')];
      opts.forEach((b, k) => {
        b.type = 'button';
        b.addEventListener('click', () => {
          if (q.classList.contains('answered')) return;
          q.classList.add('answered');
          q.classList.toggle('is-right', k === ans);
          opts.forEach(o => { o.disabled = true; });
          opts[ans].classList.add('right');
          if (k !== ans) b.classList.add('wrong');
          update();
        });
      });
      const t = q.querySelector('.q-t');
      if (t && !t.dataset.n) { t.dataset.n = 1; t.textContent = `${qi + 1}. ` + t.textContent; }
    });
    const reset = qz.querySelector('.quiz-reset');
    reset && reset.addEventListener('click', () => {
      qs.forEach(q => {
        q.classList.remove('answered', 'is-right');
        q.querySelectorAll('.opts button').forEach(o => { o.disabled = false; o.classList.remove('right', 'wrong'); });
      });
      update();
      qz.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    });
    update();
  });

  /* ---------- Worksheet checklist (saved per viewer) ---------- */
  document.querySelectorAll('.checklist[data-key]').forEach(list => {
    const key = 'wd-ws-' + list.dataset.key;
    const boxes = [...list.querySelectorAll('input[type="checkbox"]')];
    const saved = store.get(key, []);
    const prog = list.parentElement.querySelector('.ws-progress');
    const upd = () => {
      const c = boxes.filter(b => b.checked).length;
      if (prog) prog.textContent = `ทำแล้ว ${c}/${boxes.length} ขั้น`;
      store.set(key, boxes.map(b => b.checked));
    };
    boxes.forEach((b, k) => { b.checked = !!saved[k]; b.addEventListener('change', upd); });
    upd();
  });

  /* ---------- Lesson progress ---------- */
  const DONE_KEY = 'wd-done';
  const done = new Set(store.get(DONE_KEY, []));
  document.querySelectorAll('.mark-done').forEach(btn => {
    const id = btn.dataset.lesson;
    const paint = () => {
      const d = done.has(id);
      btn.classList.toggle('is-done', d);
      btn.innerHTML = d ? `${icon('check')} เรียนจบแล้ว` : `${icon('flag')} ทำเครื่องหมายว่าเรียนจบ`;
    };
    btn.addEventListener('click', () => {
      done.has(id) ? done.delete(id) : done.add(id);
      store.set(DONE_KEY, [...done]);
      document.querySelectorAll(`.mark-done[data-lesson="${id}"]`).forEach(b => b.dispatchEvent(new Event('repaint')));
      paint(); paintProgress();
    });
    btn.addEventListener('repaint', paint);
    paint();
  });
  function paintProgress() {
    document.querySelectorAll('[data-done-id]').forEach(c => c.classList.toggle('is-done', done.has(c.dataset.doneId)));
    document.querySelectorAll('[data-progress]').forEach(p => {
      const ids = p.dataset.progress.split(',');
      const c = ids.filter(x => done.has(x)).length;
      const bar = p.querySelector('.progress span');
      const txt = p.querySelector('.progress-txt');
      if (bar) bar.style.width = (c / ids.length * 100) + '%';
      if (txt) txt.textContent = `${c}/${ids.length} ครั้ง`;
    });
  }
  paintProgress();

  /* ---------- TOC active ---------- */
  const tocLinks = [...document.querySelectorAll('.toc a[href^="#"]')];
  if (tocLinks.length) {
    const map = new Map(tocLinks.map(a => [a.getAttribute('href').slice(1), a]));
    const io = new IntersectionObserver(es => {
      es.forEach(e => {
        if (e.isIntersecting) {
          tocLinks.forEach(a => a.classList.remove('active'));
          const a = map.get(e.target.id);
          if (a) { a.classList.add('active'); if (window.innerWidth <= 960) a.scrollIntoView({ block: 'nearest', inline: 'center' }); }
        }
      });
    }, { rootMargin: '-35% 0px -60% 0px' });
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
  }

  /* ---------- Reveal ---------- */
  const rv = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
    rv.forEach(el => io.observe(el));
  } else rv.forEach(el => el.classList.add('in'));

  /* ---------- URL anatomy: highlight parts per step ---------- */
  document.querySelectorAll('.url-big[data-sync]').forEach(u => {
    const fig = u.closest('.anim');
    const parts = [...u.querySelectorAll('span[data-part]')];
    const paint = step => {
      u.classList.toggle('url-dim', step > 0 && step <= parts.length);
      parts.forEach(p => p.classList.toggle('hl', parseSet(p.dataset.part).has(step)));
    };
    fig.addEventListener('stepchange', e => paint(e.detail.step));
    paint(0);
  });

  /* ---------- URL playground ---------- */
  const SLD = ['ac', 'co', 'go', 'or', 'in', 'mi', 'net', 'com', 'org', 'edu', 'gov'];
  document.querySelectorAll('.url-play').forEach(box => {
    const inp = box.querySelector('input');
    const out = box.querySelector('.url-out');
    const row = (label, val, hint) => `<div><small>${label}</small><code>${val || '—'}</code>${hint ? `<small style="margin-top:4px;font-weight:400">${hint}</small>` : ''}</div>`;
    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const parse = () => {
      let v = inp.value.trim();
      if (!v) { out.innerHTML = ''; return; }
      if (!/^[a-z]+:\/\//i.test(v)) v = 'https://' + v;
      let u;
      try { u = new URL(v); } catch (e) { out.innerHTML = row('ผลลัพธ์', 'URL ไม่ถูกต้อง ลองใหม่อีกครั้ง'); return; }
      const labels = u.hostname.split('.');
      let tldN = 1;
      if (labels.length >= 3 && SLD.includes(labels[labels.length - 2]) && labels[labels.length - 1].length === 2) tldN = 2;
      const tld = labels.slice(-tldN).join('.');
      const domain = labels.slice(-(tldN + 1), -tldN).join('.');
      const sub = labels.slice(0, -(tldN + 1)).join('.');
      const defPort = u.protocol === 'https:' ? '443 (ค่าเริ่มต้น)' : u.protocol === 'http:' ? '80 (ค่าเริ่มต้น)' : '';
      const params = [...u.searchParams].map(([k, val]) => `${esc(k)} = ${esc(val)}`).join('<br>');
      out.innerHTML =
        row('โปรโตคอล (Protocol)', esc(u.protocol.replace(':', '')), u.protocol === 'https:' ? 'เข้ารหัสปลอดภัย 🔒' : u.protocol === 'http:' ? 'ไม่เข้ารหัส ⚠️' : '') +
        row('ซับโดเมน (Subdomain)', esc(sub)) +
        row('ชื่อโดเมน (Domain name)', esc(domain)) +
        row('โดเมนระดับบนสุด (TLD)', '.' + esc(tld)) +
        row('พอร์ต (Port)', esc(u.port || defPort)) +
        row('พาธ (Path)', esc(decodeURIComponent(u.pathname))) +
        row('คิวรีสตริง (Query)', params || '') +
        row('แฟรกเมนต์ (Fragment)', esc(decodeURIComponent(u.hash)));
    };
    inp.addEventListener('input', parse);
    box.querySelectorAll('[data-try]').forEach(b => b.addEventListener('click', () => { inp.value = b.dataset.try; parse(); }));
    parse();
  });

  /* ---------- HTML/CSS/JS demo button ---------- */
  document.querySelectorAll('[data-like]').forEach(btn => {
    let n = 0;
    const fig = btn.closest('.anim');
    const out = fig.querySelector('[data-like-out]');
    btn.addEventListener('click', () => {
      const step = fig.anim ? fig.anim.step : 0;
      if (step >= 3) { n++; out.textContent = `❤ ${n} คนถูกใจ`; btn.classList.add('bump'); setTimeout(() => btn.classList.remove('bump'), 250); }
      else out.textContent = 'ยังไม่มี JavaScript — กดแล้วไม่มีอะไรเกิดขึ้น';
    });
    fig.addEventListener('stepchange', e => { if (e.detail.step < 3) { n = 0; out.textContent = ''; } });
  });

  /* ---------- Live editor ---------- */
  document.querySelectorAll('.live').forEach(live => {
    const ta = live.querySelector('textarea');
    const frame = live.querySelector('iframe');
    const addr = live.querySelector('.addr');
    const initial = ta.value;
    let t;
    const run = () => {
      frame.srcdoc = ta.value;
      const m = ta.value.match(/<title>([\s\S]*?)<\/title>/i);
      if (addr) addr.textContent = 'index.html — ' + (m ? m[1].trim() : '(ไม่มี title)');
    };
    ta.addEventListener('input', () => { clearTimeout(t); t = setTimeout(run, 300); });
    ta.addEventListener('keydown', e => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const s = ta.selectionStart, en = ta.selectionEnd;
        ta.value = ta.value.slice(0, s) + '  ' + ta.value.slice(en);
        ta.selectionStart = ta.selectionEnd = s + 2;
        clearTimeout(t); t = setTimeout(run, 300);
      }
    });
    const tools = live.parentElement.querySelector('.live-tools');
    if (tools) {
      tools.querySelector('[data-act="reset"]')?.addEventListener('click', () => { ta.value = initial; run(); });
      tools.querySelector('[data-act="download"]')?.addEventListener('click', () => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([ta.value], { type: 'text/html;charset=utf-8' }));
        a.download = 'index.html';
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      });
      tools.querySelectorAll('[data-insert]').forEach(b => b.addEventListener('click', () => {
        const snip = b.dataset.insert.replace(/\\n/g, '\n');
        const pos = ta.value.lastIndexOf('</body>');
        const at = pos === -1 ? ta.value.length : pos;
        ta.value = ta.value.slice(0, at) + snip + '\n' + ta.value.slice(at);
        run();
      }));
    }
    run();
  });

  /* ---------- Planner form (saved per viewer) ---------- */
  document.querySelectorAll('.planner[data-plan]').forEach(pl => {
    const key = 'wd-plan-' + pl.dataset.plan;
    const data = store.get(key, {});
    const fields = [...pl.querySelectorAll('[data-field]')];
    fields.forEach(f => {
      if (data[f.dataset.field]) f.value = data[f.dataset.field];
      f.addEventListener('input', () => { data[f.dataset.field] = f.value; store.set(key, data); });
    });
    const clr = pl.querySelector('[data-plan-clear]');
    clr && clr.addEventListener('click', () => {
      if (!window.confirm('ล้างข้อมูลในแบบฟอร์มทั้งหมด?')) return;
      fields.forEach(f => { f.value = ''; });
      Object.keys(data).forEach(k => delete data[k]);
      store.set(key, data);
    });
  });

  /* ---------- Personal variables (domain / server IP / user) ---------- */
  const VARS_KEY = 'wd-vars';
  const vars = store.get(VARS_KEY, {});
  const varEls = [...document.querySelectorAll('[data-v]')];
  varEls.forEach(el => { if (!el.dataset.def) el.dataset.def = el.textContent; });
  const paintVars = () => varEls.forEach(el => { el.textContent = vars[el.dataset.v] || el.dataset.def; });
  document.querySelectorAll('input[data-var]').forEach(inp => {
    if (vars[inp.dataset.var]) inp.value = vars[inp.dataset.var];
    inp.addEventListener('input', () => {
      const v = inp.value.trim().replace(/[<>"'`\s]/g, '');
      if (v) vars[inp.dataset.var] = v; else delete vars[inp.dataset.var];
      store.set(VARS_KEY, vars); paintVars();
    });
  });
  paintVars();

  /* ---------- Copy buttons on code blocks ---------- */
  document.querySelectorAll('pre.code').forEach(pre => {
    const wrap = document.createElement('div');
    wrap.className = 'code-wrap';
    pre.parentNode.insertBefore(wrap, pre);
    wrap.appendChild(pre);
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'copy-btn'; b.textContent = 'copy';
    b.setAttribute('aria-label', 'คัดลอกโค้ด');
    b.addEventListener('click', () => {
      const text = pre.innerText.replace(/ /g, ' ');
      const done = () => { b.textContent = 'copied ✓'; setTimeout(() => { b.textContent = 'copy'; }, 1400); };
      const fallback = () => {
        const ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); done(); } catch (e) { b.textContent = 'กด Ctrl+C'; }
        ta.remove();
      };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, fallback); else fallback();
    });
    wrap.appendChild(b);
  });

  /* ---------- Contrast checker (WCAG) ---------- */
  const lum = hex => {
    const c = hex.replace('#', '').match(/\w\w/g).map(x => parseInt(x, 16) / 255)
      .map(v => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  };
  document.querySelectorAll('.contrast').forEach(box => {
    const fg = box.querySelector('[data-c="fg"]'), bg = box.querySelector('[data-c="bg"]');
    const prev = box.querySelector('.c-prev'), out = box.querySelector('.c-res');
    const run = () => {
      const a = lum(fg.value), b = lum(bg.value);
      const r = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
      prev.style.color = fg.value; prev.style.background = bg.value;
      const tag = (ok, t) => `<span class="chip ${ok ? 'c-teal' : 'c-pink'}">${ok ? '✓' : '✗'} ${t}</span>`;
      out.innerHTML = `<b class="c-ratio">${r.toFixed(2)} : 1</b> ${tag(r >= 4.5, 'AA ข้อความปกติ (≥4.5)')} ${tag(r >= 3, 'AA ตัวใหญ่ (≥3)')} ${tag(r >= 7, 'AAA (≥7)')}`;
    };
    fg.addEventListener('input', run); bg.addEventListener('input', run);
    box.querySelectorAll('[data-fg]').forEach(p => p.addEventListener('click', () => { fg.value = p.dataset.fg; bg.value = p.dataset.bg; run(); }));
    run();
  });

  /* ---------- CSS specificity calculator ---------- */
  const specificity = sel => {
    let s = sel.replace(/"[^"]*"|'[^']*'/g, '').replace(/:(not|is|has|where)\(/g, '(');
    const a = (s.match(/#[\w-]+/g) || []).length;
    const b = (s.match(/\.[\w-]+/g) || []).length + (s.match(/\[[^\]]*\]/g) || []).length + (s.match(/(^|[^:]):(?!:)[\w-]+/g) || []).length;
    const pe = (s.match(/::[\w-]+/g) || []).length;
    s = s.replace(/#[\w-]+|\.[\w-]+|\[[^\]]*\]|::?[\w-]+/g, ' ');
    const c = (s.match(/(^|[\s>+~(,])[a-zA-Z][\w-]*/g) || []).length + pe;
    return [a, b, c];
  };
  document.querySelectorAll('.speclab').forEach(lab => {
    const ins = [...lab.querySelectorAll('input')];
    const outs = [...lab.querySelectorAll('.spec-out')];
    const verdict = lab.querySelector('.spec-verdict');
    const run = () => {
      const sc = ins.map(i => specificity(i.value.trim()));
      sc.forEach((v, k) => { outs[k].innerHTML = `<span>ID <b>${v[0]}</b></span><span>Class <b>${v[1]}</b></span><span>Tag <b>${v[2]}</b></span><code>(${v.join(', ')})</code>`; });
      if (verdict && sc.length === 2) {
        const cmp = sc[0][0] - sc[1][0] || sc[0][1] - sc[1][1] || sc[0][2] - sc[1][2];
        verdict.textContent = cmp > 0 ? '🏆 Selector A ชนะ — สีของ A ถูกใช้' : cmp < 0 ? '🏆 Selector B ชนะ — สีของ B ถูกใช้' : '🤝 เท่ากัน — ตัวที่เขียนทีหลังในไฟล์ชนะ';
        lab.dataset.win = cmp > 0 ? 'a' : cmp < 0 ? 'b' : 'tie';
      }
    };
    ins.forEach(i => i.addEventListener('input', run));
    lab.querySelectorAll('[data-a]').forEach(p => p.addEventListener('click', () => { ins[0].value = p.dataset.a; ins[1].value = p.dataset.b; run(); }));
    run();
  });

  /* ---------- Flexbox playground ---------- */
  document.querySelectorAll('.flexlab').forEach(lab => {
    const demo = lab.querySelector('.flex-demo'), code = lab.querySelector('.flex-code');
    const state = {};
    const paint = () => {
      Object.entries(state).forEach(([k, v]) => { demo.style.setProperty(k, v); });
      code.textContent = '.container {\n  display: flex;\n' + Object.entries(state).map(([k, v]) => `  ${k}: ${v};`).join('\n') + '\n}';
    };
    lab.querySelectorAll('[data-prop]').forEach(g => {
      const btns = [...g.querySelectorAll('button')];
      btns.forEach(b => {
        b.type = 'button';
        b.addEventListener('click', () => { btns.forEach(x => x.classList.toggle('on', x === b)); state[g.dataset.prop] = b.dataset.val; paint(); });
      });
      const def = btns.find(b => b.classList.contains('on')) || btns[0];
      state[g.dataset.prop] = def.dataset.val; def.classList.add('on');
    });
    paint();
  });

  /* ---------- Responsive width lab ---------- */
  document.querySelectorAll('.resp-lab').forEach(lab => {
    const range = lab.querySelector('input[type="range"]'), frame = lab.querySelector('.resp-frame'), out = lab.querySelector('.resp-out');
    const fit = () => { const max = Math.max(320, Math.floor(lab.clientWidth - 4)); range.max = max; if (+range.value > max) range.value = max; run(); };
    const run = () => {
      const w = +range.value; frame.style.width = w + 'px';
      const dev = w < 480 ? '📱 มือถือ (1 คอลัมน์)' : w < 720 ? '📟 แท็บเล็ต (2 คอลัมน์)' : '🖥️ เดสก์ท็อป (3 คอลัมน์ + sidebar)';
      const mq = w < 480 ? 'ใช้ CSS พื้นฐาน (mobile-first)' : w < 720 ? '@media (min-width: 480px) ทำงาน' : '@media (min-width: 720px) ทำงาน';
      out.innerHTML = `<b>${w}px</b> · ${dev} · <code>${mq}</code>`;
    };
    range.addEventListener('input', run);
    window.addEventListener('resize', fit);
    fit();
  });

  /* ---------- Mobile menu demo (JS DOM event) ---------- */
  document.querySelectorAll('[data-menu-demo]').forEach(box => {
    const btn = box.querySelector('.mm-btn'), log = box.querySelector('.mm-log');
    let n = 0;
    btn.addEventListener('click', () => {
      const open = box.classList.toggle('open');
      n++;
      if (log) log.textContent = `#${n} click → classList.toggle('open') → ${open ? 'เปิดเมนู' : 'ปิดเมนู'}`;
    });
  });

  /* ---------- Keep current nav item visible in the pill ---------- */
  const pill = document.querySelector('.pill'), cur = pill && pill.querySelector('[aria-current]');
  if (pill && cur && pill.scrollWidth > pill.clientWidth) pill.scrollLeft = cur.offsetLeft - (pill.clientWidth - cur.offsetWidth) / 2;

  /* ---------- Print button ---------- */
  document.querySelectorAll('[data-print]').forEach(b => b.addEventListener('click', () => window.print()));
})();
