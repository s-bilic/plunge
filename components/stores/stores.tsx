import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./stores.module.scss";
import classNames from "classnames/bind";
import { Button, Badge, Tile, Title, Content, Modal } from "@ui";
import { Store, StoreForm } from "@components";
import { supabase } from "@utils";
import { Icon } from "@helper";

const cx = classNames.bind(styles);

interface IProps {
  className?: string;
  items: React.ComponentProps<typeof Store>[];
  types: [];
}

const Stores = ({ className, items, types, user }: IProps) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [data, setData] = useState(items);
  const [active, setActive] = useState(false);
  const [type, setType] = useState("");
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

  const handleDelete = (id) => {
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
      {data?.map((item, index) => (
        <React.Fragment key={index}>
          <Store
            className={styles.store}
            href={`${user[0]?.user_address}/${item?.store_name}`}
            content={{ text: `${5} products` }}
            title={{ text: item?.store_name }}
            icon={{ name: item?.store_name }}
            button={{ onClick: () => handleDelete(item?.store_id) }}
            {...item}
          />
          {data.length - 1 === index && (
            <>
              {!active && data?.length < 14 && (
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
                  data={data}
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
          icon={{ name: "plus", size: "xs", color: "energized" }}
          color={"light"}
          disabled={!user.length}
          outline
        />
      )}
      {active && !data.length && (
        <StoreForm
          types={types}
          save={handleForm}
          cancel={() => setActive(false)}
          onChange={(e: any) => setType(e)}
          disabled={!type}
          data={data}
        />
      )}
    </div>
  );
};

export default Stores;
