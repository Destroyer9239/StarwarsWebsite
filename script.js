// ===== STARFIELD =====
(function () {
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  let stars = [];
  const NUM_STARS = 300;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function initStars() {
    stars = Array.from({ length: NUM_STARS }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5,
      speed: Math.random() * 0.3 + 0.05,
      opacity: Math.random(),
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleDir: Math.random() > 0.5 ? 1 : -1,
    }));
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const s of stars) {
      s.opacity += s.twinkleSpeed * s.twinkleDir;
      if (s.opacity >= 1 || s.opacity <= 0.1) s.twinkleDir *= -1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
      ctx.fill();
      s.y += s.speed;
      if (s.y > canvas.height) {
        s.y = 0;
        s.x = Math.random() * canvas.width;
      }
    }
    requestAnimationFrame(drawStars);
  }

  window.addEventListener('resize', () => { resize(); initStars(); });
  resize();
  initStars();
  drawStars();
})();

// ===== OPENING CRAWL =====
(function () {
  const overlay = document.getElementById('crawl-overlay');
  const skipBtn = document.getElementById('skip-crawl');

  function hideCrawl() {
    overlay.style.transition = 'opacity 1s ease';
    overlay.style.opacity = '0';
    setTimeout(() => overlay.remove(), 1000);
  }

  skipBtn.addEventListener('click', hideCrawl);

  // Auto-hide after animation completes (~28s) + 2s buffer
  setTimeout(hideCrawl, 30000);
})();

// ===== NAVBAR =====
(function () {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('nav-toggle');
  const links = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
  });

  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
})();

// ===== CHARACTER FILTER =====
(function () {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.char-card');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const show = filter === 'all' || card.dataset.side === filter;
        card.classList.toggle('hidden', !show);
      });
    });
  });
})();

// ===== QUOTES CAROUSEL =====
(function () {
  const quotes = [
    { text: "May the Force be with you.", author: "General Dodonna" },
    { text: "I am your father.", author: "Darth Vader" },
    { text: "Do. Or do not. There is no try.", author: "Yoda" },
    { text: "Help me, Obi-Wan Kenobi. You're my only hope.", author: "Princess Leia" },
    { text: "I find your lack of faith disturbing.", author: "Darth Vader" },
    { text: "The Force will be with you. Always.", author: "Obi-Wan Kenobi" },
    { text: "Never tell me the odds!", author: "Han Solo" },
    { text: "It's a trap!", author: "Admiral Ackbar" },
    { text: "In my experience, there is no such thing as luck.", author: "Obi-Wan Kenobi" },
    { text: "I've got a bad feeling about this.", author: "Various Characters" },
    { text: "Fear is the path to the dark side.", author: "Yoda" },
    { text: "You can't win, Darth. Strike me down and I will become more powerful than you can possibly imagine.", author: "Obi-Wan Kenobi" },
  ];

  let current = 0;
  const textEl = document.getElementById('quote-text');
  const authorEl = document.getElementById('quote-author');
  const dotsEl = document.getElementById('quote-dots');
  const prevBtn = document.getElementById('prev-quote');
  const nextBtn = document.getElementById('next-quote');

  // Build dots
  quotes.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Quote ${i + 1}`);
    dot.addEventListener('click', () => showQuote(i));
    dotsEl.appendChild(dot);
  });

  function showQuote(index, dir = 1) {
    current = ((index % quotes.length) + quotes.length) % quotes.length;
    textEl.style.opacity = '0';
    authorEl.style.opacity = '0';
    setTimeout(() => {
      textEl.textContent = quotes[current].text;
      authorEl.textContent = `— ${quotes[current].author}`;
      textEl.style.opacity = '1';
      authorEl.style.opacity = '1';
      dotsEl.querySelectorAll('.dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });
    }, 300);
  }

  prevBtn.addEventListener('click', () => showQuote(current - 1, -1));
  nextBtn.addEventListener('click', () => showQuote(current + 1, 1));

  // Auto-advance
  let autoplay = setInterval(() => showQuote(current + 1), 5000);
  [prevBtn, nextBtn].forEach(btn => {
    btn.addEventListener('click', () => {
      clearInterval(autoplay);
      autoplay = setInterval(() => showQuote(current + 1), 5000);
    });
  });

  showQuote(0);
})();

// ===== TRIVIA =====
(function () {
  const questions = [
    {
      q: "What planet is Luke Skywalker from?",
      opts: ["Tatooine", "Coruscant", "Naboo", "Hoth"],
      ans: 0,
    },
    {
      q: "Who said \"Do. Or do not. There is no try\"?",
      opts: ["Obi-Wan Kenobi", "Yoda", "Mace Windu", "Qui-Gon Jinn"],
      ans: 1,
    },
    {
      q: "What is the name of Han Solo's ship?",
      opts: ["X-Wing", "Star Destroyer", "Millennium Falcon", "Slave I"],
      ans: 2,
    },
    {
      q: "Which Episode did Darth Vader first appear?",
      opts: ["Episode I", "Episode II", "Episode III", "Episode IV"],
      ans: 3,
    },
    {
      q: "What color is Yoda's lightsaber?",
      opts: ["Blue", "Red", "Green", "Purple"],
      ans: 2,
    },
    {
      q: "Who trained Obi-Wan Kenobi?",
      opts: ["Yoda", "Mace Windu", "Qui-Gon Jinn", "Count Dooku"],
      ans: 2,
    },
    {
      q: "What weapon do Jedi use?",
      opts: ["Blaster", "Lightsaber", "Vibroblade", "Force Lightning"],
      ans: 1,
    },
    {
      q: "Which planet was destroyed by the Death Star in A New Hope?",
      opts: ["Tatooine", "Alderaan", "Naboo", "Coruscant"],
      ans: 1,
    },
    {
      q: "What creature lives on Dagobah with Yoda?",
      opts: ["Jawas", "Ewoks", "Nothing specific", "Many swamp creatures"],
      ans: 3,
    },
    {
      q: "What is the name of Darth Vader's fighting style?",
      opts: ["Form I", "Form IV", "Form V", "Jar'Kai"],
      ans: 2,
    },
  ];

  let qIndex = 0;
  let score = 0;

  const questionEl = document.getElementById('trivia-question');
  const optionsEl = document.getElementById('trivia-options');
  const resultEl = document.getElementById('trivia-result');
  const scoreEl = document.getElementById('trivia-score-val');
  const totalEl = document.getElementById('trivia-total-val');

  function loadQuestion() {
    if (qIndex >= questions.length) {
      questionEl.textContent = `Quiz complete! Final score: ${score} / ${questions.length}`;
      optionsEl.innerHTML = '';
      resultEl.className = 'hidden';
      const restart = document.createElement('button');
      restart.className = 'trivia-opt';
      restart.textContent = 'Play Again';
      restart.style.gridColumn = '1 / -1';
      restart.addEventListener('click', () => {
        qIndex = 0;
        score = 0;
        scoreEl.textContent = 0;
        totalEl.textContent = 0;
        loadQuestion();
      });
      optionsEl.appendChild(restart);
      return;
    }

    const q = questions[qIndex];
    questionEl.textContent = `Q${qIndex + 1}. ${q.q}`;
    resultEl.className = 'hidden';
    optionsEl.innerHTML = '';

    q.opts.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'trivia-opt';
      btn.textContent = opt;
      btn.addEventListener('click', () => handleAnswer(i, q.ans, btn));
      optionsEl.appendChild(btn);
    });
  }

  function handleAnswer(selected, correct, btn) {
    const allBtns = optionsEl.querySelectorAll('.trivia-opt');
    allBtns.forEach(b => b.disabled = true);

    if (selected === correct) {
      btn.classList.add('correct');
      score++;
      scoreEl.textContent = score;
      resultEl.textContent = '✓ Correct! The Force is strong with you.';
      resultEl.className = 'correct-result';
    } else {
      btn.classList.add('wrong');
      allBtns[correct].classList.add('correct');
      resultEl.textContent = `✗ Wrong. The answer was: ${questions[qIndex].opts[correct]}`;
      resultEl.className = 'wrong-result';
    }

    totalEl.textContent = qIndex + 1;
    qIndex++;

    setTimeout(loadQuestion, 1800);
  }

  loadQuestion();
})();

// ===== SCROLL ANIMATIONS =====
(function () {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  const animatable = document.querySelectorAll(
    '.film-card, .char-card, .planet-card, .faction-card'
  );

  animatable.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.5s ease ${(i % 6) * 0.08}s, transform 0.5s ease ${(i % 6) * 0.08}s`;
    observer.observe(el);
  });
})();
