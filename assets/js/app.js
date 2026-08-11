/* ==========================================================================
   MEANDER & MYRTLE — app
   Vanilla. No dependencies. Progressive enhancement throughout.
   ========================================================================== */
(function () {
  'use strict';

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };
  const money = n => '$' + n;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ====================================================== 1. SITE BINDING */
  function bindSite() {
    const tel = 'tel:' + SITE.phoneDial;
    const mailto = 'mailto:' + SITE.email +
      '?subject=' + encodeURIComponent('Booking enquiry — ' + SITE.name);
    const addr = `${SITE.address.line1}, ${SITE.address.suburb} ${SITE.address.state} ${SITE.address.postcode}`;

    const map = {
      name: n => (n.textContent = SITE.name),
      tagline: n => (n.textContent = SITE.tagline),
      phone: n => (n.textContent = SITE.phone),
      email: n => (n.textContent = SITE.email),
      address: n => (n.textContent = `${SITE.address.line1}, ${SITE.address.suburb}`),
      therapistName: n => (n.textContent = SITE.therapist.name),
      therapistRole: n => (n.textContent = SITE.therapist.role),
      therapistQuals: n => (n.textContent = SITE.therapist.quals),
      tel: n => (n.href = tel),
      mailto: n => (n.href = mailto),
      map: n => (n.href = SITE.mapUrl),
    };

    $$('[data-site]').forEach(n => {
      const fn = map[n.dataset.site];
      if (fn) fn(n);
    });

    document.title = `${SITE.name} — Day Spa, Deloraine Tasmania`;
    $('#giftBuy').href = SITE.giftCardUrl;

    // hours
    const dl = $('#hoursList');
    SITE.hours.forEach(h => {
      dl.append(el('dt', null, h.day.slice(0, 3)));
      const dd = el('dd', h.open === 'Closed' ? 'is-closed' : null, h.open);
      dl.append(dd);
    });
  }

  /* ==================================================== 1b. PHOTOGRAPHY */
  // A slot shows its woven texture until a real photo loads. If the file is
  // missing or the connection drops mid-load, the texture simply stays.
  function bindImages() {
    if (typeof IMAGES !== 'object') return;
    $$('[data-plate]').forEach(slot => {
      const src = IMAGES[slot.dataset.plate];
      if (!src) return;
      const img = new Image();
      img.loading = 'lazy';
      img.decoding = 'async';
      img.alt = '';
      img.addEventListener('load', () => slot.prepend(img));
      img.src = src;
    });
  }

  /* ========================================================= 2. THE ROOM */
  function bindRoom() {
    $('[data-room="eyebrow"]').textContent = ROOM.eyebrow;
    $('[data-room="title"]').textContent = ROOM.title;
    const box = $('[data-room="paras"]');
    ROOM.paras.forEach(p => box.append(el('p', null, p)));
  }

  /* ======================================================= 3. TREATMENTS */
  const DURATIONS = [15, 30, 45, 60, 90];
  const state = { cat: 'body', dur: 'any', open: null };

  function priceRange(s) {
    const keys = Object.keys(s.prices).map(Number).sort((a, b) => a - b);
    return { min: keys[0], max: keys[keys.length - 1], keys };
  }

  function buildControls() {
    const segs = $('#catSegs');
    CATEGORIES.forEach(c => {
      const b = el('button', null, c.label);
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', String(c.id === state.cat));
      b.dataset.cat = c.id;
      b.addEventListener('click', () => setCat(c.id));
      segs.append(b);
    });

    const dial = $('#durDial');
    const opts = [{ v: 'any', label: 'Any length' }].concat(
      DURATIONS.map(d => ({ v: d, label: d + ' min' }))
    );
    opts.forEach(o => {
      const b = el('button', null, o.label);
      b.type = 'button';
      b.setAttribute('role', 'radio');
      b.setAttribute('aria-checked', String(String(o.v) === String(state.dur)));
      b.dataset.dur = o.v;
      b.addEventListener('click', () => setDur(o.v));
      dial.append(b);
    });
  }

  // Cross-fades the menu when the browser supports it, swaps instantly when not.
  function transition(fn) {
    if (document.startViewTransition && !reduced) document.startViewTransition(fn);
    else fn();
  }

  function setCat(id) {
    state.cat = id;
    $$('#catSegs button').forEach(b =>
      b.setAttribute('aria-selected', String(b.dataset.cat === id))
    );
    transition(render);
  }

  function setDur(v) {
    state.dur = v;
    $$('#durDial button').forEach(b =>
      b.setAttribute('aria-checked', String(b.dataset.dur === String(v)))
    );
    transition(render);
  }

  function visible() {
    return SERVICES.filter(s => {
      if (s.cat !== state.cat) return false;
      if (state.dur === 'any') return true;
      return Object.prototype.hasOwnProperty.call(s.prices, state.dur);
    });
  }

  function cardMarkup(s) {
    const r = priceRange(s);
    const active = state.dur !== 'any' && s.prices[state.dur];
    const shownDur = active ? Number(state.dur) : r.min;
    const shownPrice = active ? s.prices[state.dur] : s.prices[r.min];

    const li = el('li', 'card');
    li.id = 'svc-' + s.id;

    const head = el('button', 'card__head');
    head.type = 'button';
    head.setAttribute('aria-expanded', 'false');
    head.setAttribute('aria-controls', 'p-' + s.id);
    head.innerHTML = `
      <span class="card__main">
        <span class="card__title">${s.name}${s.eyebrow ? `<span class="card__flag">${s.eyebrow}</span>` : ''}</span>
        <span class="card__teaser">${s.teaser}</span>
      </span>
      <span class="card__price">
        ${active ? '' : '<span class="card__from">from</span>'}
        <span class="card__amount">${money(shownPrice)}</span>
        <span class="card__unit">${shownDur} min</span>
      </span>
      <span class="card__chev"></span>`;

    const panel = el('div', 'card__panel');
    panel.id = 'p-' + s.id;
    const inner = el('div');
    const box = el('div', 'card__inner');

    box.append(el('p', 'card__desc', s.body));

    const incWrap = el('div');
    incWrap.append(el('p', 'card__sub', "What's included"));
    const incUl = el('ul', 'card__inc');
    s.includes.forEach(i => incUl.append(el('li', null, i)));
    incWrap.append(incUl);
    box.append(incWrap);

    const ladWrap = el('div');
    ladWrap.append(el('p', 'card__sub', 'Length and price'));
    const lad = el('ul', 'ladder');
    r.keys.forEach(k => {
      const item = el('li', null, `<b>${money(s.prices[k])}</b><span>${k} min</span>`);
      if (String(k) === String(state.dur)) item.dataset.active = 'true';
      lad.append(item);
    });
    ladWrap.append(lad);
    box.append(ladWrap);

    if (s.good && s.good.length) {
      const tags = el('ul', 'card__tags');
      s.good.forEach(g => tags.append(el('li', null, g)));
      box.append(tags);
    }

    const cta = el('div', 'card__cta');
    const call = el('a', 'btn btn--ghost', 'Call');
    call.href = 'tel:' + SITE.phoneDial;
    const bookBtn = el('button', 'btn btn--primary', 'Book this');
    bookBtn.type = 'button';
    bookBtn.addEventListener('click', e => {
      e.stopPropagation();
      openSheet('book', s.name);
    });
    cta.append(call, bookBtn);
    box.append(cta);

    inner.append(box);
    panel.append(inner);
    li.append(head, panel);

    head.addEventListener('click', () => toggleCard(li, head));
    return li;
  }

  function toggleCard(li, head) {
    const wasOpen = head.getAttribute('aria-expanded') === 'true';
    $$('.card__head[aria-expanded="true"]').forEach(h =>
      h.setAttribute('aria-expanded', 'false')
    );
    if (!wasOpen) {
      head.setAttribute('aria-expanded', 'true');
      state.open = li.id;
      // keep the card in view once it grows
      setTimeout(() => {
        const top = li.getBoundingClientRect().top;
        const limit = ($('#controls').offsetHeight || 0) + 14;
        if (top < limit) {
          window.scrollBy({ top: top - limit, behavior: reduced ? 'auto' : 'smooth' });
        }
      }, 60);
    } else {
      state.open = null;
    }
  }

  function render() {
    const list = $('#cardList');
    const items = visible();
    const empty = $('#cardEmpty');

    list.replaceChildren();
    items.forEach((s, i) => {
      const node = cardMarkup(s);
      node.style.setProperty('--n', i);
      list.append(node);
    });

    if (!items.length) {
      const cat = CATEGORIES.find(c => c.id === state.cat);
      empty.textContent = `Nothing in ${cat.long.toLowerCase()} runs to ${state.dur} minutes. Try a different length.`;
      empty.hidden = false;
    } else {
      empty.hidden = true;
    }
    fallbackReveal(list);
  }

  /* ============================================================ 4. SAUNA */
  function bindSauna() {
    $('[data-sauna="eyebrow"]').textContent = SAUNA.eyebrow;
    $('[data-sauna="title"]').textContent = SAUNA.title;
    $('[data-sauna="lede"]').textContent = SAUNA.lede;

    const sp = $('#spectrum');
    SAUNA.spectrum.forEach(s => {
      sp.append(el('li', null, `
        <span class="spectrum__band">${s.band}</span>
        <span class="spectrum__nm">${s.nm}</span>
        <span class="spectrum__depth">${s.depth}</span>
        <span class="spectrum__what">${s.what}</span>`));
    });

    const ben = $('#saunaBenefits');
    const rhythm = ['lg', 'sm', 'sm', 'md', 'sm', 'sm', 'md', 'sm'];
    SAUNA.benefits.forEach((b, i) => {
      const li = el('li', null, `
        <span class="bento__more">+</span>
        <span class="bento__k">${b.title}</span>
        <span class="bento__t">${b.text}</span>`);
      li.dataset.size = rhythm[i % rhythm.length];
      li.tabIndex = 0;
      li.setAttribute('role', 'button');
      li.setAttribute('aria-expanded', 'false');
      const flip = () => {
        const open = li.getAttribute('aria-expanded') === 'true';
        ben.querySelectorAll('[aria-expanded="true"]').forEach(x =>
          x.setAttribute('aria-expanded', 'false'));
        li.setAttribute('aria-expanded', String(!open));
      };
      li.addEventListener('click', flip);
      li.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); }
      });
      ben.append(li);
    });

    const pro = $('#saunaProtocol');
    SAUNA.protocol.forEach(p => {
      pro.append(el('li', null, `<b>${p.step}</b><p>${p.text}</p>`));
    });

    const ses = $('#saunaSessions');
    SAUNA.sessions.forEach(s => {
      ses.append(el('li', null, `
        <b>${s.label}</b>
        <span class="pl__dur">${s.dur}</span>
        <span class="pl__price">${money(s.price)}</span>
        <span class="pl__note">${s.note}</span>`));
    });

    const cmp = $('#saunaCompare');
    if (cmp && SAUNA.compare) {
      SAUNA.compare.forEach(c => {
        const li = el('li', null, `
          <b>${c.k}</b>
          <span class="compare__temp">${c.temp}</span>
          <span class="compare__bar"><i style="--w:${c.bar}%"></i></span>
          <span class="compare__sit">${c.sit}</span>`);
        li.dataset.tone = c.tone;
        cmp.append(li);
      });
    }

    const pairs = $('#saunaPairs');
    if (pairs && SAUNA.pairings) {
      SAUNA.pairings.forEach(p => {
        pairs.append(el('li', null, `
          <span class="pairs__seq"><b>${p.first}</b><i>then</i><b>${p.then}</b></span>
          <span class="pairs__why">${p.why}</span>
          <span class="pairs__total">${money(p.total)}</span>`));
      });
    }

    const faq = $('#saunaFaqs');
    SAUNA.faqs.forEach((f, i) => {
      const wrap = el('div', 'faq');
      const q = el('button', 'faq__q', f.q);
      q.type = 'button';
      q.setAttribute('aria-expanded', 'false');
      q.setAttribute('aria-controls', 'faq-' + i);
      const a = el('div', 'faq__a', `<div><p>${f.a}</p></div>`);
      a.id = 'faq-' + i;
      q.addEventListener('click', () => {
        const open = q.getAttribute('aria-expanded') === 'true';
        q.setAttribute('aria-expanded', String(!open));
      });
      wrap.append(q, a);
      faq.append(wrap);
    });
  }

  /* --- cabin temperature climbs as you move through the section --- */
  function saunaGauge() {
    const sec = $('#sauna');
    const num = $('#gaugeNum');
    const fill = $('#gaugeFill');
    const heat = $('.sauna__heat');
    if (!sec) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const r = sec.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height * 0.55)));
      const temp = Math.round(45 + p * 15);
      num.textContent = temp;
      fill.style.width = (p * 100).toFixed(1) + '%';
      heat.style.setProperty('--heat', (0.14 + p * 0.55).toFixed(2));
    };
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll, { passive: true });
    update();
  }

  /* ============================================================ 5. CHAIR */
  function bindChair() {
    $('[data-chair="eyebrow"]').textContent = CHAIR.eyebrow;
    $('[data-chair="title"]').textContent = CHAIR.title;
    $('[data-chair="lede"]').textContent = CHAIR.lede;

    const cap = $('[data-chair="caption"]');
    if (cap) cap.textContent = CHAIR.caption || '';

    const f = $('#chairFeatures');
    CHAIR.features.forEach(x => {
      const li = el('li', null, `
        <span class="bento__k">${x.key}</span>
        <span class="bento__t">${x.text}</span>`);
      li.dataset.size = x.size;
      li.dataset.part = x.part || 'whole';
      li.tabIndex = 0;
      li.setAttribute('role', 'button');
      li.setAttribute('aria-pressed', 'false');
      const pick = () => {
        const on = li.getAttribute('aria-pressed') === 'true';
        f.querySelectorAll('[aria-pressed="true"]').forEach(x =>
          x.setAttribute('aria-pressed', 'false'));
        li.setAttribute('aria-pressed', String(!on));
        highlight(on ? null : li.dataset.part);
      };
      li.addEventListener('click', pick);
      li.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(); }
      });
      f.append(li);
    });

    const who = $('#chairWho');
    CHAIR.who.forEach(w => who.append(el('li', null, w)));

    const ses = $('#chairSessions');
    CHAIR.sessions.forEach(s => {
      ses.append(el('li', null, `
        <b>${s.label}</b>
        <span class="pl__dur">${s.dur}</span>
        <span class="pl__price">${s.price === 0 ? 'Free' : money(s.price)}</span>
        <span class="pl__note">${s.note}</span>`));
    });
  }

  function highlight(part) {
    const fig = $('#chairFig');
    if (!fig) return;
    fig.querySelectorAll('.cf-hot').forEach(c => {
      const on = part && (part === 'whole' || c.dataset.part === part);
      c.dataset.on = String(!!on);
    });
    if (part === 'whole') {
      fig.querySelectorAll('.cf-hot').forEach(c => (c.dataset.on = 'true'));
    }
  }

  // The chair reclines as the section passes, ending at its real 166° lie-flat.
  function chairRecline() {
    const fig = $('#chairFig');
    const sec = $('#chair');
    const angle = $('#cfAngle');
    if (!fig || !sec || reduced) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const r = sec.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.55 - r.top) / (vh * 1.25)));
      fig.style.setProperty('--recline', p.toFixed(3));
      angle.textContent = Math.round(104 + p * 62);
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll, { passive: true });
    update();
  }

  /* ============================================================= 6. GIFT */
  function bindGift() {
    $('[data-gift="eyebrow"]').textContent = GIFT.eyebrow;
    $('[data-gift="title"]').textContent = GIFT.title;
    $('[data-gift="lede"]').textContent = GIFT.lede;

    const chips = $('#giftAmounts');
    GIFT.amounts.forEach((a, i) => {
      const b = el('button', null, money(a));
      b.type = 'button';
      b.setAttribute('aria-pressed', String(i === 2));
      b.dataset.amount = a;
      b.addEventListener('click', () => {
        $$('#giftAmounts button').forEach(x => x.setAttribute('aria-pressed', 'false'));
        b.setAttribute('aria-pressed', 'true');
        const url = new URL(SITE.giftCardUrl, location.href);
        url.searchParams.set('amount', a);
        $('#giftBuy').href = url.toString();
      });
      chips.append(b);
    });

    const pts = $('#giftPoints');
    GIFT.points.forEach(p => pts.append(el('li', null, p)));

    // A card you can almost pick up. Pointer devices only, and never when
    // the visitor has asked for less motion.
    const card = $('.giftcard');
    if (card && matchMedia('(hover: hover)').matches && !reduced) {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        card.style.setProperty('--ry', ((x - 0.5) * 7).toFixed(2) + 'deg');
        card.style.setProperty('--rx', ((0.5 - y) * 5).toFixed(2) + 'deg');
        card.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
        card.style.setProperty('--my', (y * 100).toFixed(1) + '%');
        card.style.setProperty('--sheen', '1');
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
        card.style.setProperty('--sheen', '0');
      });
    }
  }

  /* ============================================================== 7. UI */
  function topbar() {
    const bar = $('#topbar');
    const hero = $('#home');
    if (!('IntersectionObserver' in window)) return;
    new IntersectionObserver(
      ([e]) => bar.classList.toggle('is-shown', !e.isIntersecting),
      { rootMargin: '-72% 0px 0px 0px' }
    ).observe(hero);
  }

  function stickyControls() {
    const c = $('#controls');
    if (!c || !('IntersectionObserver' in window)) return;
    const sentinel = el('div');
    sentinel.style.cssText = 'height:1px;margin-bottom:-1px';
    c.parentNode.insertBefore(sentinel, c);
    new IntersectionObserver(
      ([e]) => {
        const stuck = !e.isIntersecting;
        c.classList.toggle('is-stuck', stuck);
        document.body.classList.toggle('menu-stuck', stuck);
      },
      { threshold: 1 }
    ).observe(sentinel);
  }

  function dock() {
    const links = $$('#dock .dock__pill a');
    const ink = $('#dockInk');
    const ids = links.map(a => a.dataset.dock);
    if (!('IntersectionObserver' in window)) return;

    const seen = new Map();
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => seen.set(e.target.id, e.intersectionRatio));
      let best = null, bestRatio = 0.04;
      seen.forEach((ratio, id) => {
        if (ratio > bestRatio) { bestRatio = ratio; best = id; }
      });
      links.forEach(a => a.setAttribute('aria-current', String(a.dataset.dock === best)));
      const i = ids.indexOf(best);
      ink.style.setProperty('--i', i < 0 ? 0 : i);
      ink.style.setProperty('--ink-op', i < 0 ? 0 : 1);
    }, { threshold: [0, .05, .2, .4, .6, .8] });

    ids.forEach(id => { const s = document.getElementById(id); if (s) io.observe(s); });
  }

  /* ============================================================ 8. SHEET */
  let lastFocus = null;

  function openSheet(name, preselect) {
    const s = $('#sheet' + name.charAt(0).toUpperCase() + name.slice(1));
    if (!s) return;
    lastFocus = document.activeElement;
    s.hidden = false;
    document.body.style.overflow = 'hidden';
    if (preselect) {
      const sel = $('#wantSelect');
      const opt = Array.from(sel.options).find(o => o.value === preselect);
      if (opt) sel.value = preselect;
    }
    const first = s.querySelector('.btn, button, input');
    if (first) first.focus({ preventScroll: true });
  }

  function closeSheet() {
    $$('.sheet').forEach(s => (s.hidden = true));
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }

  function sheets() {
    // populate the "what you'd like" select from the live menu
    const sel = $('#wantSelect');
    sel.append(new Option('Not sure yet — help me choose', ''));
    CATEGORIES.forEach(c => {
      const g = document.createElement('optgroup');
      g.label = c.long;
      SERVICES.filter(s => s.cat === c.id).forEach(s => g.append(new Option(s.name, s.name)));
      sel.append(g);
    });
    const extra = document.createElement('optgroup');
    extra.label = 'Sauna & chair';
    extra.append(new Option('Infrared sauna session', 'Infrared sauna session'));
    extra.append(new Option('Massage chair session', 'Massage chair session'));
    extra.append(new Option('Gift card', 'Gift card'));
    sel.append(extra);

    $$('[data-open-sheet]').forEach(b =>
      b.addEventListener('click', () => openSheet(b.dataset.openSheet))
    );
    $$('[data-close-sheet]').forEach(b => b.addEventListener('click', closeSheet));
    addEventListener('keydown', e => { if (e.key === 'Escape') closeSheet(); });

    // Booking request -> opens the visitor's mail app with everything filled in.
    // No server needed, works from a static host, and leaves a copy in their sent items.
    $('#bookForm').addEventListener('submit', e => {
      e.preventDefault();
      const f = e.target;
      const d = Object.fromEntries(new FormData(f).entries());
      if (!d.name || !d.phone) {
        $('#formStatus').textContent = 'Add your name and a phone number so we can reply.';
        return;
      }
      const body = [
        `Name: ${d.name}`,
        `Phone: ${d.phone}`,
        `Treatment: ${d.want || 'Not sure yet'}`,
        `Preferred times: ${d.when || 'Flexible'}`,
        '',
        `Sent from ${SITE.name} website`,
      ].join('\n');
      const href = `mailto:${SITE.email}?subject=${encodeURIComponent('Booking request — ' + d.name)}&body=${encodeURIComponent(body)}`;
      $('#formStatus').textContent = 'Opening your email app…';
      location.href = href;
    });
  }

  /* ========================================================= 9. FALLBACK */
  const supportsSDA = CSS.supports('animation-timeline: view()');
  let io = null;

  function fallbackReveal(scope) {
    if (supportsSDA || reduced || !('IntersectionObserver' in window)) return;
    if (!io) {
      io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    }
    const sel = '.reveal, .bento li, .spectrum li, .pricelist li, .protocol li, .tile, .room__body p, .cards > li, .whenlist li, .ticks li';
    $$(sel, scope || document).forEach(n => {
      if (n.classList.contains('js-reveal')) return;
      n.classList.add('js-reveal');
      io.observe(n);
    });
  }

  /* ============================================================= 10. PWA */
  function pwa() {
    if ('serviceWorker' in navigator) {
      addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch(() => {});
      });
    }
    const flag = $('#offlineFlag');
    const sync = () => {
      flag.hidden = navigator.onLine;
    };
    addEventListener('online', sync);
    addEventListener('offline', sync);
    sync();
  }

  /* ============================================================== 11. GO */
  function init() {
    bindSite();
    bindImages();
    bindRoom();
    buildControls();
    render();
    bindSauna();
    bindChair();
    bindGift();
    topbar();
    stickyControls();
    dock();
    sheets();
    saunaGauge();
    chairRecline();
    fallbackReveal();
    pwa();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
