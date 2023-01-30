const express = require("express")
const issuesRouter = express.Router()
const Issue = require('../models/Issue.js')


// Get All issues
issuesRouter.get("/", (req, res, next) => {
  Issue.find((err, issues) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(issues.sort((a, b) => b.upVotes.length - a.upVotes.length))
  })
})


// Get issues by user id
issuesRouter.get('/user', (req, res, next) => {
  Issue.find({user: req.auth._id}, (err, issues) => {
    if(err) {
      res.status(500)
      return next(err)
    }
    return res.status(200).send(issues.sort((a, b) => b.upVotes.length - a.upVotes.length))
  })
})


// Add new issue
issuesRouter.post("/", (req, res, next) => {
  req.body.user = req.auth._id
  const newIssue = new Issue(req.body)
  newIssue.save((err, savedIssue) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedIssue)
  })
})


// Delete issue
issuesRouter.delete("/:issueId", (req, res, next) => {
  Issue.findOneAndDelete(
    { _id: req.params.issueId, user: req.auth._id },
    (err, deletedIssue) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(`Successfully deleted issue: ${deletedIssue.title}`)
    }
  )
})


// Update issue
issuesRouter.put("/:issueId", async(req, res, next) => {
  //create new issue from incoming data data 
  const newBody = {
    ...req.body
  }
  //find issue
  const currentIssue = await Issue.findOne({_id: req.params.issueId})
  //spread values to new object
  const currentIssue2 = {
    comments: [...currentIssue.comments],
    upVotes: [...currentIssue.upVotes],
    downVotes: [...currentIssue.downVotes]
  }
  // if there is data in upVoting and that array includes the userId block the user
  if(newBody.upVoting) {
    if(currentIssue2.upVotes.includes(newBody.userId)) {
      return
    }
    //otherwise push the userId to upvotes in the new issue and filter downvotes to remove that userId
    currentIssue2.upVotes.push(newBody.userId)
    currentIssue2.downVotes = currentIssue2.downVotes.filter(downvote => downvote !== newBody.userId)
  }
  // if there is a downVote in the request 
  if(newBody.downVoting) {
    // check if the user has already downvoted and return 
    if(currentIssue2.downVotes.includes(newBody.userId)) {
      return
    }
    // otherwise push the userId to downvotes and filter upvotes to remove that userId if it was there. 
    currentIssue2.downVotes.push(newBody.userId)
    currentIssue2.upVotes = currentIssue2.upVotes.filter(upvote => upvote !== newBody.userId)
  }
  // set the comments to add any new comments
  currentIssue2.comments = req.body.comments

  //update the Issue in the database with the new issue object. 
  Issue.findOneAndUpdate(
    { _id: req.params.issueId },
    currentIssue2,
    { new: true },
    (err, updatedIssue) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(updatedIssue)
    }
  )
})


module.exports = issuesRouter