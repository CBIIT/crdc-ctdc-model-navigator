export default () => ({
  dialogBox: {
    minWidth: '750px',
    overflowY: 'scroll',
  },
  titleContent: {
    width: '100%',
    marginBottom: '15px',
  },
  title: {
    fontSize: '18px',
    marginTop: '20px',
    display: 'inherit',
    fontWeight: '500',
    color: '#0d71a3',
    float: 'left',
  },
  closeBtn: {
    padding: '5px',
    textAlign: 'right',
  },
  downloadBtn: {
    height: '27px',
    backgroundColor: '#0D71A3',
    borderRadius: '5px',
    marginBottom: '-10px',
    marginRight: '7px',
    '&:hover': {
      backgroundColor: '#0D71A3',
    },
  },
  downloadIcon: {
    color: '#fff',
    fontSize: '18px',
  },
  content: {
    height: '700px',
    overflowY: 'scroll',
    paddingRight: '20px',
    paddingLeft: '25px',
    lineHeight: '1.5',
    '& h1, h2, h3, h4, h5': {
      color: '#000000',
      marginBottom: '0px',
      fontWeight: '700',
      lineHeight: '40px',
    },
    '& p': {
      marginTop: '5px',
      fontSize: '14px',
      fontWeight: '300',
      marginBottom: '0px',
    },
  },
});