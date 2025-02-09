

export const generalColors = {
    primary: "#20456f",
    secondary: "#ffaf5f",
    white: "#F9F9F9",
    creme: "#feffec",
    black: "#000000",
    mint: "#45cea2",
    lightMint: "#8de1c6",
    darkMint: "#008a82",
    lightBlue: "#00adf4",
    darkOrange: "#ff5f2e",
}

export const generalStyles = {
  NavBar: {
    button: {
      color: generalColors.creme,
      textTransform: "capitalize",
      width: "200px",
    }
  },
  Dashboard: {
    Box: {
      backgroundColor: generalColors.primary,
      color: generalColors.creme,
      height: "350px",
      width: "550px",
      boxShadow: "7px 7px 7px rgba(0, 0, 0, 1)",
      borderRadius: 3,
    }
  }
}