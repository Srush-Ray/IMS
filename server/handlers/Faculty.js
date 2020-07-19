const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.showFacultyProfile = async (req, res, next) => {
  try {
    const { id } = req.decoded;
    console.log("here is the id " + id);
    const Profile = await db.Faculty.findOne({ _id: id });
    // console.log("This is profile "+Profile);
    if (Profile) {
      return res.json(Profile);
    } else {
      throw new Error("Not an admin");
    }
  } catch (error) {
    next({
      status: 400,
      message: error.message,
    });
  }
};

// module.exports={
//   showFacultyProfile:function(req,res){
//     try {
//             const { id } = req.decoded;
//            // console.log("here is the id "+id)
//             const Profile = db.Faculty.findOne({ _id: id});
//            // console.log("This is profile "+Profile);
//             if (Profile) {
//               return res.json(Profile);
//             } else {
//               throw new Error("Not an admin");
//             }
//           } catch (error) {
//             next({
//               status: 400,
//               message: error.message,
//             });
//           }
//   }
// }

exports.updateFProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("im in update function of faculty ");
    const Profile = await db.Faculty.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          "name.firstname": req.body.firstname,
          "name.lastname": req.body.lastname,
          "currentClass.year": req.body.year,
          "currentClass.div": req.body.div,
          emailId: req.body.emailId,
          username: req.body.username,
          department: req.body.department,
          designation: req.body.designation,
        },
      },
      { new: true }
    );
    if (Profile) {
      return res.status(200).json(Profile);
    } else {
      throw new Error("Not an admin");
    }
  } catch (error) {
    next({
      status: 400,
      message: error.message,
    });
  }
};
