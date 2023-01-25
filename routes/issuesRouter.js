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
  const newBody = {
    ...req.body
  }
  const currentIssue = await Issue.findOne({_id: req.params.issueId})

  const currentIssue2 = {
    comments: [...currentIssue.comments],
    upVotes: [...currentIssue.upVotes],
    downVotes: [...currentIssue.downVotes]
  }

  if(newBody.upVoting) {
    if(currentIssue2.upVotes.includes(newBody.userId)) {
      return
    }

    currentIssue2.upVotes.push(newBody.userId)
    currentIssue2.downVotes = currentIssue2.downVotes.filter(downvote => downvote !== newBody.userId)
  }
  if(newBody.downVoting) {
    if(currentIssue2.downVotes.includes(newBody.userId)) {
      return
    }

    currentIssue2.downVotes.push(newBody.userId)
    currentIssue2.upVotes = currentIssue2.upVotes.filter(upvote => upvote !== newBody.userId)
  }
 
  currentIssue2.comments = req.body.comments

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