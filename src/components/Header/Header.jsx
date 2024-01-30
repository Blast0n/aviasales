import Logo from '../../assets/Logo.svg';

import style from './Header.module.scss';

export default function Header() {
  return (
    <div className={style.logo}>
      <img src={Logo} alt="" width="60px" height="60px" />
    </div>
  );
}
