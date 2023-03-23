import { NavLink } from "react-router-dom";
import logoUser from '../../img/Raymond_Icon.png';

import classes from './Navbar.module.css';

export const Navbar = () => {
   return <div>
   <img src={logoUser} className={classes['logo-user']} alt=''></img>
   <NavLink to='/login'>Log in</NavLink>
   <NavLink to='/register'>Sign up</NavLink>
   </div>
}