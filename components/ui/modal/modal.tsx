import React from "react";
import ReactDOM from "react-dom";
import ReactModal from "react-modal";
import styles from "./modal.module.scss";
import classNames from "classnames/bind";
import { Title, Content, Button } from "@ui";
import { Icon } from "@helper";

const cx = classNames.bind(styles);

interface IProps {
  className?: string;
  children: React.ReactNode;
  header: any;
  buttons: any;
  icon: any;
  isOpen: boolean;
}

const Modal = ({
  className,
  children,
  header,
  buttons,
  icon,
  isOpen,
  id,
}: IProps) => {
  const classes = cx(
    {
      modal: true,
    },
    className
  );

  return (
    <ReactModal id={id} isOpen={isOpen} className={classes}>
      <div className={styles.wrapper}>
        {header && (
          <div className={styles.header}>
            {header?.title && <Title tag={"h6"} {...header.title} />}
            {header?.content && <Content {...header.content} />}
          </div>
        )}
        {icon && <Icon className={styles.icon} {...icon} />}
        {buttons && (
          <div className={styles.buttons}>
            {buttons?.cancel && (
              <Button
                className={styles.cancel}
                color={"light"}
                textColor={"dark"}
                size={"xxs"}
                outline
                {...buttons.cancel}
              />
            )}
            {buttons?.delete && (
              <Button
                className={styles.delete}
                color={"assertive"}
                size={"xxs"}
                {...buttons.delete}
              />
            )}
          </div>
        )}
        {children && <div className={styles.body}>{children}</div>}
      </div>
    </ReactModal>
  );
};

export default Modal;
