/* Reset some defaults */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  background-color: #f8f9fa;
  color: #333;
}

/* Header styles */
header {
  background-color: #003366;
  color: white;
  padding: 10px 20px;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.logo {
  height: 50px;
}

.company-title {
  font-size: 20px;
  margin-left: 20px;
  flex-grow: 1;
}

/* Nav styles */
nav {
  margin-top: 10px;
}

.nav-links {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.nav-links li a {
  color: white;
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 4px;
  transition: background 0.3s ease;
}

.nav-links li a:hover {
  background-color: #00509e;
}

/* Main section */
main {
  padding: 20px;
}

/* Footer */
footer {
  text-align: center;
  padding: 10px;
  background-color: #003366;
  color: white;
  margin-top: 30px;
}