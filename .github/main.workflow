workflow "workflow/build-test" {
  on = "push"
  resolves = [
    "workflow/ci"
  ]
}

action "workflow/install" {
  uses = "docker://aquariuslt/node-10-browsers@master"
  runs = "yarn"
  args = "install"
}

action "workflow/ci" {
  uses = "docker://aquariuslt/node-10-browsers@master"
  needs = [
    "workflow/install"]
  runs = "yarn"
  args = "ci"
}
