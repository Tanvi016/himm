import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PasswordGate from './components/auth/PasswordGate';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <PasswordGate>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </PasswordGate>
    </AuthProvider>
  );
}

export default App;
