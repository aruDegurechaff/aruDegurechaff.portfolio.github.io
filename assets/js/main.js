// Simple UI plumbing

// Mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
menuBtn.addEventListener('click', () => {
mobileMenu.classList.toggle('hidden');
});
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
});

// Scroll progress, back-to-top, and active nav section
const scrollProgressBar = document.getElementById('scrollProgressBar');
const backToTop = document.getElementById('backToTop');
const navLinks = Array.from(document.querySelectorAll('.nav-link[href^="#"]'));

function updateScrollUi() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollY = Math.max(window.scrollY, 0);
    const ratio = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;
    if (scrollProgressBar) scrollProgressBar.style.width = `${Math.min(Math.max(ratio, 0), 100)}%`;
    if (backToTop) backToTop.classList.toggle('visible', scrollY > 420);
}

function setActiveNav(sectionId) {
    navLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${sectionId}`;
        link.classList.toggle('active', isActive);
    });
}

const observedSectionIds = [...new Set(navLinks.map(link => link.getAttribute('href').slice(1)))];
const observedSections = observedSectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

if (observedSections.length > 0) {
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveNav(entry.target.id);
        });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0.01 });
    observedSections.forEach((section) => navObserver.observe(section));
}

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

updateScrollUi();
window.addEventListener('scroll', updateScrollUi, { passive: true });
// Hero image scroll transform
const heroSection = document.getElementById('hero');
const heroImageShell = document.getElementById('heroImageShell');

function updateHeroImageOnScroll() {
    if (!heroSection || !heroImageShell) return;

    const rect = heroSection.getBoundingClientRect();
    const progressRaw = (-rect.top) / Math.max(rect.height, 1);
    const progress = Math.max(0, Math.min(progressRaw, 1));

    const scale = 1 - (progress * 0.35);
    const translateY = -(progress * 90);
    const opacity = Math.max(0, 1 - (progress * 1.5));
    const blur = progress * 4;

    heroImageShell.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
    heroImageShell.style.opacity = opacity.toString();
    heroImageShell.style.filter = `blur(${blur}px)`;
}

updateHeroImageOnScroll();
window.addEventListener('scroll', updateHeroImageOnScroll, { passive: true });
window.addEventListener('resize', updateHeroImageOnScroll);

// Fade-in on scroll (for elements with .fade-item)
const faders = document.querySelectorAll('.fade-item');
const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
    if (entry.isIntersecting) {
    entry.target.classList.remove('opacity-0', 'translate-y-6');
    entry.target.classList.add('opacity-100');
    }
});
}, { threshold: 0.15 });

faders.forEach(el => observer.observe(el));

// Update footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Game modal functions
function openGameModal(title, desc, imgSrc, downloadLink, actionLabel = 'Download') {
document.getElementById('gameModalTitle').textContent = title;
document.getElementById('gameModalDesc').textContent = desc;
document.getElementById('gameModalImg').src = imgSrc;

const action = document.getElementById('gameModalDownload');
action.href = downloadLink;
action.textContent = actionLabel;
action.target = downloadLink.startsWith('#') ? '_self' : '_blank';
action.rel = downloadLink.startsWith('#') ? '' : 'noopener noreferrer';
action.onclick = downloadLink.startsWith('#') ? closeGameModal : null;

document.getElementById('gameModal').classList.remove('hidden');
document.getElementById('gameModal').classList.add('flex');
}

function closeGameModal() {
document.getElementById('gameModal').classList.add('hidden');
document.getElementById('gameModal').classList.remove('flex');
}

// Certificates lightbox
function openCert(src, title = 'Certificate') {
document.getElementById('certModalImg').src = src;
document.getElementById('certModalTitle').textContent = title;
document.getElementById('certModal').classList.remove('hidden');
document.getElementById('certModal').classList.add('flex');
}
function closeCert() {
document.getElementById('certModal').classList.add('hidden');
document.getElementById('certModal').classList.remove('flex');
}

// Art Modal (supports multiple images)
let artImages = []; // holds current images
let currentArtIndex = 0; // current image index

function openArtModal(images, title = 'Art') {
    if (!images || images.length === 0) return;

    artImages = images;
    currentArtIndex = 0;

    document.getElementById('artModalTitle').textContent = title;
    document.getElementById('artModalImage').src = artImages[currentArtIndex];

    const modal = document.getElementById('artModal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

// Close modal
function closeArtModal() {
    const modal = document.getElementById('artModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

// Next/Prev Navigation
document.getElementById('nextArt').addEventListener('click', () => {
    if (artImages.length === 0) return;
    currentArtIndex = (currentArtIndex + 1) % artImages.length;
    document.getElementById('artModalImage').src = artImages[currentArtIndex];
});

document.getElementById('prevArt').addEventListener('click', () => {
    if (artImages.length === 0) return;
    currentArtIndex = (currentArtIndex - 1 + artImages.length) % artImages.length;
    document.getElementById('artModalImage').src = artImages[currentArtIndex];
});

// Close modal on backdrop click
document.getElementById('artModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('artModal')) closeArtModal();
});

const voiceProjects = {
    sizematters: {
        title: 'Size Matters (Omen IV)',
        subtitle: '21 dialogue clips - Voice Acting',
        image: 'assets/img/SizeMatters.png',
        samples: [
            { title: 'Line Set 1 - Clip 01', subtitle: 'Size Matters dialogue', src: 'assets/voiceacting/sizematters/1-1.MP3' },
            { title: 'Line Set 1 - Clip 02', subtitle: 'Size Matters dialogue', src: 'assets/voiceacting/sizematters/1-2.MP3' },
            { title: 'Line Set 1 - Clip 03', subtitle: 'Size Matters dialogue', src: 'assets/voiceacting/sizematters/1-3.MP3' },
            { title: 'Line Set 1 - Clip 04', subtitle: 'Size Matters dialogue', src: 'assets/voiceacting/sizematters/1-4.MP3' },
            { title: 'Line Set 1 - Clip 05', subtitle: 'Size Matters dialogue', src: 'assets/voiceacting/sizematters/1-5.MP3' },
            { title: 'Line Set 1 - Clip 06', subtitle: 'Size Matters dialogue', src: 'assets/voiceacting/sizematters/1-6.MP3' },
            { title: 'Line Set 1 - Clip 07', subtitle: 'Size Matters dialogue', src: 'assets/voiceacting/sizematters/1-7.MP3' },
            { title: 'Line Set 1 - Clip 08', subtitle: 'Size Matters dialogue', src: 'assets/voiceacting/sizematters/1-8.MP3' },
            { title: 'Dialogue Set D - Clip 01', subtitle: 'Size Matters alternate read', src: 'assets/voiceacting/sizematters/d-1.MP3' },
            { title: 'Dialogue Set D - Clip 02', subtitle: 'Size Matters alternate read', src: 'assets/voiceacting/sizematters/d-2.MP3' },
            { title: 'Dialogue Set D - Clip 03', subtitle: 'Size Matters alternate read', src: 'assets/voiceacting/sizematters/d-3.MP3' },
            { title: 'Dialogue Set D - Clip 04', subtitle: 'Size Matters alternate read', src: 'assets/voiceacting/sizematters/d-4.MP3' },
            { title: 'Dialogue Set D - Clip 05', subtitle: 'Size Matters alternate read', src: 'assets/voiceacting/sizematters/d-5.MP3' },
            { title: 'Dialogue Set D - Clip 06', subtitle: 'Size Matters alternate read', src: 'assets/voiceacting/sizematters/d-6.MP3' },
            { title: 'Dialogue Set D - Clip 07', subtitle: 'Size Matters alternate read', src: 'assets/voiceacting/sizematters/d-7.MP3' },
            { title: 'Dialogue Set D - Clip 08', subtitle: 'Size Matters alternate read', src: 'assets/voiceacting/sizematters/d-8.MP3' },
            { title: 'Dialogue Set D - Clip 09', subtitle: 'Size Matters alternate read', src: 'assets/voiceacting/sizematters/d-9.MP3' },
            { title: 'Dialogue Set D - Clip 10', subtitle: 'Size Matters alternate read', src: 'assets/voiceacting/sizematters/d-10.MP3' },
            { title: 'Dialogue Set D - Clip 11', subtitle: 'Size Matters alternate read', src: 'assets/voiceacting/sizematters/d-11.MP3' },
            { title: 'Dialogue Set D - Clip 12', subtitle: 'Size Matters alternate read', src: 'assets/voiceacting/sizematters/d-12.MP3' },
            { title: 'Dialogue Set D - Clip 13', subtitle: 'Size Matters alternate read', src: 'assets/voiceacting/sizematters/d-13.MP3' }
        ]
    }
};

function openVoiceProject(projectId) {
    const project = voiceProjects[projectId];
    if (!project) return;
    openVoiceModal(project);
}

function openVoiceModal(project) {
    const modal = document.getElementById('voiceModal');
    const title = document.getElementById('voiceModalTitle');
    const subtitle = document.getElementById('voiceModalSubtitle');
    const image = document.getElementById('voiceModalImage');
    const list = document.getElementById('voiceModalList');
    if (!modal || !title || !subtitle || !image || !list) return;

    title.textContent = project.title;
    subtitle.textContent = project.subtitle;
    image.src = project.image;
    image.alt = `${project.title} voice acting project`;
    list.textContent = '';

    project.samples.forEach((sample) => {
        const row = document.createElement('div');
        row.className = 'voice-sample-row';

        const meta = document.createElement('div');
        const sampleTitle = document.createElement('p');
        sampleTitle.className = 'voice-sample-title';
        sampleTitle.textContent = sample.title;
        const sampleSub = document.createElement('p');
        sampleSub.className = 'voice-sample-sub';
        sampleSub.textContent = sample.subtitle;
        meta.append(sampleTitle, sampleSub);

        const audio = document.createElement('audio');
        audio.controls = true;
        audio.preload = 'none';
        const source = document.createElement('source');
        source.src = sample.src;
        source.type = 'audio/mpeg';
        audio.appendChild(source);

        row.append(meta, audio);
        list.appendChild(row);
    });

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeVoiceModal() {
    const modal = document.getElementById('voiceModal');
    if (!modal) return;
    modal.querySelectorAll('audio').forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
    });
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

// Themed toast notification for coming-soon links
let toastTimer = null;

function showToast(message) {
    let toastEl = document.getElementById('alertSoonToast');
    if (!toastEl) {
        toastEl = document.createElement('div');
        toastEl.id = 'alertSoonToast';
        toastEl.className = 'toast';
        toastEl.innerHTML = `
            <span style="opacity:0.8">${message}</span>
            <button class="toast-close" type="button" aria-label="Dismiss"></button>
        `;
        document.body.appendChild(toastEl);

        toastEl.querySelector('.toast-close').addEventListener('click', () => {
            hideToast();
        });

        toastEl.addEventListener('click', (e) => {
            if (e.target === toastEl) hideToast();
        });
    }

    toastEl.querySelector('span').textContent = message;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(hideToast, 4000);
}

function hideToast() {
    const toastEl = document.getElementById('alertSoonToast');
    if (toastEl) toastEl.classList.remove('show');
}

// Placeholder for coming soon sites
function alertSoon(name) {
    showToast(`${name} profile will be added soon!`);
}

// Close modals on backdrop click
window.addEventListener('click', (e) => {
    const gm = document.getElementById('gameModal');
    const cm = document.getElementById('certModal');
    const am = document.getElementById('artModal');
    const vm = document.getElementById('voiceModal');

    if (gm && !gm.classList.contains('hidden') && e.target === gm) closeGameModal();
    if (cm && !cm.classList.contains('hidden') && e.target === cm) closeCert();
    if (am && !am.classList.contains('hidden') && e.target === am) closeArtModal();
    if (vm && !vm.classList.contains('hidden') && e.target === vm) closeVoiceModal();
});

// keyboard escape to close modals
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeGameModal();
        closeCert();
        closeArtModal();
        closeVoiceModal();
    }
});


// Filter groups
function setupFilterGroup(sectionId, buttonSelector, itemSelector, dataKey) {
    const section = document.getElementById(sectionId);
    const buttons = section ? section.querySelectorAll(buttonSelector) : [];
    const items = section ? section.querySelectorAll(itemSelector) : [];
    if (buttons.length === 0 || items.length === 0) return;

    buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const value = btn.getAttribute(`data-${dataKey}`);

            buttons.forEach((button) => {
                button.classList.remove('bg-cyan-500', 'bg-cyan-600', 'text-white', 'font-medium');
                button.classList.add('bg-gray-800', 'text-gray-300');
            });

            btn.classList.remove('bg-gray-800', 'text-gray-300');
            btn.classList.add('bg-cyan-500', 'text-white', 'font-medium');

            items.forEach((item) => {
                item.style.display = (value === 'all' || item.dataset[dataKey] === value) ? '' : 'none';
            });
        });
    });
}

setupFilterGroup('art', '.filter-btn', '.art-item', 'category');
setupFilterGroup('voice', '.voice-filter-btn', '.voice-item', 'project');
setupFilterGroup('music', '.music-filter-btn', '.music-project-card', 'project');

// Animate skill bars when section enters view
const skillFills = document.querySelectorAll('.skill-fill');
const skillSection = document.getElementById('skills');
if (skillSection && skillFills.length > 0) {
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            skillFills.forEach((fill) => {
                const level = fill.getAttribute('data-level') || '0';
                fill.style.width = `${level}%`;
            });
            skillObserver.disconnect();
        });
    }, { threshold: 0.22 });
    skillObserver.observe(skillSection);
}
// Project showcase carousel
const featuredViewport = document.getElementById('featuredViewport');
const featuredTrack = document.getElementById('featuredTrack');
const featuredPrev = document.getElementById('featuredPrev');
const featuredNext = document.getElementById('featuredNext');
const featuredDots = document.getElementById('featuredDots');

if (featuredTrack && featuredPrev && featuredNext && featuredDots) {
    const slides = Array.from(featuredTrack.children);
    const videoIframes = Array.from(featuredTrack.querySelectorAll('iframe'));
    const activeVideoFrames = new Set();
    let currentIndex = 0;
    let startX = 0;
    let isDragging = false;
    let autoRotateId = null;
    let resumeTimerId = null;
    let userHold = false;
    let iframeFocusHold = false;
    let pageHidden = document.hidden;

    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'feature-dot';
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => {
            pauseCarouselBriefly();
            goToSlide(i);
        });
        featuredDots.appendChild(dot);
    });

    const dotEls = Array.from(featuredDots.children);

    function renderCarousel() {
        featuredTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        dotEls.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
    }

    function goToSlide(index) {
        currentIndex = (index + slides.length) % slides.length;
        renderCarousel();
    }

    function shouldAutoRotate() {
        return !userHold && !iframeFocusHold && activeVideoFrames.size === 0 && !pageHidden;
    }

    function stopAutoRotate() {
        if (autoRotateId) window.clearInterval(autoRotateId);
        if (resumeTimerId) window.clearTimeout(resumeTimerId);
        autoRotateId = null;
        resumeTimerId = null;
    }

    function startAutoRotate() {
        stopAutoRotate();
        if (!shouldAutoRotate()) return;
        autoRotateId = window.setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 9000);
    }

    function scheduleAutoRotate(delay = 1800) {
        if (resumeTimerId) window.clearTimeout(resumeTimerId);
        if (!shouldAutoRotate()) return;
        resumeTimerId = window.setTimeout(startAutoRotate, delay);
    }

    function pauseCarouselBriefly() {
        userHold = true;
        stopAutoRotate();
        window.setTimeout(() => {
            userHold = false;
            scheduleAutoRotate();
        }, 2200);
    }

    function setVideoPlaying(frame, isPlaying) {
        if (isPlaying) activeVideoFrames.add(frame);
        else activeVideoFrames.delete(frame);

        if (activeVideoFrames.size > 0) stopAutoRotate();
        else scheduleAutoRotate(2400);
    }

    featuredPrev.addEventListener('click', () => {
        pauseCarouselBriefly();
        goToSlide(currentIndex - 1);
    });

    featuredNext.addEventListener('click', () => {
        pauseCarouselBriefly();
        goToSlide(currentIndex + 1);
    });

    featuredTrack.addEventListener('pointerdown', (e) => {
        startX = e.clientX;
        isDragging = true;
        userHold = true;
        stopAutoRotate();
    });

    featuredTrack.addEventListener('pointerup', (e) => {
        if (!isDragging) return;
        const delta = e.clientX - startX;
        if (Math.abs(delta) > 50) {
            if (delta < 0) goToSlide(currentIndex + 1);
            else goToSlide(currentIndex - 1);
        }
        isDragging = false;
        userHold = false;
        scheduleAutoRotate();
    });

    featuredTrack.addEventListener('pointerleave', () => {
        isDragging = false;
        userHold = false;
        scheduleAutoRotate();
    });

    window.addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
        pauseCarouselBriefly();
        if (e.key === 'ArrowLeft') goToSlide(currentIndex - 1);
        if (e.key === 'ArrowRight') goToSlide(currentIndex + 1);
    });

    if (featuredViewport) {
        featuredViewport.addEventListener('mouseenter', () => {
            userHold = true;
            stopAutoRotate();
        });
        featuredViewport.addEventListener('mouseleave', () => {
            userHold = false;
            scheduleAutoRotate();
        });
        featuredViewport.addEventListener('focusin', () => {
            userHold = true;
            stopAutoRotate();
        });
        featuredViewport.addEventListener('focusout', () => {
            userHold = false;
            scheduleAutoRotate();
        });
    }

    videoIframes.forEach((iframe, index) => {
        iframe.id = iframe.id || `showcaseVideo${index + 1}`;
        iframe.addEventListener('focus', () => {
            iframeFocusHold = true;
            stopAutoRotate();
        });
        iframe.addEventListener('blur', () => {
            iframeFocusHold = false;
            scheduleAutoRotate(2400);
        });
    });

    function setupYouTubePlayers() {
        if (!window.YT || !window.YT.Player) return;
        videoIframes.forEach((iframe) => {
            new window.YT.Player(iframe.id, {
                events: {
                    onStateChange(event) {
                        const state = event.data;
                        const playingStates = [window.YT.PlayerState.PLAYING, window.YT.PlayerState.BUFFERING];
                        const restingStates = [window.YT.PlayerState.ENDED, window.YT.PlayerState.PAUSED, window.YT.PlayerState.CUED];

                        if (playingStates.includes(state)) setVideoPlaying(iframe, true);
                        if (restingStates.includes(state)) setVideoPlaying(iframe, false);
                    }
                }
            });
        });
    }

    window.onYouTubeIframeAPIReady = setupYouTubePlayers;

    if (videoIframes.length > 0) {
        if (window.YT && window.YT.Player) {
            setupYouTubePlayers();
        } else {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            document.head.appendChild(tag);
        }
    }

    document.addEventListener('visibilitychange', () => {
        pageHidden = document.hidden;
        if (pageHidden) stopAutoRotate();
        else scheduleAutoRotate();
    });

    renderCarousel();
    startAutoRotate();
}

// Soundtrack player
const globalSoundtrack = document.getElementById('globalSoundtrack');
const globalSoundtrackSource = document.getElementById('globalSoundtrackSource');
const soundtrackTitle = document.getElementById('soundtrackTitle');
const trackButtons = document.querySelectorAll('.track-button');

trackButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (!globalSoundtrack || !globalSoundtrackSource || !soundtrackTitle) return;

        const src = button.getAttribute('data-src');
        const title = button.getAttribute('data-title');
        if (!src || !title) return;

        globalSoundtrack.pause();
        globalSoundtrackSource.src = src;
        globalSoundtrack.load();
        soundtrackTitle.textContent = title;

        trackButtons.forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

document.addEventListener('play', (event) => {
    if (!(event.target instanceof HTMLAudioElement)) return;
    document.querySelectorAll('audio').forEach((otherAudio) => {
        if (otherAudio !== event.target) otherAudio.pause();
    });
}, true);

// UI SFX from local assets
const hoverSfx = new Audio('assets/SFX/Hover.mp3');
const clickSfx = new Audio('assets/SFX/Click.mp3');
hoverSfx.preload = 'auto';
clickSfx.preload = 'auto';
hoverSfx.volume = 0.2;
clickSfx.volume = 0.28;

function playSfx(sound) {
    try {
        const sfx = sound.cloneNode();
        sfx.volume = sound.volume;
        sfx.play();
    } catch (_) {
        // no-op if browser blocks autoplay before first interaction
    }
}

function attachUiSfx() {
    const interactive = document.querySelectorAll('a, button');
    interactive.forEach(el => {
        el.addEventListener('mouseenter', () => playSfx(hoverSfx));
        el.addEventListener('click', () => playSfx(clickSfx));
    });
}

attachUiSfx();

// Interactive particle field
const particleCanvas = document.getElementById('fxParticles');
const pctx = particleCanvas ? particleCanvas.getContext('2d') : null;
const particleCount = 78;
const particles = [];
let lastTs = 0;
let scrollBoost = 0;
let lastScrollY = window.scrollY;
const pointer = { x: -9999, y: -9999, active: false };

function resizeParticles() {
    if (!particleCanvas) return;
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
}

function seedParticles() {
    if (!particleCanvas) return;
    particles.length = 0;
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * particleCanvas.width,
            y: Math.random() * particleCanvas.height,
            r: Math.random() * 1.8 + 0.5,
            vx: (Math.random() - 0.5) * 0.18,
            vy: (Math.random() - 0.5) * 0.16,
            a: Math.random() * 0.25 + 0.16
        });
    }
}

function drawLinks() {
    if (!pctx) return;
    const linkDistance = 92;
    for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const dist = Math.hypot(dx, dy);
            if (dist > linkDistance) continue;
            const alpha = (1 - dist / linkDistance) * 0.12;
            pctx.beginPath();
            pctx.moveTo(p1.x, p1.y);
            pctx.lineTo(p2.x, p2.y);
            pctx.strokeStyle = `rgba(246,114,128,${alpha})`;
            pctx.lineWidth = 0.7;
            pctx.stroke();
        }
    }
}

function drawParticles(ts) {
    if (!pctx || !particleCanvas) return;
    const dt = Math.min((ts - lastTs) / 16.67 || 1, 2);
    lastTs = ts;
    pctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

    const speedBoost = 1 + Math.min(scrollBoost, 1.4);
    particles.forEach(p => {
        if (pointer.active) {
            const dxp = pointer.x - p.x;
            const dyp = pointer.y - p.y;
            const d = Math.hypot(dxp, dyp) || 1;
            if (d < 170) {
                const pull = (1 - d / 170) * 0.05;
                p.vx += (dxp / d) * pull;
                p.vy += (dyp / d) * pull;
            }
        }

        p.vx *= 0.986;
        p.vy *= 0.986;
        p.x += p.vx * dt * speedBoost;
        p.y += p.vy * dt * speedBoost;

        if (p.x < -8) p.x = particleCanvas.width + 8;
        if (p.x > particleCanvas.width + 8) p.x = -8;
        if (p.y < -8) p.y = particleCanvas.height + 8;
        if (p.y > particleCanvas.height + 8) p.y = -8;

        pctx.beginPath();
        pctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        pctx.fillStyle = `rgba(246,114,128,${p.a})`;
        pctx.fill();
    });

    drawLinks();

    if (pointer.active) {
        const grd = pctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 110);
        grd.addColorStop(0, 'rgba(246,114,128,0.18)');
        grd.addColorStop(1, 'rgba(246,114,128,0)');
        pctx.beginPath();
        pctx.fillStyle = grd;
        pctx.arc(pointer.x, pointer.y, 110, 0, Math.PI * 2);
        pctx.fill();
    }

    scrollBoost *= 0.9;
    requestAnimationFrame(drawParticles);
}

window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    const delta = Math.abs(currentY - lastScrollY);
    lastScrollY = currentY;
    scrollBoost = Math.min(scrollBoost + delta * 0.0022, 2);
}, { passive: true });

window.addEventListener('pointermove', (e) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.active = true;
}, { passive: true });

window.addEventListener('pointerleave', () => {
    pointer.active = false;
});

resizeParticles();
seedParticles();
window.addEventListener('resize', () => {
    resizeParticles();
    seedParticles();
});
requestAnimationFrame(drawParticles);

const bootLoader = document.getElementById('bootLoader');
const bootSkip = document.getElementById('bootSkip');

function finishBoot() {
    if (!bootLoader) return;

    bootLoader.classList.add('is-hidden');

    setTimeout(() => {
        bootLoader.remove();
    }, 300);
}

if (bootSkip) {
    bootSkip.addEventListener('click', finishBoot);
}

// Automatically finish loading after the progress animation
window.addEventListener('load', () => {
    setTimeout(finishBoot, 1400);
});