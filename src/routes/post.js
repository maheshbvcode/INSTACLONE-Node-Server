const express = require('express');

const router = express.Router();
const mongoose = require('mongoose')
const Post = mongoose.model('Post')
const requireLogin = require('../middleware/requireLogin')

router.get('/allpost', requireLogin, async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('postedBy', '_id name')
      .sort('-date');
    res.json({ posts });
  } catch (err) {
    console.log(err);
  }
});
router.get('/mypost',requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("postedBy","_id name")
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.post('/createpost', requireLogin, async (req, res) => {
    try {
      const { title, body, place, img } = req.body;
      if (!title || !body || !place || !img) {
        return res.status(422).json({ error: "please add all fields" });
      }
      req.user.password = undefined;
    const currentDate = new Date();
   
      const post = new Post({
        title,
        body,
        place,
        photo: img,
        date :currentDate,
        postedBy: req.user,
      });
      const result = await post.save();
      res.json({ post: result });
    } catch (err) {
      console.log(err);
    }
  });


module.exports = router