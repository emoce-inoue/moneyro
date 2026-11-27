const triggerMenu = () => {
  const openButton = document.querySelector('.l-header__open-button');
  const closeButton = document.querySelector('.l-header__close-button');
  const dialog = document.querySelector('.l-menu');
  const dialogInner = document.querySelector('.l-menu__content');
  const isSP = window.matchMedia('(max-width: 767px)');

  if (!openButton || !closeButton || !dialog || !dialogInner) {
    return;
  }

  const openDialog = () => {
    if (!isSP.matches || dialog.open) {
      return;
    }

    dialog.show();
    dialog.classList.add('l-menu--open');
    openButton.setAttribute('aria-expanded', 'true');
  };

  const closeDialog = () => {
    if (!dialog.open) {
      return;
    }

    dialog.classList.remove('l-menu--open');
    dialog.close();

    openButton.setAttribute('aria-expanded', 'false');
    openButton.focus();
  };

  const handleOutsideClick = (e) => {
    if (!dialog.open) {
      return;
    }

    if (e.target instanceof Element) {
      if (!dialogInner.contains(e.target)) {
        closeDialog();
      }
    }
  };

  const handleEscapeKey = (e) => {
    if (e.key === 'Escape' && dialog.open) {
      e.preventDefault();
      closeDialog();
    }
  };

  const handleResize = () => {
    if (!isSP.matches && dialog.open) {
      dialog.close();
      dialog.classList.remove('l-menu--open');
      openButton.setAttribute('aria-expanded', 'false');
    }
  };

  dialog.addEventListener('click', handleOutsideClick);
  document.addEventListener('keydown', handleEscapeKey);

  openButton.addEventListener('click', openDialog);
  closeButton.addEventListener('click', closeDialog);

  dialog.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      closeDialog();
    });
  });

  isSP.addEventListener('change', handleResize);
};

const triggerCta = () => {
  const isSP = window.matchMedia('(max-width: 767px)').matches;

  if (isSP) {
    const cta = document.querySelector('.p-top__cta');
    const hero = document.querySelector('.p-top__hero');

    if (!cta || !hero) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        cta.classList.toggle('p-top__cta--active', !entry.isIntersecting);
      },
      {
        threshold: 0,
      },
    );

    observer.observe(hero);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  triggerMenu();
  triggerCta();
});
