
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
echo www.spacelephant.org > CNAME
git add --all && git commit -m "[CI]: Publishing master (publish.sh) | $(date -u '+%Y-%m-%d %H:%M:%S %Z')"

echo "Push to ${PUBLISH_BRANCH} branch"

while true; do
    read -p "Do you really want to deploy that version on ${PUBLISH_BRANCH}?" yn
    case $yn in
        [Yy]* ) git push origin ${PUBLISH_BRANCH}; break;;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no.";;
    esac
done
