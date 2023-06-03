import { Toaster } from 'react-hot-toast';
import { Nav } from '../components/Nav';
import { Link } from 'react-router-dom';
import { MdHowToVote } from 'react-icons/md';
import { BiNews } from 'react-icons/bi';
import { FaRegWindowRestore } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';

export const Voter = () => {
  return (
    <div className="voter">
      <Toaster position="top-center" reverseOrder={false} />
      <Nav page="voter" />
      <div className="voter-main">
        <div className="voter-main-row">
          <div className="voter-main-row-button">
            <Link to="/profile">
              <CgProfile size={100} color="#dbcdcd" />
              <p>profile</p>
            </Link>
          </div>
          <div className="voter-main-row-button">
            <Link to="/result">
              <FaRegWindowRestore size={100} color="#dbcdcd" />
              <p>result</p>
            </Link>
          </div>
        </div>
        <div className="voter-main-row">
          <div className="voter-main-row-button">
            <Link to="/vote">
              <MdHowToVote size={100} color="#dbcdcd" />
              <p>Vote</p>
            </Link>
          </div>
          <div className="voter-main-row-button">
            <Link to="/viewnews">
              <BiNews size={100} color="#dbcdcd" />
              <p>News</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
