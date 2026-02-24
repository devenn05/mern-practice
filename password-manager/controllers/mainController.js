const Credential = require('../model/Credential');
const catchAsync = require('../utils/catchAsync');
const {encrypt, decrypt} = require('../utils/cryptoHelper');
const auditLogger = require('../utils/auditLogger');
const JSONToCSVTransfrom = require('../utils/backupStream')

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

    // TRIGGER THE AuditLogger EVENT
    auditLogger.emit('log', 'ADDED_NEW_CREDENTIALS', username, appName);
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

exports.downloadBackup = catchAsync(async(req,res,next)=>{
    // Content-Type: text/csv: Tells the browser, "This isn't a webpage. It's a data spreadsheet."
    // Content-Disposition: attachment: This is the magic switch that forces the browser to pop up the "Save As..." or "Download" dialog box instead of showing the text on the screen.
    // filename: Tells the browser what to name the file by default.
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="my_backup.csv"');

    const readStream = Credential.find().cursor();
    const transformStream = new JSONToCSVTransfrom();

    // readStream (Source): Water (Data) comes out of MongoDB.
    // .pipe(transformStream) (Middleman): The water flows into a filter. The filter changes the water (Decrypts password, adds CSV commas).
    // .pipe(res) (Destination): The clean water flows directly to the Response objec
    readStream.pipe(transformStream).pipe(res);
})