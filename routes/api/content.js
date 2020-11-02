const express = require('express');
const Content = require('../../models/content');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const MSGS = require('../../messages');
const auth = require('../../middleware/auth');
const file = require('../../middleware/file_content');
const complete_link = require('../../service/get_complete_link')


// @route    DELETE /content/:Id
// @desc     DELETE Content
// @access   Private
router.delete('/:Id', auth, async (req, res, next) => {
  try {
    const id = req.params.Id
    let content = await Content.findOneAndDelete({ _id: id })
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
    const update = { $set: req.body }
    let content = await Content.findByIdAndUpdate(id, update, { new: true })
    if (content) {
      content = complete_link(content)
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
    let content = await Content.findOne({}).sort('-last_modified_date')
    content = complete_link(content)
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
      content = complete_link(content)
      res.json(content);
    }

  } catch (err) {
    console.error(err.message)
    res.status(500).send({ "error": MSGS.GENERIC_ERROR })
  }
})


module.exports = router;