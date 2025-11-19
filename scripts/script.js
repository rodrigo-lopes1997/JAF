const cards = document.querySelectorAll(".card");

// Set first card as active by default, others as inactive
cards.forEach((card, index) => {
  if (index === 0) {
    card.classList.add("is-active");
    card.classList.remove("is-inactive");
  } else {
    card.classList.add("is-inactive");
    card.classList.remove("is-active");
  }
});

// Use event delegation for better performance
document.addEventListener("mouseenter", event => {
  const card = event.target.closest(".card");
  if (card) {
    cards.forEach(c => c.classList.remove("is-active"));
    cards.forEach(c => c.classList.add("is-inactive"));
    card.classList.add("is-active");
    card.classList.remove("is-inactive");
  }
}, true);

document.addEventListener("mouseleave", event => {
  const card = event.target.closest(".card");
  if (card) {
    // Reset to initial state: first card active, others inactive
    cards.forEach((c, index) => {
      if (index === 0) {
        c.classList.add("is-active");
        c.classList.remove("is-inactive");
      } else {
        c.classList.add("is-inactive");
        c.classList.remove("is-active");
      }
    });
  }
}, true);

document.addEventListener("click", event => {
    const card = event.target.closest(".card");
    if (card) {
        cards.forEach(c => c.classList.add("is-active"));
    }
}, true);

/* const heroVideo = document.getElementById("hero-video");

if (heroVideo) {
    heroVideo.addEventListener("mouseenter", () => {
        heroVideo.classList.add("is-hovered");
        const parentCol = heroVideo.closest(".col-md-6");
        if (parentCol) {
            parentCol.classList.remove("col-md-6");
            parentCol.classList.add("col-md-12");
        }
        const imageHeroCol6 = document.querySelector(".imageHeroCol6");
        if (imageHeroCol6) {
            imageHeroCol6.style.display = "none";
        }
    });

    heroVideo.addEventListener("mouseleave", () => {
        heroVideo.classList.remove("is-hovered");
        const parentCol = heroVideo.closest(".col-md-12");
        if (parentCol) {
            parentCol.classList.remove("col-md-12");
            parentCol.classList.add("col-md-6");
        }
        const imageHeroCol6 = document.querySelector(".imageHeroCol6");
        if (imageHeroCol6) {
            imageHeroCol6.style.display = "";
        }
    });
} */

// ============================================
// Menu Functionality
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Get menu elements
    const menuOverlay = document.getElementById('menuOverlay');
    const menuOpenBtn = document.querySelector('.btn_verde');
    const menuCloseBtn = document.getElementById('menuClose');
    const menuItems = document.querySelectorAll('.menu-item');
    const submenuContents = document.querySelectorAll('.submenu-content');
    const menuUnderline = document.getElementById('menuUnderline');
    const menuImages = document.querySelectorAll('.menu-image');
    const body = document.body;

    // Underline images for each menu item
    const underlineImages = {
        'empresa': 'assets/menu-underline-empresa.svg',
        'areas': 'assets/menu-underline-areas.svg',
        'sustentabilidade': 'assets/menu-underline-sustentabilidade.svg',
        'contactos': 'assets/menu-underline-contactos.svg'
    };

    // Function to update underline position and style
    function updateUnderline(menuItem) {
        const menuId = menuItem.getAttribute('data-menu');
        const span = menuItem.querySelector('span');
        const spanRect = span.getBoundingClientRect();
        const menuListRect = menuItem.closest('.menu-list').getBoundingClientRect();

        // Calculate position relative to menu list
        const top = spanRect.top - menuListRect.top + spanRect.height + 2;
        const left = spanRect.left - menuListRect.left;

        // Set underline image
        menuUnderline.style.backgroundImage = `url('${underlineImages[menuId]}')`;
        menuUnderline.style.top = top + 'px';
        menuUnderline.style.left = left + 'px';
        menuUnderline.style.width = spanRect.width + 'px'; // Full width of text
        menuUnderline.classList.add('active');
    }

    // Function to update menu image based on selected menu
    function updateMenuImage(menuId) {
        // Hide all images
        menuImages.forEach(image => {
            image.classList.remove('active');
        });

        // Show the image corresponding to the selected menu
        const imageToShow = document.querySelector(`.menu-image[data-menu-image="${menuId}"]`);
        if (imageToShow) {
            imageToShow.classList.add('active');
        }
    }

    // Function to open menu
    function openMenu() {
        menuOverlay.classList.add('active');
        body.classList.add('menu-open');

        // Set first menu item as active by default
        if (!document.querySelector('.menu-item.active')) {
            menuItems[0].classList.add('active');
            const firstSubmenu = menuItems[0].getAttribute('data-menu');
            document.getElementById(`submenu-${firstSubmenu}`).classList.add('active');
            updateUnderline(menuItems[0]);
            updateMenuImage(firstSubmenu);
        }
    }

    // Function to close menu
    function closeMenu() {
        menuOverlay.classList.remove('active');
        body.classList.remove('menu-open');
    }

    // Function to switch submenu
    function switchSubmenu(menuItem) {
        // Remove active class from all menu items and submenus
        menuItems.forEach(item => item.classList.remove('active'));
        submenuContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked menu item
        menuItem.classList.add('active');

        // Get menu ID
        const submenuId = menuItem.getAttribute('data-menu');

        // Update underline
        updateUnderline(menuItem);

        // Update menu image
        updateMenuImage(submenuId);

        // Show corresponding submenu
        const submenuToShow = document.getElementById(`submenu-${submenuId}`);
        if (submenuToShow) {
            submenuToShow.classList.add('active');
        }
    }

    // Event Listeners
    if (menuOpenBtn) {
        menuOpenBtn.addEventListener('click', openMenu);
    }

    if (menuCloseBtn) {
        menuCloseBtn.addEventListener('click', closeMenu);
    }

    // Menu item click handlers
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            switchSubmenu(this);
        });
    });

    // Close menu when clicking outside (on overlay background)
    menuOverlay.addEventListener('click', function(e) {
        if (e.target === menuOverlay) {
            closeMenu();
        }
    });

    // Close menu on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
            closeMenu();
        }
    });
});

// ============================================
// Mission Title Scroll Reveal Animation
// ============================================

function initMissionTitleReveal() {
    const missionTitle = document.querySelector('.mission-title');
    const missionLines = document.querySelectorAll('.mission-line');

    if (!missionTitle || missionLines.length === 0) return;

    function updateMissionTitleReveal() {
        const rect = missionTitle.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate when element is in viewport
        const elementTop = rect.top;
        const elementBottom = rect.bottom;

        // Start revealing earlier - when element enters viewport
        const startReveal = windowHeight * 1.0; // Start when element enters bottom of viewport
        const endReveal = windowHeight * 0.2;   // Complete when 20% down the viewport

        if (elementBottom < 0 || elementTop > windowHeight) {
            // Element is out of viewport
            return;
        }

        // Calculate overall reveal progress (0 to 1)
        let progress = 0;

        if (elementTop < startReveal && elementTop > endReveal) {
            progress = (startReveal - elementTop) / (startReveal - endReveal);
        } else if (elementTop <= endReveal) {
            progress = 1;
        }

        // Clamp progress between 0 and 1
        progress = Math.max(0, Math.min(1, progress));

        // Animate each line sequentially
        const linesCount = missionLines.length;
        const progressPerLine = 1 / linesCount;

        missionLines.forEach((line, index) => {
            // Calculate progress for this specific line
            const lineStartProgress = index * progressPerLine;
            const lineEndProgress = (index + 1) * progressPerLine;

            let lineProgress = 0;

            if (progress >= lineEndProgress) {
                lineProgress = 1;
            } else if (progress > lineStartProgress) {
                lineProgress = (progress - lineStartProgress) / progressPerLine;
            }

            // Update background position for this line (from 100% 0 to 0% 0)
            const backgroundPosition = 100 - (lineProgress * 100);
            line.style.backgroundPosition = `${backgroundPosition}% 0`;
        });
    }

    // Update on scroll
    window.addEventListener('scroll', updateMissionTitleReveal);

    // Update on resize
    window.addEventListener('resize', updateMissionTitleReveal);

    // Initial update
    updateMissionTitleReveal();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMissionTitleReveal);
} else {
    initMissionTitleReveal();
}