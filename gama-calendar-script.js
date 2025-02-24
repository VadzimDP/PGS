(function () {
  fitty('.fit-text', {
    minSize: 12,
    maxSize: 34,
  });
  // calendar logic

  const initializeCalendarDays = () => {
    const startDate = new Date('2025-02-23');
    const currentDate = new Date();
    // const currentDate = new Date('2025-03-16');
    const timeDiff = currentDate - startDate;
    const daysPassed = Math.floor(timeDiff / (1000 * 3600 * 24)) + 1;
    const totalCalendarDays = 31;

    document.querySelectorAll('[data-popup-trigger]').forEach(dayElement => {
      const trigger = dayElement.getAttribute('data-popup-trigger');
      const dayNumber = parseInt(trigger.match(/\d+$/)[0]);

      dayElement.classList.remove('day-btn_prev_day', 'day-btn_current_day', 'day-btn_future_day');
      dayElement.style.pointerEvents = 'auto';

      if (currentDate < startDate) {
        dayElement.classList.add('day-btn_future_day');
        return;
      }

      if (dayNumber === daysPassed) {
        dayElement.classList.add('day-btn_current_day');
      } else if (dayNumber < daysPassed && dayNumber <= totalCalendarDays) {
        dayElement.classList.add('day-btn_prev_day');
      } else {
        dayElement.classList.add('day-btn_future_day');
        dayElement.style.pointerEvents = 'none';
      }
    });
  };

  // Event listeners for modals
  const bodyBlackout = document.querySelector('.popup-overlay');
  document.addEventListener('click', e => {
    const trigger = e.target.closest('[data-popup-trigger]');
    if (!trigger || trigger.classList.contains('day-btn_future_day')) return;

    const popupId = trigger.getAttribute('data-popup-trigger');
    const popupModal = document.querySelector(`[data-popup-modal="${popupId}"]`);

    if (popupModal) {
      document.querySelectorAll('.popup-modal').forEach(m => m.classList.remove('is--visible'));
      popupModal.classList.add('is--visible');
      bodyBlackout.classList.add('is-blacked-out');
      document.body.style.overflow = 'hidden';

      const button = popupModal.querySelector('.base-button');
      if (button) {
        button.classList.toggle('disabled', trigger.classList.contains('day-btn_prev_day'));
      }
    }
  });

  document.querySelectorAll('.popup-modal__close, .popup-overlay').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.popup-modal').forEach(m => m.classList.remove('is--visible'));
      bodyBlackout.classList.remove('is-blacked-out');
      document.body.style.overflow = 'initial';
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.popup-modal').forEach(m => m.classList.remove('is--visible'));
      bodyBlackout.classList.remove('is-blacked-out');
      document.body.style.overflow = 'initial';
    }
  });

  // Accordion functionality
  const initializeAccordions = () => {
    const accordions = document.querySelectorAll('.accordion');

    const openAccordion = accordion => {
      const content = accordion.querySelector('.accordion__content');
      accordion.classList.add('accordion__active');
      content.style.maxHeight = content.scrollHeight + 'px';
    };

    const closeAccordion = accordion => {
      const content = accordion.querySelector('.accordion__content');
      accordion.classList.remove('accordion__active');
      content.style.maxHeight = null;
    };

    accordions.forEach(accordion => {
      const intro = accordion.querySelector('.accordion__intro');
      const content = accordion.querySelector('.accordion__content');
      intro.onclick = () => {
        if (content.style.maxHeight) {
          closeAccordion(accordion);
        } else {
          accordions.forEach(accordion => closeAccordion(accordion));
          openAccordion(accordion);
        }
      };
    });
  };

  // DOM ready handlers
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initializeAccordions();
      initializeCalendarDays();
    });
  } else {
    initializeAccordions();
    initializeCalendarDays();
  }
})();