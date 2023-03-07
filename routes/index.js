const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const { ensureLoggedIn, ensureLoggedOut } = require("../middleware/auth");
const QnA = require("../models/qnaModel");

questions = [
  {
    q_no: 20,
    q_des: "Question 19",
    link: "#",
    res1_width: "400",
    res1_height: "400",
    res1_link: "https://i.ibb.co/vP7X2r4/20.png",
    res1_type: "image",
    res2_present: false,
  },
  {
    q_no: 21,
    q_des: "Question 20",
    link: "#",
    res1_width: "400",
    res1_height: "300",
    res1_link: "https://i.ibb.co/rtyLRj6/21.png",
    res1_type: "image",
    res2_present: false,
  },
  {
    q_no: 22,
    q_des: "Question 21",
    link: "#",
    res1_width: "400",
    res1_height: "210",
    res1_link: "https://i.ibb.co/yBqQZ0c/22.png",
    res1_type: "image",
    res2_present: false,
  },
];

answer = ["hideokojima", "billieeilish", "thehereticanthem "];

close_ans = [
  ["hideo kojima", "hidekojima", "hideokojimo", "hidekojimo"],
  ["billie eilish", "billieeilish", "billie eilis", "billieeilis"],
  [
    "the heretic anthem",
    "thehereticanthem",
    "thehereticanthe",
    "thehereticanth",
  ],
];

function get_rank(email, onlyRank) {
  return new Promise(function (resolve, reject) {
    leaderboard_data = [];
    itr = 0;

    User.find()
      .sort({ score: -1, last_write: 1 })
      .exec(function (err, result) {
        if (err) throw err;
        var userrank = 0;
        while (itr < result.length) {
          if (email == result[itr].email) {
            userrank = itr + 1;
            if (onlyRank) {
              break;
            }
          }
          if (result[itr].score > 0) {
            leaderboard_data.push({
              name: result[itr].username,
              score: result[itr].score,
            });
          } else {
            if (userrank != 0) {
              break;
            }
          }
          itr++;
        }
        resolve(userrank);
        return;
      });
  });
}

router.get("/", ensureLoggedOut(), function (req, res, next) {
  res.render("landing", { layout: "layout_static" });
});

router.get("/404redirect", function (req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect("/home");
  } else {
    res.redirect("/");
  }
});

router.get("/login", function (req, res, next) {
  res.render("landing", { func: "not_logged_in()", layout: "layout_static" });
});

router.get(
  "/register",
  ensureLoggedIn({ usernameCheck: false }),
  function (req, res, next) {
    res.render("", { layout: "register" });
  }
);

// register new user
router.post(
  "/register",
  ensureLoggedIn({ usernameCheck: false }),
  async function (req, res, next) {
    try {
      const { username } = req.body;
      var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      if (
        format.test(username) ||
        username.toLowerCase().includes("admin") ||
        username == ""
      ) {
        req.logout();
        return res.render("", {
          func: "invalid_username()",
          layout: "landing",
        });
      }
      const userExists = await User.findOne({ username });
      if (userExists) {
        return res.render("", { func: "exists()", layout: "register" });
      } else {
        if (req.user.username != "") {
          req.session.type = "";
          res.redirect("/home");
        } else {
          await User.updateOne(
            { email: req.user.email },
            { $set: { username: username } }
          );
          req.session.type = "register";
          res.redirect("/home");
        }
      }
    } catch (e) {
      next(e);
    }
  }
);

router.get("/home", ensureLoggedIn(), function (req, res, next) {
  if (req.session.type == "login") {
    req.session.type = "";
    res.render("home", { func: "login_successful()", layout: "layout_static" });
  } else if (req.session.type == "register") {
    req.session.type = "";
    res.render("home", {
      func: "register_successful()",
      layout: "layout_static",
    });
  } else {
    res.render("home", { layout: "layout_static" });
  }
});

router.get("/failure", function (req, res, next) {
  res.render("landing", {
    func: "register_fail()",
    layout: "layout_static",
    error: req.flash("error"),
  });
});

router.get("/profile", ensureLoggedIn(), async function (req, res, next) {
  try {
    let name;
    if (req.user.lastName == undefined) {
      name = req.user.firstName;
    } else {
      name = req.user.firstName + " " + req.user.lastName;
    }
    const uname = req.user.username;
    const rank = await get_rank(req.user.email, true);
    res.render("profile", {
      layout: "layout_empty",
      Name: name,
      Rank: rank,
      User_Id: uname,
      Email: req.user.email,
      Score: req.user.score,
    });
  } catch (e) {
    next(e);
  }
});

// // route to load questions in database
// // requires questions.js file,answer[],close_ans[]
router.get("/loadquestions", async function (req, res, next) {
  const noOfQuestions = 3;
  for (i = 0; i < noOfQuestions; i++) {
    const newQuestion = {
      ...questions[i],
      answer: answer[i],
      close_ans: close_ans[i],
    };
    await QnA.create(newQuestion);
  }
  res.send("loaded");
});

//leaderboard
router.get("/leaderboard", ensureLoggedIn(), async function (req, res, next) {
  try {
    const uname = req.user.username;
    const rank = await get_rank(req.user.email, false);
    console.log("rank is :", rank);
    // console.log('THE LEADERBOARD DATA:', leaderboard_data);
    res.render("leaderboard", {
      layout: "layout_empty",
      Rank: rank,
      User_Id: uname,
      My_score: req.user.score,
      lb_data: leaderboard_data,
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
