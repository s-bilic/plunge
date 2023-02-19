import React, { useEffect, useState } from "react";
import styles from "./productForm.module.scss";
import classNames from "classnames/bind";
import { Tile, Title, Content, Badge, Button } from "@ui";

const cx = classNames.bind(styles);

interface IProps {
  className?: string;
  tile?: React.ComponentProps<typeof Tile>;
  types?: string[];
  save?: React.MouseEventHandler<HTMLButtonElement>;
  cancel?: React.MouseEventHandler<HTMLButtonElement>;
  onChange?: any;
}

const ProductForm = ({ className, types, save, cancel, onChange }: IProps) => {
  const [count, setCount] = useState(0);
  const [type, setType] = useState("");
  const classes = cx(
    {
      productForm: true,
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
        <h5>
          sidebar + input form (name, price, icon) + list of created items
        </h5>
      </Tile>
    </div>
  );
};

export default ProductForm;
