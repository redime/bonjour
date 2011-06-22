namespace :redcar do
  def hash_with_hash_default
    Hash.new {|h,k| h[k] = hash_with_hash_default }
  end

  require 'json'

  desc "Redcar Integration: output runnable info"
  task :runnables do
    mkdir_p(".redcar/runnables")
    File.open(".redcar/runnables/sync_stdout.rb", "w") do |fout|
      fout.puts <<-RUBY
        $stdout.sync = true
        $stderr.sync = true
      RUBY
    end

    tasks = Rake::Task.tasks
    runnables = []
    ruby_bin = Config::CONFIG["bindir"] + "/ruby -r#{File.dirname(__FILE__)}/.redcar/runnables/sync_stdout.rb "
    tasks.each do |task|
      name = task.name.gsub(":", "/")
      command = ruby_bin + $0 + " " + task.name
      runnables << {
        "name"        => name,
        "command"     => command,
        "description" => task.comment,
        "type"        => "task/ruby/rake"
      }
    end
    File.open(".redcar/runnables/rake.json", "w") do |f|
      data = {"commands" => runnables}
      f.puts(JSON.pretty_generate(data))
    end
    File.open(".redcar/runnables/ruby.json", "w") do |f|
      data = {"file_runners" =>
        [
          {
            "regex" =>    ".*.rb$",
            "name" =>     "Run as ruby",
            "command" =>  ruby_bin + "__PATH__",
            "type" =>     "script/ruby"
          }
        ]
      }
      f.puts(JSON.pretty_generate(data))
    end
  end
end