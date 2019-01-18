# Space Elephant Corporate web site [http://www.spacelephant.org](http://www.spacelephant.org)


## Local
`yarn dev`
Launch dev server on `http://localhost:1313`

## Build
`yarn build`
Build site and create file in `public` folder


## Deploy on gh-pages
`yarn deploy`
Executes `./publish_ghpages` and publish master content on gh-pages (+ creates CNAME file) (git 2.20 needed)

## Deploy on specific address and port
`hugo server -p PORT --bind=IP --baseURL=IP`