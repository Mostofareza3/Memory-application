import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  mainContainer: {
    // display: 'flex',
    // alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '4rem',
    padding: '2rem',
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
}));