"use client";

class Utils {
  checkIfMobile = () => {
    if(window.innerWidth <= 899) {
      return true;
    }
    return false;
  };
}

export default Utils;