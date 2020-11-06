const express = require('express');
const Content = require('../../models/content');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const auth = require('../../middleware/auth')
const MSGS = require('../../messages')
const file = require('../../middleware/file');
const complete_link = require('../../service/get_complete_link');
const get_max_order = require('../../service/get_max_order');


// @route    POST /services
// @desc     CREATE services
// @access   Private
router.post('/:contentId', auth, file, async (req, res, next) => {
  try {
    const id = req.params.contentId
    if (req.body.photo_name) {
      req.body.photo = `services/${req.body.photo_name}`

    }
    let content = await Content.findOne({ _id: id })
    if (!req.body.order) {
      req.body.order = get_max_order(content, 'service')
    }
    content = await Content.findOneAndUpdate({ _id: id }, { $push: { 'services.service': req.body } }, { new: true })
    if (content) {
      content = complete_link(content)
      res.json(content)
    } else {
      res.status(404).send({ "error": MSGS.CONTENT_404 })
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send({ "error": MSGS.GENERIC_ERROR })
  }
})

// @route    DELETE /services
// @desc     DELETE services
// @access   Private
router.delete('/:contentId', auth, async (req, res, next) => {
  try {
    const id = req.params.contentId
    let content = await Content.findOneAndUpdate({ _id: id }, { $pull: { 'services.service': req.body } }, { new: true })
    if (content) {
      content = complete_link(content)
      res.json(content)
    } else {
      res.status(404).send({ "error": MSGS.CONTENT_404 })
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send({ "error": MSGS.GENERIC_ERROR })
  }
})

// @route    PATCH /services/:contentId-:serviceId
// @desc     PATCH service
// @access   Private
router.patch('/:contentId-:serviceId', auth, file, async (req, res, next) => {
  try {
    const serviceId = req.params.serviceId

    let query = {'services.service._id' : serviceId}
    if(req.body.photo_name){
      req.body.photo = `services/${req.body.photo_name}`
    }
    let update = {}
    for (const [key, value] of Object.entries(req.body)) {
      update[`services.service.$.${key}`] = value
    }
    await Content.updateOne(query, {$set : update}, { new: true })
    let content = await Content.findOne(query)
    
    if (content.id){
      content = complete_link(content)
      res.json(content)
    } else {
      res.status(404).send({ "error": MSGS.CONTENT_404 })
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send({ "error": MSGS.GENERIC_ERROR  })
  }
})

module.exports = router;