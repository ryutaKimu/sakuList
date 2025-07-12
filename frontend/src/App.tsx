import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Members from './pages/Members';
import LoginPage from './admin/page/LoginScreen';
import AdminLayout from './admin/components/AdminLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 一般ユーザー向けページ */}
        <Route path="/" element={<Members />} />

        {/* 管理画面ルート */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
