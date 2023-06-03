import { useNavigate } from 'react-router-dom';
import { MdHowToVote } from 'react-icons/md';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="home-page-headings">
        <h1>EVOTING</h1>
        <MdHowToVote size={100} />
      </div>
      <div className="home-page-buttons">
        <button onClick={() => navigate('/register')}>Register</button>
        <button onClick={() => navigate('/login')}>Login</button>
      </div>
    </div>
  );
};
