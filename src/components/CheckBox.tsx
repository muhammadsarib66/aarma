
import Checkbox from '@mui/material/Checkbox';

const labell = { inputProps: { 'aria-label': 'personalDetail' } };

const CheckBox = ({style , label } : any) => {
  return (

    <div className='flex items-center'>
      
    <Checkbox
      {...labell}
      
      sx={{'& .MuiSvgIcon-root': { fontSize: 28 , color: '#FF725E'} }}
    />
  <p className={`${style} `}>{label}</p>
  </div>
    )
}

export default CheckBox