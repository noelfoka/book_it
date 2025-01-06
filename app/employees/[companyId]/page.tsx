import React from 'react'

const page = ({params} : {params: {companyId: string}}) => {
  return (
    <div>{params.companyId}</div>
  )
}

export default page