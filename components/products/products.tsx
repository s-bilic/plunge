import React, { useState, useEffect } from "react";
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
  onChange: any;
  admin: boolean;
}

const Products = ({
  className,
  items,
  stores,
  storeId,
  onChange,
  admin,
}: IProps) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(items);
  const [formData, setFormData] = useState("");
  const [iconData, setIconData] = useState("");
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState([]);

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
      product_price: Number(formData[1]?.value),
      product_icon: iconData,
      store_id: storeId,
    });

    router.refresh();
  };

  const deleteProduct = async (id: number) => {
    await supabase.from("products").delete().eq("product_id", id);

    router.refresh();
  };

  const handleProductToggle = (product: any) => {
    if (selected.includes(product)) {
      setSelected(selected.filter((p) => p !== product));
    } else {
      setSelected([...selected, product]);
    }
  };

  useEffect(() => {
    if (onChange) {
      onChange(selected);
    }
  }, [selected]);

  console.log(data);
  return (
    <div className={classes}>
      {data?.map((item, index) => (
        <React.Fragment key={index}>
          <Product
            onClick={() => handleProductToggle(item)}
            className={styles.product}
            title={{ text: item?.product_name }}
            content={{ text: item?.product_price?.toString() }}
            icon={{ name: item?.product_icon }}
            active={selected.some(
              (selectedItem) => selectedItem.product_id === item.product_id
            )}
            button={{ onClick: () => deleteProduct(item?.product_id) }}
          />
          {console.log(item?.product_id)}
          {data?.length - 1 === index && (
            <>
              {!active && admin && (
                <Button
                  onClick={handleForm}
                  className={styles.button}
                  icon={{ name: "plus", size: "xs", color: "energized" }}
                  color={"light"}
                  outline
                />
              )}
              {active && (
                <ProductForm
                  save={addData}
                  cancel={() => setActive(false)}
                  disabled={
                    !formData[0]?.value || !formData[1]?.value || !iconData
                  }
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
      {!active && !data?.length && admin && (
        <Button
          onClick={handleForm}
          className={styles.button}
          icon={{ name: "plus", size: "xs", color: "energized" }}
          color={"light"}
          outline
        />
      )}
      {active && !data?.length && (
        <ProductForm
          save={addData}
          cancel={() => setActive(false)}
          disabled={!formData[0]?.value || !formData[1]?.value || !iconData}
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
