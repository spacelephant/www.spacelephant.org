
#!/bin/sh

PUBLISH_BRANCH="test-gh-pages"

if [[ $(git status -s) ]]
then
    echo "The working directory is dirty. Please commit any pending changes."
    exit 1;
fi

echo "Deleting old publication"
rm -rf public
mkdir public
git worktree prune
rm -rf .git/worktrees/public/

echo "Checking out ${PUBLISH_BRANCH} branch into public"
git worktree add -B $PUBLISH_BRANCH public origin/$PUBLISH_BRANCH

echo "Removing existing files"
rm -rf public/*

echo "Generating site"
hugo

echo "Updating ${PUBLISH_BRANCH} branch"
cd public
echo www.spacelephant.org >> CNAME
git add --all && git commit -m "Publishing to ${PUBLISH_BRANCH} (publish.sh)"

echo "Push to ${PUBLISH_BRANCH} branch"
git push origin $PUBLISH_BRANCH