"use client";

class Utils {
  checkIfMobile = () => {
    if(window.innerWidth <= 899) {
      return true;
    }
    return false;
  }
  
  parseTimeToMinutes = (t: string) => {
    const [timePart, modifier] = t.split(" ");
    let [hours, minutes] = timePart.split(":").map(Number);
    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    return hours * 60 + minutes;
  }
}

export default Utils;