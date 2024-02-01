import { useDispatch, useSelector } from 'react-redux';

import { onButtonClick } from '../../store/AppSlice';

import style from './Filter.module.scss';

export default function Filter() {
  const filter = useSelector((state) => state.app.buttonsClicked);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    const clickedId = e.target.id;
    dispatch(onButtonClick(clickedId));
  };

  return (
    <div className={style.filter}>
      <button
        className={filter[1] ? `${style.filter__item} ${style['filter__item--active']}` : `${style.filter__item}`}
        id="1"
        type="button"
        onClick={(e) => handleClick(e)}
      >
        Самый дешевый
      </button>
      <button
        className={filter[2] ? `${style.filter__item} ${style['filter__item--active']}` : `${style.filter__item}`}
        id="2"
        type="button"
        onClick={(e) => handleClick(e)}
      >
        Самый быстрый
      </button>
      <button
        className={filter[3] ? `${style.filter__item} ${style['filter__item--active']}` : `${style.filter__item}`}
        id="3"
        type="button"
        onClick={(e) => handleClick(e)}
      >
        Оптимальный
      </button>
    </div>
  );
}
