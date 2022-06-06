import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';
import Dogs from './components/Dogs';
import Cats from './components/Cats';
import Admin from './components/Admin';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import Lounge from './components/Lounge';
import LinkPage from './components/LinkPage';
import RequireAuth from './components/RequireAuth';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAxiosPrivate from './hooks/useAxiosPrivate';
import PetAdd from './components/PetAdd';
import PetDetail from './components/PetDetail';
import PetEdit from './components/PetEdit';
import PetDelete from './components/PetDelete';

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function App() {
  const [dogUrl,setDogUrl] = useState('/dogs/?limit=3&offset=0')
  const [catUrl,setCatUrl1] = useState('/cats/?limit=3&offset=0')
  const [dogs, setDogs] = useState([])
  const [cats, setCats] = useState([])
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const getDogs = async (dogUrl, options=null) => {
    setDogUrl(dogUrl);
      try { 
          const response = await axiosPrivate.get(dogUrl, options);
          console.log(response.data);
          // return response.data
          setDogs(response.data);
      } catch (err) {
          console.error(err);
          navigate('/login', { state: { from: location }, replace: true });
      }
  }
  const getCats = async (catUrl, options=null) => {
    setCatUrl1(catUrl);
      try { 
          const response = await axiosPrivate.get(catUrl, options);
          console.log(response.data);
          setCats(response.data);
      } catch (err) {
          console.error(err);
          navigate('/login', { state: { from: location }, replace: true });
      }
  }

    useEffect(() => {
      const controller = new AbortController();
      getDogs(dogUrl, {
          signal: controller.signal
      });
      getCats(catUrl, {
        signal: controller.signal
      });
      return () => {
          controller.abort();
      }
      
  }, []);

  const petAddHandler = async (pet,category) =>{
    console.log(category)
    const link = category===2 ? "cats" : "dogs"
    const response = await axiosPrivate.post(`/${link}/`, JSON.stringify(pet));
    console.log(response.data);
    category === 2 ? getCats(catUrl) : getDogs(dogUrl)
  }

  const petUpdateHandler = async (pet,category) => {
    console.log(category)
    const link = category===2 ? "cats" : "dogs"
    const response = await axiosPrivate.put(`/${link}/`, JSON.stringify(pet));
    console.log(response.data);
    category === 2 ? getCats(catUrl) : getDogs(dogUrl)
  }

  const petDeleteHandler = async (pet,category) => {
    console.log(JSON.stringify(pet))
    const link = category===2 ? "cats" : "dogs"
    // const response = await axiosPrivate.delete(`/${link}/${pet.id}`);
    const response = await axiosPrivate.delete(`/${link}/`, {data: JSON.stringify(pet.id)});
    console.log(response.data);
    category === 2 ? getCats(catUrl) : getDogs(dogUrl)
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
          <Route path="dogs" element={<Dogs dogs={dogs} getDogs={getDogs}/>} />
          <Route path="dogs/create" element={<PetAdd addHandler={petAddHandler}/>}/>
          <Route path="dogs/view/:id" element={<PetDetail/>}/>
          <Route path="dogs/edit/:id" element={<PetEdit updateHandler={petUpdateHandler}/>}/>
          <Route path="dogs/delete/:id" element={<PetDelete deleteHandler={petDeleteHandler}/>}/>
          
          <Route path="cats" element={<Cats cats={cats} getCats={getCats}/>}  />
          <Route path="cats/create" element={<PetAdd addHandler={petAddHandler}/>}/>
          <Route path="cats/view/:id" element={<PetDetail/>}/>
          <Route path="cats/edit/:id" element={<PetEdit updateHandler={petUpdateHandler}/>}/>
          <Route path="cats/delete/:id" element={<PetDelete deleteHandler={petDeleteHandler}/>}/>
        </Route>


        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
          <Route path="lounge" element={<Lounge />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;