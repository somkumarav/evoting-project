import { useState, useEffect } from 'react';
import { Nav } from '../../components/Nav';
import Election from '../../contracts/Election.json';
import Web3 from 'web3';

export const CandidateList = () => {
  const [allCandidates, setAllCandidates] = useState([]); //[{name:'name',party:'party'}
  const [state, setState] = useState({ web3: null, contract: null });

  useEffect(() => {
    const provider = new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545');
    const template = async () => {
      const web3 = new Web3(provider);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Election.networks[networkId];
      const contract = new web3.eth.Contract(
        Election.abi,
        deployedNetwork.address
      );
      setState({ web3, contract });
    };
    provider && template();
  }, []);

  useEffect(() => {
    const getCandidates = async () => {
      const candidateCount = await state.contract.methods
        .candidatesCount()
        .call();

      if (candidateCount !== 0) {
        for (var i = 1; i <= candidateCount; i++) {
          const candidate = await state.contract.methods.candidates(i).call();
          setAllCandidates((prev) => [...prev, candidate]);
        }
      }
    };

    console.log(state.contract);

    state.contract && getCandidates();
  }, [state.contract]);

  return (
    <div className="candidatelist">
      <Nav page="candidate list" />
      <div className="candidatelist-main">
        <div className="add-candidate-main-list">
          <div className="table">
            <div className="table-head">
              <div className="table-head-item">sl no</div>
              <div className="table-head-item">full name</div>
              <div className="table-head-item">party name</div>
            </div>

            {allCandidates.map((candidate) => {
              return (
                <div key={candidate.id} className="table-body">
                  <div className="table-body-item">{candidate.id}</div>
                  <div className="table-body-item">{candidate.name}</div>
                  <div className="table-body-item">{candidate.party}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
