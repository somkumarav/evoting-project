import axios from 'axios';
import { useAuth } from '../auth';
import { useState, useEffect } from 'react';
import Election from '../contracts/Election.json';
import Web3 from 'web3';

export const Modal = ({ candidateId, setShowModal, setVoted }) => {
  const [state, setState] = useState({ web3: null, contract: null });
  const [otp, setOtp] = useState();
  const [input, setInput] = useState({});

  useEffect(() => {
    const provider = new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545');
    const template = async () => {
      const web3 = new Web3(provider);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Election.networks[networkId];
      const contractAddress = deployedNetwork.address;
      const contract = new web3.eth.Contract(
        Election.abi,
        deployedNetwork.address
      );
      setState({ web3, contract });
    };
    provider && template();
  }, []);

  const { user } = useAuth();
  const sendOTP = async () => {
    await axios
      .post('http://localhost:4000/sendotp', {
        ...user,
        voterId: input.voterId,
      })
      .then((res) => {
        setOtp(res.data.otp);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const verifyOTP = async () => {
    if (otp == input.otp) {
      setVoted(true);
      console.log('verified');
    }
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    const sendTran = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: accounts[0], // The user's active address.
          to: '0x5c849e3d201B15a0b33E819eFD7280bC93C2dAd7', // Required except during contract publications.
          gas: '0x' + new Number(2000000).toString(16),
          data: state.contract.methods.vote(candidateId).encodeABI(),
        },
      ],
    });
    console.log(accounts[0]);

    await state.contract.methods
      .vote(candidateId)
      .send({ from: accounts[0], gas: 3000000 });
    setShowModal(false);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-content-main">
          <div className="modal-content-main-info">
            <h3>Voter Verificitation</h3>
            <p>
              Please enter your voter ID. An OTP will be <br /> sent your
              registred email
            </p>
          </div>
          <div className="modal-content-main-inputs">
            <div className="modal-content-main-inputs-item">
              <p>Voter ID</p>
              <input
                type="number"
                value={input.voterId}
                onChange={(e) =>
                  setInput({ ...input, voterId: e.target.value })
                }
              />
              <button onClick={sendOTP}>send otp</button>
            </div>
            <div className="modal-content-main-inputs-item">
              <p>OTP</p>
              <input
                type="number"
                value={input.otp}
                onChange={(e) => setInput({ ...input, otp: e.target.value })}
              />
              <button onClick={verifyOTP}>Verify</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
