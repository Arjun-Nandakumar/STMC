function loadContent(page) {
  const content = document.getElementById("content-area");

  // Remove or add overlay based on page
  if (page === "home") {
    content.classList.remove("overlay");
    content.innerHTML = ""; // no additional content for home
    return;
  } else {
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
          <h3>Contact Us</h3>
          <p>Email: <a href="mailto:info@stmc.com">info@stmc.com</a></p>
          <p>Phone: +123-456-7890</p>
          <p>Address: 123 Sigma Street, Business City</p>
        `;
        break;

      case "login":
        content.innerHTML = `
          <h3>Login</h3>
          <form onsubmit="event.preventDefault(); alert('Login functionality not implemented.');">
            <label for="username">Username:</label><br>
            <input type="text" id="username" name="username"><br><br>

            <label for="password">Password:</label><br>
            <input type="password" id="password" name="password"><br><br>

            <button type="submit">Login</button>
          </form>
        `;
        break;

        case "system-implementation":
          content.innerHTML = `
            <div class="service-blocks-grid">
              <div class="service-block">
                <div class="service-header">Quality Management System (QMS)</div>
                <div class="service-body">
                  <p>Description for QMS.</p>
                  <a href="#" class="read-more">Read More...</a>
                </div>
              </div>
              <div class="service-block">
                <div class="service-header">Environmental Management System (EMS)</div>
                <div class="service-body">
                  <p>Description for EMS.</p>
                  <a href="#" class="read-more">Read More...</a>
                </div>
              </div>
              <div class="service-block">
                <div class="service-header">Occupational Health and Safety Management System (OHSMS)</div>
                <div class="service-body">
                  <p>Description for OHSMS.</p>
                  <a href="#" class="read-more">Read More...</a>
                </div>
              </div>
              <div class="service-block">
                <div class="service-header">Food Safety Management System (FSMS)</div>
                <div class="service-body">
                  <p>Description for FSMS.</p>
                  <a href="#" class="read-more">Read More...</a>
                </div>
              </div>
              <div class="service-block">
                <div class="service-header">Information Security Management System (ISMS)</div>
                <div class="service-body">
                  <p>Description for ISMS.</p>
                  <a href="#" class="read-more">Read More...</a>
                </div>
              </div>
              <!-- Add more blocks as needed -->
            </div>
          `;
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

