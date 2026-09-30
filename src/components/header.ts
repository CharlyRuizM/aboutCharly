import { profile } from '../data/profile'

export function renderHeader() {
  return `<header class="site-header"><a class="wordmark" href="#main" aria-label="${profile.siteName}, inicio">about<strong>${profile.name}</strong><span class="accent" aria-hidden="true">.</span></a><span class="site-label">Portfolio personal</span></header>`
}
