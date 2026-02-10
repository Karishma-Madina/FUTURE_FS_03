// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Add smooth scrolling to all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    }
});

// Mobile menu toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    
    if (navLinks.style.display === 'flex') {
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.flexDirection = 'column';
        navLinks.style.background = 'white';
        navLinks.style.padding = '20px';
        navLinks.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        navLinks.style.gap = '16px';
    }
    
    mobileMenuBtn.classList.toggle('active');
}

// Appointment Modal Functions
function openAppointmentModal(doctorName = '') {
    const modal = document.getElementById('appointmentModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Pre-select doctor if provided
    if (doctorName) {
        const doctorSelect = document.getElementById('doctor-select');
        doctorSelect.value = doctorName;
    }
    
    // Set minimum date to today
    const dateInput = document.getElementById('appointment-date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

function closeAppointmentModal() {
    const modal = document.getElementById('appointmentModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.getElementById('appointmentModal')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeAppointmentModal();
    }
});

// Handle appointment form submission
function handleAppointmentSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const appointmentData = {
        patientName: formData.get('patient-name'),
        phone: formData.get('patient-phone'),
        email: formData.get('patient-email'),
        date: formData.get('appointment-date'),
        time: formData.get('appointment-time'),
        doctor: formData.get('doctor-select'),
        reason: formData.get('reason')
    };
    
    // Log appointment data (in real implementation, send to backend)
    console.log('Appointment Booking:', appointmentData);
    
    // Show success message
    alert(`Thank you, ${appointmentData.patientName}! Your appointment has been requested.\n\nDoctor: ${appointmentData.doctor}\nDate: ${appointmentData.date}\nTime: ${appointmentData.time}\n\nOur team will contact you shortly to confirm.`);
    
    // Reset form and close modal
    event.target.reset();
    closeAppointmentModal();
    
    // In a real application, you would send this data to your backend:
    /*
    fetch('/api/appointments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData)
    })
    .then(response => response.json())
    .then(data => {
        alert('Appointment booked successfully!');
        closeAppointmentModal();
    })
    .catch(error => {
        alert('Error booking appointment. Please try again.');
    });
    */
}

// Handle contact form submission
function handleContactSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const contactData = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Log contact data (in real implementation, send to backend)
    console.log('Contact Form Submission:', contactData);
    
    // Show success message
    alert(`Thank you for contacting us, ${contactData.name}! We'll get back to you soon.`);
    
    // Reset form
    event.target.reset();
    
    // In a real application, you would send this data to your backend:
    /*
    fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData)
    })
    .then(response => response.json())
    .then(data => {
        alert('Message sent successfully!');
        event.target.reset();
    })
    .catch(error => {
        alert('Error sending message. Please try again.');
    });
    */
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animation
document.addEventListener('DOMContentLoaded', function() {
    // Animate service cards
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Animate doctor cards
    document.querySelectorAll('.doctor-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Animate feature cards
    document.querySelectorAll('.feature-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        if (window.innerWidth <= 968) {
            const navLinks = document.querySelector('.nav-links');
            navLinks.style.display = 'none';
        }
    });
});

// Handle escape key to close modal
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('appointmentModal');
        if (modal.classList.contains('active')) {
            closeAppointmentModal();
        }
    }
});

// Form validation
document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', function(e) {
        // Allow only numbers and basic phone formatting
        this.value = this.value.replace(/[^0-9+\-() ]/g, '');
    });
});

// Auto-resize textarea
document.querySelectorAll('textarea').forEach(textarea => {
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });
});

console.log('HealthCare Plus Website Loaded Successfully! 🏥');
