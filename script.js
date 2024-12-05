document.addEventListener("DOMContentLoaded", function () {
  const cursor = document.querySelector('.cursor');
  let mouseX = 0, mouseY = 0;

  // Ethereal wand-like cursor movement
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    
    document.documentElement.style.setProperty('--cursor-x', `${mouseX}px`);
    document.documentElement.style.setProperty('--cursor-y', `${mouseY}px`);
  });

  // Magical particles effect
  particlesJS('parallax', {
    particles: {
      number: { 
        value: 800,
        density: {
          enable: true,
          value_area: 3000
        }
      },
      color: { 
        value: ["#4fd1c5", "#63b3ed", "#90cdf4", "#c3dafe", "#e2e8f0"]
      },
      shape: {
        type: "circle"
      },
      opacity: {
        value: 0.3,
        random: true,
        anim: {
          enable: true,
          speed: 0.2,
          opacity_min: 0.05,
          sync: false
        }
      },
      size: {
        value: 1.2,
        random: true,
        anim: {
          enable: true,
          speed: 0.2,
          size_min: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable: false
      },
      move: {
        enable: true,
        speed: 0.4,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "bubble",
          parallax: {
            enable: true,
            force: 40,
            smooth: 40
          }
        },
        resize: true
      },
      modes: {
        bubble: {
          distance: 200,
          size: 3,
          duration: 0.4,
          opacity: 0.8,
          speed: 3
        }
      }
    },
    retina_detect: true
  });

  // Audio functionality
  const bgMusic = document.getElementById('bgMusic');
  const audioToggle = document.getElementById('audioToggle');
  const audioIcon = audioToggle.querySelector('.material-icons');
  let isPlaying = false;

  // Function to handle audio toggle
  function toggleAudio() {
    if (!isPlaying) {
      bgMusic.play().then(() => {
        isPlaying = true;
        audioIcon.textContent = 'volume_up';
      }).catch(error => {
        console.log("Audio play failed:", error);
      });
    } else {
      bgMusic.pause();
      isPlaying = false;
      audioIcon.textContent = 'volume_off';
    }
  }

  // Add click event listener to audio toggle button
  audioToggle.addEventListener('click', toggleAudio);

  // Set initial volume
  bgMusic.volume = 0.3;

  // Handle user interaction requirement for audio
  document.addEventListener('click', function initAudio() {
    // Only try to play if not already playing
    if (!isPlaying) {
      toggleAudio();
    }
    // Remove the event listener after first click
    document.removeEventListener('click', initAudio);
  }, { once: true });

  // Initialize AOS
  AOS.init({
    once: true,
    duration: 1000,
    easing: 'ease-out-cubic'
  });

  // Smooth scroll handling
  document.querySelector('.scroll-indicator').addEventListener('click', function() {
    document.querySelector('.introduction-section').scrollIntoView({ 
      behavior: 'smooth' 
    });
  });

  // Parallax effect for morning mist
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const mist = document.querySelector('.morning-mist');
    mist.style.transform = `translateY(${scrolled * 0.4}px)`;
  });

  function createAutumnLeaves() {
    const leavesContainer = document.createElement('div');
    leavesContainer.className = 'leaves-container';
    document.querySelector('.introduction-section').appendChild(leavesContainer);

    // More natural leaf shapes
    const leafTypes = [
      'M10 0C10 0 20 10 10 20C-0.5 10 10 0 10 0Z', // Maple leaf simplified
      'M10 0C15 5 15 15 10 20C5 15 5 5 10 0Z',      // Oval leaf
      'M10 0C20 5 15 20 10 15C5 20 0 5 10 0Z',      // Heart-shaped leaf
      'M10 0L15 10L10 20L5 10Z'                      // Diamond leaf
    ];
    
    const leafColors = [
      '#AA6D3F', // Brown
      '#C27C3A', // Light brown
      '#D48F45', // Golden brown
      '#B85B2F', // Dark orange
      '#C17F59'  // Pale brown
    ];

    function createLeaf() {
      const leaf = document.createElement('div');
      leaf.className = 'leaf';
      
      const leafType = leafTypes[Math.floor(Math.random() * leafTypes.length)];
      const color = leafColors[Math.floor(Math.random() * leafColors.length)];
      const size = 8 + Math.random() * 12;
      const left = Math.random() * 100;
      const fallDuration = 15 + Math.random() * 20; // Slower fall
      const swayAmount = 30 + Math.random() * 40;
      
      const svgLeaf = `
        <svg viewBox="0 0 20 20" width="${size}" height="${size}">
          <path d="${leafType}" fill="${color}"/>
        </svg>
      `;
      
      leaf.style.cssText = `
        left: ${left}%;
        --fall-duration: ${fallDuration}s;
        --sway-amount: ${swayAmount}px;
        width: ${size}px;
        height: ${size}px;
      `;
      
      leaf.innerHTML = svgLeaf;
      leavesContainer.appendChild(leaf);
      
      leaf.addEventListener('animationend', () => leaf.remove());
    }

    // Create leaves less frequently
    setInterval(createLeaf, 3000); // One leaf every 3 seconds (reduced from 1.5 seconds)

    // Start with fewer initial leaves
    for (let i = 0; i < 4; i++) { // Reduced from 8 to 4 initial leaves
      setTimeout(() => createLeaf(), i * 1000);
    }
  }

  createAutumnLeaves();

  function createBirds() {
    const birdsContainer = document.createElement('div');
    birdsContainer.className = 'birds-container';
    document.querySelector('.education-section').appendChild(birdsContainer);

    const birdSVG = `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path class="wing" d="M0,50 Q25,45 50,50 T100,50 L50,60 Z" />
      </svg>
    `;

    function createBird() {
      // Only create birds when education section is in view
      const educationSection = document.querySelector('.education-section');
      const rect = educationSection.getBoundingClientRect();
      
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const bird = document.createElement('div');
        bird.className = 'bird';
        
        // Random properties for natural movement
        const scale = 0.3 + Math.random() * 0.7;
        const yPos = Math.max(0, Math.min(100, 
          (window.scrollY - educationSection.offsetTop + (Math.random() * window.innerHeight)) / 
          educationSection.offsetHeight * 100
        )); // Position relative to scroll
        const duration = 25 + Math.random() * 15;
        const drift = -20 + Math.random() * 40;
        const rotate = -5 + Math.random() * 10;
        
        bird.style.cssText = `
          --scale: ${scale};
          --y-pos: ${yPos}vh;
          --drift: ${drift}vh;
          --rotate: ${rotate}deg;
          width: 50px;
          height: 30px;
          animation: flyAcross ${duration}s linear forwards;
        `;
        
        bird.innerHTML = birdSVG;
        birdsContainer.appendChild(bird);
        
        bird.addEventListener('animationend', () => bird.remove());
      }
    }

    // Create birds based on scroll position
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
      const educationSection = document.querySelector('.education-section');
      const rect = educationSection.getBoundingClientRect();
      
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        // Create birds more frequently when scrolling
        if (Math.abs(window.scrollY - lastScrollY) > 50) {
          createBird();
          lastScrollY = window.scrollY;
        }
      }
    });

    // Create initial birds
    for (let i = 0; i < 3; i++) {
      setTimeout(() => createBird(), i * 2000);
    }

    // Create new birds periodically
    setInterval(() => {
      if (Math.random() < 0.5) { // Reduced chance to 50%
        createBird();
      }
    }, 8000); // Increased interval to 8 seconds
  }

  createBirds();

  // Get all section transitions
  const sectionTransitions = document.querySelectorAll('.section-transition');
  
  // Add click handlers for smooth scrolling
  sectionTransitions.forEach((transition, index) => {
    transition.addEventListener('click', function() {
      const sections = ['introduction-section', 'education-section'];
      const nextSection = document.querySelector(`.${sections[index]}`);
      if (nextSection) {
        nextSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    });

    // Hide/show transition arrows based on scroll position
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;
      const windowHeight = window.innerHeight;
      
      sectionTransitions.forEach((arrow) => {
        const arrowPosition = arrow.getBoundingClientRect().top + currentScroll;
        
        if (currentScroll > arrowPosition - windowHeight * 0.5) {
          arrow.style.opacity = '0';
        } else {
          arrow.style.opacity = '1';
        }
      });
    });
  });

  function createSnowEffect() {
    const snowContainer = document.querySelector('.snow-container');
    
    function createSnowflake() {
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';
      
      const size = 2 + Math.random() * 4;
      const drift = -50 + Math.random() * 100;
      const duration = 10 + Math.random() * 20;
      const startPosition = Math.random() * 100;
      
      snowflake.style.cssText = `
        position: absolute;
        top: -10px;
        left: ${startPosition}%;
        width: ${size}px;
        height: ${size}px;
        background: white;
        border-radius: 50%;
        opacity: 0;
        --drift: ${drift}px;
        animation: snowfall ${duration}s linear infinite;
        filter: blur(1px);
      `;
      
      snowContainer.appendChild(snowflake);
      
      // Remove snowflake after animation
      setTimeout(() => {
        snowflake.remove();
      }, duration * 1000);
    }

    // Create snowflakes periodically
    setInterval(createSnowflake, 200);

    // Create initial snowflakes
    for (let i = 0; i < 50; i++) {
      setTimeout(createSnowflake, i * 100);
    }
  }

  // Call the function when the section is in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        createSnowEffect();
        observer.disconnect();
      }
    });
  });

  observer.observe(document.querySelector('.special-section'));

  function createBubbles() {
    const bubblesContainer = document.createElement('div');
    bubblesContainer.className = 'bubbles';
    document.querySelector('.projects-section').appendChild(bubblesContainer);

    function createBubble() {
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      
      const size = 2 + Math.random() * 8;
      const left = Math.random() * 100;
      const drift = -50 + Math.random() * 100;
      const duration = 10 + Math.random() * 20;
      
      bubble.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        --drift: ${drift}px;
        --rise-duration: ${duration}s;
      `;
      
      bubblesContainer.appendChild(bubble);
      
      // Remove bubble after animation
      setTimeout(() => bubble.remove(), duration * 1000);
    }

    // Create bubbles periodically
    setInterval(createBubble, 300);

    // Create initial bubbles
    for (let i = 0; i < 20; i++) {
      setTimeout(() => createBubble(), i * 200);
    }
  }

  // Call when projects section is in view
  const projectsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        createBubbles();
        projectsObserver.disconnect();
      }
    });
  });

  projectsObserver.observe(document.querySelector('.projects-section'));

  // Smooth scroll for navigation orbs
  document.querySelectorAll('.nav-orb').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Update active orb on scroll
  const sections = ['intro', 'education', 'special', 'projects', 'contact'];
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + window.innerHeight / 2;
    
    sections.forEach(section => {
      const targetSection = document.getElementById(section);
      if (targetSection) {
        const sectionTop = targetSection.offsetTop;
        const sectionBottom = sectionTop + targetSection.offsetHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
          document.querySelectorAll('.nav-orb').forEach(orb => {
            orb.classList.remove('active');
          });
          document.querySelector(`[href="#${section}"]`).classList.add('active');
        }
      }
    });
  });

  // Add form submission handler
  document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send this data to your backend
    console.log('Form submitted:', { name, email, message });
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    
    // Clear form
    this.reset();
  });

  // Add lazy loading for images
  document.querySelectorAll('img').forEach(img => {
    img.loading = 'lazy';
  });

  // Optimize animation performance
  document.querySelectorAll('.animated-element').forEach(el => {
    el.style.willChange = 'transform';
  });

  // Debounce scroll handlers
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Apply debouncing to scroll handlers
  window.addEventListener('scroll', debounce(() => {
    // Your scroll handling code
  }, 16));

  // Add global error handling
  window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
    // You might want to send this to an error tracking service
  });

  // Add fallbacks for animations
  try {
    // Animation code
  } catch (error) {
    console.error('Animation failed:', error);
    // Fallback behavior
  }
});

