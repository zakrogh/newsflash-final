// ref for ajax test with Jasmine: https://www.theaveragedev.com/ajax-testing-with-jasmine-2-0/
// The only way that make a test for api call is make a mock.
describe ("Business API", () => {
  it("should load and render business Api call when document is ready"), function() {
    // mock the check
    spyOn($, 'isUrlExternal').and.returnValue(false);

    //make the ajax request, will use the load method internally
    $frag.ajaxify().find()('a[href="/some/url"]').trigger($(document).ready());

    //mock the ajax request response
    jasmine.Ajax.requests.mostRecent().response({
      status: 200,
      "content/type": "text.html",
      responseText: "<p>Something</p>"
    });
  }
});