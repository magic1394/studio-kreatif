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
import { initWaCalculator } from './modules/waCalculator.js';
import { renderWorkflow } from './modules/renderWorkflow.js';

document.addEventListener('DOMContentLoaded', () => {
  renderHero(siteConfig);
  const selectPackageInCalculator = initWaCalculator(servicesData, siteConfig);
  renderPricing(servicesData, siteConfig, selectPackageInCalculator);
  renderPortfolio(portfolioData);
  renderWorkflow(workflowData, siteConfig);

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
});
