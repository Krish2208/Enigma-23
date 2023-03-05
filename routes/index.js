const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const { ensureLoggedIn, ensureLoggedOut } = require('../middleware/auth');
const QnA = require('../models/qnaModel');
questions = [
  {
    q_no: 1,
    q_des: "Question 0",
    link: "#",
    res1_width: "600",
    res1_height: "225",
    res1_link: "https://i.ibb.co/b7tbF2Z/image.png",
    res1_type: "image",
    res2_present: false,
  },
  {
    q_no: 2,
    q_des: "Question 1",
    link: "#",
    res1_width: "600",
    res1_height: "225",
    res1_link: "https://i.ibb.co/LYpZv5v/1.png",
    res1_type: "image",
    res2_present: true,
    res2_width: "170",
    res2_height: "200",
    res2_link: "https://i.ibb.co/1XzfR2M/1-1.png",
    res2_type: "image",
  },
  {
    q_no: 3,
    q_des: "Question 2",
    link: "#",
    res1_width: "280",
    res1_height: "150",
    res1_link: "https://i.ibb.co/fvXG8Yc/2.png",
    res1_type: "image",
    res2_present: false,
  },
  {
    q_no: 4,
    q_des: "Question 3",
    link: "https://i.ibb.co/kM5Jr38/3-1.png",
    res1_width: "150",
    res1_height: "280",
    res1_link: "https://i.ibb.co/4g6j58c/3-2.png",
    res1_type: "image",
    res2_present: true,
    res2_width: "300",
    res2_height: "180",
    res2_link: "https://i.ibb.co/MVSC7Nb/3-3.png",
    res2_type: "image",
  },
  {
    q_no: 5, // Mukden Incident
    q_des: "Question 4",
    link: "#",
    res1_width: "150",
    res1_height: "280",
    res1_link: "https://drive.google.com/u/1/uc?id=1-G1uNEDbLxfy3IUQ6O6_ifteseOigGw2&export=download",
    res1_type: "video",
    res2_present: false,
  },
  {
    q_no: 6,
    q_des: "Question 5",
    link: "#",
    res1_width: "250",
    res1_height: "400",
    res1_link: "https://i.ibb.co/BnDBZcv/CN104030365A.png",
    res1_type: "image",
    res2_present: false,
  },
  {
    q_no: 7,
    q_des: "Question 6",
    link: "#",
    res1_width: "600",
    res1_height: "380",
    res1_link: "https://i.ibb.co/CHj71LY/6.png",
    res1_type: "image",
    res2_present: false,
  },
  {
    q_no: 8,
    q_des: "Question 7",
    link: "#",
    link: "https://www.youtube.com/watch?v=PiMlVjdG25U",
    res1_width: "400",
    res1_height: "400",
    res1_link: "https://i.ibb.co/RjqWzcZ/8.png",
    res1_type: "image",
    res2_present: false,
  },
  {
    q_no: 9,
    q_des: "Question 8: Why does it happen in love? (disclaimer copied this question)",
    link: "#",
    res1_width: "600",
    res1_height: "380",
    res1_link: "https://i.ibb.co/CmTt4fW/9.png",
    res1_type: "image",
    res2_present: false,
  },
  {
    q_no: 10,
    q_des: "Question 9",
    link: "#",
    res1_width: "600",
    res1_height: "225",
    res1_link: "https://i.ibb.co/b7tbF2Z/image.png",
    res1_type: "image",
    res2_present: false,
  },
  {
    q_no: 11,
    q_des: "Question 10",
    link: "#",
    res1_width: "450",
    res1_height: "450",
    res1_link: "https://i.ibb.co/HtYwjDY/11.png",
    res1_type: "image",
    res2_present: false,
  },
  {
    q_no: 12,
    q_des: "Question 11",
    link: "#",
    res1_width: "400",
    res1_height: "250",
    res1_link: "https://i.ibb.co/vBM3SBL/12.png",
    res1_type: "image",
    res2_present: true,
    res2_width: "350",
    res2_height: "200",
    res2_link: "https://i.ibb.co/XYZ8FvX/12-1.png",
    res2_type: "image",
  },
  {
    q_no: 13,
    q_des: "Question 12",
    link: "https://i.ibb.co/tP7NWFz/13-2.png",
    res1_width: "400",
    res1_height: "250",
    res1_link: "https://i.ibb.co/fSGVvcM/13.png",
    res1_type: "image",
    res2_present: true,
    res2_width: "400",
    res2_height: "200",
    res2_link: "https://i.ibb.co/xsg6bTB/13-1.png",
    res2_type: "image",
  },
  {
    q_no: 14,
    q_des: "pgpcjestyr pwdp nly hlte, mfe esp dplcns qzc rzo nlyyze hlte, lyo wzgp zyp lyzespc",
    comment: "gsilfts gsv slob tziwvm lu vwvm",
    link: "#",
    res1_width: "400",
    res1_height: "150",
    res1_link: "https://i.ibb.co/myRbR1s/F7IB.png",
    res1_type: "image",
    res2_present: true,
    res2_width: "250",
    res2_height: "400",
    res2_link: "https://i.ibb.co/w0zcsY6/14.png",
    res2_type: "image",
  },
];
answer = [
  "enigma",
  "harbhajansingh",
  "harrypotter",
  "ai182",
  "mukdenincident",
  "hanniballecter",
  "matrix",
  "thebigbangtheory",
  "dasavatharam",
  "dejavu",
  "stephencurry",
  "michelangelo",
  "skullandbones",
  "jaigurudeva",
];
close_ans = [
  ["enigm", "engima"],
  ["harbhajan", "harbhajan sing", "harbajan singh", "harbhajan singh"],
  ["harry", "potter", "harry potter"],
  ["ai 182", "air india 182", "flight 182"],
  ["mukden", "mukden incident"],
  ["hannibal lecter", "hannibal", "lecter"],
  ["matrix", "the matrix"],
  ["the big bang theory", "big bang theory", "bbt", "tbbt"]
  ["dasavathaaram", "dashavatharam"],
  ["deja vu"],
  ["stephen curry", "stephen", "steph curry"]
  ["michelanglo", "michelangalo"],
  ["skull and bones", "skull and bone", "skull & bones", "skull & bone"]
  ["jai guru deva", "jay guru deva", "jaygurudeva"]
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
            if(onlyRank) {
              break;
            }
          }
          if(result[itr].score > 0){
            leaderboard_data.push({'name':result[itr].username,'score':result[itr].score});
          }
          else{
            if (userrank != 0){
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

router.get('/', ensureLoggedOut(), function (req, res, next) {
  res.render('landing', { layout: 'layout_static' });
});

router.get('/404redirect', function (req, res, next) {
  if(req.isAuthenticated()){
    res.redirect('/home');
  }
  else{
    res.redirect('/');
  }
});

router.get('/login', function (req, res, next) {
  res.render('landing', { func: 'not_logged_in()', layout: 'layout_static' });
});

router.get('/register', ensureLoggedIn({ usernameCheck: false }), function (req, res, next) {
  res.render('', { layout: 'register' });
});

// register new user
router.post('/register', ensureLoggedIn({ usernameCheck: false }), async function (req, res, next) {
  try {
    const { username } = req.body;
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(username) || username.toLowerCase().includes("admin") || username == "") {
      req.logout();
      return res.render('', { func: 'invalid_username()', layout: 'landing' });
    }
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.render('', { func: 'exists()', layout: 'register' });
    }
    else {
      if (req.user.username != "") {
        req.session.type = '';
        res.redirect('/home');
      }
      else {
        await User.updateOne({ "email": req.user.email }, { $set: { "username": username } });
        req.session.type = 'register';
        res.redirect('/home');
      }
    }
  }
  catch (e) {
    next(e);
  }
});

router.get('/home', ensureLoggedIn(), function (req, res, next) {
    if(req.session.type=='login'){
      req.session.type='';
      res.render('home', { func: 'login_successful()', layout: 'layout_static' });
    }
    else if(req.session.type=='register'){
      req.session.type='';
      res.render('home', { func: 'register_successful()', layout: 'layout_static' });
    }
    else{
    res.render('home', { layout: 'layout_static' });
    }
});

router.get('/failure', function (req, res, next) {
  res.render('landing', { func: 'register_fail()', layout: 'layout_static', error: req.flash("error")});
});

router.get('/profile', ensureLoggedIn(), async function (req, res, next) {
  try{
    let name;
    if(req.user.lastName == undefined){
      name = req.user.firstName ;
    }
    else{
      name = req.user.firstName +' '+ req.user.lastName ;
    }
    const uname = req.user.username;
    const rank = await get_rank(req.user.email, true);
    res.render('profile',{  
        layout: 'layout_empty',
        Name: name,
        Rank: rank,
        User_Id: uname,
        Email: req.user.email,
        Score: req.user.score
      });
  }
  catch(e){
    next(e);
  }
});

// // route to load questions in database
// // requires questions.js file,answer[],close_ans[]
router.get('/loadquestions', async function (req, res, next) {
  const noOfQuestions = 14;
  for (i = 0; i < noOfQuestions; i++) {
    const newQuestion={
      ...questions[i],
      answer: answer[i],
      close_ans: close_ans[i]
    }
    await QnA.create(newQuestion);
  }
  res.send("loaded");
});

//leaderboard
router.get('/leaderboard', ensureLoggedIn(), async function (req, res, next) {
  try{
    const uname = req.user.username;
    const rank = await get_rank(req.user.email, false);
    console.log('rank is :', rank);
    // console.log('THE LEADERBOARD DATA:', leaderboard_data);
    res.render('leaderboard', {
      layout: 'layout_empty',
      Rank: rank,
      User_Id: uname,
      My_score: req.user.score,
      lb_data: leaderboard_data
    });
}
catch(e){
  next(e);
}
});

module.exports = router;
