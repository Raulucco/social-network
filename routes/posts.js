const mongoose = require("mongoose");
const passport = require("passport");
const router = require("express").Router();
const Post = require("../models/Post");
const Profile = require("../models/Profile");
const validatePostInput = require("../validation/post");

/**
 * @route /api/pots
 * @method GET
 * @access public
 * @desc fetch posts
 */

router.get("/", (req, res) => {
  Post.find()
    .sort({
      date: -1
    })
    .then(posts => res.json(posts))
    .catch(err => res.status(503).json(err));
});

/**
 * @route /api/pots/:id
 * @method GET
 * @access public
 * @desc fetch post by id
 */

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(503).json(err));
});

/**
 * @route /api/pots/:id
 * @method DELETE
 * @access Private
 * @desc delete post by id
 */

router.get("/:id", passport.authenticate({
  session: false
}), (req, res) => {
  Profile.findById(req.user.id).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        if (post.user.toString() !== req.user.id) {
          throw new Error();
        }
        return post.remove().then(_ => res.json({
          success: true
        }));
      })
      .catch(err => res.status(503).json(err));
  });
});

/**
 * @route /api/posts
 * @method POST
 * @access Private
 * @desc create all posts
 */
router.post(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
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
    newPost
      .save()
      .then(post => res.json(post))
      .catch(err => res.status(500).json(err));
  }
);

/**
 * @route /api/pots/likes/:id
 * @method POST
 * @access Private
 * @desc like or unlike posts
 */

router.get(
  "/likes/:id",
  passport.authenticate({
    session: false
  }),
  (req, res) => {
    Profile.findById(req.user.id).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          const otherUsersLikes = post.likes.filter(like => like.user.toString() !== profile.user.toString());
          if (otherUsersLikes.lenght === post.likes.lenght) {
            post.likes.unshift({
              user: req.user.id
            });
            profile.likes.unshift({
              post: post._id
            });
          } else if (otherUsersLikes.lenght < post.likes.lenght) {
            post.likes = otherUsersLikes;
            profile.likes = profile.likes.filter(like => like.post.toString() !== post._id);
          }
          return profile.save().then(_ => post.save()).then(p => res.json(p)).catch(err => res.status(503).json(err));
        })
        .catch(err => res.status(503).json(err));
    });
  }
);

/**
 * @route /api/post/:id/comment
 * @method POST
 * @access Private
 * @desc Create comment
 */
router.post("/:id/comment", passport.authenticate("jwt", {
  session: false
}), (req, res) => {
  const {
    errors,
    isValid
  } = validatePostInput(req.body);

  if (!isValid) {
    return res.status(403).json(errors);
  }

  Post.findById(req.params.id).then(post => {
    post.comment.unshift({
      ...req.body,
      user: req.user.id
    });
    return post.save().then(p => res.json(p))
  }).catch(err => res.status(503).json(err));
});

/**
 * @route /api/posts/:postId/comment/:commentId
 * @access Private
 * @method DELETE
 * @desc Delete comments
 */
router.delete("/:postId/comment/:commentId", passport.authenticate("jwt", {
  session: false
}), (req, res) => {
  Post.findById(req.params.postId).then(post => {
    post.comments = post.filter(comment => comment.toString() !== req.params.commentId);
    return post.save().then(_ => res.json({
      success: true
    }));
  }).catch(err => res.status(503).json(err));
})

module.exports = router;