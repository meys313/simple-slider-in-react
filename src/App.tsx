import './App.scss'
import {Slider} from "./Slider";
import img1 from './assets/1.jpg';
import img2 from './assets/2.jpg';
import img3 from './assets/3.jpg';
import  img4 from  './assets/4.jpeg'
import {ReactElement, useState} from "react";



function App() {


    return (
        <div className="custom-block">
            <div className="custom-sliderWrapper">
                <Slider infinity={true} transition={600} itemWidth={100}>
                    <div className="customItem">
                        <div className="customItem-content">
                            <p>
                                We are a company where creativity, technology savvy and innovative thinking thrive.
                            </p>
                        </div>
                        <img src={img4} alt="img" className='customItem-img'/>
                    </div>

                    <div className="customItem">
                        <div className="customItem-content">
                            <p>
                                advantages and disadvantages of solar energy
                            </p>
                        </div>
                        <img src={img2} alt="img" className='customItem-img'/>
                    </div>

                    <div className="customItem">
                        <div className="customItem-content">
                            <p>
                                It was predictable from the very beginning.
                            </p>
                        </div>
                        <img src={img1} alt="img" className='customItem-img'/>
                    </div>

                    <div className="customItem">
                        <div className="customItem-content">
                            <p>
                                Who should this page be visible to?
                            </p>
                        </div>
                        <img src={img3} alt="img" className='customItem-img'/>
                    </div>
                </Slider>
            </div>
        </div>

    )
}

export default App
