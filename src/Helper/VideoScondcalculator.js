function convertSecondsToHMS(seconds) {
    // Calculate hours, minutes, and remaining seconds
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var remainingSeconds = Math.floor(seconds % 60);

    // Add leading zero if seconds is less than 10
    var formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

    // Return the result as a formatted string
    return hours + ': ' + minutes + ' : ' + formattedSeconds + '';
}

// Example usage
// let totalSeconds = seconds; // Replace this with your desired number of seconds
// let result = convertSecondsToHMS(totalSeconds);
export default convertSecondsToHMS;