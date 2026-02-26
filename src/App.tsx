import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import QuestionnairePage from "./pages/QuestionnairePage";
import PackagesPage from "./pages/PackagesPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/start" element={<QuestionnairePage />} />
      <Route path="/packages" element={<PackagesPage />} />
    </Routes>
  );
}
