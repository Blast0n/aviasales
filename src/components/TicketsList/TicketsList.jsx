import { useSelector } from 'react-redux';
import { useState } from 'react';
import uuid from 'react-uuid';
import { Spin } from 'antd';

import Ticket from '../Ticket/Ticket';

import style from './TicketsList.module.scss';

export default function TicketList() {
  const [value, setValue] = useState(5);
  const { data, loading, checkedList } = useSelector((state) => state.app);
  const onClick = () => {
    setValue((prev) => prev + 5);
  };
  let tickets = null;

  const filterObj = {
    'Без пересадок': 0,
    '1 пересадка': 1,
    '2 пересадки': 2,
    '3 пересадки': 3,
  };

  const filterArr = checkedList.map((el) => filterObj[el]);

  if (data) {
    const filteredFlights = data.filter((el) => {
      const testArr = [el.segments[0].stops.length, el.segments[1].stops.length];
      return testArr.every((num) => filterArr.includes(num));
    });
    tickets = filteredFlights.map((el) => {
      return (
        <Ticket key={uuid()} price={el.price} carrier={el.carrier} first={el.segments[0]} second={el.segments[1]} />
      );
    });
  }

  return (
    <ul className={style['ticket-list']}>
      {loading && <Spin size="medium" style={{ marginBottom: '15px' }} />}
      {!checkedList.length ? (
        <p style={{ textAlign: 'center' }}>Рейсов, подходящих под заданные фильтры, не найдено</p>
      ) : (
        <>
          {tickets.slice(0, value)}
          <button className={style['ticket-list__btn']} type="button" onClick={onClick}>
            Показать еще 5 билетов!
          </button>
        </>
      )}
    </ul>
  );
}
