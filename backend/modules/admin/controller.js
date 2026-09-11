const getAdminDashboard = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Welcome to admin dashboard",
    admin: {
      id: req.dbUser._id,
      phone: req.dbUser.phone,
      role: req.dbUser.role,
    },
  });
};

export { getAdminDashboard };
