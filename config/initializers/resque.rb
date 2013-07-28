rails_root = Rails.root || File.dirname(__FILE__) + '/../..'
rails_env = Rails.env || 'development'

resque_config = YAML.load_file(rails_root.to_s + '/config/resque.yml')
Resque.redis = resque_config[rails_env]

unless %w(development test).include?(Rails.env)
  uri = URI.parse(ENV['REDISTOGO_URL'])
  Resque.redis = Redis.new(:host => uri.host, :port => uri.port, :password => uri.password)
end