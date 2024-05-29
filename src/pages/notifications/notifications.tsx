//NATIVE

//LIBRARIES

//COMPONENTS
import NotificationCard from "../../components/shared/cards/notification-card";
import { useNotificationsCrud } from "../../hooks/notification/use-notification-crud";
import { Notification } from "../../services/notifications/DTO";
//STYLES
import * as S from "./styles";
//UTILS

const Notifications = () => {
  const { notifications, updateNotifications, deleteNotifications } =
    useNotificationsCrud();

  const handleViewed = (notification: Notification) => {
    if (!notification.viewed) {
      const { user_notification_id } = notification;
      updateNotifications({ user_notification_id });
    }
  };

  const handleDelete = (notification: Notification) => {
    const { user_notification_id } = notification;
    deleteNotifications({ user_notification_id });
  };

  return (
    <S.NotificationStyles>
      <S.NotificationTitle>Suas Notificações</S.NotificationTitle>
      {notifications?.map((notification, index) => (
        <NotificationCard
          key={index}
          notification={notification}
          handleViewed={handleViewed}
          handleDelete={handleDelete}
        />
      ))}
    </S.NotificationStyles>
  );
};

export default Notifications;
