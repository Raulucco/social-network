const router = require("express").Router();
const mongoose = require("mongoose");
const passport = require("passport");
const validateProfileInput = require("../validation/profile");
const validateExperienceInput = require("../validation/experience");
const Profile = require("../models/Profile");
const User = require("../models/User");
const { parseFlatToTree } = require("../object-utils");

/**
 * @route api/profile
 * @methid GET
 * @description Retrieve profile
 * @access private
 */
router.get(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const errors = {};
    Profile.findOne({
      user: req.user.id
    })
      .populte("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(400).json(errors);
        }
        res.json(profile);
      })
      .catch(error => res.status(403).json(error));
  }
);

/**
 * @route api/profile/all
 * @method GET
 * @description Get all profile
 * @access public
 */

router.get("/all", (req, res) => {
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});
/**
 * @route api/profile/user/:id
 * @method GET
 * @description Get profile by user id
 * @access public
 */

router.get("/user/:id", (req, res) => {
  Profile.findOne({
    handle: req.params.id
  })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        return res.status(404).json({
          noprofile: "there is no profile for this user"
        });
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

/**
 * @route api/profile/handle/:handle
 * @method GET
 * @description Get profile by handle
 * @access public
 */

router.get("/handle/:handle", (req, res) => {
  Profile.findOne({
    handle: req.params.handle
  })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        return res.status(404).json({
          noprofile: "there is no profile for this user"
        });
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

/**
 * @route api/profile
 * @method POST
 * @description Create profile or edit
 * @access private
 */
router.post(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const parsedInput = parseFlatToTree(req.body);
    const { errors, isValid } = validateProfileInput(parsedInput);
    const profileFields = {
      user: req.user.id,
      ...parsedInput
    };

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({
      user: profileFields.user
    }).then(existingProfile => {
      if (existingProfile) {
        Profile.findOneAndUpdate(
          {
            user: profileFields.user
          },
          {
            $set: profileFields
          }
        ).then(profile => res.json(profile));
      } else {
        Profile.findOne({
          handle: profileFields.handle
        }).then(profile => {
          if (profile) {
            errors.handle = "The handle already exists";
            return res.status(404).json(errors);
          }

          new Profile(profileFields)
            .save()
            .then(newProfile => res.json(newProfile));
        });
      }
    });
  }
);

/**
 * @route /api/profile/experience
 * @method POST
 * @access Private
 * @desc add experience
 */

router.post(
  "/experience",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    if (!isValid) {
      return res.status(404).json(errors);
    }

    Profile.findOne({
      user: req.user.id
    })
      .then(profile => {
        profile.experience.unshift({
          ...req.body
        });
        return profile.save();
      })
      .then(profile => res.json(profile))
      .catch(err => res.status(503).json(err));
  }
);
/**
 * @route /api/profile/education
 * @method POST
 * @access Private
 * @desc add education
 */

router.post(
  "/education",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    if (!isValid) {
      return res.status(404).json(errors);
    }

    Profile.findOne({
      user: req.user.id
    })
      .then(profile => {
        profile.education.unshift({
          ...req.body
        });
        return profile.save();
      })
      .then(profile => res.json(profile))
      .catch(err => res.status(503).json(err));
  }
);

/**
 * @route /api/profile/experience/:id
 * @method DELETE
 * @access Private
 * @desc delete experience
 */

router.delete(
  "/experience/:id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Profile.findOne({
      user: req.user.id
    })
      .then(profile => {
        const experience = profile.experience.filter(
          item => item.id === req.params.id
        );
        profile.experience = experience;
        return profile.save();
      })
      .then(profile => res.json(profile))
      .catch(err => res.status(503).json(err));
  }
);
/**
 * @route /api/profile/education/:id
 * @method DELETE
 * @access Private
 * @desc delete education
 */

router.delete(
  "/education/:id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Profile.findOne({
      user: req.user.id
    })
      .then(profile => {
        profile.education = profile.education.filter(
          item => item.id !== req.params.id
        );
        return profile.save();
      })
      .then(profile => res.json(profile))
      .catch(err => res.status(503).json(err));
  }
);

/**
 *
 */

router.delete(
  "/user/id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.finOneAndDelete({ user: req.user.id })
      .then(() => {
        return User.finOneAndDelete({ _id: req.user.id });
      })
      .then(() => {
        res.json({});
      })
      .catch(err => res.status(503).json(err));
  }
);
module.exports = router;
