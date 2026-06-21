// app.js - Client-side interactions for DuckWare

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initTerminalSimulation();
  initSubscriptionForm();
  initSubmissionForm();
  initSmoothScroll();
});

/**
 * Navbar scroll behavior: Add glassmorphism / darker backgrounds when scrolled
 */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check initial state
}

/**
 * Interactive Terminal simulation typing effect
 */
function initTerminalSimulation() {
  const term = document.getElementById('terminal-content');
  if (!term) return;

  // Clear existing content to prepare for animation
  term.innerHTML = '';

  const terminalLines = [
    { type: 'comment', text: '# Fetch latest release audit information' },
    { type: 'command', text: 'curl -s https://duckware.dev/api/latest' },
    { type: 'output', text: 'Fetching latest curated software releases...' },
    { type: 'output-accent', text: '----------------------------------------------------' },
    { type: 'output-success', text: '✓ warp-terminal  - agentic dev shell with warm oklch canvas' },
    { type: 'output-success', text: '✓ linear-clone   - ultra-fast canvas-based task planner' },
    { type: 'output-success', text: '✓ sqlite-wasm    - local-first browser-embedded SQL database' },
    { type: 'output', text: 'All items are under final audit. Ready for first showcase.' },
    { type: 'command', text: 'duckware --info' },
    { type: 'output', text: 'Version: 1.0.0-alpha' },
    { type: 'output', text: 'Curation: Hand-picked developer tools & utilities' },
    { type: 'output-success', text: 'Status: Ready for launch' }
  ];

  let currentLineIndex = 0;
  let currentCharIndex = 0;
  
  // Create shell line structure
  function createLineElement(lineNumber, type) {
    const lineEl = document.createElement('div');
    lineEl.style.minHeight = '18px';
    
    const numSpan = document.createElement('span');
    numSpan.className = 'line-num';
    numSpan.textContent = lineNumber;
    lineEl.appendChild(numSpan);

    const contentSpan = document.createElement('span');
    switch (type) {
      case 'comment':
        contentSpan.className = 'token-comment';
        break;
      case 'command':
        contentSpan.className = 'token-cmd';
        break;
      case 'output':
        contentSpan.className = 'token-arg';
        break;
      case 'output-accent':
        contentSpan.className = 'token-accent';
        break;
      case 'output-success':
        contentSpan.className = 'token-success';
        break;
    }
    lineEl.appendChild(contentSpan);
    term.appendChild(lineEl);
    return contentSpan;
  }

  // Blinking cursor element
  const cursor = document.createElement('span');
  cursor.className = 'cursor';

  function typeNextLine() {
    if (currentLineIndex >= terminalLines.length) {
      // Append final prompt line and cursor, then stop
      const finalLine = createLineElement(currentLineIndex + 1, 'command');
      finalLine.parentNode.appendChild(cursor);
      return;
    }

    const currentLine = terminalLines[currentLineIndex];
    const lineNumber = currentLineIndex + 1;

    if (currentLine.type === 'command') {
      const textSpan = createLineElement(lineNumber, 'command');
      textSpan.parentNode.appendChild(cursor); // Attach cursor to the active typing line
      currentCharIndex = 0;

      function typeChar() {
        if (currentCharIndex < currentLine.text.length) {
          textSpan.textContent += currentLine.text[currentCharIndex];
          currentCharIndex++;
          setTimeout(typeChar, 30 + Math.random() * 40); // Realistic variable typing speed
        } else {
          // Finished typing command
          currentLineIndex++;
          // Pause slightly after command before showing output or starting next line
          setTimeout(typeNextLine, 350);
        }
      }
      
      // Short delay before typing command
      setTimeout(typeChar, 200);

    } else if (currentLine.type === 'comment') {
      const textSpan = createLineElement(lineNumber, 'comment');
      textSpan.textContent = currentLine.text;
      currentLineIndex++;
      setTimeout(typeNextLine, 150);

    } else {
      // Output displays instantly
      const textSpan = createLineElement(lineNumber, currentLine.type);
      textSpan.textContent = currentLine.text;
      currentLineIndex++;
      setTimeout(typeNextLine, 100);
    }

    // Scroll terminal body down as it fills
    term.scrollTop = term.scrollHeight;
  }

  // Start simulation with a slight delay
  setTimeout(typeNextLine, 800);
}

/**
 * Toast notifications
 */
function showToast(message, isSuccess = true) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  
  // Custom toast styling depending on status
  const successIcon = toast.querySelector('svg');
  if (successIcon) {
    successIcon.style.fill = isSuccess ? '#a3d6a9' : '#e26f6f';
  }

  toast.classList.add('show');

  // Auto hide after 4 seconds
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/**
 * Handle subscription newsletter submissions
 */
function initSubscriptionForm() {
  const form = document.getElementById('subscribe-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = form.querySelector('input[type="email"]');
    const submitBtn = form.querySelector('button');
    if (!emailInput || !submitBtn) return;

    const email = emailInput.value.trim();
    if (!email) return;

    // Micro-animation loading state
    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Subscribing...';
    submitBtn.style.opacity = '0.7';

    setTimeout(() => {
      // Store in localStorage as mockup DB
      const subscribers = JSON.parse(localStorage.getItem('duckware_subscribers') || '[]');
      if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem('duckware_subscribers', JSON.stringify(subscribers));
      }

      // Reset button
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      submitBtn.style.opacity = '1';
      emailInput.value = '';

      showToast('Subscription confirmed. We will notify you when the first audit drops.');
    }, 800);
  });
}

/**
 * Handle Submit Software form submissions
 */
function initSubmissionForm() {
  const form = document.getElementById('submit-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    if (!submitBtn) return;

    // Gather values
    const name = document.getElementById('project-name').value.trim();
    const url = document.getElementById('project-url').value.trim();
    const desc = document.getElementById('project-desc').value.trim();
    const email = document.getElementById('submitter-email').value.trim();

    // Micro-animation loading state
    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting Audit...';
    submitBtn.style.opacity = '0.7';

    setTimeout(() => {
      // Store in localStorage as mockup DB
      const submissions = JSON.parse(localStorage.getItem('duckware_submissions') || '[]');
      submissions.push({ name, url, desc, email, date: new Date().toISOString() });
      localStorage.setItem('duckware_submissions', JSON.stringify(submissions));

      // Reset form
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      submitBtn.style.opacity = '1';

      showToast('Submission received! Our curation team will review it shortly.');
    }, 1000);
  });
}

/**
 * Smooth scrolling for anchors
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
