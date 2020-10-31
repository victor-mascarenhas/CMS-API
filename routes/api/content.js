const express = require('express');
const Content = require('../../models/content');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcrypt');
const MSGS = require('../../messages');
const auth = require('../../middleware/auth');
const file = require('../../middleware/file_content');
const config = require('config')

const BUCKET_PUBLIC_PATH = process.env.BUCKET_PUBLIC_PATH || config.get('BUCKET_PUBLIC_PATH')

// @route    DELETE /content/:Id
// @desc     DELETE Content
// @access   Private
router.delete('/:Id', auth, async(req, res, next) => {
  try {
    const id = req.params.Id
    const content = await Content.findOneAndDelete({_id : id})
    if (content) {
      res.json(content)
    } else {
      res.status(404).send({ "error": MSGS.CONTENT_404 })
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send({ "error": MSGS.GENERIC_ERROR })
  }
})


// @route    PATCH /content/:contentId
// @desc     PARTIAL EDIT content
// @access   Private
router.patch('/:contentId', auth, file, async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).send({ errors: errors.array() })
      return
    }
    const id = req.params.contentId    
    req.body['about.photo'] = `about/${req.body.about_photo_name}`
    const update = { $set: req.body }
    const content = await Content.findByIdAndUpdate(id, update, { new: true })
    if (content) {      
      content.about.photo = `${BUCKET_PUBLIC_PATH}${content.about.photo}`
      res.send(content)
    } else {
      res.status(404).send({ "error": MSGS.CONTENT_404 })
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send({ "error": MSGS.GENERIC_ERROR })
  }
})

// @route    GET /content
// @desc     LIST content
// @access   Public
router.get('/', async (req, res, next) => {
  try {
    const content = await Content.findOne({}).sort('-last_modified_date')
    res.json(content)
  } catch (err) {
    console.error(err.message)
    res.status(500).send({ "error": MSGS.GENERIC_ERROR })
  }
})

// @route    POST /user
// @desc     CREATE user
// @access   Private
router.post('/', auth, async (req, res, next) => {
  try {    
    let content = new Content(req.body)      
      await content.save()
      if (content.id) {
        res.json(content);
      }
    
  } catch (err) {
    console.error(err.message)
    res.status(500).send({ "error": MSGS.GENERIC_ERROR })
  }
})


module.exports = router;