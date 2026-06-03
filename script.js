document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. スマホ用ハンバーガーメニュー制御
  // ==========================================================================
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const headerNav = document.getElementById('header-nav');
  const navLinks = document.querySelectorAll('.header__link');

  const toggleMenu = () => {
    const isOpen = headerNav.classList.toggle('is-open');
    hamburgerBtn.classList.toggle('is-open');
    hamburgerBtn.setAttribute('aria-expanded', isOpen);
    
    // メニューが開いているときは背面のスクロールを禁止
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const closeMenu = () => {
    headerNav.classList.remove('is-open');
    hamburgerBtn.classList.remove('is-open');
    hamburgerBtn.setAttribute('aria-expanded', false);
    document.body.style.overflow = '';
  };

  hamburgerBtn.addEventListener('click', toggleMenu);

  // リンククリック時にメニューを閉じる
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // ==========================================================================
  // 2. ヘッダーのスクロールエフェクト
  // ==========================================================================
  const header = document.getElementById('header');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('header--scrolled');
      // CSS側で微調整できるようにクラスを付与
      header.style.padding = '10px 0';
      header.style.boxShadow = 'var(--shadow-medium)';
    } else {
      header.classList.remove('header--scrolled');
      header.style.padding = '';
      header.style.boxShadow = 'var(--shadow-light)';
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // 初期読み込み時にも適用

  // ==========================================================================
  // 3. スクロールアニメーション (Intersection Observer)
  // ==========================================================================
  // 浮き上がらせたい要素を自動選定し、revealクラスを付与する
  const animatedElements = [
    '.section-title',
    '.about__content',
    '.about__visual',
    '.feature-card',
    '.work-card',
    '.staff-card',
    '.flow__step',
    '.contact-box'
  ];

  animatedElements.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.classList.add('reveal');
    });
  });

  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-active');
        observer.unobserve(entry.target); // 一度表示されたら監視を終了
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, {
    root: null, // ビューポートを基準
    threshold: 0.15, // 15%見えたらトリガー
    rootMargin: '0px 0px -50px 0px' // 少し早めにトリガー
  });

  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });

  // ==========================================================================
  // 4. スムーススクロールの調整
  // ==========================================================================
  // 固定ヘッダーの高さ分を考慮してスクロール位置を調整
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
