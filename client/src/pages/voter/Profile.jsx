import { useEffect } from 'react';
import { Nav } from '../../components/Nav';
import axios from 'axios';
import { useAuth } from '../../auth';
import { useState } from 'react';

export const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    console.log(user);
    const fetchUser = async () => {
      const res = await axios.post('http://localhost:4000/user', user);
      setProfile(res.data);
    };
    fetchUser();
  }, []);

  return (
    <div className="profile">
      <Nav page="Profile" />
      <div className="profile-main">
        <div className="profile-main-card">
          <div className="profile-main-card-item">
            <span className="col-1">name</span>
            <p>: {profile.name}</p>
          </div>
          <div className="profile-main-card-item">
            <span className="col-1">email</span>
            <p>: {profile.email}</p>
          </div>
          <div className="profile-main-card-item">
            <span className="col-1">age</span>
            <p>: {profile.age}</p>
          </div>
          <div className="profile-main-card-item">
            <span className="col-1">aadhaar</span>
            <p>: {profile.aadhaar}</p>
          </div>
          <div className="profile-main-card-item">
            <span className="col-1">father's name</span>
            <p>: {profile.fathername}</p>
          </div>
          <div className="profile-main-card-item">
            <span className="col-1">mobile number</span>
            <p>: {profile.mobilenumber}</p>
          </div>
          <div className="profile-main-card-item">
            <span className="col-1">address</span>
            <p>: {profile.address}</p>
          </div>
          <div className="profile-main-card-item">
            <span className="col-1">gender</span>
            <p>: {profile.gender}</p>
          </div>
          <div className="profile-main-card-item">
            <span className="col-1">votrer's id</span>
            <p>: {profile.voterid}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
