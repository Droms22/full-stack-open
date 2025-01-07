const Notification = ({ notification }) => {
  let color;
  switch (notification.type) {
    case "error":
      color = "red";
      break;
    case "success":
      color = "green";
      break;
    default:
      color = "smokegray";
  }

  const notificationStyle = {
    color: color,
    background: "lightgray",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  if (notification.message === null) {
    return null;
  }

  return <div style={notificationStyle}>{notification.message}</div>;
};

export default Notification;
