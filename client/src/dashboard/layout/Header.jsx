import  { useContext } from 'react'
import profile from '../../assets/profile.png'
import storeContext from '../../context/storeContext'

const Header = () => {
  const {store} = useContext(storeContext)

  return (
    <div className='pl-4 fixed w-[calc(100vw-250px)] top-4 z-50'>
      <div className='w-full rounded h-[70px] flex justify-between items-center p-4 bg-white'>
        <div  className='px-3 py-2 rounded-md outline-0 ' />
        <div className='mr-4'>
          <div className='flex gap-x-2'>
            <div className='flex flex-col justify-center items-end'>
              <span>{store.userInfo?.name}</span>
              <span>{store.userInfo?.role}</span>
            </div>
            <img className='w-10 h-10 rounded-full' src={profile} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header