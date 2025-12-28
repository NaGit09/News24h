import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import Category from "./views/Category";
import News from "./views/News";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={<Navigate to="/trangchu24h" replace />}
          />
          <Route path="/:category" element={<Category />} />
          <Route path="/:category/:newsInfo" element={<News />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
