Bankist App 🏦

Bankist is a simple, interactive, and modern bank application built with HTML, CSS, and JavaScript. It simulates a real-world banking interface where users can log in, view their transactions, transfer money, request loans, and close their account.

Table of Contents

Features

Demo

Technologies

Installation

Usage

Project Structure

Future Improvements

Author

Features

User Login – Secure login with username and PIN.

View Balance – Display current account balance.

Transaction History – View deposits and withdrawals with dates.

Transfer Money – Send money to other users.

Request Loan – Loan approval if conditions are met.

Close Account – Delete your account permanently.

Sorting Transactions – Sort deposits and withdrawals.

Logout Timer – Automatic logout after inactivity.

Dynamic Date and Currency Formatting – Based on user’s locale and currency.

Demo

You can run the project locally in your browser. All interactions are fully functional.

Technologies

HTML5 – Markup for the app structure.

CSS3 – Styling and layout.

JavaScript (ES6+) – Functionality, DOM manipulation, and data management.

Intl API – For currency and date formatting.

Installation

Clone the repository:

git clone https://github.com/yourusername/bankist-app.git


Navigate to the project folder:

cd bankist-app


Open index.html in your preferred browser.

No backend required – all data is stored in JavaScript objects.

Usage

Enter your username and PIN (example accounts below).

Check your balance and transaction history.

Use the Transfer, Loan, or Close Account features.

Sort transactions using the Sort button.

Example User Accounts
Owner	Username	PIN	Currency	Type
Jonas Schmedtmann	js	1111	USD	Premium
Jessica Davis	jd	2222	EUR	Standard
Steven Thomas Williams	stw	3333	USD	Premium
Dagm Endale	de	1212	EUR	Basic
Project Structure
bankist-app/
├── images/                 # Icons, logo, and other images
├── index.html              # Main HTML file
├── style.css               # Stylesheet
├── index.js                # JavaScript logic
└── README.md               # Project documentation

Future Improvements

Add backend using Node.js or PHP to persist data.

Implement user registration.

Add responsive design improvements for mobile devices.

Add charts for transaction summaries.

Improve security features for sensitive data.

Author

Dagm Endale

GitHub: https://github.com/dagied

Email: dagmendale2@.com
