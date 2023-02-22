import React, { useState } from "react";
import styles from "./products.module.scss";
import classNames from "classnames/bind";
import { Button } from "@ui";
import { Product, ProductForm } from "@components";
const cx = classNames.bind(styles);

interface IProps {
  className?: string;
  items?: { name: string; price: number; icon: string }[];
}

const Products = ({ className, items }: IProps) => {
  const [data, setData] = useState(items);
  const [l, setL] = useState("");
  const [active, setActive] = useState(false);
  const classes = cx(
    {
      products: true,
    },
    className
  );

  const handleForm = () => {
    setActive(!active);
  };
  console.log(l);

  const addData = () => {
    setData((prev) => [...prev, { name: l[0]?.value, price: l[1]?.value }]);
  };

  return (
    <div className={classes}>
      {data?.map((item, index) => (
        <React.Fragment key={index}>
          <Product
            href={"/"}
            className={styles.product}
            title={{ text: item?.name }}
            content={{ text: item?.price?.toString() }}
            icon={{ name: item?.icon }}
          />
          {data?.length - 1 === index && (
            <>
              {!active && (
                <Button
                  onClick={handleForm}
                  className={styles.button}
                  icon={{ name: "plus", size: "xs" }}
                  color={"light"}
                  boxShadow
                />
              )}
              {active && (
                <ProductForm
                  cancel={() => setActive(false)}
                  form={{
                    button: { text: "Add", onClick: addData },
                    onChange: (e) => setL(e),
                  }}
                />
              )}
            </>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Products;
