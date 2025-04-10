// styles.js
export const colors = {
  primaryDark: '#03045E',
  primary: '#007786',
  primaryLight: '#0084D8',
  secondary: '#90E0EF',
  secondaryLight: '#CAF0F8',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  gray: '#DDDDDD',
  darkGray: '#666666',
  black: '#333333',
  success: '#34A853',
  error: '#EA4335'
};

export const styles = {
  mainContainer: {
    width: '100%',
    minHeight: '100vh',
    padding: '0',
    margin: '0',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    overflowX: 'hidden',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },

  header: {
    width: '100%',
    padding: '15px 5%',
    backgroundColor: colors.primary,
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '20px',
    boxSizing: 'border-box',
    position: 'sticky',
    top: 0,
    zIndex: 1000
  },

  logoTitleContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    minWidth: '250px',
    flex: '1',
  },

  logo: {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: `3px solid ${colors.white}`,
    flexShrink: '0',
  },

  title: {
    fontSize: 'clamp(1.3rem, 2vw, 1.8rem)',
    fontWeight: 'bold',
    margin: '0',
    color: colors.white,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  buttonsContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    flex: '1',
    minWidth: '250px',
  },

  dropdownContainer: {
    position: 'relative',
    minWidth: '200px',
    flex: '1',
  },

  networkButton: {
    backgroundColor: colors.primaryDark,
    color: colors.white,
    padding: '12px 20px',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '10px',
    whiteSpace: 'nowrap',
  },

  regionsDropdown: {
    position: 'absolute',
    top: '100%',
    backgroundColor: colors.white,
    minWidth: '250px',
    borderRadius: '8px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
    marginTop: '5px',
    overflow: 'hidden',
    zIndex: 1000,
    maxHeight: '400px',
    overflowY: 'auto',
  },

  regionItem: {
    padding: '12px 20px',
    color: colors.black,
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: colors.secondaryLight,
    }
  },

  hospitalListContainer: {
    padding: '15px',
  },
  
  backButton: {
    padding: '8px 15px',
    color: colors.primaryLight,
    cursor: 'pointer',
    marginBottom: '10px',
    fontWeight: 'bold',
    ':hover': {
      textDecoration: 'underline',
    }
  },

  regionTitle: {
    margin: '0 0 15px 0',
    color: colors.black,
    borderBottom: `1px solid ${colors.gray}`,
    paddingBottom: '8px',
  },

  hospitalItem: {
    padding: '8px 0',
    color: colors.darkGray,
    borderBottom: `1px solid ${colors.lightGray}`,
  },

  button: {
    backgroundColor: colors.primaryLight,
    color: colors.white,
    padding: '12px 20px',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    flex: '1',
    minWidth: '150px',
    textAlign: 'center',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: colors.primary
    }
  },

  profileContainer: {
    width: '100%',
    maxWidth: '1200px',
    margin: '30px auto 0 auto',
    padding: '0 20px',
    boxSizing: 'border-box',
  },

  profile: {
    backgroundColor: colors.white,
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    textAlign: 'center',
    width: '100%',
  },
  // Add to your styles object
specialtiesSection: {
  margin: '25px 0',
  padding: '20px',
  backgroundColor: '#f8f9fa',
  borderRadius: '10px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
},
specialtiesGrid: {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: '10px 30px',
  marginTop: '15px',
  padding: '10px',
},
specialtyItem: {
  fontSize: '16px',
  color: colors.textSecondary,
  padding: '8px 0',
},

  avatar: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: `4px solid ${colors.primaryLight}`,
    marginBottom: '20px',
  },

  userName: {
    fontSize: '1.5rem',
    margin: '0 0 10px 0',
    color: colors.black,
  },

  userEmail: {
    fontSize: '1rem',
    color: colors.darkGray,
    margin: '0 0 20px 0',
  },

  cardButton: {
    backgroundColor: colors.success,
    color: colors.white,
    padding: '12px 25px',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '100%',
    maxWidth: '300px',
    margin: '0 auto',
    display: 'block',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#2d8e47'
    }
  },

  healthCardContainer: {
    width: '100%',
    maxWidth: '1200px',
    margin: '30px auto',
    padding: '0 20px',
    boxSizing: 'border-box',
    backgroundColor: colors.white,
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
  },

  cardHeader: {
    borderBottom: `2px solid ${colors.primary}`,
    paddingBottom: '20px',
    marginBottom: '20px'
  },

  cardTitleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px'
  },

  cardTitle: {
    fontSize: '1.8rem',
    color: colors.primary,
    margin: 0
  },

  snfNumber: {
    fontSize: '0.9rem',
    color: colors.darkGray,
    margin: 0
  },

  contact: {
    fontSize: '1rem',
    color: colors.black,
    margin: 0
  },

  servicesSection: {
    marginBottom: '30px'
  },

  sectionTitle: {
    fontSize: '1.5rem',
    color: colors.primary,
    marginBottom: '15px',
    borderBottom: `1px solid ${colors.gray}`,
    paddingBottom: '10px'
  },

  serviceItem: {
    marginBottom: '15px',
    padding: '15px',
    backgroundColor: colors.lightGray,
    borderRadius: '8px'
  },

  serviceText: {
    margin: 0,
    color: colors.darkGray,
    lineHeight: '1.6'
  },

  servicesTable: {
    overflowX: 'auto'
  },

  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px'
  },

  th: {
    backgroundColor: colors.primary,
    color: colors.white,
    padding: '12px 15px',
    textAlign: 'left',
    fontWeight: '600'
  },

  td: {
    padding: '12px 15px',
    borderBottom: `1px solid ${colors.gray}`,
    color: colors.black
  },

  evenRow: {
    backgroundColor: colors.lightGray
  },

  oddRow: {
    backgroundColor: colors.white
  },

  azureSection: {
    container: {
      width: '100%',
      padding: '60px 20px',
      backgroundColor: colors.lightGray,
      textAlign: 'center'
    },
    innerContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px',
      backgroundColor: colors.secondaryLight,
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      borderTop: `8px solid ${colors.primary}`
    },
    title: {
      fontSize: '2rem',
      color: colors.black,
      marginBottom: '20px',
      fontWeight: '600'
    },
    description: {
      fontSize: '1.2rem',
      color: colors.darkGray,
      marginBottom: '40px',
      maxWidth: '800px',
      marginLeft: 'auto',
      marginRight: 'auto',
      lineHeight: '1.6'
    },
    cardsContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      flexWrap: 'wrap',
      marginTop: '30px'
    },
    card: {
      width: '280px',
      backgroundColor: colors.white,
      borderRadius: '10px',
      padding: '30px 20px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
      transition: 'transform 0.3s',
      ':hover': {
        transform: 'translateY(-5px)'
      }
    },
    cardIcon: {
      width: '80px',
      height: '80px',
      backgroundColor: colors.secondaryLight,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 20px'
    },
    cardTitle: {
      fontSize: '1.3rem',
      color: colors.black,
      marginBottom: '15px'
    },
    cardDesc: {
      color: colors.darkGray,
      fontSize: '1rem',
      lineHeight: '1.5'
    },
    ctaButton: {
      backgroundColor: colors.primary,
      color: colors.white,
      border: 'none',
      padding: '12px 25px',
      borderRadius: '8px',
      fontSize: '1rem',
      cursor: 'pointer',
      marginTop: '20px',
      transition: 'background-color 0.3s',
      ':hover': {
        backgroundColor: colors.primaryDark
      }
    }
    
  },

  footer: {
    container: {
      width: '100%',
      padding: '30px 20px',
      backgroundColor: colors.lightGray,
      borderTop: `1px solid ${colors.gray}`,
      textAlign: 'center',
      marginTop: 'auto'
    },
    socialIcons: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      marginBottom: '20px'
    },
    copyright: {
      fontSize: '14px',
      color: colors.darkGray,
      margin: '0'
    },
    link: {
      color: colors.primary,
      textDecoration: 'none'
    }
  },

  '@media (max-width: 768px)': {
    header: {
      flexDirection: 'column',
      gap: '10px',
      padding: '12px',
    },
    logoTitleContainer: {
      width: '100%',
      justifyContent: 'center',
      gap: '15px',
      minWidth: 'unset',
    },
    buttonsContainer: {
      width: '100%',
      flexDirection: 'column',
      gap: '10px',
    },
    networkButton: {
      width: '100%',
      padding: '12px',
      justifyContent: 'center',
    },
    button: {
      width: '100%',
      minHeight: '44px',
    },
    healthCardContainer: {
      padding: '15px',
      margin: '15px 0',
      borderRadius: '0',
      boxShadow: 'none',
    },
    profile: {
      padding: '20px',
    },
    avatar: {
      width: '100px',
      height: '100px',
    },
    cardButton: {
      padding: '12px',
    },
    table: {
      fontSize: '14px',
    },
    th: {
      padding: '10px 12px',
    },
    td: {
      padding: '10px 12px',
    }
  },

  '@media (max-width: 480px)': {
    logo: {
      width: '50px',
      height: '50px',
    },
    title: {
      fontSize: '1.1rem',
    },
    userName: {
      fontSize: '1.2rem',
    },
    cardTitle: {
      fontSize: '1.2rem',
    },
    sectionTitle: {
      fontSize: '1.1rem',
    },
    serviceItem: {
      padding: '12px',
    },
    button: {
      fontSize: '0.9rem',
    },
    regionItem: {
      padding: '15px 20px',
    }
  }
};