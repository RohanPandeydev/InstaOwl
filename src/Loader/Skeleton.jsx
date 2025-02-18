import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import placeholder from '../images/placeholder.jpeg'
import React from 'react'

const SkeletonLoader = () => {
  return (
    <div className='container mt-5'>
      {/* <Skeleton />
      <Skeleton count={5} /> */}
      {/* <div className=' card card-box p-5' style={{width:"18rem"}}>
        <h5 className="card-title placeholder-glow">
            <span className="placeholder col-6"></span>
        </h5>
        <p className="card-text placeholder-glow">
            <span className="placeholder col-7"></span>
            <span className="placeholder col-4"></span>
            <span className="placeholder col-4"></span>
            <span className="placeholder col-6"></span>
            <span className="placeholder col-8"></span>
        </p>
      </div>  */}

      <div className='row'>
        <div className='col-md-4'>
          <div className="card" aria-hidden="true">
            <img src={placeholder} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title placeholder-glow">
                <span className="placeholder col-6"></span>
              </h5>
              <p className="card-text placeholder-glow">
                <span className="placeholder col-7"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-6"></span>
                <span className="placeholder col-8"></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonLoader
