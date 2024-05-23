//NATIVE
import React, { useState } from "react";
//LIBRARIES
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Delete } from "styled-icons/fluentui-system-regular";
//COMPONENTS
import { Notification } from "../../../services/notifications/DTO";
//STYLES
import * as S from "./styles";
//UTILS

interface CardProps {
  notification: Notification;
  handleViewed: (notification: Notification) => void;
  handleDelete: (notification: Notification) => void;
}

const NotificationCard: React.FC<CardProps> = ({
  notification,
  handleViewed,
  handleDelete,
}) => {
  return (
    <S.NotificationCardStyle
      viewed={notification.viewed}
      onClick={() => handleViewed(notification)}
    >
      <S.NotificationHeaderStyle>
        <div>
          <S.NotificationTitleStyle>
            {notification.title}
          </S.NotificationTitleStyle>
          &emsp;
          <S.NotificationTimeStyle>
            {formatDistanceToNow(notification.created_at, {
              locale: ptBR,
              addSuffix: true,
            })}
          </S.NotificationTimeStyle>
        </div>
        <div>
          <p>{notification.message}</p>
        </div>
      </S.NotificationHeaderStyle>

      <S.NotificationContentStyle>
        <S.IconStyle onClick={() => handleDelete(notification)}>
          <Delete />
        </S.IconStyle>
      </S.NotificationContentStyle>
    </S.NotificationCardStyle>
  );
};

export default NotificationCard;
