//NATIVE
import React, { useState } from "react";
//LIBRARIES
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Delete } from "styled-icons/fluentui-system-regular";
//COMPONENTS
import { Notifications } from "../../../services/notifications/DTO";
//STYLES
import * as S from "./styles";
import { useNotificationsCrud } from "../../../hooks/notification/use-notification-crud";
//UTILS

interface CardProps {
  notifications: Notifications;
}

const NotificationCard: React.FC<CardProps> = ({ notifications }) => {
  const { updateNotifications, deleteNotifications } = useNotificationsCrud();
  const [expanded, setExpanded] = useState(false);
  const handleViewed = () => {
    if (notifications.viewed != true) {
      const updatedNotification = { ...notifications };
      updateNotifications(updatedNotification);
    }
    setExpanded(!expanded);
  };

  const handleDelete = () => {
    const deleteNotification = { ...notifications };
    deleteNotifications(deleteNotification);
  };

  return (
    <S.NotificationCardStyle
      viewed={notifications.viewed}
      onClick={handleViewed}
    >
      <S.NotificationHeaderStyle>
        <div>
          <S.NotificationTitleStyle>
            {notifications.title}
          </S.NotificationTitleStyle>
          &emsp;
          <S.NotificationTimeStyle>
            {formatDistanceToNow(notifications.created_at, {
              locale: ptBR,
              addSuffix: true,
            })}
          </S.NotificationTimeStyle>
        </div>
        <div>
          <p>{notifications.message}</p>
        </div>
      </S.NotificationHeaderStyle>

      <S.NotificationContentStyle>
        <S.IconStyle onClick={handleDelete}>
          <Delete />
        </S.IconStyle>
      </S.NotificationContentStyle>
    </S.NotificationCardStyle>
  );
};

export default NotificationCard;
