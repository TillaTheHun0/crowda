# crowda
Source for Crowda iOS Application

##How to fork this repo
Typically, all individuals who wish to contribute will create his or her own fork on his or her own github account. 
* hit the fork button in the top right of the repo screen
* choose where you would like your fork to exist (this will most likely be your own github account)
* do a ```git clone``` on **your** fork to get a local copy of your fork

##Pull Requests
A fork is **clone** of the original repository and is completely seperate from the 'original'.
Therefore any changes made to your fork will only exist on your fork. If you'd like to merge your changes into the master fork,
you have to submit a pull request. This will allow everyone to review your changes ie. code review, coverage, etc.

##Tying it all Together
When you clone your fork, you get a local copy of your fork. To get changes that are merged into the master fork by other people,
set up another remote locally. I usually name my master remote 'upstream' or something like that. Heres what to do:
* In terminal, navigate to your repo
* ```git remote -v``` will list your current remotes. You should have two by default (push & fetch of your fork)
* ```git remote add upstream <URL of repo>``` (In our case, using https, use https://github.com/sparcedge/crowda.git)

This will clone the **master fork** locally. This is seperate from your local fork build; two seperate forks locally.
(Although you will never checkout out the local master fork. It only exists to pull down and merge others changes). Say you want
to grab the changes everyone has made and merge those into your own local fork, so you're not developing on out-of-date code. 
Assuming your master fork remote is called 'upstream':
* In terminal, navigate to your repo
* ```git pull upstream``` will fetch all changes down and merge them into your local master fork
* make sure you have the master branch checked out on your fork: ```git checkout master```
* ```git merge upstream/master``` will merge the master forks master branch into your forks master branch
* ```git push origin master``` will push those new merges up to **your** local fork
* now you're ready to branch off your forks master branch, and develop your great new feature!
