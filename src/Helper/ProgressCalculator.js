function CalculateWatchedPercentage(watchedDuration, totalDuration) {
    // Ensure both durations are numbers and greater than zero
    if (typeof watchedDuration !== 'number' || typeof totalDuration !== 'number' ||
        watchedDuration < 0 || totalDuration <= 0) {
      return 0;
    }
  
    // Calculate the percentage
    const watchedPercentage = (watchedDuration / totalDuration) * 100;
    return watchedPercentage.toFixed(2); // Return the percentage rounded to 2 decimal places
  }


  export default CalculateWatchedPercentage