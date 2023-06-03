import { useEffect, useState } from 'react';
import { Nav } from '../../components/Nav';
import Election from '../../contracts/Election.json';
import Web3 from 'web3';
import { Modal } from '../../components/Modal';

const getLocalStorage = () => {
  let election = localStorage.getItem('election');
  if (election) {
    return JSON.parse(localStorage.getItem('election'));
  } else {
    return {};
  }
};

export const Vote = () => {
  const [data, setData] = useState(getLocalStorage());
  const [state, setState] = useState({ web3: null, contract: null });
  const [allCandidates, setAllCandidates] = useState([]); //[{name:'name',party:'party'}
  const [showModal, setShowModal] = useState(false);
  const [candidateId, setCandidaetId] = useState(); //[{name:'name',party:'party'
  const [voted, setVoted] = useState();

  let contractAddress;

  useEffect(() => {
    const provider = new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545');
    const template = async () => {
      const web3 = new Web3(provider);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Election.networks[networkId];
      contractAddress = deployedNetwork.address;
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

  const handleSubmit = async (e, candidateId) => {
    e.preventDefault();
    setShowModal(true);
    setCandidaetId(candidateId);
    // const accounts = await window.ethereum.request({
    //   method: 'eth_requestAccounts',
    // });

    // const sendTran = await window.ethereum.request({
    //   method: 'eth_sendTransaction',
    //   params: [
    //     {
    //       from: accounts[0], // The user's active address.
    //       to: '0x5c849e3d201B15a0b33E819eFD7280bC93C2dAd7', // Required except during contract publications.
    //       gas: '0x' + new Number(2000000).toString(16),
    //       data: state.contract.methods.vote(candidateId).encodeABI(),
    //     },
    //   ],
    // });
    // console.log(accounts[0]);

    //   await state.contract.methods
    // .vote(candidateId)
    // .send({ from: accounts[0], gas: 3000000 });
  };

  return (
    <div className="vote">
      <Nav page="Vote" />
      <div className="vote-main">
        {showModal && (
          <Modal
            setVoted={setVoted}
            candidateId={candidateId}
            setShowModal={setShowModal}
          />
        )}

        <div className="table">
          <div className="table-head">
            <div className="table-head-item">sl no</div>
            <div className="table-head-item">full name</div>
            <div className="table-head-item">party name</div>
            <div className="table-head-item">cast vote</div>
          </div>

          {allCandidates.map((candidate) => {
            return (
              <div key={candidate.id} className="table-body">
                <div className="table-body-item">{candidate.id}</div>
                <div className="table-body-item">{candidate.name}</div>
                <div className="table-body-item">{candidate.party}</div>
                <button
                  className="table-body-item"
                  disabled={voted === true || data.election === false}
                  onClick={(e) => handleSubmit(e, candidate.id)}
                >
                  cast vote
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
