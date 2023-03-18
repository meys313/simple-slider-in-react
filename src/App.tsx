import './App.scss'
import {Slider} from "./Slider";
import img1 from './assets/1.jpg';
import img2 from './assets/2.jpg';
import img3 from './assets/3.jpg';

const test_data = [
  {
    id: 123,
    text: 'hello',
    img:  img1,
  },
  {
    id: 124,
    text: 'fuck off',
    img:  img2,
  },
  {
    id: 125,
    text: 'text',
    img: img3,
  },

  // {
  //   id: 126,
  //   text: 'zdsa',
  //   img:  img1,
  // },
  // {
  //   id: 127,
  //   text: 'wtf',
  //   img:  img2,
  // },
  // {
  //   id: 128,
  //   text: 'yo?',
  //   img: img3,
  // }
]
function App() {

  return (
    <Slider items={test_data}/>
  )
}

export default App
