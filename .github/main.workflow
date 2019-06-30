workflow "workflow/build-test" {
  on = "push"
  resolves = ["workflow/ci"]
}

action "workflow/install" {
  uses = "docker://circleci/node:10.16.0-browsers"
  runs = "yarn"
  args = "install"
}

action "workflow/ci" {
  uses = "docker://circleci/node:10.16.0-browsers"
  needs = ["workflow/install"]
  args = "ci"
  runs = "yarn"
}
