

export const generalColors = {
    primary: "#20456f",
    secondary: "#ffaf5f",
    white: "#F9F9F9",
    creme: "#feffec",
    black: "#121212",
    mint: "#45cea2",
    lightMint: "#8de1c6",
    darkMint: "#008a82",
    lightBlue: "#00adf4",
    darkBlue: "rgba(0, 0, 0, 0.5)",
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
  },

  Habits: {
    Box: {
      backgroundColor: generalColors.primary,
      color: generalColors.creme,
      maxHeight: "500px",
      overflowY: "auto",
      width: "550px",
      boxShadow: "7px 7px 7px rgba(0, 0, 0, 1)",
      borderRadius: 3,
    },
    List: {
      width: '400px',
      color: generalColors.creme,
      bgcolor: generalColors.primary,
      // boxShadow: "1px 2px 2px 2px rgba(0, 0, 0, 0.5)",
      // borderRadius: 3,
      marginTop: "10px",
      // maxHeight: "480px",
      // overflow: 'auto',
      // overflowY: 'scroll',
    },
    ListItem: {
      width: '350px',
      maxheight: "100px",
      overflow: "auto",
      color: generalColors.creme,
      bgcolor: generalColors.primary,
      boxShadow: "1px 2px 2px 2px rgba(0, 0, 0, 0.5)",
      borderRadius: 3,
      marginTop: "2px",
    }
  }
}