import { Checkbox } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDispatch, useSelector } from 'react-redux';

import { onChange } from '../../store/appSlice';

import style from './AsideBar.module.scss';

export default function AsideBar() {
  const filters = useSelector((state) => state.app.checkedList);
  const dispatch = useDispatch();
  const CheckboxGroup = Checkbox.Group;
  const plainOptions = ['Без пересадок', '1 пересадка', '2 пересадки', '3 пересадки'];

  const checkAll = plainOptions.length === filters.length;

  const onChangeHandler = (list) => {
    dispatch(onChange(list));
  };

  const onCheckAllChange = (e) => {
    dispatch(onChange(e.target.checked ? plainOptions : []));
  };

  return (
    <aside className={style['aside-bar']}>
      <div className={style['aside-bar__title']}>Количество пересадок</div>
      <div className={style['aside-bar__filter']}>
        <Checkbox onChange={onCheckAllChange} checked={checkAll}>
          Все
        </Checkbox>
        <CheckboxGroup
          className={style['filter-checkbox']}
          options={plainOptions}
          value={filters}
          onChange={onChangeHandler}
        />
      </div>
    </aside>
  );
}
