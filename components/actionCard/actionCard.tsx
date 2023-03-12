import React, { useState, useEffect } from "react";
import styles from "./actionCard.module.scss";
import classNames from "classnames/bind";
import { Badge, Title, Content, Card } from "@ui";
import { Icon } from "@helper";

const cx = classNames.bind(styles);

interface IProps {
  className?: string;
  title?: React.ComponentProps<typeof Title>;
  content?: React.ComponentProps<typeof Content>;
  badge?: React.ComponentProps<typeof Badge>;
}

const ActionCard = ({
  className,
  title,
  content,
  badge = { text: "More", color: "stable", textColor: "dark" },
}: IProps) => {
  const classes = cx(
    {
      actionCard: true,
    },
    className
  );

  return (
    <Card className={classes}>
      <div className={styles.wrapper}>
        {title && (
          <Content className={styles.title} size={"xs"} emphasize {...title} />
        )}
        {content && <Content size={"xxs"} {...content} />}
      </div>
      {badge && (
        <div>
          <Badge {...badge} />
        </div>
      )}
    </Card>
  );
};

export default ActionCard;
