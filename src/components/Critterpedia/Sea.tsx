import { SeaCreaturesObj } from "./SeaCreatures"
import classes from './Sea.module.css';

export const Sea = (props: SeaCreaturesObj) => {
    return <div className={classes.container}>
    <img className={classes['sea-icon']} src={props.render_url}/>
    <p className={classes.title}>{props.name}</p>
    <p>Size: {props.shadow_size}</p>
    <p>Size: {props.shadow_movement}</p>
    <p>{props.catchphrases}</p>
    <p>{props.sell_nook}</p>
    <p>{props.north.availability_array.map((val, index) => <span key={index}>{val.months} / {val.time}</span>)}</p>
</div>
}