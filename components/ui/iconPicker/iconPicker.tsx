import React, { useState, useEffect } from "react";
import styles from "./iconPicker.module.scss";
import classNames from "classnames/bind";
import { Tile, Title, Content, Button } from "@ui";
import { Icon } from "@helper";

const cx = classNames.bind(styles);

interface IProps {
  className?: string;
  label?: any;
  onChange?: any;
}

const IconPicker = ({ className, label, onChange }: IProps) => {
  const [active, setActive] = useState();
  const classes = cx(
    {
      iconPicker: true,
    },
    className
  );

  const iconsData = [
    "pizza",
    "juice",
    "coffee-cup",
    "mushroom",
    "sprout",
    "ticket",
    "cake",
    "candy",
    "baloon",
    "music",
  ];

  useEffect(() => {
    if (onChange) {
      onChange(active);
    }
  }, [active]);

  return (
    <div className={classes}>
      {label && (
        <Content
          className={styles.label}
          size={"xxs"}
          color={"stable-500"}
          text={label}
        />
      )}
      <div className={styles.icons}>
        {iconsData?.map((item, index) => (
          <div
            key={index}
            className={item === active ? styles.active : styles.icon}
          >
            <Button
              icon={{ name: item, size: "xxs" }}
              title={item}
              color={"transparent"}
              onClick={(e) => setActive(e.currentTarget.title)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconPicker;
