
import React from 'react'
{/*import Sidebar from '../src/Components/Sidebar'*/}
import Title from '../src/Components/Title';
import Navbar from '../src/Components/Navbar/Navbar';
import WeatherApp from '../src/Components/WeatherApp';




const Home = () => {
    return (
        <div>
            {/* i used two colums to display sidebar and navba   */}
            <div className="container-fluid home min-vh-100">
                <div className="row">
                    

                    {/*add top bar ,all data will be displayed here*/}
                    <div className="col">
                        <Navbar />
                        <Title subTitle='Our Program' title='what we offer' />
                      {/* <Home_intro /> */}
                      <WeatherApp/>  
                    </div>



                </div>

            </div>



        </div >



    )
}

export default Home

