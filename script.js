// Initialize Lucide Icons
lucide.createIcons();

// Sticky Navbar Background
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Stop observing once visible
        }
    });
}, observerOptions);

const fadeElements = document.querySelectorAll('.fade-up');
fadeElements.forEach(el => observer.observe(el));

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Toggle icon between menu and x
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    });

    // Close mobile menu when a link is clicked
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.querySelector('i').setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        });
    });
}

// Read More functionality
const readMoreBtn = document.getElementById('readMoreBtn');
const fullArticle = document.getElementById('fullArticle');

if (readMoreBtn && fullArticle) {
    readMoreBtn.addEventListener('click', () => {
        fullArticle.classList.toggle('expanded');

        const btnText = readMoreBtn.querySelector('span');
        const icon = readMoreBtn.querySelector('i');

        if (fullArticle.classList.contains('expanded')) {
            btnText.textContent = 'Read less';
            icon.setAttribute('data-lucide', 'chevron-up');
        } else {
            btnText.textContent = 'Read more about Teekoy';
            icon.setAttribute('data-lucide', 'chevron-down');
        }
        lucide.createIcons();
    });
}

// Trip Plan Expand Hook
function toggleTripPlan() {
    const article = document.getElementById('tripPlanArticle');
    const btnText = document.getElementById('tripPlanBtnText');
    const icon = document.getElementById('tripPlanIcon');

    if (!article) return;

    article.classList.toggle('expanded');

    if (article.classList.contains('expanded')) {
        btnText.textContent = 'Hide Itinerary';
        icon.setAttribute('data-lucide', 'chevron-up');
    } else {
        btnText.textContent = 'View Full Itinerary';
        icon.setAttribute('data-lucide', 'map');
    }
    
    // Re-initialize the icon so it updates correctly
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

// Weather Widget Logic
async function fetchWeather() {
    const teekoyEl = document.querySelector('#weather-teekoy .temp');
    const vagamonEl = document.querySelector('#weather-vagamon .temp');
    const teekoyContainer = document.querySelector('#weather-teekoy .icon-container');
    const vagamonContainer = document.querySelector('#weather-vagamon .icon-container');

    if (!teekoyEl || !vagamonEl) return;

    try {
        // Fetch using two completely separate requests to ensure Open-Meteo does not blend coordinates
        // Teekoy is lowland (elevation ~70m), Vagamon is highland (elevation ~1100m)
        const [resTeekoy, resVagamon] = await Promise.all([
            fetch('https://api.open-meteo.com/v1/forecast?latitude=9.7002&longitude=76.8044&current=temperature_2m,weather_code&elevation=70'),
            fetch('https://api.open-meteo.com/v1/forecast?latitude=9.6800&longitude=76.9056&current=temperature_2m,weather_code&elevation=1100')
        ]);
        
        const teekoyData = await resTeekoy.json();
        const vagamonData = await resVagamon.json();

        const tTemp = teekoyData.current.temperature_2m;
        const vTemp = vagamonData.current.temperature_2m;
        
        const tCode = teekoyData.current.weather_code;
        const vCode = vagamonData.current.weather_code;

        teekoyEl.textContent = `${Math.round(tTemp)}°C`;
        vagamonEl.textContent = `${Math.round(vTemp)}°C`;

        teekoyContainer.innerHTML = `<i data-lucide="${getWeatherIcon(tCode)}" style="width: 20px; height: 20px;"></i>`;
        vagamonContainer.innerHTML = `<i data-lucide="${getWeatherIcon(vCode)}" style="width: 20px; height: 20px;"></i>`;

        lucide.createIcons();
    } catch (error) {
        console.error('Error fetching weather:', error);
        teekoyEl.textContent = '--°C';
        vagamonEl.textContent = '--°C';
        teekoyContainer.innerHTML = `<i data-lucide="cloud-off" style="width: 20px; height: 20px;"></i>`;
        vagamonContainer.innerHTML = `<i data-lucide="cloud-off" style="width: 20px; height: 20px;"></i>`;
        lucide.createIcons();
    }
}

function getWeatherIcon(wmoCode) {
    // Basic WMO Code mapping to Lucide icons
    if (wmoCode === 0) return 'sun'; // Clear
    else if (wmoCode >= 1 && wmoCode <= 3) return 'cloud-sun'; // Partly cloudy
    else if (wmoCode >= 45 && wmoCode <= 48) return 'cloud-fog'; // Fog
    else if (wmoCode >= 51 && wmoCode <= 67) return 'cloud-rain'; // Rain/Drizzle
    else if (wmoCode >= 71 && wmoCode <= 77) return 'snowflake'; // Snow
    else if (wmoCode >= 80 && wmoCode <= 82) return 'cloud-lightning'; // Showers
    else if (wmoCode >= 95) return 'cloud-lightning'; // Thunderstorm
    else return 'cloud'; // Default
}

// Call on load
document.addEventListener('DOMContentLoaded', () => {
    fetchWeather();
    
    // Initialize Swiper Coverflow Carousel
    const swiper = new Swiper('.explore-swiper', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
            rotate: 20,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: true,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        loop: true,
        loopedSlides: 5,
        speed: 800,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        }
    });
});
