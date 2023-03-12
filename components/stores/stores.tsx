import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./stores.module.scss";
import classNames from "classnames/bind";
import { Button, Modal } from "@ui";
import { Store, StoreForm } from "@components";
import { supabase } from "@utils";
const cx = classNames.bind(styles);

interface IProps {
  className?: string;
  items: IStore[];
  types: string[];
  user: { user_id?: number; user_address?: string }[];
}

interface IStore {
  product_count?: number;
  store_name?: string;
  store_id?: number;
}

const Stores = ({ className, items, types, user }: IProps) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number>();
  const [active, setActive] = useState<boolean>(false);
  const [type, setType] = useState<string>("");

  const classes = cx(
    {
      stores: true,
    },
    className
  );

  const addStore = async () => {
    await supabase
      .from("stores")
      .insert({
        user_id: user[0]?.user_id,
        user_address: user[0]?.user_address,
        store_name: type?.toLowerCase(),
      })
      .select();

    router.refresh();
  };

  const deleteStore = async (id: number) => {
    await supabase.from("stores").delete().eq("store_id", id);

    router.refresh();
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const handleModalDelete = () => {
    if (deleteId) {
      deleteStore(deleteId);
      setShowModal(false);
    }
  };

  const handleForm = () => {
    setActive(!active);

    if (active) {
      addStore();
    }
  };

  return (
    <div className={classes}>
      <Modal
        isOpen={showModal}
        header={{
          title: { text: "Are you sure you want to delete this store?" },
        }}
        buttons={{
          cancel: {
            text: "Cancel",
            onClick: () => setShowModal(false),
          },
          delete: {
            text: "Delete",
            onClick: handleModalDelete,
          },
        }}
        icon={{ name: "trash" }}
      />
      {items?.map((item: IStore, index: number) => (
        <React.Fragment key={index}>
          <Store
            className={styles.store}
            href={`${user[0]?.user_address}/${item?.store_name}`}
            content={{
              text: item?.product_count
                ? `${item?.product_count?.toString()} products`
                : "0 products",
            }}
            title={{ text: item?.store_name }}
            icon={{ name: item?.store_name }}
            button={{ onClick: () => handleDelete(item?.store_id) }}
            {...item}
          />
          {items?.length - 1 === index && (
            <>
              {!active && items?.length < 14 && (
                <Button
                  onClick={handleForm}
                  className={styles.button}
                  icon={{ name: "plus", size: "xs", color: "energized" }}
                  color={"light"}
                  outline
                />
              )}
              {active && (
                <StoreForm
                  types={types}
                  save={handleForm}
                  cancel={() => setActive(false)}
                  onChange={(e: any) => setType(e)}
                  disabled={!type}
                  data={items}
                />
              )}
            </>
          )}
        </React.Fragment>
      ))}
      {!active && !items.length && (
        <Button
          onClick={handleForm}
          className={styles.button}
          icon={{ name: "plus", size: "xs", color: "energized" }}
          color={"light"}
          disabled={!user.length}
          outline
        />
      )}
      {active && !items.length && (
        <StoreForm
          types={types}
          save={handleForm}
          cancel={() => setActive(false)}
          onChange={(e: any) => setType(e)}
          disabled={!type}
          data={items}
        />
      )}
    </div>
  );
};

export default Stores;
