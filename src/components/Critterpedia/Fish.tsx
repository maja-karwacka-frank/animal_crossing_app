import { FishObj } from "./Fishes"
import classes from './Fish.module.css';

export const Fish = (props: FishObj) => {
    return <div className={classes.container}>
        <img className={classes['fish-icon']} src={props.render_url}/>
        <p>{props.name}</p>
        <p>Location: {props.location}</p>
        <p>Size: {props.shadow_size}</p>
        <p>{props.catchphrases}</p>
        <p>{props.sell_nook}</p>
        <p>{props.north.availability_array.map((val, index) => <span key={index}>{val.months} / {val.time}</span>)}</p>
    </div>
}