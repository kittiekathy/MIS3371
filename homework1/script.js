//dynamic date
const currentDate = new Date();

const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long', // "Monday"
    year: 'numeric', // "2025"
    month: 'long', // "February"
    day: 'numeric' // "12"
});

document.getElementById('current-date').textContent = `Today is ${formattedDate}`;

//slider
var slider = document.getElementById("severity");
var output = document.getElementById("severityValue");
output.innerHTML = slider.value;

slider.oninput = function() {
    output.innerHTML = this.value;
}