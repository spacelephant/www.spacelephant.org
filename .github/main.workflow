workflow "Deploy Site" {
  on = "push"
  resolves = ["Build and Deploy Hugo"]
}


action "Build and Deploy Hugo" {
    env = {
        PUSH_USER_EMAIL = "developers@spacelephant.org"
        PUSH_USER_NAME = "SpacelephantBot"
    }
    uses = "./hugo-deploy-ghpages"
    secrets = ["GITHUB_TOKEN"]
}