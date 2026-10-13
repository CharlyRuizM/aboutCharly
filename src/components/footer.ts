import { profile } from '../data/profile'

export function renderFooter(root = './') {
  const links = [
    `<a href="mailto:${profile.email}">${profile.email}</a>`,
    profile.linkedin ? `<a href="${profile.linkedin}" target="_blank" rel="noopener">LinkedIn ↗</a>` : '',
    `<a href="${root}${profile.cv}" download>Descargar CV ↓</a>`,
  ].filter(Boolean).join('')
  return `
    <footer class="site-footer" id="contacto" aria-labelledby="contacto-t">
      <h2 id="contacto-t">Hablemos.</h2>
      <div class="site-footer-links">${links}</div>
      <p class="site-footer-meta">${profile.name} · ${profile.role} · ${profile.location}</p>
    </footer>`
}
