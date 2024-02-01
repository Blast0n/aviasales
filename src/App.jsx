import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchSeacrhId, fetchData } from './store/appSlice';
import style from './App.module.scss';
import Header from './components/Header/Header';
import AsideBar from './components/AsideBar/AsideBar';
import Filter from './components/Filter/Filter';
import TicketList from './components/TicketsList/TicketsList';

function App() {
  const dispatch = useDispatch();
  const { data, searchId } = useSelector((state) => state.app);
  console.log(data);
  useEffect(() => {
    if (!searchId) {
      dispatch(fetchSeacrhId());
    } else {
      dispatch(fetchData(searchId));
    }
  }, [searchId]);
  return (
    <>
      <Header />
      <div className={style.wrapper}>
        <AsideBar />
        <main>
          <Filter />
          <TicketList />
        </main>
      </div>
    </>
  );
}

export default App;
