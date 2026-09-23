const express=require("express")
const { getCourses, createCourses, updateCourses, deleteCourses, getCoursesById } = require("../controllers/courseController")
const {protect, authorize} = require("../middleware/authMiddleware")

const courseRoute=express.Router()


courseRoute.get("/",getCourses)
courseRoute.post("/",protect,authorize('instructor','admin'),createCourses)
courseRoute.get("/:id",getCoursesById)
courseRoute.put("/:id",protect,authorize('instructor','admin'),updateCourses)
courseRoute.delete("/:id",protect,authorize('instructor','admin'),deleteCourses)

module.exports=courseRoute