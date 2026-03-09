import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import QuestionnairePage from "./pages/QuestionnairePage";
import PackagesPage from "./pages/PackagesPage";
import ContractorsPage from "./pages/ContractorsPage";
import SteveProposalPage from "./pages/SteveProposalPage";
import MarioProposalPage from "./pages/MarioProposalPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/start" element={<QuestionnairePage />} />
      <Route path="/packages" element={<PackagesPage />} />
      <Route path="/contractors" element={<ContractorsPage />} />
      <Route path="/proposal/steve" element={<SteveProposalPage />} />
      <Route path="/proposal/mario" element={<MarioProposalPage />} />
    </Routes>
  );
}
