import axios from 'axios';
import { Nav } from '../../components/Nav';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

export const AllVoters = () => {
  const [allVoters, setAllVoters] = useState([]);

  useEffect(() => {
    getAllVoters();
  }, []);

  const getAllVoters = async () => {
    console.log('hello');
    try {
      const res = await axios.get('http://localhost:4000/allvoters');
      if (res.data.status === 'success') {
        setAllVoters(res.data.voters);
        console.log(res.data.voters);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteVoter = async (email) => {
    const res = await axios.post('http://localhost:4000/deletevoter', {
      email,
    });
    if (res.data.status === 'success') {
      setAllVoters((prev) => {
        return prev.filter((voter) => voter.email !== email);
      });
      toast.success(res.data.message, {
        style: {
          backgroundColor: '#256455',
          color: '#fff',
        },
      });
    } else if (res.data.status === 'error') {
      toast.error(res.data.msg, {
        style: {
          backgroundColor: '#256455',
          color: '#fff',
        },
      });
    }
  };

  return (
    <div className="allvoters">
      <Toaster position="bottom-center" reverseOrder={false} />
      <Nav page="voters list" />
      <div className="allvoters-main">
        <div className="allvoters-main-row">
          <div className="table">
            <div className="table-head">
              <div className="table-head-item voterid">voter ID</div>
              <div className="table-head-item name">name</div>
              <div className="table-head-item email">email</div>
              <div className="table-head-item age">age</div>
              <div className="table-head-item aadhaar">aadhaar</div>
              <div className="table-head-item modify">Modify</div>
            </div>

            {allVoters.map((voter) => {
              return (
                <div key={voter.id} className="table-body">
                  <div className="table-body-item voterid">{voter.voterid}</div>
                  <div className="table-body-item name">{voter.name}</div>
                  <div className="table-body-item email">
                    {voter.email.length < 25
                      ? voter.email
                      : `${voter.email.substring(0, 20)} . . .`}
                  </div>
                  <div className="table-body-item age">{voter.age}</div>
                  <div className="table-body-item aadhaar">{voter.aadhaar}</div>
                  <div className="table-body-item modify">
                    <button
                      onClick={() => {
                        deleteVoter(voter.email);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
