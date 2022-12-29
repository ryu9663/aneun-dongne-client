import React from 'react';
import styles from './snow.module.scss';
const MIN_DURATION = 10;
const body = document.querySelector("body");
const Snow = () => {

    const makeSnowflake = () => {
    const snowflake = document.createElement("div");
    const delay = Math.random() * 10;
  const initialOpacity = Math.random();
  const duration = Math.random() * 20 + MIN_DURATION;
  snowflake.classList.add("snowflake");

  snowflake.style.left = `${Math.round(Math.random() * window.screen.width)}px`;
  snowflake.style.animationDelay = `${delay}s`;
  snowflake.style.opacity = String(initialOpacity);
  snowflake.style.animation = `fall ${duration}s linear`;

  setTimeout(() => {
    body?.removeChild(snowflake);
    makeSnowflake();
  }, (duration + delay) * 1000);

}
  return (
    <div className = {styles.wrapper}><div className = {styles.snowflake}>Snow</div></div>
  )
}

export default Snow

