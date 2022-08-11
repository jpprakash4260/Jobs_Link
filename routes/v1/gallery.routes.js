const GalleryRoute = require("express").Router()
const { gallery_validate } = require("../../validators")
const { galleryController } = require('../../controllers')

GalleryRoute.post("/", gallery_validate.create, galleryController.create)
GalleryRoute.get("/", galleryController.get)
GalleryRoute.get("/:gal_id", galleryController.getByPk)
GalleryRoute.post("/Details", galleryController.getCollegeDetails)
GalleryRoute.put("/:gal_id", gallery_validate.update, galleryController.update)
GalleryRoute.delete("/delete", galleryController.delete)

module.exports = GalleryRoute