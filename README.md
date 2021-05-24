# Lab8_Starter

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter) 
   
   A (or 1)

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user. 
   
   No, because there are multiple parts to this feature. You would probably want to do separate tests for writing a message and another for sending a message. 

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters
   
    Yes, this is a single, small feature.

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?
   
   We will not be able to see how our browser is being driver.

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?

   describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.click('img')
    await page.waitForTimeout(1000);
  });
