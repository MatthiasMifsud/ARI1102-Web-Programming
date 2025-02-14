function currentDateTime() {
    const date = new Date(); // Get the current date and time

    // Extracting date components
    const year = date.getFullYear();
    let month = date.getMonth() + 1; // Months are 0-based
    let day = date.getDate();

    // Extracting time components
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    // formatting with leading zeros if needed
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    // formatting date and time
    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    const formattedDateTime = `${formattedDate}  ${formattedTime}`
    // Updating the HTML
    document.getElementById("currentDate").value = formattedDateTime;
}

// initilising on load
currentDateTime();
// Updating the time every second
setInterval(currentDateTime, 1000);