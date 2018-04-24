/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /**
         * This test, tests if a url starts with 'http://'
         * from an array of urls created from the allFeeds array.
         */
        it('url are defined and not empty', function() {
            const arrUrl = allFeeds.map( item => item.url );
            expect(arrUrl.every( item => item.startsWith('http://'))).toBe(true);
        });

        /**
         * This test, tests if a url is empty or not
         */
        it('names of object has been defined and not empty', function (){
            const arrNames = allFeeds.map( item => item.name );
            expect(arrNames.every( item => item !== ''  )).toBe(true);
        })

    });


    /**
     * The 'Main Menu' suite contains tests that check the functionality
     * of the main menu.
     */
    describe('Main menu', function (){
        
        /**
         * This test ensures that when the page is loaded the menu is hidden.
         */
        it('is hidden by default', function(){
            const $body = $('body');
            expect($body.hasClass('menu-hidden')).toBe(true)
        });

        /**
         * This test checks if the toggle functionality of the main menu is working
         * properly. 
         */
        it('it displays when menu button is clicked and hide when clicked again', function() {
            
            const menuIcon = $('.menu-icon-link');
            const $body = $('body');

            menuIcon.clickMenu = function() {
                $('body').toggleClass('menu-hidden');
            }

            menuIcon.clickMenu();
            expect($body.hasClass('menu-hidden')).not.toBe(true);

            menuIcon.clickMenu();
            expect($body.hasClass('menu-hidden')).toBe(true);
        });

    });  


    /**
     * The 'Initial Entries' suite contains tests that ensure the ansynchronous operations
     * when the page loads.
     */
    describe('Initial Entries', function (){    

        /**
         * This test ensures that ajax is getting a list of feeds
         * Due to the fact, that we are dealing with an asynch operation
         * we have to use the beforeEach function before the test run.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });          

        it('there is at least at a single element', function() {
            expect($('.feed > .entry-link').length).toBeGreaterThan(0);
        });

    });

    /**
     * The 'New Feed Selection' suite contains tests that when we click a different 
     * menu link the feed list is changing content.
     */
    describe('New Feed Selection', function () {
        /**
         * This test first loads the content of the two different feeds.
         * So, first we run the beforeEach function using the done function.
         * After that done has run, 
         * we compare the two results.
         */

         let text1;
         let text2;

         beforeEach(function(done) {
          loadFeed(1,function() {
               text1 = $('.feed > .entry-link h2').text();
          
               loadFeed(2, function() {
                    text2 = $('.feed > .entry-link h2').text();

                    done();
                });

            });
         }); 

        it('ensures when a new feed is load the content actually changes', function() {
            expect( text1 !== text2 ).toBe(true);
        });

    });

}());
