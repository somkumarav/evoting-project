import { useState, useEffect } from 'react';
import { Nav } from '../../components/Nav';

const getLocalStorage = () => {
  let election = localStorage.getItem('election');
  if (election) {
    return JSON.parse(localStorage.getItem('election'));
  } else {
    return {};
  }
};

export const Election = () => {
  const [data, setData] = useState(getLocalStorage());

  useEffect(() => {
    localStorage.setItem('election', JSON.stringify(data));
  }, [data]);

  const handleElection = (e) => {
    if (e.target.checked) {
      setData({ ...data, election: true });
    } else {
      setData({ ...data, election: false });
    }
  };

  const handleResult = (e) => {
    if (e.target.checked) {
      setData({ ...data, result: true });
    } else {
      setData({ ...data, result: false });
    }
  };

  return (
    <div className="election">
      <Nav page="Manage Election status" />
      <div className="election-main">
        <div className="election-main-card">
          <div className="election-main-card-item">
            <span className="col-1">Election Status</span>
            <label class="form-switch">
              <input
                type="checkbox"
                checked={data.election}
                onChange={handleElection}
              />
              <i></i>
            </label>
          </div>
          <div className="election-main-card-item">
            <span className="col-1">Result Status</span>
            <label class="form-switch">
              <input
                type="checkbox"
                checked={data.result}
                onChange={handleResult}
              />
              <i></i>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
