import React from 'react';
import Navbar from './Navbar';

type WrapperProps = {
  children: React.ReactNode
}

const wrapper = ({children} : WrapperProps) => {
  return (
    <div>
      <Navbar />
      <div className='px-5 mt-32 md:px-[10%]'>{children}</div>
    </div>
  )
}

export default wrapper