workflow "workflow/build-test" {
  on = "push"
  resolves = ["workflow/ci"]
}

action "workflow/install" {
  uses = "aquariuslt/github-actions-yarn@master"
  runs = "yarn"
  args = "install"
}

action "workflow/ci" {
  uses = "aquariuslt/github-actions-yarn@master"
  needs = ["workflow/install"]
  args = "ci"
  runs = "yarn"
}
