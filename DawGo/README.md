# Project Report

## Introduction
This codebase is for a website application called DawGo. This application is designed for UW students to trade their second-hand goods in order to promote a sustainable lifestyle.

This codebase is a group project for INFO 340 in Winter 2022. This codebase is created by Aaron Yang, Patrick Cheng, Yanwen Guo, and Zixin Li. This is a React application.

## Code Structure Analysis

### Code-level Architectural Elements
This section articulates the code-level architectural elements of this application in a visual diagram and text. Figure 1 is a UML component diagram illustrating the architectural elements. The literal explanation of architectural elements follows after Figure 1.

![UML component diagram](https://github.com/Info-433-Spring-2023/project-1-jen0guo/blob/07870eaa7aa01e1c0238c74ea0f2d88779f817f7/images/INFO%20443%20Project%201%20UML%20-%20Component.png)
(Figure 1: UML component diagram. The figure presents the set of code-level architectural elements.)

The abstraction of this application is according to the functionality of pages. There are eight main architectural elements: landing page, homepage, sign-in/up page, personal page, post-item page, shopping cart page, item-detail page, and support page. The main architectural elements are associated with each other.

#### Landing page
The main goal of the landing page is to show the information about the website and provide an entrance to the homepage.

#### Homepage
The homepage is used to display all items that users trade in on this platform and view items by different categories. The homepage element consists of item categories, a item card deck, and item navigators. The item card deck is composed of item cards.

#### Sign-in/up page
The sign-in/up page aims to authenticate users so they can access other elements, including the personal page, post-item page, and saved-item page.

#### Personal page
The personal page is used to display users' personal information and the items that they posted or saved. The items are displayed in item cards.

#### Post-item page
The post-item page provides a form to collect information about the item that users want to post.

#### Shopping cart page
The saved-item page illustrates the items that users save in a table and calculate the sum price of the items.

#### Item-detail page
The item-detail page displays the information that users imported through the form on the post-item page. The item-detail pages are accociated with item cards.

#### Support page
The support page aims to collect questions from users by forms and show the answers to some frequently asked questions.

#### Navigation bar and footer
There are two elements associated with every eight main elements, the navigation bar and footer.

Navigation bar is used to display the website logo, name, and news. It is also used to direct to different pages. When the navigation bar is associated with the homepage and item-detail page, the navigation bar is additionally composed of a search bar which is used to search items posted on the website. When the navigation bar is associated with the personal page, the navigation bar is additionally composed of a banner that displays the slogan of the website.

The purpose of the footer is to show a short introduction to the website and provide links to different pages and item categories. The footer also displays the copyright statement and a simple form for users to subscribe to the notifications from the website.

### Code Process Flow
This section enunciates the code process flow of this system in a visual diagram and text. Figure 2 is a UML activity diagram expressing the code process flow, which is followed by a detailed written description.

![UML activity diagram](https://github.com/Info-433-Spring-2023/project-1-jen0guo/blob/07870eaa7aa01e1c0238c74ea0f2d88779f817f7/images/INFO%20443%20Project%201%20UML%20-%20Activity.png)
(Figure 2: UML activity diagram. The figure presents the code process flow of the system)

The system starts as a static landing page is loaded. The navigation bar and footer are rendered when the system initiates. Clicking the button on the landing page will trigger the router to navigate users to the homepage. The item categories are rendered by accessing two lists passed as property, one is static and another is dynamic, handled by the event. The item card deck including item cards is rendered by accessing a real-time dataset. The item navigators are rendered based on the number of item cards. When users choose one or more categories, the item categories will be rerendered because the dynamic list is changed by events. The item card deck will be rerendered because the filter is applied to the real-time dataset.

Clicking the button, “VIEW DETAILS”, on item cards will activate the router to navigate to the item-detail page. The item id in the real-time dataset is passed as a part of the path. The item-detail page is rendered based on the information of the item in the real-time dataset, which is accessed by using the item id. Two buttons are provided on the item-detail page. After clicking them, the events are listened but the system will require user authentication before taking action. The system will check whether the users sign in. If no account is signed in, the system navigates to sign-in/up page to allow users to sign in or create an account. If a account has already signed in, the action will be made and the new state information will be stored and the uasers’ information dataset will be updated.

When users sign in, they can visit the post-item page to make a post. A form is rendered to collect the information that users input and a button is rendered to submit the form to the system. Clicking the submit button will update the item information to the real-time dataset and update the users’ information dataset. As users log in, they can also navigate to their personal page to view and edit their personal information. The users’ information dataset will be updated when new personal information is input and submitted. The item cards are rendered on the personal page according to the item id stored in the users’ information dataset. The item cards are rendered in two separate sections, “Saved Items” and “My Posted Items”.

The last element in the code process flow is the support page. When navigating to the support page, a form is rendered to collect users’ input, and text information is displayed. Clicking the “Send Message” button will update the state of the message.

## Architecture Assessment
This section evaluates the architectural quality of a single sizeable element in the system. The architectural element homepage and all architectural elements associated with the homepage or homepage consists of, including the navigation bar, footer, item categories, item card deck, and item cards, are identified as a single sizeable element. The table below illustrates the architectural deficiencies of a single sizeable element, an explanation of them, and the location of the deficiencies in the codebase.

| Architectural Deficiency | Explanation | Location |
|--|--|--|
| Two unrelated components defined in a single file | The Banner component defined in the file is not used by another component NavBar defined in the same file. There is no comment about what Banner is and where to use it. This deficiency would confuse stakeholders with where a Banner is used. | src/navbar/navbar.js |
| Bad indentation | The indentation of the code lines does not reflect their location in the tags' hierarchy. | src/navbar/navlinks.js, src/App.js |
| Bad variable naming | The constant variable does not use all uppercase letters in its name. | src/homepage.js |
| Return almost identical components in if/else statement | In the if/else statement, two almost the same components except for one attribute are returned after two conditions. | src/homepage.js, src/categories.js |
| Ambiguous Number | Some constant numbers are used with semantic meaning but without comments. | src/homepage.js |
| Inconsistent component structure| The attributes of two similar components are defined in different tags. | src/categories.js |

## Automated Test
### Test Description
The automated test for this codebase will test the architectural element homepage and all architectural elements associated with the homepage or homepage consist of, including the navigation bar, footer, item categories, item card deck, and item cards. The test suite is separated into three sections using describe(), which are Test Homepage Header, Test Homepage Body, and Test Homepage Footer. 

#### Test Homepage Header
| Test | Intention | Input |
|--|--|--|
| Render navigation bar without errors | This test aims to check whether the navigation bar correctly displays on the homepage for users to use. | NA |
| Link to support page works | This test aims to check whether the links, support page for example, on the navigation bar exist and direct to the correct pages. | User click |
| Render search bar on homepage | This test aims to check whether the search bar appears on the homepage. | NA |
| Receive typed-in text from search bar | This test aims to check whether the website collects the text that users type in in the search bar. | "Airpods" |

#### Test Hompage Body
| Test | Intention | Input |
|--|--|--|
| Render homepage without errors | This test aims to check whether the main body part of the homepage displays validly. | NA |
| Render all item cards | This test aims to check  whether the item cards exist on the homepage | NA |
| Item cards on homepage have buttons | This test aims to check whether all the item cards have buttons for users to click when item cards are displayed on the homepage. | NA |
| Save item after clicking button |This test aims to check whether the items are saved after users click the buttons.| User click |
| Display all category cards | This test aims to check whether all category cards are displayed on the homepage. | NA |
| Select a specific category | This test aims to check how the category cards, category Beauty for example, will change visually when they are clicked by users. | User click |

#### Test Hompage Footer
| Test | Intention | Input |
|--|--|--|
| Render footer without errors | This test aims to check whether the footer is displayed correctly. | NA |
| Email subscribing form exists | This test aims to check whether the form used to subscribe to email notifications exits in the footer. | NA |
| Receive typed-in text from form | This test aims to check whether the website collects the text that users type in the subscription form. | "aaa@a.com" |

### Test Instruction
The automated test file can be found through the path *project-1-jen0guo\project-cyqpp-uw-main\src\homePage.spec.js*. 

- To run homepage.spec test, you should set the current directory as *project-1-jen0guo\project-cyqpp-uw-main*. You should then start a terminal and run the command `npm test` 
- To run homepage.spec test with code coverage: you should set the current directory as *project-1-jen0guo\project-cyqpp-uw-main*.. You should then start a terminal and run the command `npm test -- --coverage watchAll=false` and press `a`.

### Test Results
Figure 3 is the test results of *homePage.spec.js*. There are 14 tests in total and 13 tests are passed. The test `Link to support page works` was not passed because this test tried to use the code that did not cause red line. The commented code passed the test but triggered the red line under the code.
![test results image](https://github.com/Info-443-Spring-2023/project-1-jen0guo/blob/0e4a7d2980fa8b6496374fc79a36099f8d9f1f02/images/P1%20Full%20Report%20test%20result.jpg)
(Figure 3: Test Result. This image shows the test results of *homePage.spec.js.* )


Figure 4 displays the code coverage of the tests *homePage.spec.js*. The code coverage is subject to change because of refactoring. The table after the figure explained how code was covered.
![code coverage image](https://github.com/Info-443-Spring-2023/project-1-jen0guo/blob/0e4a7d2980fa8b6496374fc79a36099f8d9f1f02/images/P1%20Full%20Report%20code%20coverage.jpg)
(Figure 4: Code Coverage. This image shows the code coverage of *homePage.spec.js*. )

| Files that should be covered | Coverage |
|--|--|
| card.js | Line 31 is not covered because the cards on the homepage require the buttons instead of empty `<div/>` |
| cardDeck.js | All covered |
| categories.js | Line 12-19 are not covered because the test only aims to check the visual effects of the category cards when they are changed from the unselected to selected state. |
| data.js | All covered |
| footer.js | All covered |
| homePage.js | Line 81-83 are not covered because the test aims to render item cards on homepage instead of no cards. Line 25 are not covered because the test only aims to test the abled next button. Line 84-91|
| searchBar.js  | All covered |
| src/navbar/logo.js | All covered |
| src/navbar/navbar.js | All covered after refactoring. |
| src/navbar/navlinks.js | All covered |
| src/navbar/newsLine.js | All covered |

## Code Refactoring
To make tests effective, refactoring has been made before fixing deficiencies identified in the previous section. Lots of test id have been added to the code components to make tests easier. In homePage.js file, the function PageNavigator was moved out of the HomePage function in order to test a single element in the test rendering.

The table below illustrates the refactoring that were made to improve the architectural deficiencies.
| Architectural Deficiency | Refactoring | Location |
|--|--|--|
| Two unrelated components defined in a single file | The Banner component was moved to another new file called banner.js which exports Banner component. All the import statements were also fixed. | src/navbar/banner.js |
| Bad indentation | The indentation of the code lines was corrected to reflect their location in the tags' hierarchy. | src/navbar/navlinks.js, src/App.js |
| Bad variable naming | The constant variable was changed to all uppercase and all the usage of this variable was changed. | src/homepage.js |
| Return almost identical components in if/else statement | The code was simplified by passing a single variable to both components. | src/homepage.js, src/categories.js |
| Ambiguous Number | Comments were added for those constant numbers which are used with semantic meaning. | src/homepage.js |
| Inconsistent component structure | The two similar components were cut down to one that was controlled by a variable. | src/categories.js |