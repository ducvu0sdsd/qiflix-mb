import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes';
import UtilsProvider from './context/UtilsContext';
import AccountProvider from './context/AccountContext';
import AuthProvider from './context/AuthContext';
import MovieProvider from './context/MovieContext';
import LandingScreen from './screens/LandingScreen';

export default function App() {

  return (
    <UtilsProvider>
      <AccountProvider>
        <AuthProvider>
          <MovieProvider>
            {/* <NavigationContainer>
              <Routes />
            </NavigationContainer> */}
            <LandingScreen />
          </MovieProvider>
        </AuthProvider>
      </AccountProvider>
    </UtilsProvider>
  );
}
