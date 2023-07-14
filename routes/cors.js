const cors = require('cors');

// const whitelist = ['http://localhost:4200'];
const whitelist = ['http://localhost:3000', 'http://localhost:5000','https://bhejo-backend.onrender.com/api/bids','https://bhejo.netlify.app','https://bhejo-backend.onrender.com'];
const corsOptionsDelegate = (req, callback) => {
    var corsOptions;
    console.log(req.header('Origin'));
    if(whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true };
    }
    else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);
