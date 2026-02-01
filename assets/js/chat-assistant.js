/**
 * Kautilya Educational Academy - AI Navigation Assistant
 * Smart chat widget for helping users navigate the website
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        botName: 'KEA Assistant',
        schoolName: 'Kautilya Educational Academy',
        typingDelay: 800,
        messageDelay: 400
    };

    // Knowledge Base - Intents and Responses
    const KNOWLEDGE_BASE = {
        greetings: {
            patterns: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'namaste', 'namaskar'],
            responses: [
                `Hello! 👋 Welcome to ${CONFIG.schoolName}. How can I help you today?`,
                `Namaste! 🙏 I'm here to help you navigate our school website. What are you looking for?`,
                `Hi there! Welcome to KEA, Dewas. How may I assist you?`
            ],
            quickActions: ['Admissions', 'Contact Us', 'About School', 'Academics']
        },
        admissions: {
            patterns: ['admission', 'admissions', 'enroll', 'enrollment', 'registration', 'apply', 'join', 'seat', 'form'],
            responses: [
                `🎓 **Admissions 2026-27 are now open!**\n\nWe offer admissions from Nursery to Class XII (CBSE Board).\n\n📝 You can apply online or visit our campus.`,
            ],
            link: { text: 'Go to Admissions Page', url: '/pages/admissions.html' },
            quickActions: ['Fee Structure', 'Contact Admissions', 'Visit Campus']
        },
        fees: {
            patterns: ['fee', 'fees', 'cost', 'tuition', 'payment', 'scholarship', 'price'],
            responses: [
                `💰 For detailed fee structure, please visit our Admissions page or contact our office directly.\n\n📞 Call: 9926042015\n📧 Email: principalschool13@gmail.com`
            ],
            link: { text: 'View Admissions', url: '/pages/admissions.html' },
            quickActions: ['Contact Us', 'Admissions']
        },
        contact: {
            patterns: ['contact', 'phone', 'call', 'email', 'address', 'location', 'reach', 'visit', 'where'],
            responses: [
                `📍 **Contact Information**\n\n📞 Phone: 9926042015\n📧 Email: principalschool13@gmail.com\n\n📍 Address: Bhopal Road, Khatamba, Dewas 455001, Madhya Pradesh`
            ],
            link: { text: 'Visit Contact Page', url: '/pages/contact.html' },
            quickActions: ['Get Directions', 'Admissions']
        },
        academics: {
            patterns: ['academic', 'curriculum', 'syllabus', 'class', 'subject', 'cbse', 'study', 'course', 'education'],
            responses: [
                `📚 **Academic Programs**\n\nWe offer CBSE curriculum from Pre-Primary to Senior Secondary:\n\n• Pre-Primary (Nursery - KG)\n• Primary (Classes I - V)\n• Middle School (Classes VI - VIII)\n• Secondary (Classes IX - X)\n• Senior Secondary (Classes XI - XII)`
            ],
            link: { text: 'Explore Academics', url: '/pages/academics.html' },
            quickActions: ['Pre-Primary', 'Primary', 'Secondary']
        },
        facilities: {
            patterns: ['facility', 'facilities', 'campus', 'lab', 'library', 'playground', 'sports', 'infrastructure', 'building'],
            responses: [
                `🏫 **Our Campus Facilities**\n\n• Modern Classrooms\n• Science & Computer Labs\n• Well-stocked Library\n• Sports Facilities\n• Auditorium\n• Safe & Secure Environment`
            ],
            link: { text: 'Explore Campus', url: '/pages/campus.html' },
            quickActions: ['Virtual Tour', 'Contact Us']
        },
        teachers: {
            patterns: ['teacher', 'faculty', 'staff', 'job', 'career', 'vacancy', 'hiring', 'work', 'employment', 'apply job'],
            responses: [
                `👩‍🏫 **Career Opportunities**\n\nWe're always looking for passionate educators to join our team!\n\nTo apply for teaching positions, please send your resume to:\n📧 principalschool13@gmail.com\n\nOr visit our campus with your documents.`
            ],
            link: { text: 'Contact HR', url: '/pages/contact.html' },
            quickActions: ['Contact Us', 'About School']
        },
        about: {
            patterns: ['about', 'history', 'vision', 'mission', 'principal', 'management', 'chairman', 'director'],
            responses: [
                `🏛️ **About Kautilya Educational Academy**\n\nEstablished with a vision to provide quality education, we are committed to nurturing young minds with values, knowledge, and skills for the future.\n\n👨‍💼 Chairman: Mr. Mithlesh Yadav\n👨‍💼 Director: Mr. Chetan Yadav`
            ],
            link: { text: 'Learn More About Us', url: '/pages/about.html' },
            quickActions: ['Vision & Mission', 'Management']
        },
        timing: {
            patterns: ['timing', 'time', 'schedule', 'hours', 'open', 'close', 'working'],
            responses: [
                `⏰ **School Timings**\n\n🏫 School Hours: 8:00 AM - 2:30 PM\n📞 Office Hours: 8:00 AM - 4:00 PM\n\n📅 Working Days: Monday to Saturday`
            ],
            quickActions: ['Contact Us', 'Admissions']
        },
        transport: {
            patterns: ['transport', 'bus', 'van', 'pick', 'drop', 'commute'],
            responses: [
                `🚌 **Transport Facility**\n\nWe provide safe and reliable transport service covering major areas of Dewas.\n\nFor route details and fees, please contact our office:\n📞 9926042015`
            ],
            link: { text: 'Contact Office', url: '/pages/contact.html' },
            quickActions: ['Contact Us', 'Admissions']
        },
        events: {
            patterns: ['event', 'function', 'celebration', 'annual', 'day', 'fest', 'competition'],
            responses: [
                `🎉 **School Events**\n\nWe organize various events throughout the year including:\n\n• Annual Day\n• Sports Day\n• Science Exhibition\n• Cultural Programs\n• Independence & Republic Day\n\nCheck our News section for updates!`
            ],
            link: { text: 'View News & Events', url: '/pages/news.html' },
            quickActions: ['Gallery', 'Contact Us']
        },
        gallery: {
            patterns: ['photo', 'gallery', 'picture', 'image', 'video'],
            responses: [
                `📸 **Photo Gallery**\n\nExplore our school life through photos of events, campus, and activities!`
            ],
            link: { text: 'View Gallery', url: '/pages/gallery.html' },
            quickActions: ['Campus Tour', 'Events']
        },
        thanks: {
            patterns: ['thank', 'thanks', 'thank you', 'helpful', 'great', 'awesome', 'bye', 'goodbye'],
            responses: [
                `You're welcome! 😊 Feel free to ask if you have more questions. Have a great day!`,
                `Happy to help! 🙏 Visit us anytime at our campus. Take care!`,
                `Thank you for choosing Kautilya Educational Academy! 🎓`
            ],
            quickActions: ['Admissions', 'Contact Us']
        }
    };

    // Default fallback response
    const FALLBACK_RESPONSE = {
        text: `I'm here to help you navigate our website. You can ask me about:\n\n• 🎓 Admissions\n• 📚 Academics\n• 🏫 Campus & Facilities\n• 📞 Contact Information\n• 👩‍🏫 Career Opportunities\n\nOr click on the quick options below!`,
        quickActions: ['Admissions', 'Academics', 'Contact Us', 'About School']
    };

    // Create Chat Widget HTML
    function createChatWidget() {
        const isSubpage = window.location.pathname.includes('/pages/');
        const logoPath = isSubpage ? '../assets/images/school logo.png' : 'assets/images/school logo.png';
        
        const chatHTML = `
            <div class="chat-assistant" id="chat-assistant">
                <button class="chat-toggle" id="chat-toggle" aria-label="Open chat assistant">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/>
                        <path d="M7 9h10v2H7zm0-3h10v2H7zm0 6h7v2H7z"/>
                    </svg>
                </button>
                
                <div class="chat-window" id="chat-window">
                    <div class="chat-header">
                        <div class="chat-header-avatar">
                            <img src="${logoPath}" alt="KEA">
                        </div>
                        <div class="chat-header-info">
                            <h4>${CONFIG.botName}</h4>
                            <span>Online</span>
                        </div>
                        <button class="chat-close" id="chat-close" aria-label="Close chat">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                            </svg>
                        </button>
                    </div>
                    
                    <div class="chat-messages" id="chat-messages">
                        <!-- Messages will be inserted here -->
                    </div>
                    
                    <div class="chat-input-container">
                        <input type="text" class="chat-input" id="chat-input" placeholder="Type your question..." autocomplete="off">
                        <button class="chat-send" id="chat-send" aria-label="Send message">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', chatHTML);
    }

    // Initialize chat functionality
    function initChat() {
        const toggle = document.getElementById('chat-toggle');
        const window_el = document.getElementById('chat-window');
        const close = document.getElementById('chat-close');
        const input = document.getElementById('chat-input');
        const send = document.getElementById('chat-send');
        const messages = document.getElementById('chat-messages');

        // Toggle chat window
        toggle.addEventListener('click', () => {
            window_el.classList.toggle('open');
            toggle.classList.toggle('active');
            
            if (window_el.classList.contains('open') && messages.children.length === 0) {
                // Show welcome message
                setTimeout(() => showWelcomeMessage(), 300);
            }
        });

        close.addEventListener('click', () => {
            window_el.classList.remove('open');
            toggle.classList.remove('active');
        });

        // Send message on button click
        send.addEventListener('click', () => sendUserMessage());

        // Send message on Enter key
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendUserMessage();
        });
    }

    // Show welcome message
    function showWelcomeMessage() {
        const welcomeText = `👋 Hello! I'm your virtual assistant for ${CONFIG.schoolName}.\n\nHow can I help you today?`;
        addBotMessage(welcomeText, ['Admissions', 'Academics', 'Contact Us', 'Campus']);
    }

    // Send user message
    function sendUserMessage() {
        const input = document.getElementById('chat-input');
        const text = input.value.trim();
        
        if (!text) return;
        
        addUserMessage(text);
        input.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Process and respond
        setTimeout(() => {
            removeTypingIndicator();
            processUserInput(text);
        }, CONFIG.typingDelay);
    }

    // Add user message to chat
    function addUserMessage(text) {
        const messages = document.getElementById('chat-messages');
        const messageHTML = `
            <div class="chat-message user">
                <div class="chat-message-avatar">
                    <svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                </div>
                <div class="chat-message-content">${escapeHTML(text)}</div>
            </div>
        `;
        messages.insertAdjacentHTML('beforeend', messageHTML);
        scrollToBottom();
    }

    // Add bot message to chat
    function addBotMessage(text, quickActions = [], link = null) {
        const messages = document.getElementById('chat-messages');
        const isSubpage = window.location.pathname.includes('/pages/');
        const logoPath = isSubpage ? '../assets/images/school logo.png' : 'assets/images/school logo.png';
        
        let actionsHTML = '';
        if (quickActions.length > 0) {
            actionsHTML = `<div class="chat-quick-actions">
                ${quickActions.map(action => `<button class="quick-action-btn" data-action="${action}">${action}</button>`).join('')}
            </div>`;
        }
        
        let linkHTML = '';
        if (link) {
            const linkUrl = isSubpage ? '..' + link.url : link.url.substring(1);
            linkHTML = `<div style="margin-top: 12px;"><a href="${linkUrl}" class="quick-action-btn" style="background: #0a1f3d; color: #fff; text-decoration: none; display: inline-block;">${link.text} →</a></div>`;
        }
        
        const formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
        
        const messageHTML = `
            <div class="chat-message bot">
                <div class="chat-message-avatar">
                    <img src="${logoPath}" alt="KEA">
                </div>
                <div class="chat-message-content">
                    ${formattedText}
                    ${linkHTML}
                    ${actionsHTML}
                </div>
            </div>
        `;
        messages.insertAdjacentHTML('beforeend', messageHTML);
        
        // Add click handlers for quick actions
        const actionBtns = messages.querySelectorAll('.quick-action-btn[data-action]');
        actionBtns.forEach(btn => {
            if (!btn.hasAttribute('data-listener')) {
                btn.setAttribute('data-listener', 'true');
                btn.addEventListener('click', () => {
                    const action = btn.getAttribute('data-action');
                    document.getElementById('chat-input').value = action;
                    sendUserMessage();
                });
            }
        });
        
        scrollToBottom();
    }

    // Show typing indicator
    function showTypingIndicator() {
        const messages = document.getElementById('chat-messages');
        const typingHTML = `
            <div class="chat-message bot" id="typing-indicator">
                <div class="chat-message-avatar">
                    <img src="${window.location.pathname.includes('/pages/') ? '../assets/images/school logo.png' : 'assets/images/school logo.png'}" alt="KEA">
                </div>
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        messages.insertAdjacentHTML('beforeend', typingHTML);
        scrollToBottom();
    }

    // Remove typing indicator
    function removeTypingIndicator() {
        const typing = document.getElementById('typing-indicator');
        if (typing) typing.remove();
    }

    // Process user input and generate response
    function processUserInput(text) {
        const lowerText = text.toLowerCase();
        
        // Find matching intent
        for (const [intent, data] of Object.entries(KNOWLEDGE_BASE)) {
            for (const pattern of data.patterns) {
                if (lowerText.includes(pattern)) {
                    const response = data.responses[Math.floor(Math.random() * data.responses.length)];
                    addBotMessage(response, data.quickActions || [], data.link || null);
                    return;
                }
            }
        }
        
        // Fallback response
        addBotMessage(FALLBACK_RESPONSE.text, FALLBACK_RESPONSE.quickActions);
    }

    // Scroll chat to bottom
    function scrollToBottom() {
        const messages = document.getElementById('chat-messages');
        messages.scrollTop = messages.scrollHeight;
    }

    // Escape HTML to prevent XSS
    function escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            createChatWidget();
            initChat();
        });
    } else {
        createChatWidget();
        initChat();
    }

})();
