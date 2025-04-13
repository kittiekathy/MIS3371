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

// Validate Password Complexity in Real-Time
document.getElementById("password").addEventListener("input", function() {
    let password = this.value;
    let passwordError = document.getElementById("passwordError");
    let userId = document.getElementById("userId").value;
    let firstName = document.getElementById("first-name").value.toLowerCase();
    let lastName = document.getElementById("last-name").value.toLowerCase();

    // Regex for required password complexity
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])[\w@#$%^&+=!]{8,30}$/;

    // Check if password meets complexity rules
    if (!regex.test(password)) {
        passwordError.textContent = "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character.";
    } 
    // Check if password contains the User ID or Name
    else if (password.toLowerCase().includes(userId.toLowerCase()) || 
             password.toLowerCase().includes(firstName) || 
             password.toLowerCase().includes(lastName)) {
        passwordError.textContent = "Password cannot contain your User ID or part of your name.";
    } else {
        passwordError.textContent = "";
    }
});

// Validate Passwords Match in Real-Time
document.getElementById("reEnterPassword").addEventListener("input", function() {
    let password = document.getElementById("password").value;
    let confirmPassword = this.value;
    let confirmError = document.getElementById("confirmPasswordError");

    if (password !== confirmPassword) {
        confirmError.textContent = "Passwords do not match!";
    } else {
        confirmError.textContent = "";
    }
});

// Prevent Form Submission if Passwords Do Not Match
document.querySelector("form").addEventListener("submit", function(event) {
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("reEnterPassword").value;

    if (password !== confirmPassword) {
        event.preventDefault(); // Stop form submission
        alert("Passwords do not match. Please fix this before submitting.");
    }
});
