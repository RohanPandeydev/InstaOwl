import React from 'react'
import BannerBg from '../../images/pre-plan-bg.jpg'

const PremiumPlansBanner = () => {
    return (
        <>
            <section className='inner-banner'
                style={{
                    backgroundImage: `url(${BannerBg})`
                }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7">
                            <div className='inner-banner-content'>
                                <h1>Choose your <span>Premium plan</span></h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default PremiumPlansBanner