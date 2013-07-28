web: bundle exec rails server thin -p $PORT -e $RACK_ENV
resque: env TERM_CHILD=1 RESQUE_TERM_TIMEOUT=30 bundle exec rake jobs:work