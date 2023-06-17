import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth';
import { Toaster, toast } from 'react-hot-toast';
import Election from '../contracts/Election.json';
import Web3 from 'web3';

export const Login = () => {
  const [state, setState] = useState({ web3: null, contract: null });
  const [login, setLogin] = useState({});
  const { logIn } = useAuth();
  const navigate = useNavigate();

  let web3;

  useEffect(() => {
    const provider = new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545');
    const template = async () => {
      web3 = new Web3(provider);
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

  const connectWallet = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    await state.contract.methods
      .addVoter()
      .send({ from: accounts[0], gas: 3000000 });
    return accounts[0];
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/login', login);
      if (res.data.status === 'success') {
        if (res.data.user.role === 'admin') {
          logIn({ ...res.data.user });
          navigate('/admin');
        } else {
          connectWallet()
            .then((acc) => {
              console.log(acc);
              logIn({ ...res.data.user, account: acc });
              if (res.data.user.role === 'voter') {
                navigate('/voter');
              }
            })
            .catch((err) => {
              console.log(err);
              toast.error(err.message, {
                style: {
                  // backgroundColor: '#256455',
                  // color: '#fff',
                  backgroundColor: '#eaa09c',
                  color: '#222222',
                },
              });
            });
        }
      } else {
        toast.error(res.data.msg, {
          style: {
            backgroundColor: '#eaa09c',
            color: '#222222',
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-page">
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="login">
        <h4>Login</h4>
        <form action="submit" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            value={login.email}
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
          />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
};
