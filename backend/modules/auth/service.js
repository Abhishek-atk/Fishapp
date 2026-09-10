import User from "../user/model.js";


const loginUser = async (firebaseUser) => {
    const { uid, phone_number } = firebaseUser;
    if (!uid) {
      throw new Error("Firebase UID is missing");
    }

    if (!phone_number) {
      throw new Error("Phone number is missing");
    }

    let user = await User.findOne({
      firebaseUid: uid,
    });

    if (!user) {
      user = await User.create({
        firebaseUid: uid,
        phone: phone_number,
        role: "user",
        isActive: true,
      });
    }

    if (!user.isActive) {
      throw new Error("User account is inactive");
    }

    return user;
}


export { loginUser };