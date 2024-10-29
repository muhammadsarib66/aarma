import { useSelector } from 'react-redux';
import { baseUrl } from '../features/slicer/Slicer';
import ProfileVeriModal from './ProfileVeriModal';

const DocumentScreen = () => {
    const { ProfileData  } = useSelector((state: any) => state.GetMyProfileSlicer);

  return (
    <div className="px-4   pb-8 ">
      
<div className="flex items-center mb-4 justify-between">
        <p className="font-semibold text-2xl flex items-center   gap-2">Document <span> <ProfileVeriModal icon={true} />
          
           </span></p>
      </div>
      
   
        {ProfileData && (
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4  place-items-center md:place-items-start">
            <div className="group object-center flex max-w-56   overflow-hidden bg-[#F3F3F3] flex-col  rounded-xl gap-2" >
            
                <div  className="  rounded-t-xl h-64 relative group">
                  <img
                    src={baseUrl + ProfileData?.id_card}
                    className="w-64 sm:w-56  max-w-56 h-64 object-cover  rounded-t-xl"
                    alt="portfolio image"
                  />
                  
                  </div>
               
            </div>
            <div className="group object-center flex max-w-56   overflow-hidden bg-[#F3F3F3] flex-col  rounded-xl gap-2" >
            
                <div  className="  rounded-t-xl h-64 relative group">
                  <img
                    src={baseUrl + ProfileData?.verif_document}
                    className="w-64 sm:w-56  max-w-56 h-64 object-cover  rounded-t-xl"
                    alt="portfolio image"
                  />
                  
                  </div>
               
            </div>
            </div>
        )}
    {
        !ProfileData?.id_card   && (

            <div className="flex justify-center items-center h-72 bg-secondary rounded-lg">
            <p className="text-2xl text-onPrimary">No Docuemnt Added</p>
            </div>
        )
  }
    </div>

  )
}

export default DocumentScreen