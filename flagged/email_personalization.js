// Email Personalization

function personalizeEmail(email, investor) {
  // Code to insert personalized information such as the investor's name, company name, or specific investment details
  email.subject = email.subject.replace('{{investorName}}', investor.name);
  email.content = email.content.replace('{{investorName}}', investor.name);
  email.content = email.content.replace('{{companyName}}', investor.company);
  email.content = email.content.replace('{{investmentDetails}}', investor.investmentDetails);
}