import { loginUser } from "./service.js";  

const login = async (req, res) => {
    try {
        const firebaseUser = req.user

      const user = await loginUser(firebaseUser);
      console.log("User logged in:", user);
        return res.status(200).json({
          success: true,
          message: "Login successful",
          user: {
            id: user._id,
            firebaseUid: user.firebaseUid,
            phone: user.phone,
            name: user.name,
            role: user.role,
          },
        });
    } catch (error) {
         console.error("Login controller error:", error.message);

         return res.status(500).json({
           success: false,
           message: error.message,
         });
        
    }
}

export { login };