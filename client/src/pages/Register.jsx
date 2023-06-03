import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

export const Register = () => {
  const [register, setRegister] = useState({});

  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      register.email === undefined ||
      register.password === undefined ||
      register.username === undefined ||
      register.age === undefined ||
      register.aadhaar === undefined ||
      register.aadhaar.length !== 12 ||
      register.fatherName === undefined ||
      register.mobileNumber === undefined ||
      register.mobileNumber.length !== 10 ||
      register.address === undefined ||
      register.gender === undefined
    ) {
      return toast.error('Please fill all the fields', {
        style: {
          backgroundColor: '#eaa09c',
          color: '#222222',
        },
      });
    }
    try {
      const res = await axios.post('http://localhost:4000/register', register);
      if (res.data.status === 'success') {
        toast.success('account created check email for further details', {
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-page">
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="register">
        <h4>Voter Registration</h4>
        <form action="submit" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Email"
            value={register.email}
            onChange={(e) =>
              setRegister({ ...register, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            value={register.password}
            onChange={(e) =>
              setRegister({ ...register, password: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Full Name"
            value={register.name}
            onChange={(e) =>
              setRegister({ ...register, username: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Aadhaar"
            minLength={12}
            maxLength={12}
            value={register.aadhaar}
            onChange={(e) =>
              setRegister({ ...register, aadhaar: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="address"
            value={register.address}
            onChange={(e) =>
              setRegister({ ...register, address: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Gender"
            value={register.gender}
            onChange={(e) =>
              setRegister({ ...register, gender: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="age"
            value={register.age}
            onChange={(e) => setRegister({ ...register, age: e.target.value })}
          />

          <input
            type="text"
            placeholder="Father Name"
            value={register.fatherName}
            onChange={(e) =>
              setRegister({ ...register, fatherName: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Mobile Number"
            minLength={10}
            maxLength={10}
            value={register.mobileNumber}
            onChange={(e) =>
              setRegister({ ...register, mobileNumber: e.target.value })
            }
          />
          <button type="submit">Create account</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};
