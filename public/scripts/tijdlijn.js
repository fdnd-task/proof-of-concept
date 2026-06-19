// Lees de sectiedata uit het verborgen script-element in de HTML
const secties = JSON.parse(document.getElementById('secties-data').textContent)

// Haal alleen de startjaren op uit de secties
const jaren = secties.map(s => s.start_year)

// Selecteer de SVG-groep waarin de tijdlijn-elementen worden getekend
const groep = document.querySelector('g')

// De SVG namespace die nodig is om elementen dynamisch aan te maken
const NS = 'http://www.w3.org/2000/svg'

// offset = huidige positie op de tijdlijn, dragY = Y-positie bij muisdruk, dragStart = offset bij start drag
let offset = 0, dragY, dragStart

// Modulo die ook correct werkt bij negatieve getallen
const mod = (n, m) => ((n % m) + m) % m

// Bereken de SVG afmetingen op basis van de huidige grootte van het SVG-element
function getSvgAfmetingen() {
  const svg = document.querySelector('svg')
  const breedte = svg.viewBox.baseVal.width
  const hoogte = svg.viewBox.baseVal.height
  const mobiel = window.innerWidth < 600

  if (mobiel) {
    // Op mobiel: tijdlijn staat bovenaan en is 90° gedraaid (boog gaat van links naar rechts)
    const straal = breedte * 1.1
    const midX = breedte * 0.5   // horizontaal gecentreerd
    const midY = -hoogte * 0.1   // middelpunt net boven het scherm
    return { straal, midX, midY, hoekOffset: 90 * Math.PI / 180 }
  }

  // Op desktop: boog gaat verticaal aan de linkerkant
  const straal = Math.min(breedte, hoogte) * 0.77
  const midX = -breedte * 0.23
  const midY = hoogte * 0.5
  return { straal, midX, midY, hoekOffset: 0 }
}

// Teken alle zichtbare jaren op de tijdlijn
function render() {
  groep.innerHTML = '' // verwijder alle eerder getekende elementen
  const base = Math.floor(offset), frac = offset - base
  const { straal, midX, midY, hoekOffset } = getSvgAfmetingen()

  for (let s = -5; s <= 5; s++) {
    const graden = (s - frac) * 18
    if (Math.abs(graden) > 74) continue // elementen buiten de zichtbare boog overslaan

    const a     = graden * Math.PI / 180 + hoekOffset    // graden omzetten naar radialen plus basishoek
    const x     = midX + straal * Math.cos(a)          // x-positie op de boog
    const y     = midY + straal * Math.sin(a)          // y-positie op de boog
    const on    = Math.abs(graden) < 9                 // bepaal of dit het actieve jaar is
    const alpha = Math.max(0, (1 - Math.abs(graden) / 74) * (on ? 1 : 0.65)) // doorzichtigheid op basis van afstand
    const jaar  = jaren[mod(base + s, jaren.length)]   // het jaartal dat op deze positie hoort

    // Maak een SVG-groep aan voor het jaar (cirkel + tekst)
    const g = document.createElementNS(NS, 'g')
    g.setAttribute('transform', `translate(${x},${y}) rotate(${graden})`)
    g.innerHTML = `<circle r="${on ? 5 : 4}" fill="rgba(255,255,255,${alpha})"></circle>
      <text x="${on ? 16 : 14}" dominant-baseline="middle" font-family="sans-serif"
        font-size="${on ? 44 : 28}" font-weight="${on ? 'bold' : 'normal'}"
        fill="rgba(255,255,255,${alpha})">${jaar}</text>`
    groep.appendChild(g)
  }
}

// Laad de inhoud van de actieve sectie in het info-paneel
function activeerSectie(index) {
  const sectie = secties[mod(index, secties.length)]

  // Vul de tekstvelden in met de gegevens van de actieve sectie
  document.getElementById('sectie-naam').textContent = sectie.title
  document.getElementById('sectie-era').textContent = sectie.era || ''
  document.getElementById('sectie-jaar-groot').textContent = sectie.start_year
  document.getElementById('sectie-samenvatting').textContent = sectie.summary || ''

  // Toon de omslagafbeelding als die beschikbaar is
  const coverEl = document.getElementById('sectie-cover')
  if (sectie.cover) {
    coverEl.src = `https://fdnd-agency.directus.app/assets/${sectie.cover}`
    coverEl.alt = sectie.title
    coverEl.hidden = false
  } else {
    coverEl.hidden = true
  }

  // Vul de content blocks in
  const contentEl = document.getElementById('sectie-content')
  contentEl.innerHTML = ''
  if (sectie.content_blocks) {
    sectie.content_blocks.forEach(blok => {
      if (blok.block_type === 'quote') {
        const el = document.createElement('blockquote')
        el.textContent = blok.text
        contentEl.appendChild(el)
      } else {
        const el = document.createElement('p')
        el.textContent = blok.text
        contentEl.appendChild(el)
      }
    })
  }

  // Reset de quizkaart naar de beginstand
  document.querySelectorAll('.quiz-inhoud').forEach(el => el.hidden = true)
  document.querySelectorAll('.uitleg').forEach(el => { el.hidden = true; el.textContent = '' })
  document.querySelectorAll('.antwoord-btn').forEach(el => { el.disabled = false; el.removeAttribute('data-status') })

  // Toon de quizvraag die bij deze sectie hoort
  const actief = document.querySelector(`.quiz-inhoud[data-sectie="${sectie.id}"]`)
  if (actief) actief.hidden = false

  // Zet de pagina terug naar de info-staat
  document.querySelector('main').dataset.staat = 'info'
}

// Animeer de tijdlijn vloeiend naar de doelpositie
function snap(target) {
  offset += (target - offset) * 0.18 // beweeg stap voor stap richting het doel
  render()
  if (Math.abs(target - offset) > 0.005) {
    requestAnimationFrame(() => snap(target)) // blijf animeren zolang het doel niet bereikt is
  } else {
    offset = target
    render()
    activeerSectie(target) // activeer de sectie zodra de animatie klaar is
  }
}

// Muis: start slepen
const svg = document.querySelector('svg')
svg.addEventListener('mousedown', e => { dragY = e.clientY; dragStart = offset })

// Muis: beweeg de tijdlijn mee tijdens het slepen
window.addEventListener('mousemove', e => { if (dragY == null) return; offset = dragStart - (e.clientY - dragY) / 55; render() })

// Muis: stop slepen en snap naar het dichtstbijzijnde jaar
window.addEventListener('mouseup', () => { if (dragY == null) return; dragY = null; snap(Math.round(offset)) })

// Touch: start slepen op mobiel
svg.addEventListener('touchstart', e => { dragY = e.touches[0].clientY; dragStart = offset }, { passive: true })

// Touch: beweeg de tijdlijn mee op mobiel
window.addEventListener('touchmove', e => { if (dragY == null) return; offset = dragStart - (e.touches[0].clientY - dragY) / 55; render() }, { passive: true })

// Touch: stop slepen op mobiel en snap naar het dichtstbijzijnde jaar
window.addEventListener('touchend', () => { if (dragY == null) return; dragY = null; snap(Math.round(offset)) })

// Pijltjestoetsen: navigeer omhoog of omlaag door de tijdlijn
window.addEventListener('keydown', e => {
  if (e.key === 'ArrowUp') snap(Math.round(offset) - 1)
  if (e.key === 'ArrowDown') snap(Math.round(offset) + 1)
})

// Wissel-knop: schakel tussen info-staat en quiz-staat
document.getElementById('wissel-btn').addEventListener('click', () => {
  const main = document.querySelector('main')
  main.dataset.staat = main.dataset.staat === 'info' ? 'quiz' : 'info'
})

// Antwoordknoppen: verwerk de keuze van de gebruiker en toon de uitleg
document.querySelectorAll('.antwoord-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const vraag = btn.closest('.quiz-inhoud')
    const uitleg = vraag.querySelector('.uitleg')
    const correct = btn.dataset.correct === 'true' // controleer of het gekozen antwoord correct is

    vraag.querySelectorAll('.antwoord-btn').forEach(b => b.disabled = true) // vergrendel alle knoppen
    btn.setAttribute('data-status', correct ? 'correct' : 'fout')           // markeer de gekozen knop
    uitleg.textContent = correct ? btn.dataset.uitlegCorrect : btn.dataset.uitlegFout // toon de juiste uitleg
    uitleg.hidden = false
    if (!correct) vraag.querySelector('.probeer-opnieuw-btn').hidden = false // toon de knop alleen bij fout antwoord
  })
})

// Probeer opnieuw: reset de vraag naar de beginstand
document.querySelectorAll('.probeer-opnieuw-btn').forEach(knop => {
  knop.addEventListener('click', () => {
    const vraag = knop.closest('.quiz-inhoud')
    vraag.querySelectorAll('.antwoord-btn').forEach(b => { b.disabled = false; b.removeAttribute('data-status') })
    vraag.querySelector('.uitleg').hidden = true
    knop.hidden = true
  })
})

// Pas het SVG-pad van de stippellijn aan op basis van de schermgrootte
function updatePad() {
  const pad = document.querySelector('path')
  if (window.innerWidth < 600) {
    // Mobiel: horizontale boog bovenin — zelfde cirkel als de jaarpunten (midX=155, midY=-50, r=341)
    pad.setAttribute('d', 'M -173 44 A 341 341 0 0 1 483 44')
  } else {
    // Desktop: verticale boog links — origineel pad
    pad.setAttribute('d', 'M 9 34 A 230 230 0 0 1 9 466')
  }
}

// Herteken de tijdlijn als het venster van formaat verandert
window.addEventListener('resize', () => { render(); updatePad() })

// Eerste render en activeer de eerste sectie bij het laden van de pagina
render()
updatePad()
activeerSectie(0)
