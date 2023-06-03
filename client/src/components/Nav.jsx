import { useAuth } from '../auth';

export const Nav = ({ page }) => {
  const { logOut } = useAuth();
  return (
    <nav className="admin-nav">
      <div>
        <h1>{page}</h1>
      </div>
      <div>
        <button onClick={logOut}>Log Out</button>
      </div>
    </nav>
  );
};
