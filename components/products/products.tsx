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
  store: { store_id: number };
  onChange: Function;
  admin: boolean;
  publicView: boolean;
}

interface IProduct {
  store_id?: number;
  product_id?: number;
  product_name: string;
  product_price: number;
  product_icon: string;
}

const Products = ({
  className,
  items,
  store,
  onChange,
  admin,
  publicView,
}: IProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState<{ value: string }[]>([]);
  const [iconData, setIconData] = useState<string>("");
  const [active, setActive] = useState<boolean>(false);
  const [selected, setSelected] = useState<IProduct[]>([]);

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
      store_id: store?.store_id,
    });

    router.refresh();
  };

  const deleteProduct = async (id: number) => {
    await supabase.from("products").delete().eq("product_id", id);

    router.refresh();
  };

  const handleProductToggle = (product: IProduct) => {
    if (selected?.includes(product)) {
      setSelected(selected?.filter((p) => p !== product));
    } else {
      setSelected([...selected, product]);
    }
  };

  useEffect(() => {
    if (onChange) {
      onChange(selected);
    }
  }, [selected]);

  return (
    <div className={classes}>
      {items?.map((item: IProduct, index) => (
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
            button={{ onClick: () => deleteProduct(Number(item?.product_id)) }}
            admin={admin}
            publicView={publicView}
          />
          {items?.length - 1 === index && (
            <>
              {!active && admin && !publicView && (
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
                    onChange: (e: any) => setFormData(e),
                  }}
                  iconPicker={{
                    onChange: (e: any) => setIconData(e),
                  }}
                />
              )}
            </>
          )}
        </React.Fragment>
      ))}
      {!active && !items?.length && admin && !publicView && (
        <Button
          onClick={handleForm}
          className={styles.button}
          icon={{ name: "plus", size: "xs", color: "energized" }}
          color={"light"}
          outline
        />
      )}
      {active && !items?.length && (
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
