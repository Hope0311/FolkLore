(function () {
  'use strict';

  /* =====================================================================
   * Strings
   * ===================================================================== */

  var UI = {
    en: {
      prev: 'Previous page', next: 'Next page',
      hint: 'Swipe or press ▶ to start', again: '↺ Read again',
      chapter: 'Chapter', think: 'Think about it',
      missing: 'Oops! We cannot find this story. Please scan the QR code again.'
    },
    bm: {
      prev: 'Muka sebelumnya', next: 'Muka seterusnya',
      hint: 'Leret atau tekan ▶ untuk mula', again: '↺ Baca semula',
      chapter: 'Bab', think: 'Fikirkan',
      missing: 'Alamak! Cerita ini tidak dijumpai. Sila imbas semula kod QR.'
    }
  };

  /* =====================================================================
   * Elements and state
   * ===================================================================== */

  var bookEl = document.getElementById('book');
  var prevBtn = document.getElementById('prev');
  var nextBtn = document.getElementById('next');
  var labelEl = document.getElementById('plabel');
  var fillEl = document.getElementById('pfill');
  var langEl = document.getElementById('lang');
  var thumbEl = langEl.querySelector('.thumb');
  var langBtns = langEl.querySelectorAll('button');

  var story = window.STORIES[new URLSearchParams(location.search).get('story') || window.DEFAULT_STORY];
  var reduceMotion = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);

  var lang = 'en';
  try { lang = localStorage.getItem('lang') || ''; } catch (e) { /* storage can be blocked */ }
  if (lang !== 'en' && lang !== 'bm') {
    lang = /^ms/i.test(navigator.language || '') ? 'bm' : 'en';
  }

  var pages = [];     // page descriptors for this screen size + language
  var cur = 0;        // index of the page being read
  var mounted = {};   // page index -> element currently in the DOM

  /* =====================================================================
   * Pages: one small factory per kind of page
   * ===================================================================== */

  function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function makePage(frontClass, html) {
    var el = document.createElement('div');
    el.className = 'page';
    el.innerHTML =
      '<div class="face front ' + frontClass + '">' + html + '<i class="shade"></i></div>' +
      '<div class="face back"></div>';
    return el;
  }

  function sceneHTML(scene) {
    var items = scene.items.map(function (it) {
      var cls = 'it' + (it[4] ? ' a-' + it[4] : '') + (it[5] ? ' flip' : '');
      return '<div class="' + cls + '" style="left:' + it[1] + '%;top:' + it[2] + '%;--s:' + it[3] + '">' +
        '<span>' + it[0] + '</span></div>';
    }).join('');
    return '<div class="scene ' + scene.theme + '" aria-hidden="true">' + items + '</div>';
  }

  function chapterHTML(chapIdx, first, paras) {
    var c = story.chapters[chapIdx];
    var head = '';
    if (first) {
      head = '<header class="chap">' +
        '<div class="chap-icon" aria-hidden="true">' + c.icon + '</div>' +
        '<div class="chap-no">' + UI[lang].chapter + ' ' + (chapIdx + 1) + '</div>' +
        '<h2 class="chap-title">' + esc(c.title[lang]) + '</h2></header>';
    }
    return head + paras.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('');
  }

  var pageKinds = {
    cover: function () {
      return makePage('', sceneHTML(story.cover) +
        '<div class="story center">' +
        '<h2 class="title">' + esc(story.title[lang]) + '</h2>' +
        '<p>' + esc(story.subtitle[lang]) + '</p>' +
        '<p class="hint">' + UI[lang].hint + '</p></div>');
    },

    read: function (d) {
      return makePage('noart tint-' + story.chapters[d.ch].tint,
        '<div class="story read">' + chapterHTML(d.ch, d.first, d.paras) + '</div>');
    },

    end: function () {
      var e = story.end;
      return makePage('noart tint-warm',
        '<div class="story center">' +
        '<h2 class="title">' + esc(e.title[lang]) + '</h2>' +
        '<p class="moral">' + esc(e.moral[lang]) + '</p>' +
        '<div class="think"><h3>' + UI[lang].think + '</h3><ol>' +
        e.questions[lang].map(function (q) { return '<li>' + esc(q) + '</li>'; }).join('') +
        '</ol></div>' +
        '<p class="more">' + esc(e.more[lang]) + '</p>' +
        '<button type="button" class="again">' + UI[lang].again + '</button></div>');
    }
  };

  function createPage(i) {
    var el = pageKinds[pages[i].kind](pages[i]);
    var again = el.querySelector('.again');
    if (again) { again.addEventListener('click', function () { jumpTo(0); }); }
    return el;
  }

  /* Only pages that are on screen live in the DOM. */

  function mount(i, z) {
    var el = mounted[i];
    if (!el) {
      el = mounted[i] = createPage(i);
      bookEl.appendChild(el);
    }
    el.style.zIndex = z;
    return el;
  }

  function unmount(i) {
    if (mounted[i]) {
      bookEl.removeChild(mounted[i]);
      delete mounted[i];
    }
  }

  function unmountAll() {
    Object.keys(mounted).forEach(unmount);
  }

  /* =====================================================================
   * Pagination: split each chapter into screen-sized pages
   * ===================================================================== */

  function paginate() {
    var front = document.createElement('div');
    front.className = 'face front noart measure';
    var box = document.createElement('div');
    box.className = 'story read';
    front.appendChild(box);
    bookEl.appendChild(front);

    function fits(ci, first, paras) {
      box.innerHTML = chapterHTML(ci, first, paras);
      return box.scrollHeight <= box.clientHeight + 1;
    }

    var out = [{ kind: 'cover', ch: -1, frac: 0 }];

    story.chapters.forEach(function (chap, ci) {
      var words = chap.text[lang].map(function (p) { return p.split(' '); });
      var total = words.reduce(function (n, w) { return n + w.length; }, 0);
      var pi = 0, wi = 0, consumed = 0, first = true;

      while (pi < words.length) {
        var page = { kind: 'read', ch: ci, first: first, paras: [], frac: consumed / total };

        while (pi < words.length) {
          var rest = words[pi].slice(wi);
          if (fits(ci, first, page.paras.concat(rest.join(' ')))) {
            page.paras.push(rest.join(' '));
            consumed += rest.length;
            pi++; wi = 0;
            continue;
          }
          // the paragraph doesn't fit whole: binary-search how many words do
          var lo = 0, hi = rest.length - 1;
          while (lo < hi) {
            var mid = Math.ceil((lo + hi) / 2);
            if (fits(ci, first, page.paras.concat(rest.slice(0, mid).join(' ')))) { lo = mid; }
            else { hi = mid - 1; }
          }
          if (lo === 0 && page.paras.length === 0) { lo = 1; }  // always make progress
          if (lo > 0) {
            page.paras.push(rest.slice(0, lo).join(' '));
            consumed += lo;
            wi += lo;
          }
          break;
        }

        out.push(page);
        first = false;
      }
    });

    out.push({ kind: 'end', ch: story.chapters.length, frac: 0 });
    bookEl.removeChild(front);
    return out;
  }

  /* =====================================================================
   * Page turn
   *
   * One engine for buttons, keys and swipes. A turn has a progress `t`
   * (0..1) = how far the turning page has swung over:
   *   next: turning page is the current one,  t goes 0 -> 1
   *   prev: turning page is the previous one, t goes 1 -> 0
   * Dragging sets t from the finger; releasing (or a button press) animates
   * t to 0 or 1 from wherever it is, so every path looks the same.
   * ===================================================================== */

  var turn = null;    // the turn in progress, if any
  var queued = 0;     // a button press made during a turn (-1 / +1)

  var ease = {
    out: function (x) { return 1 - Math.pow(1 - x, 3); },
    inOut: function (x) { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
  };

  function canTurn(dir) {
    return dir > 0 ? cur < pages.length - 1 : cur > 0;
  }

  function beginTurn(dir) {
    if (turn || !canTurn(dir)) { return false; }
    var flipIdx = dir > 0 ? cur : cur - 1;
    var underIdx = dir > 0 ? cur + 1 : cur;
    var under = mount(underIdx, 2);
    under.classList.add('under');
    turn = {
      dir: dir, t: 0, raf: 0, dragging: false,
      flipIdx: flipIdx, underIdx: underIdx,
      flip: mount(flipIdx, 3), under: under
    };
    setTurn(dir > 0 ? 0 : 1);
    return true;
  }

  function setTurn(t) {
    var s = Math.sin(Math.PI * t);                 // 0 at rest, 1 when edge-on
    turn.t = t;
    turn.flip.style.transform = 'rotateY(' + (-180 * t) + 'deg)';
    turn.flip.style.setProperty('--shade', (s * 0.35).toFixed(3));
    turn.flip.style.setProperty('--lift', s.toFixed(3));
    turn.under.style.transform = 'scale(' + (0.94 + 0.06 * t).toFixed(4) + ')';
    turn.under.style.setProperty('--shade', ((1 - t) * 0.4).toFixed(3));
  }

  function settle(target, easing) {
    var tr = turn;
    var from = tr.t;
    var dist = Math.abs(target - from);
    if (reduceMotion || dist < 0.002) {
      setTurn(target);
      endTurn(target);
      return;
    }
    var dur = 260 + 520 * dist;
    var start = performance.now();
    function step(now) {
      var p = Math.min(1, (now - start) / dur);
      setTurn(from + (target - from) * easing(p));
      if (p < 1) { tr.raf = requestAnimationFrame(step); }
      else { endTurn(target); }
    }
    tr.raf = requestAnimationFrame(step);
  }

  function endTurn(target) {
    var tr = turn;
    var commit = tr.dir > 0 ? target === 1 : target === 0;
    var keepFlip = commit ? tr.dir < 0 : tr.dir > 0;   // which of the two stays on screen
    var keep = keepFlip ? tr.flip : tr.under;

    unmount(keepFlip ? tr.underIdx : tr.flipIdx);
    keep.style.transform = '';
    keep.style.zIndex = 1;
    keep.style.removeProperty('--shade');
    keep.style.removeProperty('--lift');
    keep.classList.remove('under');

    if (commit) { cur += tr.dir; }
    turn = null;
    refreshUI();

    if (queued) {
      var d = queued;
      queued = 0;
      go(d);
    }
  }

  function abortTurn() {
    if (!turn) { return; }
    cancelAnimationFrame(turn.raf);
    queued = 0;
    var back = turn.dir > 0 ? 0 : 1;
    setTurn(back);
    endTurn(back);
  }

  function go(dir) {
    if (turn) {
      if (!turn.dragging) { queued = dir; }   // remember a quick second tap
      return;
    }
    if (beginTurn(dir)) { settle(dir > 0 ? 1 : 0, ease.inOut); }
  }

  function jumpTo(i) {
    abortTurn();
    unmountAll();
    cur = i;
    mount(cur, 1);
    refreshUI();
    fadeIn();
  }

  function fadeIn() {
    if (bookEl.animate && !reduceMotion) {
      bookEl.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 260, easing: 'ease-out' });
    }
  }

  /* =====================================================================
   * Book: (re)build for the current screen + language
   * ===================================================================== */

  function currentAnchor() {
    var p = pages[cur];
    return p ? { ch: p.ch, frac: p.frac } : null;
  }

  function rebuild(anchor) {
    abortTurn();
    unmountAll();
    pages = paginate();
    cur = 0;
    if (anchor) {
      pages.forEach(function (p, i) {
        if (p.ch < anchor.ch || (p.ch === anchor.ch && p.frac <= anchor.frac + 1e-6)) { cur = i; }
      });
    }
    mount(cur, 1);
    refreshUI();
  }

  function refreshUI() {
    var p = pages[cur];
    labelEl.textContent = p && p.kind === 'read'
      ? UI[lang].chapter + ' ' + (p.ch + 1) + ' / ' + story.chapters.length : '';
    fillEl.style.width = (pages.length > 1 ? (cur / (pages.length - 1)) * 100 : 0) + '%';
    prevBtn.disabled = cur === 0;
    nextBtn.disabled = cur === pages.length - 1;
  }

  /* =====================================================================
   * Language switch
   * ===================================================================== */

  function showLang(animate) {
    document.documentElement.lang = lang === 'bm' ? 'ms' : 'en';
    document.title = story.title[lang];
    prevBtn.setAttribute('aria-label', UI[lang].prev);
    nextBtn.setAttribute('aria-label', UI[lang].next);
    langBtns.forEach(function (b) {
      b.setAttribute('aria-pressed', b.dataset.lang === lang ? 'true' : 'false');
    });

    if (!animate) { thumbEl.style.transition = 'none'; }
    langEl.dataset.active = lang;
    if (animate) {
      thumbEl.classList.remove('squish');
      void thumbEl.offsetWidth;               // restart the squish animation
      thumbEl.classList.add('squish');
    } else {
      void thumbEl.offsetWidth;
      thumbEl.style.transition = '';
    }
  }

  langBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      if (b.dataset.lang === lang) { return; }
      var anchor = currentAnchor();
      lang = b.dataset.lang;
      try { localStorage.setItem('lang', lang); } catch (e) { /* ignore */ }
      showLang(true);
      rebuild(anchor);
      fadeIn();
    });
  });

  /* =====================================================================
   * Input: buttons, keys, swipe
   * ===================================================================== */

  prevBtn.addEventListener('click', function () { go(-1); });
  nextBtn.addEventListener('click', function () { go(1); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { go(1); }
    else if (e.key === 'ArrowLeft') { go(-1); }
  });

  var drag = null;

  function clamp01(x) { return Math.max(0, Math.min(1, x)); }

  function velocity(pts) {      // px per ms over the last moments of the swipe
    var a = pts[0], b = pts[pts.length - 1];
    return b.t > a.t ? (b.x - a.x) / (b.t - a.t) : 0;
  }

  bookEl.addEventListener('pointerdown', function (e) {
    if (turn || drag) { return; }
    drag = { id: e.pointerId, x: e.clientX, y: e.clientY, locked: false, pts: [] };
  });

  bookEl.addEventListener('pointermove', function (e) {
    if (!drag || e.pointerId !== drag.id) { return; }
    var dx = e.clientX - drag.x;
    var dy = e.clientY - drag.y;

    if (!drag.locked) {
      if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) { drag = null; return; }  // vertical scroll
      if (Math.abs(dx) < 10) { return; }
      drag.locked = true;
      try { bookEl.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
    }

    var dir = dx < 0 ? 1 : -1;
    if (turn && turn.dir !== dir) { abortTurn(); }          // finger changed direction
    if (!turn) {
      if (!beginTurn(dir)) { return; }
      turn.dragging = true;
    }

    var span = bookEl.clientWidth * 0.85;
    setTurn(clamp01(dir > 0 ? -dx / span : 1 - dx / span));

    drag.pts.push({ x: e.clientX, t: e.timeStamp });
    if (drag.pts.length > 4) { drag.pts.shift(); }
  });

  function release(cancelled) {
    var d = drag;
    drag = null;
    if (!d || !d.locked || !turn || !turn.dragging) { return; }

    var tr = turn;
    tr.dragging = false;
    var v = d.pts.length > 1 ? velocity(d.pts) : 0;
    var flick = tr.dir > 0 ? v < -0.4 : v > 0.4;             // quick swipe forward
    var recoil = tr.dir > 0 ? v > 0.4 : v < -0.4;            // quick swipe back the other way
    var far = tr.dir > 0 ? tr.t > 0.3 : tr.t < 0.7;
    var commit = !cancelled && !recoil && (flick || far);

    settle(tr.dir > 0 ? (commit ? 1 : 0) : (commit ? 0 : 1), ease.out);
  }

  bookEl.addEventListener('pointerup', function (e) { if (drag && e.pointerId === drag.id) { release(false); } });
  bookEl.addEventListener('pointercancel', function (e) { if (drag && e.pointerId === drag.id) { release(true); } });

  /* =====================================================================
   * Boot
   * ===================================================================== */

  var resizeTimer = null;
  function scheduleRebuild() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { rebuild(currentAnchor()); }, 200);
  }

  if (!story) {
    var msg = document.createElement('div');
    msg.className = 'message';
    msg.textContent = UI[lang].missing;
    bookEl.appendChild(msg);
    bookEl.style.background = '#fffaf0';
    prevBtn.disabled = nextBtn.disabled = true;
    return;
  }

  showLang(false);

  window.addEventListener('resize', scheduleRebuild);
  window.addEventListener('orientationchange', scheduleRebuild);
  // a web font arriving late changes text size, so split the pages again when it lands
  if (document.fonts && document.fonts.addEventListener) {
    document.fonts.addEventListener('loadingdone', scheduleRebuild);
  }

  // Split the text only once the reading font is in, so the measurements are right.
  // If fonts are blocked or slow, start with the fallback font after 2.5 seconds.
  var started = false;
  function start() {
    if (started) { return; }
    started = true;
    rebuild(null);
  }
  if (document.fonts && document.fonts.load) {
    Promise.all([document.fonts.load('400 1em "Comic Neue"'), document.fonts.load('700 1em "Comic Neue"')])
      .then(start, start);
    setTimeout(start, 2500);
  } else {
    start();
  }
})();
