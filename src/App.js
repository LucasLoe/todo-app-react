import './App.css';
import bg_image from './background-image.jpeg'
import {AppContainer} from './components/ContainerC';

 function App() {
  return (
    <div className="bg-slate-700 h-screen">
      <img id="header-image" src={bg_image} alt="background" className='w-full h-1/4 object-cover object-center' />
      <AppContainer/>
    </div>
  );
}

export default App;
