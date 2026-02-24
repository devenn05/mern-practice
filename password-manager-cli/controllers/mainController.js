const Credential = require('../model/Credential');
const catchAsync = require('../utils/catchAsync');
const {encrypt, decrypt} = require('../utils/cryptoHelper');
const auditLogger = require('../utils/auditLogger');

exports.getDashboard = catchAsync(async(req, res, next)=>{
    const credentials = await Credential.find().sort({createdAt: -1});
    res.render('dashboard', {credentials});
})

exports.addCredentials = catchAsync(async(req,res,next)=>{
    const {appName, username, password} = req.body;
    const scrambledPassword = encrypt(password);
    const newCred = new Credential({
        appName: appName,
        username: username,
        encryptedPassword: scrambledPassword
    });
    await newCred.save();
    res.redirect('/');
})

exports.viewCredentials = catchAsync(async(req, res, next)=>{
    const {id} = req.params;
    const cred = await Credential.findById(id);
    if (!cred){
        throw new Error("Credentials not found!!!")
    }
    const plainPassword = decrypt(cred.encryptedPassword)

     // TRIGGER THE AuditLogger EVENT
    auditLogger.emit('log', 'VIEW_PASSWORD', cred.username, cred.appName);
    
    res.render('view-pass', {
        appName: cred.appName,
        username: cred.username,
        password: plainPassword
    })

})