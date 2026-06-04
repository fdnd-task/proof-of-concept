// Header navigatie js enhancement
const nav = document.getElementById('navigatie')
const link = document.querySelector('.nav-toggle')
const sluit = document.querySelector('.nav-close')
const ul = nav.querySelector('ul')

link.addEventListener('click', function (e) {
    e.preventDefault()
    nav.classList.add('open')
    document.body.style.overflow = 'hidden'
    ul.querySelector('a').focus()
})

sluit.addEventListener('click', function (e) {
    e.preventDefault()
    nav.classList.remove('open')
    document.body.style.overflow = ''
    link.focus()
})

document.addEventListener('click', function (e) {
    if (!nav.contains(e.target) && !link.contains(e.target)) {
        nav.classList.remove('open')
        link.focus()
    }
})

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        nav.classList.remove('open')
        document.body.style.overflow = ''
        link.focus()
    }
})

nav.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return

    const focusable = [...nav.querySelectorAll('a')]
    const first = focusable[0]
    const last = focusable.at(-1)

    if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
    }
})

// Aside infolijst openen en sluiten
const btnMore = document.querySelector('.btn-more');
const btnLess = document.querySelector('.btn-less');
const makersList = document.querySelector('.item-list');

btnMore.style.display = 'block';
makersList.style.display = 'none';

btnMore.addEventListener('click', () => {
    makersList.style.display = 'block';
    btnMore.style.display = 'none';
    btnLess.style.display = 'flex';
});

btnLess.addEventListener('click', () => {
    makersList.style.display = 'none';
    btnLess.style.display = 'none';
    btnMore.style.display = 'flex';
});