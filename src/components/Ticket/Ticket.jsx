// eslint-disable-next-line
import { addMinutes, format } from 'date-fns';

import style from './Ticket.module.scss';

export default function Ticket({ price, carrier, first, second }) {
  const transfersF = first.stops.length;
  const transfersS = second.stops.length;
  const checkTransfers = ['без пересадок', '1 пересадка', '2 пересадки', '3 пересадки'];

  const checkDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}ч ${minutes}м`;
  };
  return (
    <li className={style.item}>
      <div className={style.item__title}>
        <span>{`${price} Р `}</span>
        <img src={`https://pics.avs.io/110/36/${carrier}.png`} alt="" width="110px" height="36px" />
      </div>
      <div className={style.item__info}>
        <div className={style.item__text}>
          <div>{`${first.origin} - ${first.destination}`}</div>
          <div>{`${format(first.date, 'HH:mm')} - ${format(addMinutes(first.date, first.duration), 'HH:mm')}`}</div>
        </div>
        <div className={style.item__text}>
          <div>В пути</div>
          <div>{checkDuration(first.duration)}</div>
        </div>
        <div className={style.item__text}>
          <div>{checkTransfers[transfersF]}</div>
          <div>{first.stops.join(', ')}</div>
        </div>
      </div>
      <div className={style.item__info}>
        <div className={style.item__text}>
          <div>{`${second.origin} - ${second.destination}`}</div>
          <div>{`${format(second.date, 'HH:mm')} - ${format(addMinutes(second.date, second.duration), 'HH:mm')}`}</div>
        </div>
        <div className={style.item__text}>
          <div>В пути</div>
          <div>{checkDuration(second.duration)}</div>
        </div>
        <div className={style.item__text}>
          <div>{checkTransfers[transfersS]}</div>
          <div>{second.stops.join(', ')}</div>
        </div>
      </div>
    </li>
  );
}
