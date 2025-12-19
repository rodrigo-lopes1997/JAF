// Historia Timeline Scroll Animation

document.addEventListener('DOMContentLoaded', function() {
    // Get all timeline entries
    const timelineEntries = document.querySelectorAll('.timeline-entry');
    const progressLine = document.querySelector('.timeline-progress-line');
    const timelineContainer = document.querySelector('.timeline-container');
    const timelineSection = document.querySelector('.history-scroll-section');

    // Configuration for Intersection Observer
    const observerOptions = {
        root: null, // Use viewport as root
        rootMargin: '0px 0px -100px 0px', // Trigger slightly before element enters viewport
        threshold: 0.2 // Trigger when 20% of element is visible
    };

    // Create the Intersection Observer
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class to trigger animation
                entry.target.classList.add('visible');
            } else {
                // Remove class so animations retrigger when scrolling back
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    // Observe each timeline entry
    timelineEntries.forEach(entry => {
        observer.observe(entry);
    });

    // Update progress line and add parallax effect on scroll
    let ticking = false;

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateProgressLine();
                parallaxEffect();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Update progress line based on scroll position
    function updateProgressLine() {
        if (!progressLine || !timelineContainer || !timelineSection) return;

        const sectionTop = timelineSection.offsetTop;
        const sectionHeight = timelineSection.offsetHeight;
        const containerTop = timelineContainer.offsetTop;
        const containerHeight = timelineContainer.offsetHeight;
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;

        // Calculate how far we've scrolled into the section
        const scrollStart = sectionTop - windowHeight / 2;
        const scrollEnd = sectionTop + sectionHeight - windowHeight / 2;
        const scrollProgress = (scrolled - scrollStart) / (scrollEnd - scrollStart);

        // Clamp between 0 and 1
        const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

        // Update the line height
        const lineHeight = containerHeight * clampedProgress;
        progressLine.style.height = `${lineHeight}px`;
    }

    // Initial call to set the line height
    updateProgressLine();

    // Update on window resize
    window.addEventListener('resize', function() {
        updateProgressLine();
    });

    function parallaxEffect() {
        const scrolled = window.pageYOffset;
        const timelineSection = document.querySelector('.history-scroll-section');

        if (timelineSection) {
            const sectionTop = timelineSection.offsetTop;
            const sectionHeight = timelineSection.offsetHeight;

            // Only apply parallax when section is in view
            if (scrolled + window.innerHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
                timelineEntries.forEach((entry, index) => {
                    const entryTop = entry.offsetTop;
                    const entryOffset = scrolled - entryTop;

                    // Apply subtle parallax to images
                    const images = entry.querySelectorAll('.timeline-images img');
                    images.forEach((img, imgIndex) => {
                        const speed = 0.05 + (imgIndex * 0.02);
                        const yPos = -(entryOffset * speed);
                        img.style.transform = `translateY(${yPos}px)`;
                    });
                });
            }
        }
    }
});
