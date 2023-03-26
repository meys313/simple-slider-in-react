import './App.scss'
import {Slider} from "./Slider";
import img1 from './assets/1.jpg';
import img2 from './assets/2.jpg';
import img3 from './assets/3.jpg';

const test_data = [
  {
    id: 123,
    text: 'random text',
    img:  img1,
  },
  {
    id: 124,
    text: 'also random text',
    img:  img2,
  },
  {
    id: 125,
    text: 'this is random text',
    img: img3,
  },

]
function App() {

  return (
    <Slider items={test_data} infinity={false}/>
  )
}

export default App
