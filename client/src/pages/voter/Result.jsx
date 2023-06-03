import { useState, useEffect } from 'react';
import { Nav } from '../../components/Nav';
import Election from '../../contracts/Election.json';
import Web3 from 'web3';

const getLocalStorage = () => {
  let election = localStorage.getItem('election');
  if (election) {
    return JSON.parse(localStorage.getItem('election'));
  } else {
    return {};
  }
};

export const Result = () => {
  const [data, setData] = useState(getLocalStorage());
  const [state, setState] = useState({ web3: null, contract: null });
  const [allCandidates, setAllCandidates] = useState([]); //[{name:'name',party:'party'}
  const [winner, setWinner] = useState({ voteCount: 0 });

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
    state.contract && getCandidates();
  }, [state.contract]);

  useEffect(() => {
    const getWinner = async () => {
      allCandidates.map((candidate) => {
        if (candidate.voteCount > winner.voteCount) {
          setWinner(candidate);
        }
      });
      console.log(winner);
    };
    state.contract && getWinner();
  }, [allCandidates]);

  return (
    <div className="result">
      <Nav page="Result" />
      <div className="vote-main">
        {data.result === true ? (
          <>
            <div className="vote-main-winner">
              <h4>Winner: {winner.name}</h4>
            </div>
            <div className="table">
              <div className="table-head">
                <div className="table-head-item">sl no</div>
                <div className="table-head-item">full name</div>
                <div className="table-head-item">party name</div>
                <div className="table-head-item">vote Count</div>
              </div>

              {allCandidates.map((candidate) => {
                return (
                  <div key={candidate.id} className="table-body">
                    <div className="table-body-item">{candidate.id}</div>
                    <div className="table-body-item">{candidate.name}</div>
                    <div className="table-body-item">{candidate.party}</div>
                    <div className="table-body-item">{candidate.voteCount}</div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="vote-main-winner">
            <h4>Result not declared yet</h4>
          </div>
        )}
      </div>
    </div>
  );
};
