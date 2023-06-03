import './styles/App.scss';
import { Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Admin } from './pages/Admin';
import { Voter } from './pages/Voters';
import { AdminRoute } from './auth';
import { AddCandidate } from './pages/admin/AddCandidate';
import { Result } from './pages/voter/Result';
import { Vote } from './pages/voter/Vote';
import { Profile } from './pages/voter/Profile';
import { Election } from './pages/admin/Election';
import { AllVoters } from './pages/admin/AllVoters';
import { CandidateList } from './pages/admin/CandidateList';
import { CreateNews } from './pages/admin/CreateNews';
import { ViewNews } from './pages/voter/ViewNews';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
        <Route path="/voter" element={<Voter />} />
        <Route
          path="/addcandidate"
          element={
            <AdminRoute>
              <AddCandidate />
            </AdminRoute>
          }
        />
        <Route
          path="/Election"
          element={
            <AdminRoute>
              <Election />
            </AdminRoute>
          }
        />
        <Route path="/vote" element={<Vote />} />
        <Route path="/result" element={<Result />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/allvoters" element={<AllVoters />} />
        <Route path="/candidatelist" element={<CandidateList />} />
        <Route path="/addnews" element={<CreateNews />} />
        <Route path="/viewnews" element={<ViewNews />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </div>
  );
};

export default App;
