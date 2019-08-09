# Step 3 - Git Flow

Before continuing, it's important to be familiar with our branch model and a few more git tricks.

## Branch model

When working in teams, it's crucial to coordinate the parallel work of all team members.

In order to improve our workflow, a few years ago, we've adopted Vincent Driessen's branch model described [here](http://nvie.com/posts/a-successful-git-branching-model/) and we are going to use this same branch model during our onboard.

## Git Flow

[git-flow](https://github.com/nvie/gitflow) is a tool that helps to follow Vincent Driessen's branch model. **You can use it though it's not necessary.**

### Our conventions

There are a few conventions we use here and it's important for you to be aware of these:

1. Feature branches are:
   - prepended with `feature/` *i.e. feature/new-user-screen*
   - should have meaningful names - they should give good hints about what modifications to the system they have
   - should not have your name on it

2. Bugfix branches are:
   - prepended with `bugfix/` *i.e. bugfix/user-list*
