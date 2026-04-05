import useStore from './store/useStore';
import LandingScreen from './components/LandingScreen';
import IncidentRoom from './components/IncidentRoom';
import ToastStack from './components/ToastStack';

function App() {
  const screen = useStore((state) => state.screen);

  return (
    <>
      {screen === 'landing' ? <LandingScreen /> : <IncidentRoom />}
      <ToastStack />
    </>
  );
}

export default App;
