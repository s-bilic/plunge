import React from "react";
import styles from "./products.module.scss";
import classNames from "classnames/bind";
import { Button } from "@ui";
import { Product } from "@components";
const cx = classNames.bind(styles);

interface IProps {
  className?: string;
  items?: { name: string; price: number; icon: string }[];
}

const Products = ({ className, items }: IProps) => {
  const classes = cx(
    {
      products: true,
    },
    className
  );

  return (
    <div className={classes}>
      {items?.map((item, index) => (
        <React.Fragment key={index}>
          <Product
            className={styles.product}
            title={{ text: item?.name }}
            content={{ text: item?.price.toString() }}
            icon={{ name: item?.icon }}
          />
          {items?.length - 1 === index && (
            <Button
              // onClick={handleForm}
              className={styles.button}
              icon={{ name: "plus", size: "xs" }}
              color={"light"}
              boxShadow
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Products;
