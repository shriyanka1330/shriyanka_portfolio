// Preloader fade-out
    window.addEventListener('load', function() {
      const loader = document.getElementById('preloader');
      setTimeout(() => {
        loader.classList.add('fade-out');
      }, 500);
    });

    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true
    });

    // Back to top scroll handler
    window.addEventListener('scroll', function () {
      const backBtn = document.querySelector('.back-to-top');
      if (window.scrollY > 200) {
        backBtn.style.display = 'flex';
      } else {
        backBtn.style.display = 'none';
      }
    });

    // Custom typing animation
    const roles = [
      "Data Analyst.",
      "Power BI Architect.",
      "Python Developer.",
      "SQL Developer.",
      "Machine Learning Engineer."
    ];
    
    let currentRoleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const erasingSpeed = 50;
    const delayBetweenRoles = 2000;
    const targetElement = document.getElementById("typing-sub");

    function typeEffect() {
      const currentRole = roles[currentRoleIndex];
      
      if (isDeleting) {
        targetElement.innerHTML = "I'm a " + currentRole.substring(0, currentCharIndex - 1);
        currentCharIndex--;
      } else {
        targetElement.innerHTML = "I'm a " + currentRole.substring(0, currentCharIndex + 1);
        currentCharIndex++;
      }

      if (!isDeleting && currentCharIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeEffect, delayBetweenRoles);
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentRoleIndex = (currentRoleIndex + 1) % roles.length;
        setTimeout(typeEffect, 500);
      } else {
        setTimeout(typeEffect, isDeleting ? erasingSpeed : typingSpeed);
      }
    }

    document.addEventListener("DOMContentLoaded", function() {
      const contactForm = document.getElementById("contactForm");
      const statusDiv = document.getElementById("contactFormStatus");
      
      if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
          event.preventDefault();
          
          const submitBtn = contactForm.querySelector('.btn-submit');
          const originalBtnText = submitBtn.innerHTML;
          
          const name = document.getElementById("name").value;
          const email = document.getElementById("email").value;
          const phone = document.getElementById("phone").value;
          const comments = document.getElementById("comments").value;
          
          const formData = {
            name: name,
            email: email,
            phone: phone || 'N/A',
            message: comments
          };
          
          // --- Optimistic UI Update ---
          // Immediately show success message
          if (statusDiv) {
            statusDiv.style.display = 'block';
            statusDiv.style.backgroundColor = 'rgba(255, 182, 70, 0.15)';
            statusDiv.style.border = '1px solid var(--primary)';
            statusDiv.style.color = 'var(--white)';
            statusDiv.innerHTML = 'Thank you! Your message has been sent successfully.';
          }
          
          // Reset the form input fields instantly
          contactForm.reset();
          
          // Change button state instantly to checkmark and disable to prevent double clicks
          submitBtn.innerHTML = '<i class="fa fa-check me-2"></i>Sent!';
          submitBtn.disabled = true;
          
          // Restore button state after 3 seconds
          setTimeout(() => {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
          }, 3000);
          
          // Submit to backend silently in the background
          fetch("https://formsubmit.co/ajax/shriyankarajbhar@gmail.com", {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(formData)
          })
          .then(response => response.json())
          .catch(error => {
            console.error("Background submission error:", error);
          });
        });
      }
      setTimeout(typeEffect, 800);
    });