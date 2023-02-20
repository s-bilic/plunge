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
  cancel?: React.MouseEventHandler<HTMLButtonElement>;
  onChange?: any;
}

const StoreForm = ({ className, types, save, cancel, onChange }: IProps) => {
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
      <Tile
        className={styles.tile}
        boxShadow
        borderRadius
        header={{
          content: {
            text: "what kind of store?",
          },
        }}
        footer={{
          buttons: [
            {
              text: "Continue",
              grow: true,
              onClick: save,
            },
            {
              text: "Cancel",
              grow: true,
              color: "transparent",
              textColor: "dark",
              onClick: cancel,
            },
          ],
        }}
      >
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
    </div>
  );
};

export default StoreForm;
