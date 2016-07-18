let open = require('open');

setTimeout(()=>{open('http://localhost:' + process.env.npm_package_config_port)}, 3000);
