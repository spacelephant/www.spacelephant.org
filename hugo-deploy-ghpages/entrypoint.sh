#!/bin/sh

echo 'hugo-deploy-ghpages'

if [ "$GITHUB_BRANCH" = "master" ];
then
    echo 'Install bundle'
    bundle install > /dev/null 2>&1
    echo 'Build Hugo Site'
    bundle exec hugo
    cd public
    remote_repo="https://${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git" && \
    remote_branch="gh-pages" && \
    git init && \
    git config user.name "${PUSH_USER_NAME}" && \
    git config user.email "${PUSH_USER_EMAIL}" && \
    git add . && \
    echo -n 'Files to Commit:' && ls -l | wc -l && \
    git commit -m "[CI]: publish master#${GITHUB_SHA} | $(date -u '+%Y-%m-%d %H:%M:%S %Z')" > /dev/null 2>&1 && \
    git push --quiet --set-upstream origin HEAD:$remote_branch > /dev/null 2>&1 && \
    rm -fr .git && \
    cd ../
    echo 'GREAT SUCCESS!'
else
  echo "Nothing to do!!"
  echo "Branch: '$GITHUB_BRANCH'"
fi



