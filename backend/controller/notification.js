import notification from "../model/notificationModel.js";

// View user notifications
export const userNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const notify = await notification.find({ userId: id });
    const countNew = await notification
      .find({ userId: id })
      .$where("this.isRead === false");

    console.log(countNew.length);

    res.status(200).json({ notify, countNew });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// Set notifications to status read
export const editNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedNotifications = await notification.findByIdAndUpdate(id, {
      $set: { isRead: true },
    });
    res.status(200).json(updatedNotifications);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
