/* eslint-disable @typescript-eslint/no-explicit-any */
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '../features/slicer/Slicer';
import axios from 'axios';
import { toast } from 'react-toastify';
import { GetMyProfile } from '../features/slicer/GetMyProfileSlicer';
import { GetPortfolioAPi } from '../features/slicer/GetPorfolioSlicer';
import { DeletePortfolioAPi } from '../features/slicer/DeletePortfolio';

export default function PorfolioAcordion() {
    const dispatch = useDispatch();
  const { PortfolioData } = useSelector((state: any) => state.GetPorfolioSlicer);
console.log(PortfolioData)

    const handleDeletePortfolio =  (id) => {
        
        console.log('delete', id)
        dispatch(DeletePortfolioAPi(id))
        
    }


return (
    <div className='pt-10 flex flex-col gap-3'>
     
      <h1 className='text-2xl capitalize font-semibold text-onPrimary mb-2'>
        Portfolios
      </h1>
      {
        PortfolioData?.map((item: any) => {
            return(
                <Accordion key={item?._id} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
            <h1 className='font-bold uppercase text-onPrimary text-xl'>
            {item?.title} 
            </h1>
        </AccordionSummary>
        <AccordionDetails>
        <span className='font-bold'>No Of Guest : </span>

          {item?.total_guests}
        </AccordionDetails>
        <AccordionDetails>
        <span className='font-bold'>Description : </span>

          {item?.description}
                <div>
                    <h1 className='font-bold text-xl mt-2'>Portfolio Photos</h1>
                </div>
          <div className='grid grid-cols-3 gap-2'>

            {item?.photos?.map((photo: any, ind: any) => {
                return(
                    <img src={baseUrl+photo} key={ind} alt='portfolio' className=' active:scale-[5] z-10 duration-300  w-40 h-40 object-cover object-center rounded-md' />


                )}
            )}
            </div>
        </AccordionDetails>
        <AccordionActions>
          <Button onClick={()=>handleDeletePortfolio(item?._id)} >Delete </Button>
        </AccordionActions>
      </Accordion>
            )
      }
        )
        }
    </div>
  );
}
