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

// System Implementation Section here

        case "system-implementation":
          content.innerHTML = `
            <div class="service-blocks-grid">
              <div class="service-block">
                <div class="service-header">Quality Management System<br>(ISO 9001:2015)</div>
                <div class="service-body">
                  <p>Description for QMS.</p>
                  <a href="#" class="ENQUIRE" data-service="Quality Management System (ISO:9001:2015)">ENQUIRE</a>
                </div>
              </div>
              <div class="service-block">
                <div class="service-header">Environment Management System<br>(ISO 14001:2015)</div>
                <div class="service-body">
                  <p>Description for EMS.</p>
                  <a href="#" class="ENQUIRE" data-service="Environment Management System (ISO 14001:2015)">ENQUIRE</a>
                </div>
              </div>
              <div class="service-block">
                <div class="service-header">Occupational Health and Safety Management Systems<br>(ISO 45001:2018)</div>
                <div class="service-body">
                  <p>Description for OHSMS.</p>
                  <a href="#" class="ENQUIRE" data-service="Occupational Health and Safety Management Systems (ISO 45001:2018)">ENQUIRE</a>
                </div>

              </div>
              <div class="service-block">
                <div class="service-header">Good Manufacturing Practices<br>(ISO 22716:2007)</div>
                <div class="service-body">
                  <p>Description for QMS.</p>
                  <a href="#" class="ENQUIRE" data-service="Occupational Health and Safety Management Systems (ISO 45001:2018)">ENQUIRE</a>
                </div>
              </div>
              <div class="service-block">
                <div class="service-header">Medical Devices<br>(ISO 13485:2021)</div>
                <div class="service-body">
                  <p>Description for MD.</p>
                  <a href="#" class="ENQUIRE" data-service="Medical Devices (ISO:13485:2021)">ENQUIRE</a>
                </div>
              </div>  
              </div>
              <div class="service-block">
                <div class="service-header">Food Safety Management Systems<br>(ISO 22000:2018)</div>
                <div class="service-body">
                  <p>Description for FSMS.</p>
                  <a href="#" class="ENQUIRE" data-service="Food Safety Management Systems (ISO 22000:2018)">ENQUIRE</a>
                </div>
              </div>
              
              <div class="service-block">
                <div class="service-header">Information Security Management Systems<br>(ISO 27001:2022)</div>
                <div class="service-body">
                  <p>Description for QMS.</p>
                  <a href="#" class="ENQUIRE" data-service="Occupational Health and Safety Management Systems (ISO 45001:2018)">ENQUIRE</a>
                </div>
              </div>

              <!-- Add more blocks as needed -->
            </div>
          `;
          setupWhatsAppENQUIREing();
          break;

// Management Training Section here

        case "management-training":
          content.innerHTML = `
            <div class="service-blocks-grid">
              <div class="service-block">
                <div class="service-header">Kaizen</div>
                <div class="service-body">
                  <p>Description for Kaizen.</p>
                  <a href="#" class="ENQUIRE" data-service="Kaizen">ENQUIRE</a>
                </div>
              </div>
              <div class="service-block">
                <div class="service-header">5S</div>
                <div class="service-body">
                  <p>Description for 5S.</p>
                  <a href="#" class="ENQUIRE" data-service="5S">ENQUIRE</a>
                </div>
              </div>
              <div class="service-block">
                <div class="service-header">Cost of Quality</div>
                <div class="service-body">
                  <p>Description for Cost of Quality.</p>
                  <a href="#" class="ENQUIRE" data-service="Cost of Quality">ENQUIRE</a>
                </div>
              </div>

              <div class="service-block">
                <div class="service-header">Personnel Effectiveness</div>
                <div class="service-body">
                  <p>Description for Personnel Effectiveness.</p>
                  <a href="#" class="ENQUIRE" data-service="Personnel Effectiveness">ENQUIRE</a>
                </div>
              </div>
              <div class="service-block">
                <div class="service-header">Communication Skills</div>
                <div class="service-body">
                  <p>Description for Communication Skills.</p>
                  <a href="#" class="ENQUIRE" data-service="Communication Skills">ENQUIRE</a>
                </div>
              </div>
              <div class="service-block">
                <div class="service-header">Business Excellence</div>
                <div class="service-body">
                  <p>Description for Business Excellence.</p>
                  <a href="#" class="ENQUIRE" data-service="Business Excellence">ENQUIRE</a>
                </div>
              </div>

              <!-- Add more blocks as needed -->
            </div>
          `;
          setupWhatsAppENQUIREing();
          break;

// Inspection and Testing Section here

        case "inspection-testing":
          content.innerHTML = `
            <div class="service-blocks-grid">
              <div class="service-block">
                <div class="service-header">Third Party Inspection</div>
                <div class="service-body">
                  <p>Description for Third Party Inspection.</p>
                  <a href="#" class="ENQUIRE" data-service="Third Party Inspection">ENQUIRE</a>
                </div>
              </div>
              <div class="service-block">
                <div class="service-header">Visual Inspection</div>
                <div class="service-body">
                  <p>Description for Visual Inspection.</p>
                  <a href="#" class="ENQUIRE" data-service="Visual Inspection">ENQUIRE</a>
                </div>
              </div>
              <div class="service-block">
                <div class="service-header">Dimensional Inspection</div>
                <div class="service-body">
                  <p>Description for Dimensional Inspection.</p>
                  <a href="#" class="ENQUIRE" data-service="Dimensional Inspection">ENQUIRE</a>
                </div>
              </div>

              <div class="service-block">
                <div class="service-header">Third Party Testing</div>
                <div class="service-body">
                  <p>Description for Third Party Testing.</p>
                  <a href="#" class="ENQUIRE" data-service="Third Party Testing">ENQUIRE</a>
                </div>
              </div>
              <div class="service-block">
                <div class="service-header">Ultrasonic Testing</div>
                <div class="service-body">
                  <p>Description for Ultrasonic Testing.</p>
                  <a href="#" class="ENQUIRE" data-service="Ultrasonic Testing">ENQUIRE</a>
                </div>
              </div>
              <div class="service-block">
                <div class="service-header">Dye Penetrant Testing</div>
                <div class="service-body">
                  <p>Description for Dye Penetrant Testing.</p>
                  <a href="#" class="ENQUIRE" data-service="Dye Penetrant Testing">ENQUIRE</a>
                </div>
              </div>

              <div class="service-block">
                <div class="service-header">Magnetic Particle Testing</div>
                <div class="service-body">
                  <p>Description for Third Party Testing.</p>
                  <a href="#" class="ENQUIRE" data-service="Third Party Testing">ENQUIRE</a>
                </div>
              </div>

              <!-- Add more blocks as needed -->
            </div>
          `;
          setupWhatsAppENQUIREing();
          break;

// Inspection and Testing here

        case "general-training":
          content.innerHTML = `
            <div class="service-blocks-grid">
              <div class="service-block">
                <div class="service-header">Customer Relationship Management Training<br>(CRM)</div>
                <div class="service-body">
                  <p>Description for Customer Relationship Management Training.</p>
                  <a href="#" class="ENQUIRE" data-service="Customer Relationship Management Training">ENQUIRE</a>
                </div>
              </div>
              <div class="service-block">
                <div class="service-header">Leadership Skills</div>
                <div class="service-body">
                  <p>Description for Leadership Skills.</p>
                  <a href="#" class="ENQUIRE" data-service="Leadership Skills">ENQUIRE</a>
                </div>
              </div>
              <div class="service-block">
                <div class="service-header">Supervisory Skills</div>
                <div class="service-body">
                  <p>Description for Supervisory Skills.</p>
                  <a href="#" class="ENQUIRE" data-service="Supervisory Skills">ENQUIRE</a>
                </div>

              </div>
              <div class="service-block">
                <div class="service-header">Communication Skills</div>
                <div class="service-body">
                  <p>Description for Communication Skills.</p>
                  <a href="#" class="ENQUIRE" data-service="Communication Skills">ENQUIRE</a>
                </div>
              </div>
              <div class="service-block">
                <div class="service-header">Public Speaking</div>
                <div class="service-body">
                  <p>Description for Public Speaking.</p>
                  <a href="#" class="ENQUIRE" data-service="Public Speaking">ENQUIRE</a>
                </div>
              </div>
              <div class="service-block">
                <div class="service-header">Office Etiquette</div>
                <div class="service-body">
                  <p>Description for Office Etiquette.</p>
                  <a href="#" class="ENQUIRE" data-service="Office Etiquette">ENQUIRE</a>
                </div>
              </div>

              <!-- Add more blocks as needed -->
            </div>
          `;
          setupWhatsAppENQUIREing();
          break;

// Academic Support here

        case "academic-support":
          content.innerHTML = `
            <div class="service-blocks-grid">
              <div class="service-block">
                <div class="service-header">Spoken French</div>
                <div class="service-body">
                  <p>Description for Spoken French.</p>
                  <a href="#" class="ENQUIRE" data-service="Spoken French">ENQUIRE</a>
                </div>
              </div>
              <div class="service-block">
                <div class="service-header">Spoken English</div>
                <div class="service-body">
                  <p>Description for Spoken English.</p>
                  <a href="#" class="ENQUIRE" data-service="Spoken English">ENQUIRE</a>
                </div>
              </div>
              <div class="service-block">
                <div class="service-header">Spoken Hindi</div>
                <div class="service-body">
                  <p>Description for Spoken Hindi.</p>
                  <a href="#" class="ENQUIRE" data-service="Spoken Hindi">ENQUIRE</a>
                </div>

              </div>
              <div class="service-block">
                <div class="service-header">STEM (Science, Technology, Engineering and Mathematics) Tutoring</div>
                <div class="service-body">
                  <p>Description for Communication Skills.</p>
                  <a href="#" class="ENQUIRE" data-service="STEM Tutoring">ENQUIRE</a>
                </div>
              </div>
              <div class="service-block">
                <div class="service-header">Exam Confidence Skills</div>
                <div class="service-body">
                  <p>Description for Exam Confidence Skills.</p>
                  <a href="#" class="ENQUIRE" data-service="Exam Confidence Skills">ENQUIRE</a>
                </div>
              </div>
              <div class="service-block">
                <div class="service-header">Stress Management</div>
                <div class="service-body">
                  <p>Description for Stress Management.</p>
                  <a href="#" class="ENQUIRE" data-service="Stress Management">ENQUIRE</a>
                </div>
              </div>

              </div>
              <div class="service-block">
                <div class="service-header">Behavioral Science</div>
                <div class="service-body">
                  <p>Description for Behavioral Science.</p>
                  <a href="#" class="ENQUIRE" data-service="Behavioral Science">ENQUIRE</a>
                </div>
              </div>

              <!-- Add more blocks as needed -->
            </div>
          `;
          setupWhatsAppENQUIREing();
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

function setupWhatsAppENQUIREing() {
  const buttons = document.querySelectorAll('.ENQUIRE');
  buttons.forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault();
      const serviceName = this.getAttribute('data-service');
      const phoneNumber = '917624947307';
      const message = `Hello! I would like to enquire about the service: ${serviceName}. Please provide more details.`;

      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const istOffset = 5.5 * 60 * 60000;
      const istTime = new Date(utc + istOffset);

      const hours = istTime.getHours();
      const minutes = istTime.getMinutes();

      // ENQUIREing time allowed: 6 AM – 10 PM
      const isAllowed = hours >= 6 && hours < 22;

      const confirmAction = () => {
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        fetch('http://localhost:5000/enquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service: serviceName,
            timestamp: new Date().toISOString()
          })
        })
        .then(res => res.text())
        .then(response => console.log('Admin notified:', response))
        .catch(err => console.error('Email notification failed:', err));
        window.open(whatsappURL, '_blank');
      };

      if (isAllowed) {
        const msg = `Service Name : <b>${serviceName}</b><br><br>Choose how you would like to contact :`;
        showCustomModal(msg, confirmAction);
      } else {
        let hoursTo6am;
        if (hours < 6) {
          hoursTo6am = 6 - hours - (minutes > 0 ? 1 : 0);
        } else {
          hoursTo6am = (24 - hours) + 6 - (minutes > 0 ? 1 : 0);
        }
        const minsToNextHour = minutes > 0 ? 60 - minutes : 0;
        const boldTime = `<b>${hoursTo6am} hour(s)${minsToNextHour ? ' and ' + minsToNextHour + ' minute(s)' : ''}</b>`;
        const msg = `It’s lights out in India! 🌙 <br><br>
        ENQUIREings resume in ${boldTime}.<br><br>
        Would you like to pre-ENQUIRE <b>${serviceName}</b>?`;

        showCustomModal(msg, confirmAction);
      }
    });
  });
}

function showCustomModal(message, onConfirm = null) {
  const modal = document.getElementById('custom-modal');
  const modalMessage = document.getElementById('modal-message');

  // Reset modal content
  modalMessage.innerHTML = `
    <span id="modal-close-btn" style="position:absolute; top:8px; right:12px; cursor:pointer; font-size:1.2em;">✖</span>
    <div style="margin-top: 20px;">${message}</div>
    <br><br>
    <button id="call-btn" style="padding:8px 24px; border:none; background:#4F61C5; color:#fff; border-radius:5px; font-size:1em; cursor:pointer; margin-right: 10px;">Call</button>
    <button id="calend-btn" style="padding:8px 24px; border:none; background:maroon; color:#fff; border-radius:5px; font-size:1em; cursor:pointer; margin-right: 10px;">Book (Calendly)</button>
    <button id="whatsapp-btn" style="padding:8px 24px; border:none; background:#518A7E; color:#fff; border-radius:5px; font-size:1em; cursor:pointer; margin-right: 10px;">Text (WhatsApp)</button>
    <button id="email-btn" style="padding:8px 24px; border:none; background:gray; color:#fff; border-radius:5px; font-size:1em; cursor:pointer;">Email</button>
  `;

  modal.style.display = 'flex';

  // Close modal (top-right ✖)
  document.getElementById('modal-close-btn').onclick = () => {
    modal.style.display = 'none';
  };

  // WhatsApp ENQUIREing
  if (onConfirm) {
    document.getElementById('whatsapp-btn').onclick = () => {
      modal.style.display = 'none';
      onConfirm();
    };
  } else {
    document.getElementById('whatsapp-btn').style.display = 'none';
  }

  // Call popup
  document.getElementById('call-btn').onclick = () => {
    modal.style.display = 'none';

    const callingPopup = document.createElement('div');
    callingPopup.id = 'calling-popup';
    callingPopup.innerText = '📞 Calling: +91-7624947307...';
    callingPopup.className = 'glow-popup';
    ;

    // Add close (✖) button
    const closeBtn = document.createElement('span');
    closeBtn.innerText = '✖';
    closeBtn.style.cssText = `
      position: absolute;
      top: 5px;
      right: 10px;
      cursor: pointer;
      font-size: 1.2em;
      color: white;
    `;
    closeBtn.onclick = () => callingPopup.remove();
    callingPopup.appendChild(closeBtn);

    document.body.appendChild(callingPopup);

    // Auto-remove after 15 seconds if user doesn't close
    setTimeout(() => {
      if (document.body.contains(callingPopup)) {
        callingPopup.remove();
      }
    }, 15000);

    // Call after slight delay
    setTimeout(() => {
      window.location.href = 'tel:+917624947307';
    }, 1000);
  };

  document.getElementById('calend-btn').onclick = () => {
    window.open('https://calendly.com/vnk-arjun-brinda/new-meeting', '_blank');
    modal.style.display = 'none';
  };

  document.getElementById('email-btn').onclick = () => {
    window.location.href = 'mailto:stmconsult@yahoo.com?subject=Service ENQUIREing Request&body=Hello, I would like to ENQUIRE a service.';
    modal.style.display = 'none';
  };
}