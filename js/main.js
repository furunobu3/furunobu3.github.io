/* ===========================
   介護施設選びブログ - メインJS
   =========================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ── ハンバーガーメニュー ── */
  const toggle = document.getElementById('navToggle');
  const nav    = document.getElementById('siteNav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // メニュー外クリックで閉じる
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── スムーズスクロール（アンカーリンク） ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // モバイルメニューを閉じる
        if (nav) nav.classList.remove('is-open');
      }
    });
  });

  /* ── 読了時間の目安を挿入 ── */
  const postContent = document.querySelector('.post-content');
  const readTimeEl  = document.getElementById('readTime');
  if (postContent && readTimeEl) {
    const wordCount = postContent.innerText.length;
    const minutes   = Math.max(1, Math.round(wordCount / 400)); // 日本語は400字/分
    readTimeEl.textContent = `読了時間の目安：約 ${minutes} 分`;
  }

  /* ── 目次の自動生成（記事ページ） ── */
  const tocList = document.getElementById('tocList');
  if (tocList && postContent) {
    const headings = postContent.querySelectorAll('h2, h3');
    if (headings.length > 0) {
      headings.forEach((heading, i) => {
        const id = `heading-${i}`;
        heading.id = id;
        const li = document.createElement('li');
        const a  = document.createElement('a');
        a.href = `#${id}`;
        a.textContent = heading.textContent;
        if (heading.tagName === 'H3') li.style.paddingLeft = '1em';
        li.appendChild(a);
        tocList.appendChild(li);
      });
      document.getElementById('tocWidget').style.display = 'block';
    }
  }

  /* ── スクロールトップボタン ── */
  const scrollBtn = document.getElementById('scrollTop');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      scrollBtn.classList.toggle('visible', window.scrollY > 400);
    });
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── 現在ページのナビをハイライト ── */
  const currentPath = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a').forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === currentPath) {
      link.style.background = 'rgba(255,255,255,0.25)';
      link.style.fontWeight = '700';
    }
  });

});
