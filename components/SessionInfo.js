import { IoIosInformationCircleOutline } from 'react-icons/io';

export default function SessionInfo() {
  return (
    <div className="flex ">
      <div className="font-bold text-lg text-white px-4" >hello</div>
      <div className="flex-1" ></div>
      <button className='text-2xl rounded-full p-2 mx-3'><IoIosInformationCircleOutline className='text-white font-bold' /> </button>
    </div>
  )
}
