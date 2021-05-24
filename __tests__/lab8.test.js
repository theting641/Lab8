//import { router } from '../scripts/router';

describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(1000);
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      //console.log(plainValue.title);
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    //global.window = jest.fn();
    await page.click('journal-entry');
    expect(page.mainFrame().url()).toContain('/#entry1')

  }, 10000);

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
    //await page.click('journal-entry');
    // const entry = await page.$$('journal-entry');
    // const data = await entry[0].getProperty('entry');
    // const plainValue = data.jsonValue();
    // console.log(plainValue.title);
    //expect(data.title).toEqual(2)
    let data, plainValue;
    const entries = await page.$$('h1');
    //for (let i = 0; i < entries.length; i++) {
    data = await entries[0].getProperty('innerHTML');
    plainValue = await data.jsonValue();
    expect(plainValue).toEqual('Entry 1')
  }, 10000);

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */
    //await page.click('journal-entry');
    let data, plainValue;
    const entries = await page.$$('entry-page');
    //for (let i = 0; i < entries.length; i++) {
    data = await entries[0].getProperty('entry');
    plainValue = await data.jsonValue();
    expect(plainValue.title).toEqual('You like jazz?');
    expect(plainValue.date).toEqual('4/25/2021');
    expect(plainValue.content).toEqual("According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.");
    expect(plainValue.image.src).toEqual('https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455');
    expect(plainValue.image.alt).toEqual('bee with sunglasses');

  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
    let data, plainValue;
    const entries = await page.$$('body');
    //for (let i = 0; i < entries.length; i++) {
    data = await entries[0].getProperty('classList');
    plainValue = await data.jsonValue();
    expect(plainValue[0]).toEqual('single-entry')
  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”'
    await page.click('img')
    expect(page.mainFrame().url()).toContain('/#settings')

  }, 10000);

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”

    let data, plainValue;
    const entries = await page.$$('h1');
    //for (let i = 0; i < entries.length; i++) {
    data = await entries[0].getProperty('innerHTML');
    plainValue = await data.jsonValue();
    expect(plainValue).toEqual('Settings')
  },10000);

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    let data, plainValue;
    const entries = await page.$$('body');
    //for (let i = 0; i < entries.length; i++) {
    data = await entries[0].getProperty('classList');
    plainValue = await data.jsonValue();
    expect(plainValue[0]).toEqual('settings')
  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async () => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    // await page.click('journal-entry');
    // await page.click('img')
    await page.goBack();
    //console.log(page.mainFrame().url())
    expect(page.mainFrame().url()).toContain('/#entry1')
  }, 10000);

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it('Test11: Clicking the back button, the url should not contain a "#"', async () => {
    // implement test10: Clicking on the back button should bring user back to home page
    // await page.click('journal-entry');
    // await page.click('img')
    await page.goBack();
    //console.log(page.mainFrame().url())
    expect(page.mainFrame().url()).not.toContain('#')
  }, 10000);

  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it('Test12: If the user is on the homepage, header title should be "Journal Entries"', async () => {
    // implement test10: On the homepage, the header title should be "Journal Entries"
      let data, plainValue;
      const entries = await page.$$('h1');
      //for (let i = 0; i < entries.length; i++) {
      data = await entries[0].getProperty('innerHTML');
      plainValue = await data.jsonValue();
      expect(plainValue).toEqual('Journal Entries')
  });

  // define and implement test13: On the home page the <body> element should not have any class attribute 
  it('Test13: On first home page - checking <body> element classes', async () => {
    // implement test6: On the home page the class attribute of <body> should be empty
    let data, plainValue;
    const entries = await page.$$('body');
    //for (let i = 0; i < entries.length; i++) {
    data = await entries[0].getProperty('classList');

    plainValue = await data.jsonValue();
    //console.log(plainValue)
    expect(plainValue).toEqual({})
  });

  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('Test14: Clicking second <journal-entry>, new URL should contain /#entry2', async () => {
    // implement test3: Clicking on the second journal entry should update the URL to contain “/#entry2”
    //global.window = jest.fn();
    let data, plainValue;
    await page.mouse.wheel({ deltaY: 500 });
    await page.mouse.click(300, 300)
    //await page.goto("http://127.0.0.1:5500/#entry2");
    const entries = await page.$$('entry-page');
    //for (let i = 0; i < entries.length; i++) {
    data = await entries[0].getProperty('entry');
    plainValue = await data.jsonValue();

    expect(page.mainFrame().url()).toContain('/#entry2');

  }, 10000);

  // // define and implement test15: Verify the title is current when clicking on the second entry
  it('Test15: Clicking second <journal-entry>, new title should be Entry 2', async () => {
    // implement test3: Clicking on the second journal entry should change title to Entry 2'
    //global.window = jest.fn();
    let data, plainValue;
    const entries = await page.$$('h1');
    //for (let i = 0; i < entries.length; i++) {
    data = await entries[0].getProperty('innerHTML');
    plainValue = await data.jsonValue();
    expect(plainValue).toEqual('Entry 2')

  }, 10000);

  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('Test16: Clicking second <journal-entry>, new page contents should be correct', async () => {
    // implement test3: Clicking on the second journal entry should change the page contents
    //global.window = jest.fn();
    let data, plainValue;
    const entries = await page.$$('entry-page');
    //for (let i = 0; i < entries.length; i++) {
    data = await entries[0].getProperty('entry');
    plainValue = await data.jsonValue();
    expect(plainValue.title).toEqual('Run, Forrest! Run!');
    expect(plainValue.date).toEqual('4/26/2021');
    expect(plainValue.content).toEqual("Mama always said life was like a box of chocolates. You never know what you're gonna get.");
    expect(plainValue.image.src).toEqual('https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg');
    expect(plainValue.image.alt).toEqual("forrest running");

  }, 10000);

  // create your own test 17
  it('7: Clicking third <journal-entry>, new URL should contain /#entry3', async () => {
    // implement test17: Clicking on the third journal entry should update the URL to contain “/#entry2”
    //global.window = jest.fn();
    await page.goBack()
    let data, plainValue;
    await page.mouse.wheel({ deltaY: 1000 });
    await page.mouse.click(300, 300)
    //await page.goto("http://127.0.0.1:5500/#entry2");
    const entries = await page.$$('entry-page');
    //for (let i = 0; i < entries.length; i++) {
    data = await entries[0].getProperty('entry');
    plainValue = await data.jsonValue();

    expect(page.mainFrame().url()).toContain('/#entry3');

  }, 10000);

  // // define and implement test15: Verify the title is current when clicking on the second entry
  it('Test18: Clicking third <journal-entry>, new title should be Entry 2', async () => {
    // implement test18: Clicking on the third journal entry should change title to Entry 2'
    //global.window = jest.fn();
    let data, plainValue;
    const entries = await page.$$('h1');
    //for (let i = 0; i < entries.length; i++) {
    data = await entries[0].getProperty('innerHTML');
    plainValue = await data.jsonValue();
    expect(plainValue).toEqual('Entry 3')

  }, 10000);

  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('Test19: Clicking third <journal-entry>, new page contents should be correct', async () => {
    // implement test19: Clicking on the third journal entry should change the page contents
    //global.window = jest.fn();
    let data, plainValue;
    const entries = await page.$$('entry-page');
    //for (let i = 0; i < entries.length; i++) {
    data = await entries[0].getProperty('entry');
    plainValue = await data.jsonValue();
    expect(plainValue.title).toEqual('Ogres are like onions');
    expect(plainValue.date).toEqual('4/27/2021');
    expect(plainValue.content).toEqual("Onions have layers. Ogres have layers. Onions have layers. You get it? We both have layers.");
    expect(plainValue.image.src).toEqual("https://advancelocal-adapter-image-uploads.s3.amazonaws.com/image.syracuse.com/home/syr-media/width2048/img/entertainment_impact/photo/shrek-donkeyjpg-daa31aa2b5bedfaa.jpg");
    expect(plainValue.image.alt).toEqual("shrek and donkey looking confused");

  }, 10000);
  // create your own test 20

  // define and implement test11: Clicking the back button once should bring the user back to the second journal entry
  it('Test20: Clicking the back button, the title should be Journal Entries', async () => {
    // implement test10: Clicking on the back button should bring user back to the home page
    // await page.click('journal-entry');
    // await page.click('img')
    await page.goBack();
    //console.log(page.mainFrame().url())
    let data, plainValue;
    const entries = await page.$$('h1');
    //for (let i = 0; i < entries.length; i++) {
    data = await entries[0].getProperty('innerHTML');
    plainValue = await data.jsonValue();
    expect(plainValue).toEqual('Journal Entries')
  }, 10000);

});
