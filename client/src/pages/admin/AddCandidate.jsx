import { useEffect, useState } from 'react';
import { Nav } from '../../components/Nav';
import Election from '../../contracts/Election.json';
import Web3 from 'web3';

export const AddCandidate = () => {
  const [state, setState] = useState({ web3: null, contract: null });
  // const [allCandidates, setAllCandidates] = useState([]); //[{name:'name',party:'party'}
  const [input, setInput] = useState({});

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

  // useEffect(() => {
  //   const getCandidates = async () => {
  //     const candidateCount = await state.contract.methods
  //       .candidatesCount()
  //       .call();

  //     if (candidateCount !== 0) {
  //       for (var i = 1; i <= candidateCount; i++) {
  //         const candidate = await state.contract.methods.candidates(i).call();
  //         setAllCandidates((prev) => [...prev, candidate]);
  //       }
  //     }
  //   };

  //   console.log(state.contract);

  //   state.contract && getCandidates();
  // }, [state.contract]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    await state.contract.methods
      .addCandidate(input.candidateName, input.partyName)
      .send({
        from: accounts[0],
        gas: 3000000,
      });
  };

  return (
    <div className="add-candidate">
      <Nav page="add candidate" />
      <div className="add-candidate-main">
        <div className="add-candidate-main-register">
          <form
            className="add-candidate-main-register-form"
            action="submit"
            onSubmit={handleSubmit}
          >
            <h4>Candidate Registration</h4>
            <input
              type="text"
              placeholder="full name"
              value={input.candidateName}
              onChange={(e) => {
                setInput({ ...input, candidateName: e.target.value });
              }}
            />
            <input
              type="text"
              placeholder="party name"
              value={input.partyName}
              onChange={(e) => {
                setInput({ ...input, partyName: e.target.value });
              }}
            />
            <input
              type="number"
              placeholder="age"
              value={input.age}
              onChange={(e) => {
                setInput({ ...input, age: e.target.value });
              }}
            />

            <input
              type="text"
              placeholder="address"
              value={input.address}
              onChange={(e) => {
                setInput({ ...input, address: e.target.value });
              }}
            />

            <input
              type="number"
              placeholder="mobile number"
              value={input.mobileNumber}
              onChange={(e) => {
                setInput({ ...input, mobileNumber: e.target.value });
              }}
            />

            <button type="submit">add candidate</button>
          </form>
        </div>

        {/* <div className="add-candidate-main-list">
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
          </div> */}
        {/* </div> */}
      </div>
    </div>
  );
};
