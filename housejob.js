
/* ── PARTICLES ── */
(function () {
    const wrap = document.getElementById('particles');
    const colors = ['#F7C5A0', '#ffffff', '#C9963A', '#a8d8e0'];
    for (let i = 0; i < 38; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 7 + 3;
        p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration:${Math.random() * 12 + 8}s;
      animation-delay:${Math.random() * 10}s;
    `;
        wrap.appendChild(p);
    }
})();

/* ── SCROLL REVEAL ── */
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

/* ── CONFETTI ── */
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let confettiBits = [];
let animId = null;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function spawnConfetti() {
    const colors = ['#F7C5A0', '#1B4F5A', '#C9963A', '#2a7388', '#ffffff', '#f9a8d4'];
    for (let i = 0; i < 180; i++) {
        confettiBits.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            w: Math.random() * 11 + 5,
            h: Math.random() * 6 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            angle: Math.random() * Math.PI * 2,
            spin: (Math.random() - 0.5) * 0.18,
            vx: (Math.random() - 0.5) * 3,
            vy: Math.random() * 3.5 + 1.5,
            alpha: 1,
        });
    }
}

function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiBits.forEach(b => {
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.angle);
        ctx.globalAlpha = b.alpha;
        ctx.fillStyle = b.color;
        ctx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h);
        ctx.restore();
        b.x += b.vx;
        b.y += b.vy;
        b.angle += b.spin;
        if (b.y > canvas.height * 0.75) b.alpha -= 0.012;
    });
    confettiBits = confettiBits.filter(b => b.alpha > 0);
    if (confettiBits.length > 0) animId = requestAnimationFrame(drawConfetti);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function celebrate() {
    const btn = document.getElementById('wish-btn');
    const msg = document.getElementById('celebration-msg');
    btn.disabled = true;
    btn.innerHTML = '🎊 Congratulations, Meri Jaan k totyy!';
    msg.style.display = 'block';
    if (animId) cancelAnimationFrame(animId);
    confettiBits = [];
    spawnConfetti();
    drawConfetti();
    // Re-enable after 4s
    setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = '🎉 Celebrate Again!';
    }, 6000);
}