import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles({
  rollButton:{
    backgroundColor: 'silver',
  },
  rollerSection:{
    backgroundColor: 'antiquewhite',
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding:30,
    width:'40%',
  },
  statInput:{
    fontSize: 32,
    width: 50,
    height: 48,
  }
})

export default useStyles