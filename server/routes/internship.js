const router = require("express").Router();
const handle = require("../handlers");
const auth = require("../middlewares/auth");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/Documents');
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const FileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(pdf)$/)) {
       console.log("only pdf allowed")
        return cb(new Error('You can upload only pdf files!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage ,limits: { fieldSize: 5 * 1024 * 1024 }, fileFilter: FileFilter});


router
  .route("/")
  .get(auth, handle.showInternships)
  .post(auth, handle.addNewInternship);
router.route("/approved").get(auth, handle.showApprovedInternships);

router.get("/student", auth, handle.studentsInternships);
router.route("/forward").post(auth, handle.forwardInternship);
router.route("/update").post(auth, handle.updateInternship);
router.route("/approve").post(auth, handle.approveInternship);
router.route("/reject").post(auth, handle.rejectInternship);
// upload.single('offerLetter')
// const upld=upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]);
router.route("/uploadDocument").post(auth,upload.array('docs',6), (req, res) => {
  if(res.statusCode === 200){
    res.setHeader('Content-Type', 'application/json');
    res.json("Uploaded the docs");
  }else{
    res.json(res);
  }
});
router.route("/all").get(auth, handle.getStats);


router
  .route("/:id")
  .get(handle.getInternship)
  .delete(auth, handle.deleteInternship);

module.exports = router;
