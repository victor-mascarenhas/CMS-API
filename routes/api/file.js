const express = require('express');
const MSGS = require('../../messages');
const auth = require('../../middleware/auth');
const router = express.Router();


// recebendo erro 204 ao tentar dar upload
router.post('/', auth, async (req, res) => {
    try {
        if (!req.files) {
            res.status(204).send({ error: MSGS.FILE_NOT_SENT });
        } else {
            let photo = req.files.photo
            if (photo.mimetype.includes('image/')) {
                photo.mv('./uploads/' + photo.name);

                let data = {
                    name: photo.name,
                    mimetype: photo.mimetype,
                    size: photo.size
                };

                res.status(201).send({ message: MSGS.FILE_UPLOADED, data: data });

            } else {
                res.status(400).send({ message: MSGS.FILE_INVALID_FORMAT, data: data });
            }
        }
    } catch (err) {
        res.status(500).send({ "error": err.message })
    }
})

module.exports = router;