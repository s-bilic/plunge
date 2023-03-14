import React from "react";
import styles from "./element.module.scss";
import classNames from "classnames/bind";
import { Content } from "@ui";

const cx = classNames.bind(styles);

interface IProps {
  className?: string;
  type: string;
  value?: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  onChange?: Function;
}

const Element = ({
  className,
  type,
  value,
  name,
  placeholder,
  disabled,
  label,
  onChange,
}: IProps) => {
  const classes = cx(
    {
      element: true,
    },
    className
  );

  return (
    <div className={classes}>
      {label && (
        <label className={styles.label} htmlFor={name}>
          <Content size={"xxs"} color={"stable-500"} text={label} />
        </label>
      )}
      <input
        className={styles.input}
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        onWheel={(e) => e.target.blur()}
      />
    </div>
  );
};

export default Element;
