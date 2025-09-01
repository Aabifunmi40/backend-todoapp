const UserModel = require("../model/user.model");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
    try {
        let {emailAddress, password} = req.body;
        let existingEmail = await UserModel.findOne({emailAddress});
        if (existingEmail) {
            res.send("User already exists");
        } else {
            let hashedpassword = await bcrypt.hash(password,10);
            console.log(hashedpassword);
            let newUser= new UserModel({
                emailAddress,
                password:hashedpassword,
            });
            newUser.save();
            res.send("A new user has been added");
        }
    
    } catch (err) {
       console.log(err)
       res.status(500).json({message:err.message})
    }
};
const signIn = async (req, res) => {
  try {
    let { emailAddress, password } = req.body;

    const userDetails = await UserModel.findOne({ emailAddress });
    if (!userDetails) {
      return res.status(404).json({ message: "User does not exist" });
    }

    let checkpassword = await bcrypt.compare(password, userDetails.password);
    if (!checkpassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // generate token
    let userToken = jwt.sign(
      { _id: userDetails._id },
      "your_secret_key",     // ⚠️ replace with process.env.JWT_SECRET in real app
      { expiresIn: "1h" }
    );

    // success response
    res.json({
      message: "Sign in successful",
      token: userToken,
      user: {
        id: userDetails._id,
        email: userDetails.emailAddress
      }
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occurred" });
  }
};



module.exports= {signUp, signIn};