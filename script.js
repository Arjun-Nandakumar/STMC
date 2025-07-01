function loadContent(page) {
  const content = document.getElementById("content-area");

  // Remove or add overlay based on page
  if (page === "home") {
    content.classList.remove("overlay");
    content.style.display = 'none';
    content.innerHTML = ""; // no additional content for home
    return;
  } else {
    content.style.display = 'block'; // Show content-area
    content.classList.add("overlay");
  }

  switch (page) {
    case "about":
      content.innerHTML = `
        <div class="about-content">
          <h3>About Us</h3>
            <p>
              Sigma Training & Management Consultants (STMC) is a premier professional consulting group that prioritizes enhancing quality and assisting industries in effectively implementing management systems through a highly systematic approach. Led by a seasoned technocrat with over 40 years of experience in system implementation and training, STMC has been instrumental in aiding numerous companies to implement systems efficiently and achieve certification from third-party certification bodies across various standards.<br><br>
              
              STMC specializes in identifying and supplying the necessary tools for industries facing challenges, deploying quality improvement techniques, and guiding organizations to achieve certification from third-party certifying bodies. Our approach to corporate management is systematic and responsible, aiming to prevent accidents caused by human error through improved training and administration of the workforce, thereby ensuring the highest standards in Quality, Health, Safety, and Environment (QHSE).<br><br>
              
              As a data-driven organization, STMC is committed to offering viable solutions to make organizations more profitable and efficient, which is essential for future success. We specialize in providing sustainable solutions to empower and educate the workforce about the significance of QHSE and standards, underpinning our commitment to excellence and innovation.
            </p>
          </div>
        `;
        break;


      case "services":
        content.innerHTML = `
          <h3>Services Offered</h3>
          <ul>
            <li>Leadership and Management Training</li>
            <li>Organizational Development</li>
            <li>Process Improvement Consulting</li>
            <li>Strategic Planning Sessions</li>
          </ul>
        `;
        break;

      case "contact":
        content.innerHTML = `
          <div class="contact-block">
            <div class="contact-font">
              <h3>Contact Us</h3>
              <p>Email: <a href="mailto:stmconsult@yahoo.com">stmconsult@yahoo.com</a></p>
              <p>Phone: +91-7624947307</p>
              <p>Address: 570, 1st Main, 1st Block, R.T. Nagar, Bangalore-560032, Karnataka, India</p>
            </div>
          </div>
        `;
        break;

      case "login":
        content.innerHTML = `
          <h3>Login</h3>
          <form onsubmit="event.preventDefault(); alert('Login functionality not implemented.');">
            <label for="username">Username:</label><br>
            <input type="text" id="Admin" name="Admin"><br><br>

            <label for="password">Password:</label><br>
            <input type="password" id="Admin" name="Admin"><br><br>

            <button type="submit">Login</button>
          </form>
        `;
        break;

        case "system-implementation":
          content.innerHTML = `
            <div class="service-blocks-grid">
              <div class="service-block">
                <div class="service-header">Quality Management System<br>(QMS)</div>
                <div class="service-body">
                  <p>Description for QMS.</p>
                  <a href="#" class="book" data-service="Quality Management System (QMS)">BOOK</a>
                </div>
              </div>
              <div class="service-block">
                <div class="service-header">Environment Management System<br>(EMS)</div>
                <div class="service-body">
                  <p>Description for QMS.</p>
                  <a href="#" class="book" data-service="Environment Management System (EMS)">BOOK</a>
                </div>
              </div>
              <div class="service-block">
                <div class="service-header">Occupational Health and Safety Management Systems<br>(OHSMS)</div>
                <div class="service-body">
                  <p>Description for QMS.</p>
                  <a href="#" class="book" data-service="Occupational Health and Safety Management Systems (OHSMS)">BOOK</a>
                </div>
              </div>
              <!-- Add more blocks as needed -->
            </div>
          `;
          setupWhatsAppBooking();
          break;

      default:
        content.innerHTML = "<p>Page not found.</p>";
    }
  }

// Disable right-click
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});

// Load "Home" section by default when the page loads
window.addEventListener('DOMContentLoaded', function () {
  loadContent('home');
});

function setupWhatsAppBooking() {
  const buttons = document.querySelectorAll('.book');
  buttons.forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault();
      const serviceName = this.getAttribute('data-service');
      const phoneNumber = '917624947307'; // <-- Replace with your WhatsApp number, no '+'
      const message = `Hello! I would like to book the service: ${serviceName}. Please provide more details.`;

      // Get current time in IST
      const now = new Date();
      // IST is UTC+5:30
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const istOffset = 5.5 * 60 * 60000; // 5.5 hours in ms
      const istTime = new Date(utc + istOffset);

      const hours = istTime.getHours();
      const minutes = istTime.getMinutes();

      // Booking window: 6:00 AM <= time < 10:00 PM (22:00)
      if (hours >= 6 && hours < 22) {
        // Allowed, open WhatsApp
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');
      } else {
        // Not allowed, calculate hours until 6 AM
        let hoursTo6am;
        if (hours < 6) {
          hoursTo6am = 6 - hours - (minutes > 0 ? 1 : 0);
          const minsToNextHour = minutes > 0 ? 60 - minutes : 0;
          const boldTime = `<b>${hoursTo6am} hour(s)${minsToNextHour ? ' and ' + minsToNextHour + ' minute(s)' : ''}</b>`;
          const msg = `It’s lights out in India! 🌙 <br><br>
          Bookings resume in ${boldTime}.<br><br>
          Hang tight and catch some Z’s too!`;
          showCustomModal(msg);
        } else {
          // After 10 PM, so calculate hours to next day's 6 AM
          hoursTo6am = (24 - hours) + 6 - (minutes > 0 ? 1 : 0);
          const minsToNextHour = minutes > 0 ? 60 - minutes : 0;
          const boldTime = `<b>${hoursTo6am} hour(s)${minsToNextHour ? ' and ' + minsToNextHour + ' minute(s)' : ''}</b>`;
          const msg = `It’s lights out in India! 🌙 <br><br>
          Bookings resume in ${boldTime}.<br><br>
          Hang tight and catch some Z’s too!`;
          showCustomModal(msg);

        }
      }
    });
  });
}

function showCustomModal(message) {
  document.getElementById('modal-message').innerHTML = message;
  document.getElementById('custom-modal').style.display = 'flex';
}

