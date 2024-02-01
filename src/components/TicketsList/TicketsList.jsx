import { useSelector } from 'react-redux';
import uuid from 'react-uuid';

import Ticket from '../Ticket/Ticket';

import style from './TicketsList.module.scss';

export default function TicketList() {
  const { data } = useSelector((state) => state.app);
  let tickets = null;
  if (data) {
    tickets = data.map((el) => {
      return (
        <Ticket key={uuid()} price={el.price} carrier={el.carrier} first={el.segments[0]} second={el.segments[1]} />
      );
    });
  }

  return (
    <ul className={style['ticket-list']}>
      {tickets.slice(0, 5)}
      <button className={style['ticket-list__btn']} type="button">
        Показать еще 5 билетов!
      </button>
    </ul>
  );
}
