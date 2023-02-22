import React, { useEffect, useState } from "react";
import styles from "./productForm.module.scss";
import classNames from "classnames/bind";
import { Tile, Title, Content, Badge, Button, Form, Element } from "@ui";

const cx = classNames.bind(styles);

interface IProps {
  className?: string;
  tile?: React.ComponentProps<typeof Tile>;
  types?: string[];
  save?: React.MouseEventHandler<HTMLButtonElement>;
  cancel?: React.MouseEventHandler<HTMLButtonElement>;
  onChange?: any;
  form?: any;
}

const ProductForm = ({ className, types, save, cancel, form }: IProps) => {
  const [data, setData] = useState([
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
  ]);

  const classes = cx(
    {
      productForm: true,
    },
    className
  );

  // sidebar + input form (name, price, icon) + list of created items
  return (
    <div className={classes}>
      <Tile className={styles.tile} boxShadow borderRadius>
        <Form items={data} {...form} />
      </Tile>
    </div>
  );
};

export default ProductForm;
