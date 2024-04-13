import '../index.css';
import { useNotificationVal } from '../context/BlogContext';

const Notification = () => {
  const notification = useNotificationVal()

  return notification ? (
    <div className={notification.type}>{notification.message}</div>
  ) : null;
};

export default Notification;
