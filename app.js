/**
 * Om Jee Pandey - Executive Portfolio Interactive Application Script
 * Features: Theme Toggler, Interactive Filters, Certificate Modal, HR KPI Calculator,
 * Intersection Observer Counters, Accessibility & Form Handling
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initSmoothScroll();
  initStatsCounter();
  initFilterTabs();
  initCertificatesModal();
  initSkillProgressBars();
  initContactForm();
  initBackToTop();
  initExecutiveSummaryModal();
  initTiltEffect();
});

/* -------------------------------------------------------------------------- */
/* 1. Theme Toggler (Dark / Light Mode)                                       */
/* -------------------------------------------------------------------------- */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  if (!toggleBtn) return;

  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(toggleBtn, currentTheme);

  toggleBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(toggleBtn, newTheme);
  });
}

function updateThemeIcon(btn, theme) {
  const icon = btn.querySelector('i');
  if (!icon) return;
  if (theme === 'light') {
    icon.className = 'fas fa-moon';
    btn.setAttribute('aria-label', 'Switch to dark mode');
  } else {
    icon.className = 'fas fa-sun';
    btn.setAttribute('aria-label', 'Switch to light mode');
  }
}

/* -------------------------------------------------------------------------- */
/* 2. Mobile Menu Navigation                                                 */
/* -------------------------------------------------------------------------- */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (!mobileToggle || !navLinks) return;

  mobileToggle.addEventListener('click', () => {
    const isExpanded = navLinks.classList.contains('active');
    navLinks.classList.toggle('active');
    mobileToggle.setAttribute('aria-expanded', !isExpanded);
    const icon = mobileToggle.querySelector('i');
    if (icon) {
      icon.className = isExpanded ? 'fas fa-bars' : 'fas fa-times';
    }
  });

  // Close menu on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
      const icon = mobileToggle.querySelector('i');
      if (icon) icon.className = 'fas fa-bars';
    });
  });

  // Navbar background change on scroll
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });
}

/* -------------------------------------------------------------------------- */
/* 3. Smooth Scroll & Active Link Highlight                                   */
/* -------------------------------------------------------------------------- */
function initSmoothScroll() {
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
      
      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 4. Animated Stats Counter (Scroll Triggered)                               */
/* -------------------------------------------------------------------------- */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const countTo = parseInt(target.getAttribute('data-count'), 10);
        let count = 0;
        const duration = 1500;
        const increment = Math.ceil(countTo / (duration / 20));

        const timer = setInterval(() => {
          count += increment;
          if (count >= countTo) {
            target.textContent = countTo + (target.getAttribute('data-suffix') || '');
            clearInterval(timer);
          } else {
            target.textContent = count + (target.getAttribute('data-suffix') || '');
          }
        }, 20);

        observer.unobserve(target);
      }
    });
  }, { threshold: 0.1 });

  statNumbers.forEach(stat => observer.observe(stat));
}

/* -------------------------------------------------------------------------- */
/* 5. Interactive Category Filtering                                         */
/* -------------------------------------------------------------------------- */
function initFilterTabs() {
  // Experience Timeline Filters
  const expFilterBtns = document.querySelectorAll('#expFilterTabs .filter-btn');
  const expItems = document.querySelectorAll('.timeline-item');

  expFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      expFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      expItems.forEach(item => {
        const categories = item.getAttribute('data-category') || '';
        if (filter === 'all' || categories.includes(filter)) {
          item.style.display = 'block';
          setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'translateY(0)'; }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(15px)';
          setTimeout(() => { item.style.display = 'none'; }, 300);
        }
      });
    });
  });

  // Certifications Gallery Filters
  const certFilterBtns = document.querySelectorAll('#certFilterTabs .filter-btn');
  const certCards = document.querySelectorAll('.cert-card');

  certFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      certFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      certCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 6. Certificate Modal Credentials Viewer                                    */
/* -------------------------------------------------------------------------- */
const CERT_DATA = {
  aspire: {
    title: "Aspire Leaders Program 2025 (Harvard Faculty-Led)",
    org: "Aspire Institute & Harvard Business School Faculty",
    date: "October 2025",
    signatories: "Prof. Tarun Khanna (HBS Director) & Prof. Karim Lakhani (Harvard Chair)",
    hours: "40 Hours of Leadership & Critical Coursework",
    description: "Successfully completed all modules of the Harvard faculty-led Aspire Leaders Program. Emerged with enhanced emotional intelligence, leadership frameworks, cross-cultural communication, and digital-age strategic problem solving.",
    skills: ["Executive Leadership", "Cross-Cultural Communication", "Emotional Intelligence", "Strategic Thinking"],
    badgeClass: "fas fa-university",
    badgeColor: "#DC2626"
  },
  mckinsey: {
    title: "McKinsey.org Forward Learning Program",
    org: "McKinsey.org",
    date: "December 10, 2025",
    signatories: "McKinsey Global Learning Board",
    hours: "Executive Problem-Solving & Resilience Masterclass",
    description: "Completed McKinsey's flagship Forward learning initiative. Mastered practical skills for success in the future of work: applying the McKinsey approach to structured problem solving, effective communication, adaptability, and digital toolkit implementation.",
    skills: ["Structured Problem Solving", "Agile Communication", "Adaptability & Resilience", "Digital Toolkit"],
    badgeClass: "fas fa-brain",
    badgeColor: "#0284C7"
  },
  deloitte: {
    title: "Data Analytics Job Simulation",
    org: "Deloitte Australia (via Forage)",
    date: "March 29, 2026",
    signatories: "Tina McCreery (Chief Human Resources Officer, Deloitte)",
    verificationCode: "Enrolment Code: BBe7jaBfqWyJjQOpz | User Code: 69c803b39fc323c802555600",
    description: "Completed practical forensic technology and data analytics tasks mimicking real-world advisory projects for corporate clients at Deloitte Australia.",
    skills: ["Data Analytics", "Forensic Technology", "Business Insights", "Data Validation"],
    badgeClass: "fas fa-chart-line",
    badgeColor: "#86EFAC"
  },
  ey: {
    title: "EY Technology Risk Virtual Job Simulation",
    org: "EY (Ernst & Young) (via Forage)",
    date: "March 29, 2026",
    signatories: "Tom Brunskill (Co-Founder, Forage)",
    verificationCode: "Enrolment Code: BTVWI90gPTE7vm6oc | User Code: 69c803b39fc323c802555600",
    description: "Executed technology risk assessments, business stakeholder probing questions, risk identification, and team analytical reviews for enterprise clients.",
    skills: ["Technology Risk", "Risk Assessment", "Stakeholder Interaction", "Team Analytics"],
    badgeClass: "fas fa-shield-alt",
    badgeColor: "#FACC15"
  },
  adm: {
    title: "Human Resource Management Internship Certificate",
    org: "ADM Education & Welfare Society (ISO 9001:2015, MSME, NITI Aayog)",
    date: "16 May 2024 – 16 July 2024 (3 Months)",
    signatories: "Dr. Anuj Sharma (Director) | Certificate ID: 07172409",
    description: "Assisted in recruitment, onboarding, employee engagement, HR policy documentation, and talent acquisition strategies for organizational growth.",
    skills: ["Talent Acquisition", "Onboarding Operations", "Employee Engagement", "HR Policy"],
    badgeClass: "fas fa-users-cog",
    badgeColor: "#3B82F6"
  },
  caratlane: {
    title: "Retail Management & Sales Internship Certificate",
    org: "CaratLane – A TATA Product (in association with S4U by Patliputra)",
    date: "21 Sept 2025 – 30 Oct 2025 (40 Days)",
    signatories: "Authorized Signatory, S4U By Patliputra (Ref: 01.11.2025)",
    description: "Managed peak festive period (Dhanteras) retail operations: customer engagement, billing, merchandising, sales reporting, and team coordination for TATA's CaratLane.",
    skills: ["Retail Operations", "Merchandising", "BTL Marketing", "Team Coordination"],
    badgeClass: "fas fa-gem",
    badgeColor: "#F59E0B"
  },
  bajaj: {
    title: "Banking, Finance & Insurance HR Workshop Certificate",
    org: "Bajaj Finserv Limited (SKILLSERV / BEYOND)",
    date: "04 February 2026",
    signatories: "Raja D'Cruz (For Bajaj Finserv Limited)",
    description: "Participated in the specialized HR Workshop under the Certificate Programme in Banking, Finance & Insurance (CPBFI) conducted by Bajaj Finserv.",
    skills: ["BFSI HR Frameworks", "Financial Literacy", "Bancassurance", "Workplace Compliance"],
    badgeClass: "fas fa-university",
    badgeColor: "#10B981"
  },
  bajaj_beyond: {
    title: "Bajaj Finserv Beyond Excellence Certificate",
    org: "Bajaj Finserv Limited",
    date: "2025 / 2026",
    signatories: "Bajaj Finserv Training Division",
    description: "Certification in advanced financial services operations, customer relationship management, and insurance distribution strategies.",
    skills: ["Financial Services", "Customer Management", "Insurance Distribution", "Professional Ethics"],
    badgeClass: "fas fa-award",
    badgeColor: "#34D399"
  },
  nism: {
    title: "National Financial Literacy Quiz Certificate",
    org: "National Institute of Securities Markets (NISM - SEBI Initiative)",
    date: "National Quiz 2025 / 2026",
    signatories: "Sanjeev Bajaj (General Manager, NISM)",
    description: "Awarded Certificate of Participation in the National Financial Literacy Quiz organized by NISM, a capacity building initiative of SEBI.",
    skills: ["Financial Literacy", "Securities Markets", "Regulatory Awareness", "Analytics"],
    badgeClass: "fas fa-award",
    badgeColor: "#8B5CF6"
  },
  ilearnings: {
    title: "iLearnings HR & Talent Acquisition Internship",
    org: "iLearnings Education",
    date: "July 2024",
    signatories: "iLearnings HR Directorate",
    description: "Hands-on HR internship certificate covering talent sourcing, candidate screening, interviewing protocols, and onboarding workflow.",
    skills: ["Talent Sourcing", "Interviewing Protocols", "HR Analytics", "Candidate Screening"],
    badgeClass: "fas fa-user-check",
    badgeColor: "#6366F1"
  },
  knowlens_sales: {
    title: "Knowlens Professional Salesmanship Certification",
    org: "Knowlens Skill Development",
    date: "2024 / 2025",
    signatories: "Knowlens Academic Board",
    description: "Certification in consultative selling, client objection handling, product pitching, and customer relationship building.",
    skills: ["Consultative Selling", "Objection Handling", "Client Pitching", "Customer Relations"],
    badgeClass: "fas fa-chart-pie",
    badgeColor: "#EC4899"
  },
  knowlens_insurance: {
    title: "Knowlens Insurance & Risk Training Certificate",
    org: "Knowlens Skill Development",
    date: "2024 / 2025",
    signatories: "Knowlens BFSI Division",
    description: "Specialized training certification covering insurance domain concepts, risk assessment, and financial product structuring.",
    skills: ["Insurance Risk", "BFSI Domain", "Risk Evaluation", "Product Structuring"],
    badgeClass: "fas fa-file-contract",
    badgeColor: "#14B8A6"
  },
  manzil: {
    title: "Manzil Bancassurance & Distribution Certificate",
    org: "Manzil Financial Services",
    date: "2024 / 2025",
    signatories: "Manzil Authorized Directorate",
    description: "Professional certification in bancassurance models, channel sales, cross-selling strategies, and financial compliance.",
    skills: ["Bancassurance", "Channel Sales", "Cross-Selling", "Regulatory Compliance"],
    badgeClass: "fas fa-hands-helping",
    badgeColor: "#F97316"
  },
  project_vaani: {
    title: "Project Vaani Data Operations Internship",
    org: "Project Vaani Initiative",
    date: "2024 / 2025",
    signatories: "Project Vaani Operations Board",
    description: "Internship certification in speech data validation, operational workflow coordination, and data quality control.",
    skills: ["Data Operations", "Speech Processing", "Quality Control", "Operational Agility"],
    badgeClass: "fas fa-headset",
    badgeColor: "#A855F7"
  }
};

const REAL_CERT_FILES = {
  aspire: './assets/certificates/aspire_leaders_program_2025.png',
  mckinsey: './assets/certificates/mckinsey_forward_program.png',
  deloitte: './assets/certificates/deloitte_data_analytics.png',
  ey: './assets/certificates/ey_technology_risk_simulation.png',
  adm: './assets/certificates/adm_hr_internship.png',
  bajaj: './assets/certificates/bajaj_finserv_hr_workshop.png',
  bajaj_beyond: './assets/certificates/bajaj_finserv_beyond.png',
  nism: './assets/certificates/nism_financial_literacy_quiz.png',
  caratlane: './assets/certificates/caratlane_s4u_internship.png',
  ilearnings: './assets/certificates/ilearnings_hr_internship.png',
  knowlens_sales: './assets/certificates/knowlens_salesman.png',
  knowlens_insurance: './assets/certificates/knowlens_leap_year_insurance.png',
  manzil: './assets/certificates/manzil_bancassurance.png',
  project_vaani: './assets/certificates/project_vaani_internship.png'
};

function initCertificatesModal() {
  const modalBackdrop = document.getElementById('certModalBackdrop');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const certCards = document.querySelectorAll('.cert-card');
  const viewOrigLinks = document.querySelectorAll('.view-orig-btn');

  if (!modalBackdrop || !modalCloseBtn) return;

  // Make entire certificate card clickable to open verification details modal
  certCards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.view-orig-btn')) return;
      
      const certKey = card.getAttribute('data-cert');
      const data = CERT_DATA[certKey];
      if (data) {
        openModal(data, certKey);
      }
    });
  });

  // Open real original certificate image file in a new tab
  viewOrigLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      const certKey = link.getAttribute('data-cert');
      const targetUrl = REAL_CERT_FILES[certKey] || link.getAttribute('href');
      window.open(targetUrl, '_blank');
    });
  });

  modalCloseBtn.addEventListener('click', closeModal);
  
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });
}

function openModal(data, certKey = '') {
  const modalBackdrop = document.getElementById('certModalBackdrop');
  const modalBody = document.getElementById('modalContentBody');

  if (!modalBackdrop || !modalBody) return;

  const docUrl = REAL_CERT_FILES[certKey] || '#';

  modalBody.innerHTML = `
    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
      <div style="width: 50px; height: 50px; border-radius: 12px; background: ${data.badgeColor}20; color: ${data.badgeColor}; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
        <i class="${data.badgeClass}"></i>
      </div>
      <div>
        <span style="font-size: 0.8rem; font-weight: 700; color: var(--accent-gold); text-transform: uppercase;">${data.org}</span>
        <h3 style="font-size: 1.25rem; margin-top: 0.2rem;">${data.title}</h3>
      </div>
    </div>

    <div style="background: var(--bg-primary); padding: 1.25rem; border-radius: 12px; border: 1px solid var(--glass-border); margin-bottom: 1.5rem;">
      <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1rem;">${data.description}</p>
      
      <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.85rem; color: var(--text-subtle);">
        <div><strong>Issue Date:</strong> ${data.date}</div>
        ${data.signatories ? `<div><strong>Authority Signatories:</strong> ${data.signatories}</div>` : ''}
        ${data.verificationCode ? `<div style="font-family: var(--font-mono); color: var(--accent-primary); font-size: 0.75rem;">${data.verificationCode}</div>` : ''}
      </div>
    </div>

    <div style="margin-bottom: 1.5rem;">
      <h4 style="font-size: 0.9rem; margin-bottom: 0.75rem; color: var(--text-main);">Validated Competencies:</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
        ${data.skills.map(s => `<span class="highlight-tag"><i class="fas fa-check-circle" style="color: var(--accent-emerald)"></i> ${s}</span>`).join('')}
      </div>
    </div>

    <div style="text-align: center; border-top: 1px solid var(--glass-border); padding-top: 1.25rem;">
      <a href="${docUrl}" target="_blank" rel="noopener" class="btn btn-gold" style="width: 100%; text-decoration: none;">
        <i class="fas fa-file-image"></i> View Original Certificate Image
      </a>
      <p style="font-size: 0.75rem; color: var(--text-subtle); margin-top: 0.5rem;">Opens your official original certificate image file in a new tab.</p>
    </div>
  `;

  modalBackdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modalBackdrop = document.getElementById('certModalBackdrop');
  if (modalBackdrop) {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

/* -------------------------------------------------------------------------- */
/* 7. Skill Progress Bars Animation                                           */
/* -------------------------------------------------------------------------- */
function initSkillProgressBars() {
  const progressFills = document.querySelectorAll('.progress-fill');
  if (!progressFills.length) return;

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const targetWidth = fill.getAttribute('data-percent') || '85%';
        fill.style.width = targetWidth;
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.1 });

  progressFills.forEach(fill => observer.observe(fill));
}

/* -------------------------------------------------------------------------- */
/* Google Sheets Form Integration URL                                        */
/* Set your Google Apps Script Web App URL below to send submissions to Sheets*/
/* -------------------------------------------------------------------------- */
const GOOGLE_SHEET_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxqYNe2GzRptDLCK--eAmr93qaIbw4P4x0FZcOWyPUlj_tLGFBWWE-1uvZ0uQvAOGmhog/exec';

/* -------------------------------------------------------------------------- */
/* 9. Contact Form Handling & Toast                                          */
/* -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('senderName').value.trim();
    const email = document.getElementById('senderEmail').value.trim();
    const message = document.getElementById('senderMessage').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Submitting...`;

    if (GOOGLE_SHEET_WEB_APP_URL) {
      try {
        const queryParams = new URLSearchParams({
          name: name,
          email: email,
          message: message,
          timestamp: new Date().toLocaleString()
        });

        await fetch(`${GOOGLE_SHEET_WEB_APP_URL}?${queryParams.toString()}`, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: queryParams.toString()
        });
        showToast(`Thank you, ${name}! Your message has been sent directly to Google Sheets.`, 'success');
        form.reset();
      } catch (err) {
        showToast('Error sending message. Please try again.', 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    } else {
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        form.reset();
        showToast(`Thank you, ${name}! Your message has been submitted.`, 'success');
      }, 1000);
    }
  });
}

function showToast(message, type = 'success') {
  const toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  if (type === 'error') {
    toast.style.borderColor = 'var(--accent-crimson)';
  }

  toast.innerHTML = `
    <i class="${type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'}" style="color: ${type === 'success' ? 'var(--accent-emerald)' : 'var(--accent-crimson)'}"></i>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

/* -------------------------------------------------------------------------- */
/* 10. Back to Top Floating Button                                            */
/* -------------------------------------------------------------------------- */
function initBackToTop() {
  const backBtn = document.getElementById('backToTopBtn');
  if (!backBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
    }
  });

  backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* -------------------------------------------------------------------------- */
/* 11. Executive Summary Profile Modal                                        */
/* -------------------------------------------------------------------------- */
function initExecutiveSummaryModal() {
  const summaryBtn = document.getElementById('executiveSummaryBtn');
  if (!summaryBtn) return;

  summaryBtn.addEventListener('click', () => {
    const data = {
      title: "Executive Profile & HR Overview",
      org: "Om Jee Pandey — People Operations & HR Leader",
      date: "Active 2026 Profile",
      badgeColor: "#10B981",
      badgeClass: "fas fa-user-tie",
      description: `
        <strong>Professional Profile Summary:</strong><br>
        Results-oriented HR & People Operations Specialist with hands-on talent acquisition, employee engagement, and retail operations experience at <strong>CaratLane (A TATA Product)</strong>, <strong>Google's Project VAANI (Speech AI Data Initiative)</strong>, and ISO 9001:2015 certified organizations.<br><br>
        <strong>Key Credential Highlights:</strong>
        <ul style="margin-left: 1.25rem; margin-top: 0.5rem; line-height: 1.6;">
          <li><strong>Harvard Faculty-Led Aspire Leaders Fellow:</strong> Emotional intelligence, global leadership, and strategic communication.</li>
          <li><strong>McKinsey.org Forward Scholar:</strong> Structured problem solving, adaptability, and digital tools.</li>
          <li><strong>Deloitte Australia Analytics & EY Tech Risk:</strong> Virtual job simulations in technology risk assessment and data validation.</li>
          <li><strong>BBA Candidate at ISM Patna:</strong> Specializing in organizational behavior, corporate HR, and managerial economics.</li>
        </ul>
      `,
      skills: [
        "Talent Acquisition",
        "Employee Onboarding",
        "HR Operations",
        "HR Analytics & KPI Simulation",
        "Retail Sales Management (TATA)",
        "AI Speech Data QA (Google)",
        "Technology Risk Assessment",
        "Structured Problem Solving"
      ]
    };
    openModal(data, 'executive_profile');
  });
}

/* -------------------------------------------------------------------------- */
/* 12. Interactive 3D Card Perspective Tilt Effect                            */
/* -------------------------------------------------------------------------- */
function initTiltEffect() {
  const cards = document.querySelectorAll('.avatar-glass-frame, .cert-card, .edu-card, .skill-category-card');
  if (!cards.length) return;

  cards.forEach(card => {
    function applyTilt(clientX, clientY) {
      const rect = card.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    }

    function resetTilt() {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    }

    // Desktop Mouse Events
    card.addEventListener('mousemove', (e) => applyTilt(e.clientX, e.clientY));
    card.addEventListener('mouseleave', resetTilt);

    // Mobile Touch Events
    card.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        applyTilt(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    card.addEventListener('touchend', resetTilt, { passive: true });
    card.addEventListener('touchcancel', resetTilt, { passive: true });
  });
}



