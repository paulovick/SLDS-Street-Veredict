heroku buildpacks:set heroku/nodejs --app streetveredict-api
heroku ps:scale api=1 --remote streetveredict-api

git subtree push --prefix API streetveredict-api master
git subtree push --prefix Backoffice streetveredict-bo master
git subtree push --prefix Web streetveredict-web master