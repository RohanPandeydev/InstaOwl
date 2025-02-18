import React from 'react'
import BannerBg from '../../images/mysub-banner-bg.jpg'
import BannerImg from '../../images/watch-banner-img.png'

const WatchListBanner = () => {
    return (
        <section className='inner-banner'
            style={{
                backgroundImage: `url(${BannerBg})`
            }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-7">
                        <div className='inner-banner-content'>
                            <h1>My Watchlist</h1>
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div className='inner-banner-img-watch'>
                            <img src={BannerImg} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WatchListBanner