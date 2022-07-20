const gen_OTP = 9089;
let subject_ = '';
let html_ = '';
if (gen_OTP) {
   subject_ = 'some subject' // emailMessage.subject.verification,
   html_ = `<p><b>${gen_OTP}</b></p>` // + emailMessage.html.OTP_extension
}
const mailOptions = {
   from: process.env.FROM_EMAIL,
   to: user_email,
   subject: subject_,
   html: html_,
}

console.log(mailOptions);