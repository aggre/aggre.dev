workflow "New workflow" {
  on = "push"
  resolves = [
    "test",
    "alias"
  ]
}

action "install dependencies" {
  uses = "actions/npm@e7aaefe"
  args = "i"
}

action "test" {
  uses = "actions/npm@e7aaefe"
  args = "test"
  needs = ["install dependencies"]
}

action "master" {
  uses = "actions/bin/filter@b2bea07"
  needs = ["test"]
  args = "branch master"
}

action "build" {
  uses = "actions/npm@e7aaefe"
  args = "run build"
  needs = ["master"]
}

action "deploy" {
  uses = "actions/zeit-now@9fe84d5"
  needs = ["build"]
  args = "--public --token $NOW_TOKEN"
  secrets = ["NOW_TOKEN"]
}

action "alias" {
  uses = "actions/zeit-now@9fe84d5"
  needs = ["deploy"]
  args = "alias --token $NOW_TOKEN"
  secrets = ["NOW_TOKEN"]
}

