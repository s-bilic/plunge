import React, { useEffect, useState } from "react";
import styles from "./stores.module.scss";
import classNames from "classnames/bind";
import { Button, Badge, Tile } from "@ui";
import { Store, StoreForm } from "@components";

const cx = classNames.bind(styles);

interface IProps {
  className?: string;
  items: React.ComponentProps<typeof Store>[];
  types: [];
}

const Stores = ({ className, items, types }: IProps) => {
  const [data, setData] = useState(items);
  const [active, setActive] = useState(false);
  const classes = cx(
    {
      stores: true,
    },
    className
  );

  const addStore = () => {
    setData((prev) => [
      ...prev,
      {
        title: {
          text: "Cafe",
        },
      },
    ]);
  };

  const toggleForm = () => {
    setActive(!active);

    if (active) {
      addStore();
    }
  };

  return (
    <div className={classes}>
      {data?.map((item, index) => (
        <React.Fragment key={index}>
          <Store
            className={styles.store}
            index={`${index + 1}`}
            content={{ text: `${5} products` }}
            icon={{ name: "store" }}
            {...item}
          />
          {data.length - 1 === index && (
            <>
              {!active && (
                <Button
                  onClick={toggleForm}
                  className={styles.button}
                  icon={{ name: "plus", size: "xs" }}
                  color={"light"}
                  boxShadow
                />
              )}
              {active && <StoreForm types={types} onClick={toggleForm} />}
            </>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stores;
