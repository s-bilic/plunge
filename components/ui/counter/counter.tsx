import React, { useState, useEffect } from "react";
import styles from "./counter.module.scss";
import classNames from "classnames/bind";
import { Tile, Title, Content, Button } from "@ui";
import { Icon } from "@helper";

const cx = classNames.bind(styles);

interface IProps {
  className?: string;
  value: number;
  onChange: Function;
}

const Counter = ({ className, value, onChange }: IProps) => {
  const [count, setCount] = useState<number>(value);

  const classes = cx(
    {
      counter: true,
    },
    className
  );

  useEffect(() => {
    if (onChange) {
      onChange(count);
    }
  }, [count]);

  return (
    <div className={classes}>
      <Button
        className={styles.button}
        link
        icon={{ name: "circle-minus", size: "xxs" }}
        onClick={() => setCount(count - 1)}
        disabled={count === 0}
      />
      {value && (
        <Content
          size={"xs"}
          className={styles.value}
          text={count.toString()}
          emphasize
        />
      )}
      <Button
        className={styles.button}
        link
        icon={{ name: "circle-plus", size: "xxs" }}
        onClick={() => setCount(count + 1)}
      />
    </div>
  );
};

export default Counter;
