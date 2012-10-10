var exec = require("child_process").exec;
var async = require("async"),
  rimraf = require("rimraf");

function executeCommand(command){
  return function(callback){
    var childProc = exec(command, {}, callback || function(){});
    childProc.stdout.pipe(process.stdout);
    childProc.stderr.pipe(process.stderr);
  };
}

var tasks = [
  executeCommand("jam install"),
  rimraf.bind(rimraf, "public/templates")
];


console.log("environment is:", process.env.NODE_ENV);


if(process.env.NODE_ENV === "production"){
  tasks.push(executeCommand("ejs-amd --from views/templates --to public/templates"));
  //we should use almond but it fails:
  //https://github.com/caolan/jam/issues/39
  tasks.push(executeCommand("jam compile -i js/manager.js -o public/require.js"));
}

async.series(tasks, function(err, results){
  console.log("finished!");
});
