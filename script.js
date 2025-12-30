// DOM Elements
const chatbotContainer = document.querySelector('.chatbot-container');
const chatbotToggle = document.querySelector('.chatbot-toggle');
const closeChatbot = document.querySelector('.close-chatbot');
const sendBtn = document.querySelector('.send-btn');
const chatInput = document.querySelector('.chat-input input');
const chatMessages = document.querySelector('.chat-messages');
const quickQuestions = document.querySelectorAll('.quick-question');
const appointmentForm = document.getElementById('appointmentForm');

// Medical AI responses database
const aiResponses = {
    "acne": "Acne prevention involves keeping skin clean, avoiding oil-based products, not touching your face, and using non-comedogenic skincare. I recommend: 1) Cleanse twice daily with a gentle cleanser 2) Use salicylic acid or benzoyl peroxide spot treatments 3) Apply oil-free moisturizer 4) Always remove makeup before bed 5) Change pillowcases weekly. Would you like specific product recommendations?",
    "hair growth": "For hair growth, I suggest: 1) Massage scalp with rosemary or peppermint oil 2) Use biotin supplements after consulting a doctor 3) Apply onion juice or fenugreek paste weekly 4) Minimize heat styling 5) Eat protein-rich foods. Our Hair Growth Elixir contains proven ingredients like minoxidil alternatives. Shall I explain more about it?",
    "eczema": "Eczema natural remedies include: 1) Apply coconut oil or sunflower oil to affected areas 2) Use colloidal oatmeal baths 3) Try aloe vera gel for its anti-inflammatory properties 4) Use a humidifier to maintain skin moisture 5) Wear soft, breathable cotton clothing. Avoid harsh soaps and hot showers. Would you like to know about prescription options?",
    "appointment": "You can book an appointment by: 1) Filling the form on this page 2) Calling +1 (555) 123-4567 3) Using our online booking system. Dr. Sheetal has slots available next week. Would you like me to help you book one now?",
    "dry scalp": "For dry scalp: 1) Use a moisturizing shampoo with tea tree oil 2) Apply aloe vera gel directly to scalp 3) Try an apple cider vinegar rinse (2 tbsp in 1 cup water) 4) Massage with warm coconut oil before washing 5) Avoid hot water when washing hair. Stay hydrated and consider a humidifier in dry environments.",
    "wrinkles": "Wrinkle prevention: 1) Use sunscreen daily (SPF 30+) 2) Apply retinoid creams (prescription or OTC retinol) 3) Moisturize with hyaluronic acid 4) Get adequate sleep (7-8 hours) 5) Stay hydrated and eat antioxidant-rich foods 6) Avoid smoking and excessive alcohol. Our Skin Repair Serum contains proven anti-aging ingredients.",
    "dandruff": "Dandruff solutions: 1) Use anti-dandruff shampoo with zinc pyrithione or ketoconazole 2) Apply tea tree oil diluted with carrier oil 3) Try an aspirin mask (crush 2 aspirin, mix with shampoo) 4) Reduce stress through meditation/yoga 5) Limit hair styling products. If severe, consult a trichologist for prescription options.",
    "default": "I understand you're asking about skin/hair concerns. As an AI assistant, I can provide general advice, but for personalized diagnosis, I recommend consulting Dr. Sheetal. Would you like me to: 1) Suggest preventive measures 2) Recommend products 3) Share natural remedies 4) Help book an appointment?"
};

// Initialize chatbot
function initChatbot() {
    // Toggle chatbot visibility
    chatbotToggle.addEventListener('click', () => {
        chatbotContainer.classList.add('active');
        chatbotToggle.style.display = 'none';
    });
    
    closeChatbot.addEventListener('click', () => {
        chatbotContainer.classList.remove('active');
        chatbotToggle.style.display = 'flex';
    });
    
    // Send message function
    function sendMessage() {
        const messageText = chatInput.value.trim();
        if (messageText === '') return;
        
        // Add user message
        addMessage(messageText, 'user');
        chatInput.value = '';
        
        // Simulate AI thinking
        setTimeout(() => {
            generateAIResponse(messageText);
        }, 1000);
    }
    
    // Send button click event
    sendBtn.addEventListener('click', sendMessage);
    
    // Enter key event for input
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Quick question buttons
    quickQuestions.forEach(button => {
        button.addEventListener('click', () => {
            const question = button.getAttribute('data-question');
            chatInput.value = question;
            sendMessage();
        });
    });
    
    // Add initial AI greeting
    setTimeout(() => {
        if (!chatbotContainer.classList.contains('active')) {
            chatbotToggle.innerHTML = '<i class="fas fa-comment-medical"></i><span>AI Assistant - Click for help!</span>';
        }
    }, 3000);
}

// Add message to chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${sender}-message`);
    
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-${sender === 'ai' ? 'robot' : 'user'}"></i>
        </div>
        <div class="message-content">
            <p>${text}</p>
            <span class="message-time">${time}</span>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Generate AI response based on user input
function generateAIResponse(userMessage) {
    const messageLower = userMessage.toLowerCase();
    let response = aiResponses.default;
    
    // Check for keywords in user message
    if (messageLower.includes('acne') || messageLower.includes('pimple')) {
        response = aiResponses.acne;
    } else if (messageLower.includes('hair growth') || messageLower.includes('bald') || messageLower.includes('thin')) {
        response = aiResponses["hair growth"];
    } else if (messageLower.includes('eczema') || messageLower.includes('dermatitis')) {
        response = aiResponses.eczema;
    } else if (messageLower.includes('appointment') || messageLower.includes('book') || messageLower.includes('consult')) {
        response = aiResponses.appointment;
    } else if (messageLower.includes('dry scalp') || messageLower.includes('itchy scalp')) {
        response = aiResponses["dry scalp"];
    } else if (messageLower.includes('wrinkle') || messageLower.includes('aging') || messageLower.includes('anti-aging')) {
        response = aiResponses.wrinkles;
    } else if (messageLower.includes('dandruff') || messageLower.includes('flaky')) {
        response = aiResponses.dandruff;
    }
    
    // Add some variation to responses
    const greetings = ["I understand your concern about ", "Thanks for asking about ", "Regarding your question about "];
    const greeting = greetings[Math.floor(Math.random() * greetings.length)];
    
    // Extract main topic for personalized response
    const topics = ['acne', 'hair', 'eczema', 'appointment', 'scalp', 'wrinkle', 'dandruff'];
    let detectedTopic = '';
    for (const topic of topics) {
        if (messageLower.includes(topic)) {
            detectedTopic = topic;
            break;
        }
    }
    
    if (detectedTopic && !messageLower.includes('appointment')) {
        response = `${greeting}${detectedTopic}. ${response}`;
    }
    
    // Add random follow-up question
    const followUps = [
        " Would you like more details about any of these suggestions?",
        " Should I help you book an appointment with Dr. Sheetal for personalized advice?",
        " Would you like product recommendations for this issue?",
        " I can also share some natural remedies if you're interested."
    ];
    
    const followUp = followUps[Math.floor(Math.random() * followUps.length)];
    
    // Don't add follow-up if already included
    if (!response.includes("Would you like") && !response.includes("Shall I")) {
        response += followUp;
    }
    
    // Simulate typing effect
    simulateTyping(response);
}

// Simulate typing effect for AI response
function simulateTyping(text) {
    let i = 0;
    const typingSpeed = 20; // milliseconds per character
    let typedText = '';
    
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', 'ai-message');
    
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <p id="typing-text"></p>
            <span class="message-time">${time}</span>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    const typingElement = messageDiv.querySelector('#typing-text');
    
    const typingInterval = setInterval(() => {
        if (i < text.length) {
            typedText += text.charAt(i);
            typingElement.textContent = typedText;
            i++;
        } else {
            clearInterval(typingInterval);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }, typingSpeed);
}

// Appointment form submission
function initAppointmentForm() {
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const consultationType = this.querySelector('select').value;
            
            // Show success message
            alert(`Thank you ${name}! Your ${consultationType} appointment request has been received. We will contact you at ${email} within 24 hours to confirm.`);
            
            // Reset form
            this.reset();
            
            // Add message to chatbot
            addMessage(`Appointment booked for ${name} - ${consultationType} consultation`, 'ai');
            
            // If chatbot is open, respond
            if (chatbotContainer.classList.contains('active')) {
                setTimeout(() => {
                    addMessage(`I see you've booked an appointment for ${consultationType}. Dr. Sheetal will review your information and contact you soon. In the meantime, is there anything else I can help you with?`, 'ai');
                }, 1500);
            }
        });
    }
}

// Animate chart bars on scroll
function animateCharts() {
    const chartBars = document.querySelectorAll('.chart-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                
                setTimeout(() => {
                    bar.style.width = width;
                }, 300);
                
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    chartBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
            
            // Update active nav link
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initChatbot();
    initAppointmentForm();
    animateCharts();
    initSmoothScrolling();
    
    // Add some sample conversation after page load
    setTimeout(() => {
        if (chatbotContainer.classList.contains('active')) {
            addMessage("I'm concerned about my acne. What can I do?", 'user');
            setTimeout(() => {
                generateAIResponse("I'm concerned about my acne. What can I do?");
            }, 1500);
        }
    }, 2000);
});