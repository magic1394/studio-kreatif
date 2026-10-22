import './styles/tokens.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';

import siteConfig from './data/siteConfig.json';
import servicesData from './data/services.json';
import portfolioData from './data/portfolio.json';
import workflowData from './data/workflow.json';

import { renderHero } from './modules/renderHero.js';
import { renderPortfolio } from './modules/renderPortfolio.js';
import { renderPricing } from './modules/renderPricing.js';
import { renderTransparency } from './modules/renderTransparency.js';
import { initWaCalculator } from './modules/waCalculator.js';
import { renderWorkflow } from './modules/renderWorkflow.js';

document.addEventListener('DOMContentLoaded', () => {
  renderHero(siteConfig);
  const selectPackageInCalculator = initWaCalculator(servicesData, siteConfig);
  renderPricing(servicesData, siteConfig, selectPackageInCalculator);
  renderTransparency();
  renderPortfolio(portfolioData);
  renderWorkflow(workflowData, siteConfig);

  // Mobile menu
  const menuBtn = document.getElementById('mobile-menu-toggle');
  const navLinks = document.getElementById('nav-links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => navLinks.classList.remove('active'));
    });
  }

  // Header scroll border & back to top visibility
  const header = document.getElementById('site-header');
  const backToTopBtn = document.getElementById('back-to-top');

  const onScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    if (header) {
      header.classList.toggle('header-scrolled', y > 12);
    }
    if (backToTopBtn) {
      backToTopBtn.classList.toggle('visible', y > 400);
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Video modal
  const modal = document.getElementById('video-modal');
  const closeModalBtn = document.getElementById('close-video-modal');
  const frameWrap = document.getElementById('modal-video-frame');
  if (modal && closeModalBtn && frameWrap) {
    const closeModal = () => {
      modal.classList.remove('open');
      frameWrap.innerHTML = '';
    };
    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Scroll reveal observer
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealTargets = document.querySelectorAll(
      '.pricing-card, .portfolio-card, .transparency-col-card, .step-editorial-row, .faq-editorial-item'
    );
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    revealTargets.forEach((el) => {
      el.classList.add('reveal-on-scroll');
      revealObserver.observe(el);
    });
  }
});
