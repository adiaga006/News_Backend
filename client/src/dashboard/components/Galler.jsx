import React from 'react'
import { AiOutlineClose } from "react-icons/ai";
import { MdCloudUpload } from "react-icons/md";
import copy from 'copy-text-to-clipboard';
import toast from 'react-hot-toast';

const Galler = ({ setShow, images }) => {
    
    const copy_url = (url) => {
        if (!url || typeof url !== 'string') {
            toast.error('No valid URL to copy');
            return;
        }
        copy(url);
        toast.success('Copied URL successfully');
    };

    return (
        <div className='w-screen h-screen fixed left-0 top-0 z-[9999]'>
            <div className='w-full h-full relative'>
                <div className='bg-gray-400 opacity-80 w-full h-full absolute top-0 left-0 z-[998]'></div>
                <div className='absolute bg-white w-[50%] p-3 rounded-sm h-[85vh] overflow-y-auto left-[50%] top-[50%] z-[999] -translate-x-[50%] -translate-y-[50%]'>
                    <div className='pb-3 flex justify-between items-center w-full'>
                        <h2>Gallery</h2>
                        <div onClick={() => setShow(false)} className='text-xl cursor-pointer'>
                            <AiOutlineClose />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="images" className={`w-full h-[180px] flex rounded text-[#404040] gap-2 justify-center items-center cursor-pointer border-2 border-dashed`}>
                            <div className='flex justify-center items-center flex-col gap-y-2'>
                                <span className='text-2xl'><MdCloudUpload /></span>
                                <span>Select Image</span>
                            </div>
                        </label>
                    </div>
                    <div className='grid grid-cols-4 gap-x-2 mt-3'>
                    {
                        images.length > 0 ? (
                            images.map((img, i) => (
                                <div className='cursor-pointer' onClick={() => copy_url(img?.image)} key={img._id}>
                                    {img?.image ? (
                                        <>
                                            {/* Hiển thị URL và hình ảnh */}
                                            <img src={img.image} alt="image" className='w-full h-[100px]' />
                                        </>
                                    ) : (
                                        <div>No Image Available</div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div>No images available</div>
                        )
                    }
                </div>
                
                </div>
            </div>
        </div>
    );
};


export default Galler;
