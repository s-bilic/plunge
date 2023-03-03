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
  items?: {
    product_name: string;
    product_price: number;
    product_icon: string;
  }[];
}

const Products = ({ className, items, stores, storeId }: IProps) => {
  const router = useRouter();
  const [data, setData] = useState(items);
  const [formData, setFormData] = useState("");
  const [iconData, setIconData] = useState("");
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

  const addData = async () => {
    await supabase.from("products").insert({
      product_name: formData[0]?.value,
      product_price: formData[1]?.value,
      product_icon: iconData,
      store_id: storeId,
    });

    router.refresh();
  };

  console.log(iconData);
  return (
    <div className={classes}>
      {data?.map((item, index) => (
        <React.Fragment key={index}>
          <Product
            href={"/"}
            className={styles.product}
            title={{ text: item?.product_name }}
            content={{ text: item?.product_price?.toString() }}
            icon={{ name: item?.product_icon }}
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
                  button={{ text: "Add", onClick: addData }}
                  form={{
                    onChange: (e) => setFormData(e),
                  }}
                  iconPicker={{
                    onChange: (e) => setIconData(e),
                  }}
                />
              )}
            </>
          )}
        </React.Fragment>
      ))}
      {!active && !data?.length && (
        <Button
          onClick={handleForm}
          className={styles.button}
          icon={{ name: "plus", size: "xs" }}
          color={"light"}
          boxShadow
        />
      )}
      {active && !data?.length && (
        <ProductForm
          cancel={() => setActive(false)}
          button={{ text: "Add", onClick: addData }}
          form={{
            onChange: (e) => setFormData(e),
          }}
          iconPicker={{
            onChange: (e) => setIconData(e),
          }}
        />
      )}
    </div>
  );
};

export default Products;
