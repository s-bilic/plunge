import React, { useEffect, useState } from "react";
import styles from "./productForm.module.scss";
import classNames from "classnames/bind";
import { Tile, Title, Content, Badge, Button, Form } from "@ui";

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

  const elements = [
    {
      id: "0",
      type: "text",
      label: "Name",
    },
    {
      id: "1",
      type: "text",
      label: "Price",
    },
  ];

  // sidebar + input form (name, price, icon) + list of created items
  return (
    <div className={classes}>
      <Tile className={styles.tile} boxShadow borderRadius>
        <Form
          items={elements}
          button={{ text: "Add Product" }}
          onChange={(e: any) => console.log(e)}
        />
      </Tile>
    </div>
  );
};

export default ProductForm;
