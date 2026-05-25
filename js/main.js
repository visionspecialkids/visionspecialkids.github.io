document.addEventListener('DOMContentLoaded', () => {
  initNavbar()
  initHamburger()
  initActiveNav()
  initScrollReveal()
  initCarousel()
})

function initNavbar() {
  const navbar = document.getElementById('navbar')
  if (!navbar) return
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20)
  }, { passive: true })
}

function initHamburger() {
  const hamburger = document.getElementById('hamburger')
  const navMenu = document.getElementById('navMenu')
  if (!hamburger || !navMenu) return

  hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open')
    hamburger.setAttribute('aria-expanded', isOpen)
  })

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open')
      hamburger.setAttribute('aria-expanded', 'false')
    })
  })
}

function initActiveNav() {
  const sections = document.querySelectorAll('section[id]')
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]')
  if (!sections.length || !navLinks.length) return

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`)
      })
    })
  }, { rootMargin: '-50% 0px -50% 0px' })

  sections.forEach(s => observer.observe(s))
}

function initCarousel() {
  document.querySelectorAll('.hero-carousel').forEach(carousel => {
    const slides = carousel.querySelectorAll('.carousel-slide')
    const dots   = carousel.querySelectorAll('.carousel-dot')
    const prev   = carousel.querySelector('.carousel-prev')
    const next   = carousel.querySelector('.carousel-next')
    let current  = 0
    let timer    = null

    function goTo(index) {
      slides[current].classList.remove('active')
      dots[current].classList.remove('active')
      current = (index + slides.length) % slides.length
      slides[current].classList.add('active')
      dots[current].classList.add('active')
    }

    function startAuto() { timer = setInterval(() => goTo(current + 1), 4000) }
    function resetAuto()  { clearInterval(timer); startAuto() }

    prev.addEventListener('click', () => { goTo(current - 1); resetAuto() })
    next.addEventListener('click', () => { goTo(current + 1); resetAuto() })
    dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); resetAuto() }))

    carousel.addEventListener('mouseenter', () => clearInterval(timer))
    carousel.addEventListener('mouseleave', startAuto)

    startAuto()
  })
}

function initScrollReveal() {
  const els = document.querySelectorAll('.card, .rehab-card, .contact-card, .resource-card, .vision-item, .remote-area')
  if (!els.length) return

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1 })

  els.forEach(el => {
    el.classList.add('reveal')
    observer.observe(el)
  })
}
