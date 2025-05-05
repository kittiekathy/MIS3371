//dynamic date
const currentDate = new Date();

const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric' 
});

document.getElementById('current-date').textContent = `Today is ${formattedDate}`;

//slider
    var slider = document.getElementById("severity");
    var output = document.getElementById("severityValue");
    output.innerHTML = slider.value;

    slider.oninput = function() {
        output.innerHTML = this.value;
    }

//review button
document.getElementById("reviewBtn").addEventListener("click", function() {
    // text & input values
    let firstName = document.getElementById("first-name").value;
    let middleInitial = document.getElementById("middle-initial").value;
    let lastName = document.getElementById("last-name").value;
    let dob = document.getElementById("dob").value;
    let ssn = document.getElementById("ssn").value.replace(/\d(?=\d{4})/g, "*"); // Mask SSN except last 4 digits
    let address1 = document.getElementById("address1").value;
    let address2 = document.getElementById("address2").value;
    let city = document.getElementById("city").value;
    let state = document.getElementById("state").value;
    let zip = document.getElementById("zip").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let healthConcerns = document.getElementById("healthConcerns").value;

    // checkbox values
    let symptoms = [];
    if (document.getElementById("fever").checked) symptoms.push("Fever");
    if (document.getElementById("cough").checked) symptoms.push("Cough");
    if (document.getElementById("nausea").checked) symptoms.push("Nausea");
    if (document.getElementById("lostTaste").checked) symptoms.push("Loss of Taste or Smell");
    if (document.getElementById("dizziness").checked) symptoms.push("Dizziness");

    // radio button values
    let allergies = document.querySelector('input[name="allergies"]:checked')?.value || "Not selected";
    let medication = document.querySelector('input[name="medication"]:checked')?.value || "Not selected";
    let contactMethod = document.querySelector('input[name="contactMethod"]:checked')?.value || "Not selected";

    // retrieving slider value
    let severity = document.getElementById("severity").value;

    // retrieving user ID & masking passwords
    let userId = document.getElementById("userId").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("reEnterPassword").value;

    // display review information
    document.getElementById("reviewOutput").innerHTML = `
        <h3>Review Your Information</h3>
        <p><strong>Name:</strong> ${firstName} ${middleInitial} ${lastName}</p>
        <p><strong>Date of Birth:</strong> ${dob}</p>
        <p><strong>SSN:</strong> ${ssn}</p>
        <p><strong>Address:</strong> ${address1} ${address2 ? ", " + address2 : ""}, ${city}, ${state} ${zip}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Health Concerns:</strong> ${healthConcerns || "None provided"}</p>

        <h4>Symptoms:</h4>
        <p>${symptoms.length > 0 ? symptoms.join(", ") : "No symptoms selected"}</p>

        <h4>Medical History:</h4>
        <p><strong>History of Allergies:</strong> ${allergies}</p>
        <p><strong>Currently Taking Medication:</strong> ${medication}</p>

        <h4>Contact Preferences:</h4>
        <p><strong>Preferred Contact Method:</strong> ${contactMethod}</p>

        <h4>Symptom Severity:</h4>
        <p>${severity} / 10</p>

        <h4>Account Information:</h4>
        <p><strong>User ID:</strong> ${userId}</p>
        <p><strong>Password:</strong> ${password}</p>
        <p><strong>Confirm Password:</strong> ${confirmPassword}</p>
    `;
});


// Validate First Name in Real-Time
document.getElementById("first-name").addEventListener("input", function() {
    let firstName = this.value;
    let errorMessage = document.getElementById("firstNameError");
    let regex = /^[A-Za-z'-]+$/;  // Only letters, apostrophes, and dashes

    if (!regex.test(firstName)) {
        errorMessage.textContent = "First name must contain only letters, apostrophes, and dashes.";
    } else {
        errorMessage.textContent = "";
    }

    // Revalidate the form after checking the field
     validateForm();  // This will check all fields and update the submit button state
    
});

// Middle Initial Validation in Real-time
document.getElementById("middle-initial").addEventListener("input", function() {
    let middleInitial = this.value;
    let errorMessage = document.getElementById("middleInitialError");
    let regex = /^[A-Za-z]$/;  // One letter only (no numbers)

    // If the field is filled, validate that it's only 1 letter
    if (middleInitial && !regex.test(middleInitial)) {
        errorMessage.textContent = "Middle initial must be a single letter.";
    } else {
        errorMessage.textContent = "";
    }
    // Revalidate the form after checking MI
    validateForm();  // This will check all fields and update the submit button state
});

// Validate Last Name in Real-Time
document.getElementById("last-name").addEventListener("input", function() {
    let lastName = this.value;
    let errorMessage = document.getElementById("lastNameError");
    let regex = /^[A-Za-z'-]+$/;  // Only letters, apostrophes, and dashes

    if (!regex.test(lastName)) {
        errorMessage.textContent = "Last name must contain only letters, apostrophes, and dashes.";
    } else {
        errorMessage.textContent = "";
    }
    // Revalidate the form after checking the last name
    validateForm();  // This will check all fields and update the submit button state
});

// Set dynamic min and max date for Date of Birth input
window.onload = function() {
    let today = new Date(); // Get current date
    let currentYear = today.getFullYear();
    let minYear = currentYear - 120; // Calculate 120 years ago
    let maxDate = today.toISOString().split('T')[0]; // Current date in YYYY-MM-DD format
    let minDate = new Date(minYear, today.getMonth(), today.getDate()).toISOString().split('T')[0]; // 120 years ago

    // Set the min and max values on the DOB input
    document.getElementById("dob").setAttribute("min", minDate);
    document.getElementById("dob").setAttribute("max", maxDate);
};

// Validate DOB in Real-Time
document.getElementById("dob").addEventListener("input", function() {
    let dob = this.value;
    let errorMessage = document.getElementById("dobError");

    // Convert the date from YYYY-MM-DD format to a Date object
    let dobDate = new Date(dob);
    let today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();

    // Check if the DOB is in the future or more than 120 years ago
    if (dobDate > today) {
        errorMessage.textContent = "Date of birth cannot be in the future.";  // Future date
    } else if (age > 120) {
        errorMessage.textContent = "Date of birth must be valid and not more than 120 years ago.";  // More than 120 years ago
    } else {
        errorMessage.textContent = ""; // Clear the error if the DOB is valid
    }

    // Revalidate the form after checking the DOB
    validateForm();
});

// Validate SSN in Real-Time and Format as You Type
document.getElementById("ssn").addEventListener("input", function() {
    let ssn = this.value;
    let errorMessage = document.getElementById("ssnError");

    // Remove any non-numeric characters
    ssn = ssn.replace(/\D/g, '');

    // Format the SSN as XXX-XX-XXXX
    if (ssn.length > 3) {
        ssn = ssn.slice(0, 3) + '-' + ssn.slice(3);
    }
    if (ssn.length > 6) {
        ssn = ssn.slice(0, 6) + '-' + ssn.slice(6);
    }

    // Update the input field with the formatted SSN
    this.value = ssn;

    // Validate SSN: must be exactly 9 digits
    let regex = /^\d{3}-\d{2}-\d{4}$/;  // Must match the format XXX-XX-XXXX

    if (!regex.test(ssn)) {
        errorMessage.textContent = "SSN must be 9 digits in the format XXX-XX-XXXX.";  // Display error message
    } else {
        errorMessage.textContent = "";  // Clear error message when valid
    }
    // Revalidate the form after checking SSN
    validateForm();  // This will check all fields and update the submit button state
});


// Validate Email in Real-Time
document.getElementById("email").addEventListener("input", function() {
    let email = this.value;
    let errorMessage = document.getElementById("emailError");

    // Regex to match email format: name@domain.tld
    let regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

    if (!regex.test(email)) {
        errorMessage.textContent = "Please enter a valid email address (e.g., name@domain.tld).";
    } else {
        errorMessage.textContent = "";  // Clear error message when valid
    }
});


// Validate Zip Code in Real-Time
document.getElementById("zip").addEventListener("input", function() {
    let zip = this.value;
    let errorMessage = document.getElementById("zipError");
    let regex = /^\d{5}$/;  // 5 digits only

    if (!regex.test(zip)) {
        errorMessage.textContent = "Zip code must be exactly 5 digits.";
    } else {
        errorMessage.textContent = "";
    }
});

// Validate User ID in Real-Time
document.getElementById("userId").addEventListener("input", function() {
    let userId = this.value;
    let errorMessage = document.getElementById("userIdError");
    let regex = /^[a-zA-Z0-9_-]{5,20}$/;  // Only letters, numbers, dash, and underscore (5-20 characters)
    
    if (/^[0-9]/.test(userId)) {
        errorMessage.textContent = "User ID can't start with a number.";
    }
    else if (userId.length < 5 || userId.length > 20) {
        errorMessage.textContent = "User ID must be between 5 and 20 characters.";
    }
    else if (!regex.test(userId)) {
        errorMessage.textContent = "User ID can only contain letters, numbers, dash (-), and underscore (_).";
    } else {
        errorMessage.textContent = ""; // Clear error if valid
    }
    // Revalidate the form after checking User ID
    validateForm();  // This will check all fields and update the submit button state
});

// Validate Password Complexity in Real-Time
document.getElementById("password").addEventListener("input", function() {
    let password = this.value;
    let passwordError = document.getElementById("passwordError");
    let userId = document.getElementById("userId").value;

    // Check if password length is at least 8 characters
    if (password.length < 8) {
        passwordError.textContent = "Password must be at least 8 characters long.";
    }
    // Check if password contains at least 1 uppercase, 1 lowercase, and 1 digit
    else if (!/(?=.*[a-z])/.test(password) || !/(?=.*[A-Z])/.test(password) || !/(?=.*\d)/.test(password)) {
        passwordError.textContent = "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 digit.";
    }
    // Check if password matches the User ID
    else if (password === userId) {
        passwordError.textContent = "Password cannot be the same as your User ID.";
    } else {
        passwordError.textContent = ""; // Clear error if valid
    }
    // Revalidate the form after checking password
    validateForm();  // This will check all fields and update the submit button state
});

// Validate Re-enter Password (Ensure it matches the Password field)
document.getElementById("reEnterPassword").addEventListener("input", function() {
    let password = document.getElementById("password").value;
    let confirmPassword = this.value;
    let confirmPasswordError = document.getElementById("confirmPasswordError");

    if (password !== confirmPassword) {
        confirmPasswordError.textContent = "Passwords do not match!";
    } else {
        confirmPasswordError.textContent = ""; // Clear error if passwords match
    }
    // Revalidate the form after checking confirm password
    validateForm();  // This will check all fields and update the submit button state
});

// Validate Button Logic
document.getElementById("validateBtn").addEventListener("click", function() {
    let formIsValid = true;

    // Reset all error messages
    document.querySelectorAll('.error-message').forEach(function (error) {
        error.textContent = "";
    });

    // Retrieve form values
    let firstName = document.getElementById("first-name").value;
    let lastName = document.getElementById("last-name").value;
    let email = document.getElementById("email").value;
    let userId = document.getElementById("userId").value;
    let password = document.getElementById("password").value;
    let reEnterPassword = document.getElementById("reEnterPassword").value;
    let dob = document.getElementById("dob").value;

    // Field Validations

    // First Name Validation
    if (!/^[A-Za-z'-]+$/.test(firstName)) {
        document.getElementById("firstNameError").textContent = "First name must only contain letters, apostrophes, and dashes.";
        formIsValid = false;
    }

    // Last Name Validation
    if (!/^[A-Za-z'-]+$/.test(lastName)) {
        document.getElementById("lastNameError").textContent = "Last name must only contain letters, apostrophes, and dashes.";
        formIsValid = false;
    }

    // Email Validation (force lowercase)
    email = email.toLowerCase();
    document.getElementById("email").value = email;
    if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email)) {
        document.getElementById("emailError").textContent = "Please enter a valid email address (e.g., name@domain.tld).";
        formIsValid = false;
    }

    // User ID Validation
    if (/^[0-9]/.test(userId) || userId.length < 5 || userId.length > 20 || !/^[a-zA-Z0-9_-]{5,20}$/.test(userId)) {
        document.getElementById("userIdError").textContent = "User ID must be between 5 and 20 characters and contain only letters, numbers, dashes, and underscores.";
        formIsValid = false;
    }

    // Password Validation
    if (password.length < 8 || !/(?=.*[a-z])/.test(password) || !/(?=.*[A-Z])/.test(password) || !/(?=.*\d)/.test(password)) {
        document.getElementById("passwordError").textContent = "Password must be at least 8 characters long, contain 1 uppercase, 1 lowercase, and 1 digit.";
        formIsValid = false;
    } else if (password === userId) {
        document.getElementById("passwordError").textContent = "Password cannot be the same as your User ID.";
        formIsValid = false;
    }

    // Confirm Password Validation
    if (password !== reEnterPassword) {
        document.getElementById("confirmPasswordError").textContent = "Passwords do not match!";
        formIsValid = false;
    }

    // Date of Birth Validation
    let dobDate = new Date(dob);
    let today = new Date();
    if (dobDate > today) {
        document.getElementById("dobError").textContent = "Date of birth cannot be in the future.";
        formIsValid = false;
    } else if ((today.getFullYear() - dobDate.getFullYear()) > 120) {
        document.getElementById("dobError").textContent = "Date of birth must be valid and not more than 120 years ago.";
        formIsValid = false;
    }

    // Enable/Disable submit button based on form validity
    const submitButton = document.getElementById("submitButton");
    submitButton.disabled = !formIsValid;  // Disable if form is not valid, enable if valid
});

// Function to get a cookie value by its name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }
  
  // Function to set a cookie
  function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`;  // Ensure path is set
  }
  
  // Function to delete a cookie
  function deleteCookie(name) {
    setCookie(name, "", -1);  // Set the cookie expiration to the past to delete it
  }
  
  // Check for cookie and update the greeting and form
  window.onload = function() {
    const firstName = getCookie("first-name");
    
    // If cookie exists, welcome back user
    if (firstName) {
      document.getElementById("greeting").textContent = `Welcome back, ${firstName}!`;
  
      // Show the "Not [Name]?" checkbox
      const newUserOption = document.getElementById("newUserCheckboxContainer");
      newUserOption.style.display = "block";
  
      // Handle the new user checkbox
      document.getElementById("newUserCheckbox").addEventListener("change", function() {
        if (this.checked) {
          // Clear the form and cookie
          deleteCookie("first-name");
          document.getElementById("submitForm").reset();
          document.getElementById("greeting").textContent = "Hello New user!";
        }
      });
    } else {
      // If no cookie, greet new user
      document.getElementById("greeting").textContent = "Hello New user!";
    }
  
    // Handle the remember me checkbox
    const rememberMeCheckbox = document.getElementById("rememberMe");
    rememberMeCheckbox.addEventListener("change", function() {
      const firstNameValue = document.getElementById("first-name").value;
  
      if (this.checked && firstNameValue) {
        // Save the name cookie if checked
        setCookie("first-name", firstNameValue, 2); // Expire in 2 days
      } else {
        // Delete the cookie if unchecked
        deleteCookie("first-name");
      }
    });
  
    // Prefill the First Name if cookie is found
    if (firstName) {
      document.getElementById("first-name").value = firstName;
    }
  
    // Handle form submission
    document.getElementById("submitForm").onsubmit = function(event) {
      event.preventDefault(); // Prevent default submission so we can handle cookies
      
      const firstName = document.getElementById("first-name").value;
      
      if (rememberMeCheckbox.checked && firstName) {
        // Save the name cookie
        setCookie("first-name", firstName, 2); // Expire in 2 days
      } else {
        // Delete the cookie if unchecked
        deleteCookie("first-name");
      }
      
      // After handling cookies, manually submit the form to redirect to thankyou.html
      window.location.href = "thankyou.html";
    };
  };
  