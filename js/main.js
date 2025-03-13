// Обработка кнопок звонка
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('secondary')) {
            // Кнопка "Узнать стоимость" - прокрутка к услугам
            document.querySelector('.services').scrollIntoView({
                behavior: 'smooth'
            });
        } else if (!button.closest('a[href^="tel:"]')) {
            // Кнопка вызова врача - звонок (если это не ссылка на телефон)
            window.location.href = 'tel:+79938860988';
        }
    });
});

// Плавная прокрутка для навигации
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Анимация появления элементов при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Наблюдаем только один раз
        }
    });
}, observerOptions);

// Наблюдаем за всеми элементами, которые должны анимироваться
document.querySelectorAll('.feature-card, .service-card, .location-card, .license-image').forEach(card => {
    observer.observe(card);
});

// Добавляем эффект увеличения для изображений лицензий
document.querySelectorAll('.license-image').forEach(image => {
    image.addEventListener('click', function() {
        // Создаем модальное окно для просмотра лицензии в полном размере
        const modal = document.createElement('div');
        modal.classList.add('license-modal');
        
        const modalContent = document.createElement('div');
        modalContent.classList.add('license-modal-content');
        
        const fullImage = document.createElement('img');
        fullImage.src = this.src;
        fullImage.alt = this.alt;
        
        const closeButton = document.createElement('span');
        closeButton.classList.add('license-modal-close');
        closeButton.innerHTML = '&times;';
        closeButton.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modalContent.appendChild(closeButton);
        modalContent.appendChild(fullImage);
        modal.appendChild(modalContent);
        
        document.body.appendChild(modal);
        
        // Закрытие модального окна при клике вне изображения
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    });
});

// Добавляем стили для модального окна
const style = document.createElement('style');
style.textContent = `
    .license-modal {
        display: flex;
        position: fixed;
        z-index: 9999;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.9);
        align-items: center;
        justify-content: center;
    }
    
    .license-modal-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .license-modal-content img {
        max-width: 100%;
        max-height: 90vh;
        display: block;
        margin: 0 auto;
        box-shadow: 0 0 20px rgba(255,255,255,0.2);
    }
    
    .license-modal-close {
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 40px;
        font-weight: bold;
        cursor: pointer;
    }
    
    .visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Добавляем эффект "липкого" хедера с анимацией
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 200) {
        // Прокрутка вниз - скрываем хедер
        header.style.transform = 'translateY(-100%)';
    } else {
        // Прокрутка вверх - показываем хедер
        header.style.transform = 'translateY(0)';
    }
    
    // Добавляем тень при прокрутке
    if (scrollTop > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollTop = scrollTop;
});

// Добавляем анимацию для телефона, чтобы привлечь внимание
const phoneElement = document.querySelector('.phone');
setInterval(() => {
    phoneElement.classList.add('phone-attention');
    setTimeout(() => {
        phoneElement.classList.remove('phone-attention');
    }, 1000);
}, 5000);

// Добавляем стиль для анимации телефона
const phoneStyle = document.createElement('style');
phoneStyle.textContent = `
    .phone-attention {
        animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
    }
    
    @keyframes shake {
        10%, 90% { transform: translate3d(-1px, 0, 0); }
        20%, 80% { transform: translate3d(2px, 0, 0); }
        30%, 50%, 70% { transform: translate3d(-3px, 0, 0); }
        40%, 60% { transform: translate3d(3px, 0, 0); }
    }
`;
document.head.appendChild(phoneStyle);

document.addEventListener('DOMContentLoaded', function() {
    // Переменные
    const header = document.querySelector('.header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    const scrollTopBtn = document.querySelector('.scroll-top');
    const privacyLink = document.querySelector('.privacy-link');
    const privacyModal = document.getElementById('privacyModal');
    const modalClose = document.querySelector('.modal-close');

    // Обработка прокрутки страницы
    window.addEventListener('scroll', function() {
        // Добавление класса для хедера при прокрутке
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Показать/скрыть кнопку прокрутки вверх
        if (scrollTopBtn) {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }

        // Активация пунктов меню при прокрутке
        updateActiveNavLink();
    });

    // Мобильное меню
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Закрытие мобильного меню при клике на ссылку
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Плавная прокрутка к якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Обработка модального окна политики конфиденциальности
    if (privacyLink && privacyModal && modalClose) {
        privacyLink.addEventListener('click', function(e) {
            e.preventDefault();
            privacyModal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Запретить прокрутку страницы
        });
        
        modalClose.addEventListener('click', function() {
            privacyModal.classList.remove('show');
            document.body.style.overflow = ''; // Разрешить прокрутку страницы
        });
        
        privacyModal.addEventListener('click', function(e) {
            if (e.target === privacyModal) {
                privacyModal.classList.remove('show');
                document.body.style.overflow = ''; // Разрешить прокрутку страницы
            }
        });
        
        // Закрытие по Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && privacyModal.classList.contains('show')) {
                privacyModal.classList.remove('show');
                document.body.style.overflow = ''; // Разрешить прокрутку страницы
            }
        });
    }

    // Обновление активного пункта меню
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + header.offsetHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === '#' + sectionId) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    // Анимация появления элементов при прокрутке
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkAnimations() {
        const triggerBottom = window.innerHeight * 0.8;
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('animated');
            }
        });
    }
    
    window.addEventListener('scroll', checkAnimations);
    checkAnimations(); // Проверка при загрузке страницы
});

// Обработка отправки формы
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получаем данные формы
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();
        const privacy = document.getElementById('privacy').checked;
        
        // Валидация данных
        let isValid = true;
        let errorMessage = '';
        
        if (!name) {
            isValid = false;
            errorMessage += 'Пожалуйста, укажите ваше имя.\n';
            document.getElementById('name').classList.add('error');
        } else {
            document.getElementById('name').classList.remove('error');
        }
        
        if (!phone) {
            isValid = false;
            errorMessage += 'Пожалуйста, укажите ваш телефон.\n';
            document.getElementById('phone').classList.add('error');
        } else if (!/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(phone)) {
            isValid = false;
            errorMessage += 'Пожалуйста, укажите телефон в формате +7 (XXX) XXX-XX-XX.\n';
            document.getElementById('phone').classList.add('error');
        } else {
            document.getElementById('phone').classList.remove('error');
        }
        
        if (!privacy) {
            isValid = false;
            errorMessage += 'Необходимо согласие на обработку персональных данных.\n';
        }
        
        if (!isValid) {
            alert(errorMessage);
            return;
        }
        
        // Имитация отправки данных на сервер
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.disabled = true;
        submitButton.textContent = 'Отправка...';
        
        // Имитация задержки отправки
        setTimeout(() => {
            // Очищаем форму
            contactForm.reset();
            
            // Показываем сообщение об успешной отправке
            alert('Спасибо за обращение! Мы свяжемся с вами в ближайшее время.');
            
            // Возвращаем кнопку в исходное состояние
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }, 1500);
    });
}

// Маска для телефона
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
        e.target.value = !x[2] ? x[1] : '+' + x[1] + ' (' + x[2] + ') ' + (x[3] ? x[3] + '-' + x[4] : (x[3] ? x[3] : '')) + (x[5] ? '-' + x[5] : '');
    });
}

// Обработка клика на кнопку прокрутки вверх
const scrollTopBtn = document.querySelector('.scroll-top');
if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
} 