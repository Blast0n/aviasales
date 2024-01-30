import './App.module.scss';
import Header from './components/Header/Header';
import AsideBar from './components/AsideBar/AsideBar';
import Filter from './components/Filter/Filter';
import TicketList from './components/TicketsList/TicketsList';
import Ticket from './components/Ticket/Ticket';

function App() {
  return (
    <>
      <Header />
      <AsideBar />
      <Filter />
      <Ticket />
      <TicketList />
    </>
  );
}

export default App;
