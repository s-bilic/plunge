import React, { useState } from "react";
import styles from "./productForm.module.scss";
import classNames from "classnames/bind";
import { Tile, Form, IconPicker } from "@ui";

const cx = classNames.bind(styles);

interface IProps {
  className?: string;
  iconPicker: React.ComponentProps<typeof IconPicker>;
  save?: React.MouseEventHandler<HTMLButtonElement>;
  cancel?: React.MouseEventHandler<HTMLButtonElement>;
  form?: any;
  disabled?: boolean;
}

const ProductForm = ({
  className,
  iconPicker,
  save,
  cancel,
  form,
  disabled,
}: IProps) => {
  const [data, setData] = useState([
    {
      id: "0",
      type: "text",
      label: "Name",
    },
    {
      id: "1",
      type: "number",
      label: "Price",
    },
  ]);

  const classes = cx(
    {
      productForm: true,
    },
    className
  );

  return (
    <div className={classes}>
      <Tile
        footer={{
          buttons: [
            {
              text: "Add",
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
        className={styles.tile}
        boxShadow
        borderRadius
      >
        <Form items={data} {...form} />
        <IconPicker label={"Icon"} {...iconPicker} />
      </Tile>
    </div>
  );
};

export default ProductForm;
