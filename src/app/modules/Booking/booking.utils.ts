export const calculateTotalHours = (startTime: string, endTime: string ): number => {
    // const { startTime, endTime } = booking;
  
    // Parse the start time and end time
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
  
    // Calculate the total start and end minutes
    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;
  
    // Calculate the difference in minutes and convert to hours
    const totalMinutes = endTotalMinutes - startTotalMinutes;
    const totalHours = totalMinutes / 60;
  
    return totalHours;
  };