(function () {
  let swiperInitInterval = setInterval(() => {
  if (typeof Swiper !== 'undefined') {
    const swiperContainer = document.querySelector('.swiper');
    if (swiperContainer && !swiperContainer.swiper) {
      new Swiper('.swiper', {
        navigation: {
          nextEl: '.swiper__next',
          prevEl: '.swiper__prev',
        },
        spaceBetween: 0,
        on: {
          init(swiper2) {
            const prevButtons = document.querySelectorAll('.swiper__prev');
            prevButtons.forEach(button => {
              button.classList.add('swiper-button-disabled');
            });
          },
        },
      });
      clearInterval(swiperInitInterval);
      swiperInitInterval = null;
    }
  }
}, 500);
  (function () {
    const tabs = document.querySelectorAll('.tabs button');
    const desktopContents = document.querySelectorAll('.tab-content.desktop');
    const mobileContents = document.querySelectorAll('.tab-content.mobile');
    const hideAllTabs = () => {
      [...desktopContents, ...mobileContents].forEach(
        content => (content.style.display = 'none')
      );
      tabs.forEach(tab => tab.classList.remove('active'));
    };
    const showTab = targetId => {
      hideAllTabs();
      const isMobile = window.matchMedia('(max-width: 767px)').matches;
      const targetContent = isMobile
        ? document.getElementById(`${targetId}-mobile`)
        : document.getElementById(`${targetId}-desktop`);
      if (targetContent) {
        targetContent.style.display = 'block';
      }
      const activeTab = [...tabs].find(tab => tab.dataset.target === targetId);
      if (activeTab) {
        activeTab.classList.add('active');
        if (isMobile) {
          activeTab.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center',
          });
        }
      }
    };
    if (tabs.length > 0) {
      const firstTabId = tabs[0].dataset.target;
      showTab(firstTabId);
    }
    tabs.forEach(tab => {
      tab.addEventListener('click', () => showTab(tab.dataset.target));
    });
    window.addEventListener('resize', () => {
      const activeTab = document.querySelector('.tabs button.active');
      if (activeTab) {
        showTab(activeTab.dataset.target);
      }
    });
  })();
})();
