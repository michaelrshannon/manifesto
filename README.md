
## Running in a VM

In my (Alasdair's) opinion the easiest way to get this up and running on Windows is to use a Vagrant VM. You'll need to install:

- VirtualBox
- Vagrant

You'll also need to create a file called `database.yml` in the `config` directory. This should have the following contents:

  development:
    adapter: postgresql
    encoding: unicode
    database: manifesto_development
    pool: 5
    username: vagrant
    password: 

Once that's all ready you can open a Windows command prompt in the root directory of this repository. Then run

  vagrant up

This will download & import a VM image that has all the necessary software installed.

Then type `vagrant ssh` to connect to the box via SSH. If that doesn't work you can [connect to it using PuTTY](http://stackoverflow.com/a/9924122/152347). You'll need to run a few more commands to get everything set up:

- `cd /vagrant` to navigate to the directory where all the code is. This is a mirror of the Windows directory and will be kept up to date automatically.
- `bundle install` - this will use a package manager to download all the libraries that we use.
- `rake db:setup` - this will create the database and all the tables and columns.
- `rails server` - this will start up the Rails server and make the website available at http://localhost:3000.
- Resque is needed if you want to start populating your database with tweets and mashifestos. You'll need to open another command line window, `vagrant ssh` into the box and run the command below.

To stop the Rails server simply type Ctrl+C.

To stop the VM type `exit` in the ssh command line. This would return you to the Windows command line. Then run `vagrant halt`.

These are the commands for the initial run. After that you only need to do `cd /vagrant`, `rails server`, and the Resque command. After pulling you should run `bundle install` in case any new packages have been added, and `rake db:migrate` to apply any db migrations that have been added.

## Resque in development

You need to be running a Resque worker for the tweet fetching to work. You can do this with `bundle exec env rake resque:work`.