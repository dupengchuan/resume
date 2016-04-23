# Resume
The resume with Jade, Less & Gulp.

## Demo
Click [here](http://www.ahonn.me/resume)

## Build
```
$ git clone https://github.com/ahonn/resume.git
$ cd resume && npm install
```

Fill your resume data in `resume.json`.

Run `gulp` and you can visit [http://localgost:8000](http://localgost:8000) to see it.

## Deploy
Your should creact your resume project in your github.(Named resume).

Set up the ssh git remote for the project.
```
$ git init
$ git remote add origin git@github.com: [username]/resume.git
```

Run `gulp deploy` to build and deploy.

And then it will be pushed to the remote repo's `gh-pages` branch.
