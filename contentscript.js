
// vim: tabstop=2
// vim: shiftwidth=2

(function() {
  'use strict';
  $(document).ready(function() {
    var docInfoPs = $("p.SS_DocumentInfo");
    docInfoPs.each(function(i) {
      var p = docInfoPs[i];
      var matches7thCircuit = p.textContent.match(/United States Court of Appeals for the Seventh Circuit/);
      if (matches7thCircuit) {
        docInfoPs.each(function(i2) {
          var p2 = docInfoPs[i2];
          var matchesAppealNumber = p2.textContent.match(/No\.\s*(\d+)\-(\d+)/);
          if (matchesAppealNumber) {
            var year = matchesAppealNumber[1];
            var sequence = matchesAppealNumber[2];

            chrome.runtime.sendMessage(
              {
                action: 'xhttp',
                url: "http://media.ca7.uscourts.gov/oralArguments/oar.jsp?caseyear="+year+"&casenumber="+sequence+"&listCase=List+case%28s%29"
              },
              function(responseText) {
                var parsed = jQuery.parseHTML(responseText);
                // http://stackoverflow.com/questions/1520429/is-there-a-css-selector-for-elements-containing-certain-text
                var argLink = $(parsed).find('a:contains("oral argument")');
                
                if (argLink) {
                  var argURL = "http://media.ca7.uscourts.gov" + argLink.attr('href');
                
                  docInfoPs.each(function(i3) {
                    var p3 = docInfoPs[i3];
                    var matchesArgued = p3.textContent.match(/(.*Argued)(.*)/);
                    if (matchesArgued) {
                      var before = matchesArgued[1];
                      var after = matchesArgued[2];
                      p3.textContent = '';
                      $(p3).append(before);
                      $(p3).append(' (<a target="_blank" href="' + argURL + '">mp3</a>)');
                      $(p3).append(after);
                    }
                  });
                }
              }
            );
          }
        });
      }
    });
  });
  // Your code here...
})();
