import React, { useEffect, useState } from "react";
import styles from "./storeForm.module.scss";
import classNames from "classnames/bind";
import { Tile, Title, Content, Badge, Button } from "@ui";

const cx = classNames.bind(styles);

interface IProps {
  className?: string;
  tile?: React.ComponentProps<typeof Tile>;
  types: string[];
  save?: React.MouseEventHandler<HTMLButtonElement>;
  remove?: React.MouseEventHandler<HTMLButtonElement>;
  onChange?: any;
}

const StoreForm = ({ className, types, save, remove, onChange }: IProps) => {
  const [count, setCount] = useState(0);
  const [type, setType] = useState("");
  const classes = cx(
    {
      storeForm: true,
    },
    className
  );

  const selectBadge = (e: any) => {
    if (e) {
      setType(e?.target?.innerText);
    }
  };

  useEffect(() => {
    if (onChange) {
      onChange(type);
    }
  });

  return (
    <div className={classes}>
      <Tile className={styles.tile} boxShadow borderRadius>
        {count === 0 &&
          types?.map((item, index) => (
            <Badge
              key={index}
              text={item}
              textColor={"stable-700"}
              active={type === item}
              onClick={selectBadge}
              outline
            />
          ))}
      </Tile>
      <div className={styles.actions}>
        <Button
          className={styles.remove}
          color={"transparent"}
          icon={{ name: "cross-circle", size: "xs", color: "a" }}
          onClick={remove}
        />
        <Button
          className={styles.save}
          color={"transparent"}
          icon={{ name: "checkmark-circle", size: "xs" }}
          onClick={save}
        />
      </div>
    </div>
  );
};

export default StoreForm;
