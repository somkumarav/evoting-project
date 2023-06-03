import { Link } from 'react-router-dom';
import { Nav } from '../components/Nav';
import { FaListUl, FaList } from 'react-icons/fa';
import { BiNews } from 'react-icons/bi';
import { TbStatusChange } from 'react-icons/tb';
import { AiOutlineUsergroupAdd, AiOutlineUserAdd } from 'react-icons/ai';

export const Admin = () => {
  return (
    <div className="admin-page">
      <Nav page="admin" />
      <div className="admin-page-main">
        <div className="admin-page-main-row">
          <div className="admin-page-main-row-button">
            <Link to="/addcandidate">
              <AiOutlineUserAdd size={80} color="#dbcdcd" />
              <p>Add Candidate</p>
            </Link>
          </div>
          <div className="admin-page-main-row-button">
            <Link to="/election">
              <TbStatusChange size={80} color="#dbcdcd" />
              <p>Election Status</p>
            </Link>
          </div>
        </div>
        <div className="admin-page-main-row">
          <div className="admin-page-main-row-button">
            <Link to="/register">
              <AiOutlineUsergroupAdd size={80} color="#dbcdcd" />
              <p>Add Voter</p>
            </Link>
          </div>
          <div className="admin-page-main-row-button">
            <Link to="/addnews">
              <BiNews size={80} color="#dbcdcd" />
              <p>News</p>
            </Link>
          </div>
        </div>
        <div className="admin-page-main-row">
          <div className="admin-page-main-row-button">
            <Link to="/candidatelist">
              <FaList size={60} color="#dbcdcd" />
              <p>Candidate List</p>
            </Link>
          </div>
          <div className="admin-page-main-row-button">
            <Link to="/allvoters">
              <FaListUl size={60} color="#dbcdcd" />
              <p>voters list</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
