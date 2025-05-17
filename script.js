document.addEventListener('DOMContentLoaded', function() {
    // Language switching
    const langEn = document.getElementById('lang-en');
    const langRu = document.getElementById('lang-ru');
    
    const englishText = {
        mainTitle: "Online Quiz System - DBMS Journey",
        subtitle: "PostgreSQL Assignments Showcase",
        reflectionTitle: "My SQL Journey Reflection",
        reflectionText1: "During my work on SQL assignments...",
        reflectionText2: "Each assignment gave me new knowledge...",
        reflectionText3: "These 6 assignments helped me...",
        reflectionText4: "THANK YOU 😊<br>p/s<br>Sagacious AKADIL",
        viewerTitle: "Assignment Viewer"
    };
    
    const russianText = {
        mainTitle: "Online Quiz System - Путешествие в DBMS",
        subtitle: "Демонстрация заданий PostgreSQL",
        reflectionTitle: "Размышления о моём SQL-путешествии",
        reflectionText1: "В ходе работы над заданиями по SQL...",
        reflectionText2: "Каждое из заданий дало мне...",
        reflectionText3: "Эти 6 заданий помогли мне...",
        reflectionText4: "СПАСИБО ВАМ 😊<br>p/s<br>Мудрый AKADIL",
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
        
        langEn.classList.toggle('active', lang === 'en');
        langRu.classList.toggle('active', lang === 'ru');
    }
    
    langEn.addEventListener('click', () => setLanguage('en'));
    langRu.addEventListener('click', () => setLanguage('ru'));
    
    // Assignment viewer
    const assignmentCards = document.querySelectorAll('.assignment-card');
    const assignmentViewer = document.getElementById('viewer');
    const closeViewer = document.getElementById('close-viewer');
    const pdfViewer = document.getElementById('pdf-viewer');
    const imageViewer = document.getElementById('image-viewer');
    
    assignmentCards.forEach(card => {
        card.addEventListener('click', function() {
            const assignmentNum = this.getAttribute('data-assignment');
            const type = this.getAttribute('data-type');
            
            if (type === 'image') {
                imageViewer.src = `ass${assignmentNum}.png`;
                imageViewer.style.display = 'block';
                pdfViewer.style.display = 'none';
            } else {
                pdfViewer.src = `ass${assignmentNum}.pdf#toolbar=0&navpanes=0&scrollbar=0`;
                pdfViewer.style.display = 'block';
                imageViewer.style.display = 'none';
            }
            
            assignmentViewer.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeViewer.addEventListener('click', function() {
        assignmentViewer.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close viewer when clicking outside content
    assignmentViewer.addEventListener('click', function(e) {
        if (e.target === assignmentViewer) {
            closeViewer.click();
        }
    });
    
    // Theme switcher
    const themeToggle = document.createElement('div');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.style.position = 'fixed';
    themeToggle.style.bottom = '20px';
    themeToggle.style.right = '20px';
    themeToggle.style.backgroundColor = 'var(--primary-color)';
    themeToggle.style.color = 'white';
    themeToggle.style.width = '50px';
    themeToggle.style.height = '50px';
    themeToggle.style.borderRadius = '50%';
    themeToggle.style.display = 'flex';
    themeToggle.style.alignItems = 'center';
    themeToggle.style.justifyContent = 'center';
    themeToggle.style.cursor = 'pointer';
    themeToggle.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    themeToggle.style.zIndex = '100';
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });
});
