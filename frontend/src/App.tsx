import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Members  from './pages/Members'
import LoginPage from './admin/page/LoginScreen';

function App() {
  return (
    <>
    <Members/>
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
