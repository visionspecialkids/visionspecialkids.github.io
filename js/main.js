document.addEventListener('DOMContentLoaded', () => {
  initNavbar()
  initHamburger()
  initActiveNav()
  initScrollReveal()
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
