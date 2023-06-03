import { useState, createContext, useContext, useEffect } from 'react';
import { Navigate, json } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUser(user);
    }
  }, []);

  const logIn = (_user) => {
    console.log(_user);
    // JSON.parse(localStorage.setItem('user', JSON.stringify(_user)));
    setUser(_user);
  };
  const logOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (user && user.role !== 'admin') {
    return <Navigate to="/login" />;
  }
  return children;
};
