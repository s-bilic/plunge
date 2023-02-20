import React, { useState, useEffect } from "react";
import styles from "./form.module.scss";
import classNames from "classnames/bind";
import { Element, Button } from "@ui";

const cx = classNames.bind(styles);

interface IProps {
  className?: string;
  items: React.ComponentProps<typeof Element>[];
  button?: React.ComponentProps<typeof Button>;
  onChange?: Function;
}

const Form = ({ className, items, button, onChange }: IProps) => {
  const [data, setData] = useState(items);
  const classes = cx(
    {
      form: true,
    },
    className
  );

  const handleData = (e: any, index: any) => {
    e.preventDefault();
    if (e) {
      setData((prev) =>
        prev.map((item) =>
          item.id === index.toString()
            ? { ...item, value: e.target.value }
            : item
        )
      );
    }
  };

  useEffect(() => {
    if (onChange) {
      onChange(data);
    }
  }, [data]);

  return (
    <div className={classes}>
      {items?.map((item, index) => (
        <Element
          key={index}
          className={styles.item}
          onChange={(e) => handleData(e, index)}
          {...item}
        />
      ))}
      {button && <Button grow {...button} />}
    </div>
  );
};

export default Form;
