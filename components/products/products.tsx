import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./products.module.scss";
import classNames from "classnames/bind";
import { Button } from "@ui";
import { Product, ProductForm } from "@components";
import { supabase } from "@utils";
const cx = classNames.bind(styles);

interface IProps {
  className?: string;
  items?: { name: string; price: number; icon: string }[];
}

const Products = ({ className, items }: IProps) => {
  const router = useRouter();
  const [data, setData] = useState(items);
  const [formData, setFormData] = useState("");
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

  console.log(formData);

  const addData = async () => {
    await supabase.from("products").insert({
      product_name: formData[0]?.value,
      price: formData[1]?.value,
      store_id: 39,
    });

    router.refresh();
  };

  return (
    <div className={classes}>
      {data?.map((item, index) => (
        <React.Fragment key={index}>
          <Product
            href={"/"}
            className={styles.product}
            title={{ text: item?.product_name }}
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
                    onChange: (e) => setFormData(e),
                  }}
                />
              )}
            </>
          )}
        </React.Fragment>
      ))}
      {!active && !data.length && (
        <Button
          onClick={handleForm}
          className={styles.button}
          icon={{ name: "plus", size: "xs" }}
          color={"light"}
          boxShadow
        />
      )}
      {active && !data.length && (
        <ProductForm
          cancel={() => setActive(false)}
          form={{
            button: { text: "Add", onClick: addData },
            onChange: (e) => setFormData(e),
          }}
        />
      )}
    </div>
  );
};

export default Products;
