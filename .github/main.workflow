workflow "Deploy Staging To Heroku" {
  resolves = [
    "Push Frontend",
    "Push Backend",
  ]
  on = "push"
}

action "Heroku Login" {
  uses = "actions/heroku@466fea5e8253586a6df75b10e95447b0bfe383c1"
  secrets = ["HEROKU_API_KEY"]
  args = "container:login"
}

action "Add Remote Url" {
  uses = "srt32/git-actions@v0.0.3"
  args = "git remote add heroku-be ${HEROKU_BE_REMOTE_URL} && git remote add remote heroku-fe ${HEROKU_FE_REMOTE_URL}"
  needs = ["Heroku Login"]
  env = {
    HEROKU_BE_REMOTE_URL = "https://git.heroku.com/canopy-be.git"
    HEROKU_FE_REMOTE_URL = "https://git.heroku.com/canopy-fe.git"
  }
}

action "Push Frontend" {
  uses = "srt32/git-actions@v0.0.3"
  args = "git subtree push --prefix pythonapp heroku-fe master"
  needs = ["Add Remote Url"]
}

action "Push Backend" {
  uses = "srt32/git-actions@v0.0.3"
  args = "git subtree push --prefix pythonapp heroku-be master"
  needs = ["Add Remote Url"]
}
