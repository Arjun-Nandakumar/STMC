// Ensure PDF.js worker is loaded
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

// PDF.js variables
let pdfDoc = null,
    pageNum = 1,
    pageRendering = false,
    pageNumPending = null;

function loadContent(page) {
  const content = document.getElementById("content-area");
  const footer = document.querySelector(".footer");
  if (!content || !footer) {
    console.error("Content area or footer element not found");
    return;
  }

  // Toggle footer positioning
  if (page === "home") {
    content.classList.remove("overlay");
    content.style.display = "none";
    content.innerHTML = "";
    footer.classList.add("fixed");
    document.body.style.minHeight = "100vh";
  } else {
    content.style.display = "block";
    content.classList.add("overlay");
    footer.classList.remove("fixed");
    document.body.style.minHeight = "auto";
  }

  switch (page) {
    case "about":
      content.innerHTML = `
        <div class="about-content">
          <h3>About Us</h3>
          <p>
            Sigma Training & Management Consultants (STMC) is a premier professional consulting group that prioritizes enhancing quality and assisting industries in effectively implementing management systems through a highly systematic approach. Led by a seasoned technocrat with over 40 years of experience in system implementation and training, STMC has been instrumental in aiding numerous companies to implement systems efficiently and achieve certification from third-party certification bodies across various standards.<br><br>
            STMC specializes in identifying and supplying the necessary tools for industries facing challenges, deploying quality improvement techniques, and guiding organizations to achieve certification from third-party certifying bodies. Our approach to corporate management is systematic and responsible, aiming to prevent accidents caused by human error through improved training and administration of the workforce, thereby ensuring the highest standards in Quality, Health, Safety, and Environment (QHSE).<br><br>
            As a data-driven organization, STMC is committed to offering viable solutions to make organizations more profitable and efficient, which is essential for future success. We specialize in providing sustainable solutions to empower and educate the workforce about the significance of QHSE and standards, underpinning our commitment to excellence and innovation.<br><br>
            Click the link below to view our brochure!
          </p>
          <div style="text-align: center; margin-top: 20px;">
            <button class="brochure">View Brochure</button>
          </div>
        </div>
      `;
      // Setup brochure button listener after content is loaded
      const brochureBtn = document.querySelector(".brochure");
      if (brochureBtn) {
        brochureBtn.addEventListener("click", openBrochureModal);
      }
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
            <p><b>Email:</b> <a href="mailto:stmconsult@yahoo.com">stmconsult@yahoo.com</a></p><br>
            <p><b>Phone:</b> +91-7624947307</p><br>
            <p><b>Address:</b> 570, 1st Main, 1st Block, R.T. Nagar, Bangalore-560032, Karnataka, India</p>
          </div>
        </div>
      `;
      break;

    case "login":
      content.innerHTML = `
        <h3>Login</h3>
        <form id="login-form">
          <label for="username">Username:</label><br>
          <input type="text" id="username" name="username"><br><br>
          <label for="password">Password:</label><br>
          <input type="password" id="password" name="password"><br><br>
          <button type="submit">Login</button>
        </form>
        <div id="login-message" style="margin-top: 15px; font-weight: bold;"></div>
      `;
      const form = document.getElementById("login-form");
      if (form) {
        form.onsubmit = async function (e) {
          e.preventDefault();
          const username = document.getElementById("username").value.trim();
          const password = document.getElementById("password").value.trim();
          const msg = document.getElementById("login-message");
          try {
            const res = await fetch("http://localhost:5000/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ username, password }),
            });
            const data = await res.json();
            if (data.success) {
              msg.innerHTML = `✅ Welcome, <b>${username}</b>!`;
              localStorage.setItem("loggedInUser", username);
              showLoggedInHeader(username);
            } else {
              msg.innerHTML = `❌ ${data.message}`;
            }
          } catch (err) {
            msg.innerHTML = "Server error.";
            console.error("Login error:", err);
          }
        };
      }
      break;

    case "system-implementation":
      content.innerHTML = `
        <div class="service-blocks-grid">
          <div class="service-block">
            <div class="service-header">Quality Management System<br>(ISO 9001:2015)</div>
            <div class="service-body">
              <p>QMS focuses on improvements and reduces quality. STMC ensures reduction in quality cost and improvements. <a href="#" class="read-more" data-modal="service-popup-qms">Read More...</a></p>
              <span class="custom-br"></span>
              <a href="#" class="ENQUIRE" data-service="Quality Management System (ISO 9001:2015)">ENQUIRE</a>
            </div>
          </div>
          <div class="service-block">
            <div class="service-header">Environment Management System<br>(ISO 14001:2015)</div>
            <div class="service-body">
              <p>STMC helps you address regulatory requirements systematically and cost-effectively, reducing the risk of non-compliance. <a href="#" class="read-more" data-modal="service-popup-ems">Read More...</a></p>
              <span class="custom-br"></span>
              <a href="#" class="ENQUIRE" data-service="Environment Management System (ISO 14001:2015)">ENQUIRE</a>
            </div>
          </div>
          <div class="service-block">
            <div class="service-header">Occupational Health and Safety Management Systems<br>(ISO 45001:2018)</div>
            <div class="service-body">
              <p>We help you assess workplace hazards and establish controls to minimize risks. <a href="#" class="read-more" data-modal="service-popup-ohsms">Read More...</a></p>
              <span class="custom-br"></span>
              <a href="#" class="ENQUIRE" data-service="Occupational Health and Safety Management Systems (ISO 45001:2018)">ENQUIRE</a>
            </div>
          </div>
          <div class="service-block">
            <div class="service-header">Good Manufacturing Practices<br>(ISO 22716:2007)</div>
            <div class="service-body">
              <p>We help you document and regulate the production, control, storage and shipment of cosmetic products. <a href="#" class="read-more" data-modal="service-popup-gmp">Read More...</a></p>
              <span class="custom-br"></span>
              <a href="#" class="ENQUIRE" data-service="Good Manufacturing Practices (ISO 22716:2007)">ENQUIRE</a>
            </div>
          </div>
          <div class="service-block">
            <div class="service-header">Medical Devices<br>(ISO 13485:2021)</div>
            <div class="service-body">
              <p>We help you maintain and monitor regulatory and safety requirements of the medical devices used by you. <a href="#" class="read-more" data-modal="service-popup-md">Read More...</a></p>
              <span class="custom-br"></span>
              <a href="#" class="ENQUIRE" data-service="Medical Devices (ISO 13485:2021)">ENQUIRE</a>
            </div>
          </div>
          <div class="service-block">
            <div class="service-header">Food Safety Management Systems<br>(ISO 22000:2018)</div>
            <div class="service-body">
              <p>STMC provides robust food safety management system enhancing your ability to consistently deliver products and services that meet customer as well as statutory and regulatory demands. <a href="#" class="read-more" data-modal="service-popup-fsms">Read More...</a></p>
              <span class="custom-br"></span>
              <a href="#" class="ENQUIRE" data-service="Food Safety Management Systems (ISO 22000:2018)">ENQUIRE</a>
            </div>
          </div>
          <div class="service-block">
            <div class="service-header">Information Security Management Systems<br>(ISO 27001:2022)</div>
            <div class="service-body">
              <p>We help you boost your confidence with robust security measures to safeguard against data breaches. <a href="#" class="read-more" data-modal="service-popup-isms">Read More...</a></p>
              <span class="custom-br"></span>
              <a href="#" class="ENQUIRE" data-service="Information Security Management Systems (ISO 27001:2022)">ENQUIRE</a>
            </div>
          </div>
        </div>
      `;
      setupWhatsAppEnquiring();
      break;

    case "management-training":
      content.innerHTML = `
        <div class="service-blocks-grid">
          <div class="service-block">
            <div class="service-header">Kaizen</div>
            <div class="service-body">
              <p>STMC helps you implement and maintain Kaizen (a japanese concept) and helps foster a culture of continuous improvement within your company. <a href="#" class="read-more" data-modal="service-popup-kaizen">Read More...</a></p>
              <span class="custom-br"></span>
              <a href="#" class="ENQUIRE" data-service="Kaizen">ENQUIRE</a>
            </div>
          </div>
          <div class="service-block">
            <div class="service-header">5S</div>
            <div class="service-body">
              <p>We help you implement and maintain 5S to remove clutter and organize the workplace in an ergonomic way thereby increasing performance efficiency and execute tasks effectively. <a href="#" class="read-more" data-modal="service-popup-5s">Read More...</a></p>
              <span class="custom-br"></span>
              <a href="#" class="ENQUIRE" data-service="5S">ENQUIRE</a>
            </div>
          </div>
          <div class="service-block">
            <div class="service-header">Cost of Quality</div>
            <div class="service-body">
              <p>We help you reduce cost by mimizing defects, rework and customer complaint resulting in cost-saving in the long run. <a href="#" class="read-more" data-modal="service-popup-coq">Read More...</a></p>
              <span class="custom-br"></span>
              <a href="#" class="ENQUIRE" data-service="Cost of Quality">ENQUIRE</a>
            </div>
          </div>
          <div class="service-block">
            <div class="service-header">Personnel Effectiveness</div>
            <div class="service-body">
              <p>It is a self-help movement dealing with success, goals and related concepts including the power of positive thinking. <a href="#" class="read-more" data-modal="service-popup-personnel">Read More...</a></p>
              <span class="custom-br"></span>
              <a href="#" class="ENQUIRE" data-service="Personnel Effectiveness">ENQUIRE</a>
            </div>
          </div>
          <div class="service-block">
            <div class="service-header">Communication Skills</div>
            <div class="service-body">
              <p>We help you increase your ability to convey information effectively without misinterpretation or misleading others. <a href="#" class="read-more" data-modal="service-popup-commskills">Read More...</a></p>
              <span class="custom-br"></span>
              <a href="#" class="ENQUIRE" data-service="Communication Skills">ENQUIRE</a>
            </div>
          </div>
          <div class="service-block">
            <div class="service-header">Business Excellence</div>
            <div class="service-body">
              <p>We help you achieve exceptional stakeholder-results through having outstanding organizational practices. <a href="#" class="read-more" data-modal="service-popup-busexc">Read More...</a></p>
              <span class="custom-br"></span>
              <a href="#" class="ENQUIRE" data-service="Business Excellence">ENQUIRE</a>
            </div>
          </div>
        </div>
      `;
      setupWhatsAppEnquiring();
      break;

    case "inspection-testing":
      content.innerHTML = `
        <div class="service-blocks-grid">
          <div class="service-block">
            <div class="service-header">Third Party Inspection & Testing</div>
            <div class="service-body">
              <p>INSPECTIONTESTING. <a href="#" class="read-more" data-modal="service-popup-tpi">Read More...</a></p>
              <span class="custom-br"></span>
              <a href="#" class="ENQUIRE" data-service="Third Party Inspection">ENQUIRE</a>
            </div>
          </div>
          <div class="service-block">
            <div class="service-header">Visual Inspection</div>
            <div class="service-body">
              <p>VISUALINSPECTION. <a href="#" class="read-more" data-modal="service-popup-visinsp">Read More...</a></p>
              <span class="custom-br"></span>
              <a href="#" class="ENQUIRE" data-service="Dimensional Inspection">ENQUIRE</a>
            </div>
          </div>
          <div class="service-block">
            <div class="service-header">Dimensional Inspection</div>
            <div class="service-body">
              <p>DIMENSIONALINSPECTION. <a href="#" class="read-more" data-modal="service-popup-diminsp">Read More...</a></p>
              <span class="custom-br"></span>
              <a href="#" class="ENQUIRE" data-service="Dimensional Inspection">ENQUIRE</a>
            </div>
          </div>
          <div class="service-block">
            <div class="service-header">Ultrasonic Testing</div>
            <div class="service-body">
              <p>ULTRASONICTESTING. <a href="#" class="read-more" data-modal="service-popup-ut">Read More...</a></p>
              <span class="custom-br"></span>
              <a href="#" class="ENQUIRE" data-service="Ultrasonic Testing">ENQUIRE</a>
            </div>
          </div>
          <div class="service-block">
            <div class="service-header">Dye Penetrant Testing</div>
            <div class="service-body">
              <p>DYEPENETRANTTESTING. <a href="#" class="read-more" data-modal="service-popup-dpt">Read More...</a></p>
              <span class="custom-br"></span>
              <a href="#" class="ENQUIRE" data-service="Dye Penetrant Testing">ENQUIRE</a>
            </div>
          </div>
          <div class="service-block">
            <div class="service-header">Magnetic Particle Testing</div>
            <div class="service-body">
              <p>MAGPARTTEST. <a href="#" class="read-more" data-modal="service-popup-mpt">Read More...</a></p>
              <span class="custom-br"></span>
              <a href="#" class="ENQUIRE" data-service="Magnetic Particle Testing">ENQUIRE</a>
            </div>
          </div>
        </div>
      `;
      setupWhatsAppEnquiring();
      break;

    case "general-training":
      content.innerHTML = `
        <div class="service-blocks-grid">
          <div class="service-block">
            <div class="service-header">Customer Relationship Management<br>(CRM)</div>
            <div class="service-body">
              <p>Description for Customer Relationship Management.</p>
              <a href="#" class="ENQUIRE" data-service="Customer Relationship Management">ENQUIRE</a>
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
        </div>
      `;
      setupWhatsAppEnquiring();
      break;

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
              <p>Description for STEM Tutoring.</p>
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
          <div class="service-block">
            <div class="service-header">Behavioral Science</div>
            <div class="service-body">
              <p>Description for Behavioral Science.</p>
              <a href="#" class="ENQUIRE" data-service="Behavioral Science">ENQUIRE</a>
            </div>
          </div>
        </div>
      `;
      setupWhatsAppEnquiring();
      break;

    default:
      content.innerHTML = "<p>Page not found.</p>";
  }
}

// Disable right-click
document.addEventListener("contextmenu", (e) => e.preventDefault());

// Setup WhatsApp enquiry handling with event delegation
function setupWhatsAppEnquiring() {
  const contentArea = document.getElementById("content-area");
  if (!contentArea) return;

  // Remove existing listeners to prevent duplicates
  const existingButtons = document.querySelectorAll(".ENQUIRE");
  existingButtons.forEach((button) =>
    button.removeEventListener("click", handleEnquiryClick)
  );

  // Add new listeners
  contentArea.addEventListener("click", handleEnquiryClick);

  function handleEnquiryClick(event) {
    if (event.target.classList.contains("ENQUIRE")) {
      event.preventDefault();
      const serviceName = event.target.getAttribute("data-service");
      const phoneNumber = "917624947307";
      const message = `Hello! I would like to enquire about the service: ${serviceName}. Please provide more details.`;

      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const istOffset = 5.5 * 60 * 60000;
      const istTime = new Date(utc + istOffset);
      const hours = istTime.getHours();
      const minutes = istTime.getMinutes();
      const isAllowed = hours >= 6 && hours < 22;

      const confirmAction = () => {
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
          message
        )}`;
        fetch("http://localhost:5000/enquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service: serviceName,
            timestamp: new Date().toISOString(),
          }),
        })
          .then((res) => res.text())
          .then((response) => console.log("Admin notified:", response))
          .catch((err) => console.error("Email notification failed:", err));
        window.open(whatsappURL, "_blank");
      };

      if (isAllowed) {
        const msg = `Service Name: <b>${serviceName}</b><br><br>Choose how you would like to contact:`;
        showCustomModal(msg, confirmAction);
      } else {
        let hoursTo6am =
          hours < 6
            ? 6 - hours - (minutes > 0 ? 1 : 0)
            : 24 - hours + 6 - (minutes > 0 ? 1 : 0);
        const minsToNextHour = minutes > 0 ? 60 - minutes : 0;
        const boldTime = `<b>${hoursTo6am} hour(s)${
          minsToNextHour ? " and " + minsToNextHour + " minute(s)" : ""
        }</b>`;
        const msg = `The lights may be out in India 🌙 — but I’ll circle back once they’re on.<br><br>
        Enquiries resume in ${boldTime}.<br><br>
        Thanks for your patience!`;
        showCustomModal(msg, null, true);
      }
    }
  }
}

// Show custom modal for enquiry options
function showCustomModal(message, onConfirm = null, lightsOut = false) {
  const modal = document.getElementById("custom-modal");
  const modalMessage = document.getElementById("modal-message");
  if (!modal || !modalMessage) {
    console.error("Modal elements not found");
    return;
  }

  modalMessage.innerHTML = `
    <span id="modal-close-btn" style="position:absolute; top:8px; right:12px; cursor:pointer; font-size:1.2em;">✖</span>
    <div style="margin-top: 20px;">${message}</div>
  `;

  if (!lightsOut) {
    modalMessage.innerHTML += `
      <button id="call-btn" style="padding:8px 24px; border:none; background:#4F61C5; color:#fff; border-radius:5px; font-size:1em; cursor:pointer; margin-right: 10px;">Call</button>
      <button id="calend-btn" style="padding:8px 24px; border:none; background:maroon; color:#fff; border-radius:5px; font-size:1em; cursor:pointer; margin-right: 10px;">Book (Calendly)</button>
      <button id="whatsapp-btn" style="padding:8px 24px; border:none; background:#518A7E; color:#fff; border-radius:5px; font-size:1em; cursor:pointer; margin-right: 10px;">Text (WhatsApp)</button>
      <button id="email-btn" style="padding:8px 24px; border:none; background:gray; color:#fff; border-radius:5px; font-size:1em; cursor:pointer;">Email</button>
    `;
  }

  modal.style.display = "flex";

  const closeBtn = document.getElementById("modal-close-btn");
  if (closeBtn) {
    closeBtn.onclick = () => (modal.style.display = "none");
  }

  if (!lightsOut && onConfirm) {
    const whatsappBtn = document.getElementById("whatsapp-btn");
    const callBtn = document.getElementById("call-btn");
    const calendBtn = document.getElementById("calend-btn");
    const emailBtn = document.getElementById("email-btn");

    if (whatsappBtn) {
      whatsappBtn.onclick = () => {
        modal.style.display = "none";
        onConfirm();
      };
    }
    if (callBtn) {
      callBtn.onclick = () => {
        modal.style.display = "none";
        const callingPopup = document.createElement("div");
        callingPopup.id = "calling-popup";
        callingPopup.innerText = "📞 Calling: +91-7624947307...";
        callingPopup.className = "glow-popup";
        const closeBtn = document.createElement("span");
        closeBtn.innerText = "✖";
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
        setTimeout(() => {
          if (document.body.contains(callingPopup)) callingPopup.remove();
        }, 15000);
        setTimeout(() => {
          window.location.href = "tel:+917624947307";
        }, 1000);
      };
    }
    if (calendBtn) {
      calendBtn.onclick = () => {
        window.open("https://calendly.com/vnk-arjun-brinda/new-meeting", "_blank");
        modal.style.display = "none";
      };
    }
    if (emailBtn) {
      emailBtn.onclick = () => {
        window.location.href =
          "mailto:stmconsult@yahoo.com?subject=Service Enquiry Request&body=Hello, I would like to enquire about a service.";
        modal.style.display = "none";
      };
    }
  }
}

// Show logged-in header
function showLoggedInHeader(username) {
  const header = document.getElementById("header-bar") || document.createElement("div");
  header.id = "header-bar";
  header.style.cssText = `
    background: #0D0F14;
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-bottom: 1px solid #ccc;
  `;
  header.innerHTML = `
    <div style="color: white; margin-right: 15px;">👤 Logged in as <b>${username}</b></div>
    <button id="logout-btn" style="padding:6px 12px; background:maroon; color:white; border:none; border-radius:5px; cursor:pointer;">Sign Out</button>
  `;
  const nav = document.querySelector("nav");
  if (nav) {
    nav.insertAdjacentElement("afterend", header);
  }
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.onclick = () => {
      localStorage.removeItem("loggedInUser");
      header.remove();
      loadContent("home");
    };
  }
}

// Open brochure modal with PDF.js
function openBrochureModal() {
  const modal = document.getElementById("brochure-modal");
  const canvas = document.getElementById("pdf-canvas");
  const pageNumDisplay = document.getElementById("page-num");
  const pageCountDisplay = document.getElementById("page-count");

  if (modal && canvas && pageNumDisplay && pageCountDisplay) {
    const pdfUrl = "brochure.pdf"; // Update this path if needed, e.g., "assets/brochure.pdf"
    // For testing: const pdfUrl = "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey.pdf";
    pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {
      pdfDoc = pdf;
      pageCountDisplay.textContent = pdfDoc.numPages;
      pageNum = 1;
      renderPage(pageNum);
      modal.style.display = "flex";
    }).catch(error => {
      console.error("Error loading PDF:", error);
      const modalMessage = document.getElementById("modal-message");
      if (modalMessage) {
        modalMessage.innerHTML = "Failed to load the brochure. Please try again later.";
        document.getElementById("custom-modal").style.display = "flex";
      }
    });
  } else {
    console.error("Brochure modal or required elements not found");
    const modalMessage = document.getElementById("modal-message");
    if (modalMessage) {
      modalMessage.innerHTML = "Brochure modal elements are missing.";
      document.getElementById("custom-modal").style.display = "flex";
    }
  }
}

// Render a specific PDF page
function renderPage(num) {
  const canvas = document.getElementById("pdf-canvas");
  const ctx = canvas.getContext("2d");
  const prevPageBtn = document.getElementById("prev-page");
  const nextPageBtn = document.getElementById("next-page");
  const pageNumDisplay = document.getElementById("page-num");

  pageRendering = true;
  pdfDoc.getPage(num).then(page => {
    const viewport = page.getViewport({ scale: 1 });
    const scale = Math.min(canvas.parentElement.clientWidth / viewport.width, canvas.parentElement.clientHeight / viewport.height);
    const scaledViewport = page.getViewport({ scale });

    canvas.height = scaledViewport.height;
    canvas.width = scaledViewport.width;

    const renderContext = {
      canvasContext: ctx,
      viewport: scaledViewport
    };
    page.render(renderContext).promise.then(() => {
      pageRendering = false;
      pageNumDisplay.textContent = num;
      if (pageNumPending !== null) {
        renderPage(pageNumPending);
        pageNumPending = null;
      }
    });
    prevPageBtn.disabled = num <= 1;
    nextPageBtn.disabled = num >= pdfDoc.numPages;
  });
}

// Queue page rendering if another render is in progress
function queueRenderPage(num) {
  if (pageRendering) {
    pageNumPending = num;
  } else {
    renderPage(num);
  }
}

// Initialize page and setup event listeners
window.addEventListener("DOMContentLoaded", () => {
  loadContent("home");

  // Setup brochure modal close button
  const closeBtn = document.getElementById("close-btn");
  if (closeBtn) {
    closeBtn.onclick = () => {
      const modal = document.getElementById("brochure-modal");
      if (modal) {
        modal.style.display = "none";
      }
    };
  }

  // Setup brochure navigation buttons
  const prevPageBtn = document.getElementById("prev-page");
  const nextPageBtn = document.getElementById("next-page");
  if (prevPageBtn && nextPageBtn) {
    prevPageBtn.addEventListener("click", () => {
      if (pageNum <= 1) return;
      pageNum--;
      queueRenderPage(pageNum);
    });
    nextPageBtn.addEventListener("click", () => {
      if (pageNum >= pdfDoc.numPages) return;
      pageNum++;
      queueRenderPage(pageNum);
    });
  }

  // Generic modal setup for "Read More"
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("read-more")) {
      event.preventDefault();
      const modalId = event.target.getAttribute("data-modal");
      const modal = document.getElementById(modalId);
      if (modal) modal.style.display = "flex";
    }

    if (event.target.classList.contains("close-btn")) {
      const modal = event.target.closest(".custom-vertical-modal");
      if (modal) modal.style.display = "none";
    }
  });
});

document.getElementById('next-page').addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // for smooth scrolling, remove if you want instant jump
  });
  // Add your page navigation logic here if needed
});

document.getElementById('prev-page').addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // for smooth scrolling, remove if you want instant jump
  });
  // Add your page navigation logic here if needed
});