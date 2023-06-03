import { useState } from 'react';
import { Nav } from '../../components/Nav';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

export const CreateNews = () => {
  const [data, setData] = useState({});

  const handleSubmit = async () => {
    axios
      .post('http://localhost:4000/addnews', data)
      .then((res) => {
        if (res.data.status === 'success') {
          setData({});
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        setData({});
      });
  };

  return (
    <div className="create-news">
      <Toaster position="bottom-center" reverseOrder={false} />
      <Nav page="create news" />
      <div className="create-news-main">
        <input
          type="text"
          placeholder="Title"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
        <textarea
          type="text"
          placeholder="Description"
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};
