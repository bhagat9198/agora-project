import { BsMic, BsCameraVideo } from 'react-icons/bs';
import { MdOutlineDashboard } from 'react-icons/md';

export default function SettingsModal(props) {
  const { startSession } = props
  
  const startSessionHandler = e => {
    e.preventDefault();
    startSession()
  }

  return (
      <div className="flex p-4  bg-gray-200 rounded-md" >
      <div className="pr-5 pl-2" >
        <div className="pt-2 pb-4 font-semibold text-lg" >Settings</div>
        <div>
          <div className='flex py-3'>
            <p className='mr-3'> <MdOutlineDashboard className='text-2xl' /></p>
            <p className='text-lg'>Session</p>
          </div>
          <div className='flex py-3'>
            <p className='mr-3'> <BsCameraVideo className='text-2xl' /></p>
            <p className='text-lg'>Video</p>
          </div>
          <div className='flex py-3'>
            <p className='mr-3'> <BsMic className='text-2xl' /></p>
            <p className='text-lg'>Audio</p>
          </div>
        </div>
      </div>
      <div className="px-8 py-8" >
        <form className='flex items-center flex-col space-y-10' onSubmit={startSessionHandler}>
            <div className='mb-3'>
              <input type='text' className=' outline-none placeholder-gray-500 text-xl rounded-md px-2 py-2' placeholder='Session Title' />
            </div>
            <div className='  '>
              <button className='bg-gray-700 text-white p-3 rounded-sm' type='submit'>Start Session</button>
            </div>
          </form>
      </div>
    </div>

  )
}
