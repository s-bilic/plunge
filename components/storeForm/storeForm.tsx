import React, { useEffect, useState } from "react";
import styles from "./storeForm.module.scss";
import classNames from "classnames/bind";
import { Tile, Title, Content, Badge, Button } from "@ui";

const cx = classNames.bind(styles);

interface IProps {
  className?: string;
  tile?: React.ComponentProps<typeof Tile>;
  types: string[];
  onClick?: boolean;
}

const StoreForm = ({ className, types, onClick }: IProps) => {
  const [count, setCount] = useState(0);
  const [active, setActive] = useState("");
  const classes = cx(
    {
      storeForm: true,
    },
    className
  );

  const selectBadge = (e: any) => {
    if (e) {
      setActive(e?.target?.innerText);
    }
  };

  return (
    <div className={classes}>
      <Tile className={styles.tile} boxShadow borderRadius>
        {count === 0 &&
          types?.map((item, index) => (
            <Badge
              key={index}
              text={item}
              textColor={"stable-700"}
              active={active === item}
              onClick={selectBadge}
              outline
            />
          ))}
      </Tile>
      <Button
        color={"transparent"}
        icon={{ name: "checkmark", size: "xs" }}
        onClick={onClick}
      />
    </div>
  );
};

export default StoreForm;
