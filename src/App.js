import './App.css';
import bg_image from './background-image.jpeg'
import { AppContainer } from './components/ContainerSortable';

function App() {
  return (
    <div
      className="bg-slate-100 h-screen relative"
    >
      <img
        id="header-image" src={bg_image} alt="background"
        className='w-full h-1/4 object-cover object-center'
      />
      <AppContainer />
    </div>
  );
}

export default App;
