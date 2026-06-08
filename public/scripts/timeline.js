const years = [1769,1770,1771,1772,1773,1774,1775,1776,1777,1778];
const group = document.querySelector('.timeline__items');
const NS    = 'http://www.w3.org/2000/svg';
let offset  = 2, dragY, dragStart;

const mod = (n, m) => ((n % m) + m) % m;

function render() {
  group.innerHTML = '';
  const base = Math.floor(offset), frac = offset - base;

  for (let s = -5; s <= 5; s++) {
    const deg   = (s - frac) * 18;
    if (Math.abs(deg) > 74) continue;

    const a     = deg * Math.PI / 180;
    const x     = -70 + 230 * Math.cos(a);
    const y     = 250 + 230 * Math.sin(a);
    const on    = Math.abs(deg) < 9;
    const alpha = Math.max(0, (1 - Math.abs(deg) / 74) * (on ? 1 : 0.65));
    const year  = years[mod(base + s, years.length)];

    const g = document.createElementNS(NS, 'g');
    g.setAttribute('transform', `translate(${x},${y}) rotate(${deg})`);
    g.innerHTML = `<circle r="${on?5:4}" fill="rgba(255,255,255,${alpha})"></circle>
      <text x="${on?16:14}" dominant-baseline="middle" font-family="sans-serif"
        font-size="${on?44:28}" font-weight="${on?'bold':'normal'}"
        fill="rgba(255,255,255,${alpha})">${year}</text>`;
    group.appendChild(g);
  }
}

function snap(target) {
  offset += (target - offset) * 0.18;
  render();
  Math.abs(target - offset) > 0.005
    ? requestAnimationFrame(() => snap(target))
    : (offset = target, render());
}

const svg = document.querySelector('.timeline__svg');
svg.addEventListener('mousedown', e => { dragY = e.clientY; dragStart = offset; });
window.addEventListener('mousemove', e => { if (dragY == null) return; offset = dragStart - (e.clientY - dragY) / 55; render(); });
window.addEventListener('mouseup',   () => { if (dragY == null) return; dragY = null; snap(Math.round(offset)); });
window.addEventListener('keydown',   e => { if (e.key==='ArrowUp') snap(Math.round(offset)-1); if (e.key==='ArrowDown') snap(Math.round(offset)+1); });

render();
