const mongoose = require("mongoose");
const passport = require("passport");
const router = require("express").Router();
const Post = require("../models/Post");
const validatePostInput = require("../validation/post");

/**
 * @route /api/posts
 * @method POST
 * @access Private
 * @desc create all posts
 */
router.post("/", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    const {
        errors,
        isValid
    } = validatePostInput(req.body);

    if (!isValid) {
        return res.status(503).json(errors);
    }

    const newPost = new Post({
        ...req.body,
        user: req.user.id
    });
    newPost.save()
        .then(post => res.json(post))
        .catch(err => res.status(500).json(err));
});

module.exports = router;