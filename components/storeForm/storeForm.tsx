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
  disabled?: any;
}

const StoreForm = ({
  className,
  types,
  save,
  cancel,
  onChange,
  disabled,
  data,
}: IProps) => {
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
              disabled: disabled,
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
        {console.log(data)}
        <div className={styles.types}>
          {count === 0 &&
            types?.map((item, index) => {
              const isDisabled = data?.some((d) => d?.store_name === item);

              return (
                <Badge
                  key={index}
                  className={styles.badge}
                  text={item}
                  textColor={"stable-700"}
                  active={type === item}
                  onClick={selectBadge}
                  outline
                  disabled={isDisabled}
                />
              );
            })}
        </div>
      </Tile>
    </div>
  );
};

export default StoreForm;
