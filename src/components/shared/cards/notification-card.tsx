//NATIVE
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//LIBRARIES
import { formatDistance, formatDistanceToNow } from "date-fns";
import {  } from "date-fns";
//COMPONENTS
import { Notifications } from "../../../services/notifications/DTO";
//STYLES
import * as S from "./styles";
import { DeleteNotificationData, UpdateNotificationData, useNotificationsCrud } from "../../../hooks/notification/use-notification-crud";
//UTILS


interface CardProps {
  notifications: Notifications;
  // onViewed: (params: UpdateNotificationData) => void;
  // onDelete: (params: DeleteNotificationData) => void;
}

const NotificationCard: React.FC<CardProps> = ({ notifications }) => {
  const { updateNotifications } = useNotificationsCrud();
const [expanded, setExpanded] = useState(false);
// if (expanded == true){
//   notifications.viewed = true
// }
const handleViewed = () => {

  if (notifications.viewed == false) {
  const updatedNotification = { ...notifications};
  updateNotifications(updatedNotification);
}
  setExpanded(!expanded);
}

  return (
    <S.NotificationCardStyle expanded={expanded} viewed={notifications.viewed} onClick={handleViewed}>
      <S.NotificationHeaderStyle>
        <S.NotificationTitleStyle>{notifications.title}</S.NotificationTitleStyle>
        <p>{formatDistanceToNow(notifications.created_at,   { addSuffix: true } )}</p>
        </S.NotificationHeaderStyle>
        {expanded &&    
        <S.NotificationContentStyle>     
        <h2>{notifications.message}</h2>
        </S.NotificationContentStyle>}
    </S.NotificationCardStyle>
  );
};

export default NotificationCard;