function currentDateTime() {
    const date = new Date(); // Getting the current date and time
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; //array of days of the week
    const dayName = daysOfWeek[date.getDay()]; //getting current day

    // Extracting time components
    let hours = date.getHours();
    let minutes = date.getMinutes();

    // Formatting components with leading zeros if needed
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    // Formatting date and time
    const formattedTime = `${hours}:${minutes}`;
    const formattedDateTime = `${dayName} ${formattedTime}`

    //adding time to HTML
    document.getElementById("localTime").innerText = formattedDateTime;

}

// Updating the time every second
setInterval(currentDateTime, 1000);

currentDateTime();
