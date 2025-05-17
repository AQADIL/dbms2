document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#6a11cb"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.3,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#6a11cb",
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

    // Language switching functionality
    const langEn = document.getElementById('lang-en');
    const langRu = document.getElementById('lang-ru');
    
    // English translations
    const englishText = {
        mainTitle: "Online Quiz System - DBMS Mastery",
        subtitle: "PostgreSQL Assignments Showcase",
        reflectionTitle: "My SQL Journey Reflection",
        reflectionText1: "During my work on SQL assignments, I consistently completed 7 tasks, each of which expanded my skills in working with relational databases and queries in PostgreSQL. The first task involved using aggregate functions to analyze the maximum score by quiz difficulty levels. I particularly enjoyed using GROUP BY and ROUND, as well as sorting by descending average value - this allowed me to quickly determine how \"generous\" quizzes of different levels were.",
        reflectionText2: "Each assignment gave me new knowledge and pleasure from building competent, readable and efficient SQL queries. It was especially pleasant to format queries with explanations, turning code into a tool for data analysis and management.",
        reflectionText3: "These 6 assignments helped me comprehend the wisdom and features of working with databases. And I can confidently say that I'm already ready to work with large-scale projects.",
        reflectionText4: "THANK YOU 😊",
        viewerTitle: "Assignment Viewer"
    };
    
    // Russian translations
    const russianText = {
        mainTitle: "Online Quiz System - Путешествие в DBMS",
        subtitle: "Демонстрация заданий PostgreSQL",
        reflectionTitle: "Размышления о моём SQL-путешествии",
        reflectionText1: "В ходе работы над заданиями по SQL я последовательно выполнил 7 заданий, каждое из которых расширяло мои навыки в работе с реляционными базами данных и запросами в PostgreSQL. Первое задание заключалось в использовании агрегатной функции для анализа максимального балла по уровням сложности викторин. Мне особенно понравилось использовать GROUP BY и ROUND, а также сортировку по убыванию среднего значения — это позволило быстро определить, насколько \"щедры\" викторины разных уровней.",
        reflectionText2: "Каждое из заданий дало мне новые знания и удовольствие от построения грамотных, читаемых и эффективных SQL-запросов. Особенно приятно было оформлять запросы с пояснениями, превращая код в инструмент анализа и управления данными.",
        reflectionText3: "Эти 6 заданий помогли мне постичь мудрость и особенности работы с базами данных. И я с уверенностью могу заявить, что уже готов работать с масштабными проектами.",
        reflectionText4: "СПАСИБО ВАМ 😊",
        viewerTitle: "Просмотр задания"
    };
    
    function setLanguage(lang) {
        const texts = lang === 'en' ? englishText : russianText;
        
        document.getElementById('main-title').textContent = texts.mainTitle;
        document.getElementById('subtitle').textContent = texts.subtitle;
        document.getElementById('reflection-title').textContent = texts.reflectionTitle;
        document.getElementById('reflection-text-1').innerHTML = texts.reflectionText1;
        document.getElementById('reflection-text-2').innerHTML = texts.reflectionText2;
        document.getElementById('reflection-text-3').innerHTML = texts.reflectionText3;
        document.getElementById('reflection-text-4').innerHTML = texts.reflectionText4;
        document.getElementById('viewer-title').textContent = texts.viewerTitle;
        
        // Update active button
        if (lang === 'en') {
            langEn.classList.add('active');
            langRu.classList.remove('active');
        } else {
            langRu.classList.add('active');
            langEn.classList.remove('active');
        }
    }
    
    langEn.addEventListener('click', () => setLanguage('en'));
    langRu.addEventListener('click', () => setLanguage('ru'));

    // PDF Viewer functionality
    const assignmentCards = document.querySelectorAll('.assignment-card, .presentation-card');
    const assignmentViewer = document.getElementById('viewer');
    const closeViewer = document.getElementById('close-viewer');
    const fullscreenBtn = document.getElementById('fullscreen');
    const downloadBtn = document.getElementById('download');
    const zoomIn = document.getElementById('zoom-in');
    const zoomOut = document.getElementById('zoom-out');
    const zoomSlider = document.getElementById('zoom-slider');
    const zoomValue = document.getElementById('zoom-value');
    const prevPage = document.getElementById('prev-page');
    const nextPage = document.getElementById('next-page');
    const pageNum = document.getElementById('page-num');
    const pageCount = document.getElementById('page-count');
    
    let currentZoom = 150;
    let pdfInstance = null;
    let currentPage = 1;
    let currentAssignment = 1;
    let isFullscreen = false;

    // Initialize PDF.js
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

    function renderPDF(url, pageNum, scale) {
        const canvas = document.getElementById('pdf-canvas');
        const context = canvas.getContext('2d');
        
        // Show loading state
        canvas.innerHTML = '<div class="loading">Loading PDF...</div>';
        
        pdfjsLib.getDocument(url).promise.then(function(pdf) {
            pdfInstance = pdf;
            pageCount.textContent = pdf.numPages;
            
            return pdf.getPage(pageNum);
        }).then(function(page) {
            const viewport = page.getViewport({ scale: scale });
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            
            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            
            page.render(renderContext);
        }).catch(function(error) {
            console.error('PDF rendering error:', error);
            canvas.innerHTML = '<div class="error">Error loading PDF. Please try again.</div>';
        });
    }

    function updateZoom() {
        zoomValue.textContent = `${currentZoom}%`;
        zoomSlider.value = currentZoom;
        renderPDF(`ass${currentAssignment}.pdf`, currentPage, currentZoom / 100);
    }

    function goToPage(page) {
        if (page < 1) page = 1;
        if (page > pdfInstance.numPages) page = pdfInstance.numPages;
        
        currentPage = page;
        pageNum.textContent = currentPage;
        renderPDF(`ass${currentAssignment}.pdf`, currentPage, currentZoom / 100);
    }

    // Event listeners for assignments
    assignmentCards.forEach(card => {
        card.addEventListener('click', function() {
            currentAssignment = this.getAttribute('data-assignment') || 'presentation';
            currentPage = 1;
            currentZoom = 150;
            
            // Trigger confetti celebration
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
            
            renderPDF(`ass${currentAssignment}.pdf`, currentPage, currentZoom / 100);
            assignmentViewer.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Zoom controls
    zoomIn.addEventListener('click', () => {
        if (currentZoom < 300) {
            currentZoom += 10;
            updateZoom();
        }
    });

    zoomOut.addEventListener('click', () => {
        if (currentZoom > 50) {
            currentZoom -= 10;
            updateZoom();
        }
    });

    zoomSlider.addEventListener('input', () => {
        currentZoom = parseInt(zoomSlider.value);
        updateZoom();
    });

    // Page navigation
    prevPage.addEventListener('click', () => goToPage(currentPage - 1));
    nextPage.addEventListener('click', () => goToPage(currentPage + 1));

    // Fullscreen mode
    fullscreenBtn.addEventListener('click', function() {
        const elem = document.querySelector('.viewer-content');
        
        if (!isFullscreen) {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            }
            isFullscreen = true;
            fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            isFullscreen = false;
            fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
        }
    });

    // Download PDF
    downloadBtn.addEventListener('click', function() {
        const link = document.createElement('a');
        link.href = `ass${currentAssignment}.pdf`;
        link.download = `assignment-${currentAssignment}.pdf`;
        link.click();
    });

    // Close viewer
    closeViewer.addEventListener('click', function() {
        assignmentViewer.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Exit fullscreen if active
        if (isFullscreen && document.exitFullscreen) {
            document.exitFullscreen();
            isFullscreen = false;
            fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
        }
    });

    // Close viewer when clicking outside content
    assignmentViewer.addEventListener('click', function(e) {
        if (e.target === assignmentViewer) {
            closeViewer.click();
        }
    });

    // Theme switcher (dark/light mode)
    const themeToggle = document.createElement('div');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.style.position = 'fixed';
    themeToggle.style.bottom = '20px';
    themeToggle.style.right = '20px';
    themeToggle.style.backgroundColor = 'var(--primary-color)';
    themeToggle.style.color = 'white';
    themeToggle.style.width = '60px';
    themeToggle.style.height = '60px';
    themeToggle.style.borderRadius = '50%';
    themeToggle.style.display = 'flex';
    themeToggle.style.alignItems = 'center';
    themeToggle.style.justifyContent = 'center';
    themeToggle.style.cursor = 'pointer';
    themeToggle.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
    themeToggle.style.zIndex = '100';
    themeToggle.style.transition = 'var(--transition)';
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            themeToggle.style.backgroundColor = 'var(--primary-color)';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggle.style.backgroundColor = 'var(--secondary-color)';
        }
        
        // Add animation
        themeToggle.style.transform = 'scale(1.1)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 300);
    });

    // Add animations to cards
    assignmentCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
        
        // Add hover sound effect
        card.addEventListener('mouseenter', () => {
            const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.mp3');
            audio.volume = 0.2;
            audio.play();
        });
    });

    // Add smooth scroll to reflection section
    const reflectionSection = document.querySelector('.reflection-section');
    const reflectionLink = document.createElement('a');
    reflectionLink.href = '#reflection';
    reflectionLink.textContent = 'My Journey';
    reflectionLink.style.position = 'fixed';
    reflectionLink.style.bottom = '100px';
    reflectionLink.style.right = '20px';
    reflectionLink.style.backgroundColor = 'var(--accent-color)';
    reflectionLink.style.color = 'white';
    reflectionLink.style.padding = '12px 18px';
    reflectionLink.style.borderRadius = '30px';
    reflectionLink.style.textDecoration = 'none';
    reflectionLink.style.zIndex = '100';
    reflectionLink.style.boxShadow = '0 4px 15px rgba(255, 77, 77, 0.3)';
    reflectionLink.style.transition = 'var(--transition)';
    reflectionLink.addEventListener('mouseenter', () => {
        reflectionLink.style.transform = 'translateY(-5px) scale(1.05)';
    });
    reflectionLink.addEventListener('mouseleave', () => {
        reflectionLink.style.transform = 'translateY(0) scale(1)';
    });
    document.body.appendChild(reflectionLink);
    
    reflectionSection.id = 'reflection';

    // Easter egg - Konami code
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            
            if (konamiIndex === konamiCode.length) {
                // Trigger massive confetti celebration
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        confetti({
                            particleCount: 150,
                            spread: 100,
                            origin: { y: 0.6 }
                        });
                    }, i * 300);
                }
                
                // Play victory sound
                const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3');
                audio.volume = 0.3;
                audio.play();
                
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
});
