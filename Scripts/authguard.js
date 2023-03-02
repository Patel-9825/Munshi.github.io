"use strict";
(function()
{
    switch (document.title) 
        {
          case "Contact Us":
              // if user dose not exists in session storage
            if(!sessionStorage.getItem("user"))
            {
                $("#contactListButton").hide();
            }
            break;
          case "Contact-List":
              // if user dose not exists in session storage
            if(!sessionStorage.getItem("user"))
            {
                // redirect to log in page
                location.href = "login.html";
            }
            break;
        }
})();