# Merge/Pull Requests

> **Follow these steps to successfully create and merge pull requests:**

1. Check out to the desired feature branch: `git checkout -b [branch name]` (-b will create a new branch, if you want to use a previous branch, dont include this flag)
2. Get most recent version in branch: `git pull origin main`
3. Merge most recent main branch into checkout branch: `git merge origin main`
4. If a conflict occurs, manage conflicts in VS Code, commit and push changes to update local main branch
5. Make your code changes.
6. Add changes to staging: `git add .`
7. Commit your changes with a descriptive message: `git commit -m "your message"`
8. Push your changes to the remote repository: `git push origin [branch name]:[branch name]`
9. On GitHub, navigate to your repository and create a pull request. (Assign to a 1st/2nd reviewer)
10. Wait for your pull request to be reviewed by your teammates.
11. Once approved, merge the pull request to the main branch.

# Running into an octopus

> **Follow these steps if you have a merge conflict or a file that needs to be ignored that was prevously tracked**

1. `git status`
2. `git rm -r --cached .`
3. Add the file to your .gitignore
4. Validate the File has been removed from github
5. `git add .`
6. `git commit -m "message here"`
7. `git status`
8. `git pull origin main`
9. resolve any conflicts/use `git merge pull.ff --only` or what ever the first command tip is
10. resolve conflicts
11. `git status`
12. validate no changes and working tree is clean
13. `git push origin [branchname]:[branchname]`
14. submit pull request on github

# App Start Up

> **To start the application, run the following commands in your terminal:**

1. Install dependencies: `npm install`
2. Build the project: `npm run build`
3. Start the server: `npm run server`
