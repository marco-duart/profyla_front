//NATIVE

//LIBRARIES

//COMPONENTS
import NotificationCard from "../../components/shared/cards/notification-card";
import { useNotificationsCrud } from "../../hooks/notification/use-notification-crud";
//STYLES
import * as S from "./styles";
//UTILS

const Notifications = () => {
  const { notifications } = useNotificationsCrud();
  console.log(notifications)
  return (
    <S.NotificationStyles>
      <h1>Suas Notificações</h1>
      {notifications?.map((notifications, index) => (
        <NotificationCard key={index} notifications={notifications} />
      ))}
    </S.NotificationStyles>
  );
};

export default Notifications;
