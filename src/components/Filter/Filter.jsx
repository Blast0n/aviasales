import { useDispatch, useSelector } from 'react-redux';

import { onBtnClick, filteredByClick } from '../../store/AppSlice';

import style from './Filter.module.scss';

export default function Filter() {
  const dispatch = useDispatch();
  const clickedBtn = useSelector((state) => state.app.clickedBtn);

  const onClick = (e) => {
    const clickedId = e.target.id;
    if (clickedBtn !== clickedId) {
      dispatch(onBtnClick(clickedId));
      dispatch(filteredByClick(clickedId));
    }
  };
  return (
    <div className={style.filter}>
      <button
        className={
          clickedBtn === '1' ? `${style.filter__item} ${style['filter__item--active']}` : `${style.filter__item}`
        }
        id="1"
        type="button"
        onClick={(e) => onClick(e)}
      >
        Самый дешевый
      </button>
      <button
        className={
          clickedBtn === '2' ? `${style.filter__item} ${style['filter__item--active']}` : `${style.filter__item}`
        }
        id="2"
        type="button"
        onClick={(e) => onClick(e)}
      >
        Самый быстрый
      </button>
      <button
        className={
          clickedBtn === '3' ? `${style.filter__item} ${style['filter__item--active']}` : `${style.filter__item}`
        }
        id="3"
        type="button"
        onClick={(e) => onClick(e)}
      >
        Оптимальный
      </button>
    </div>
  );
}
