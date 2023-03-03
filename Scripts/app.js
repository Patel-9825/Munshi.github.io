// IIFE -- Immediately Invoked Function Expression
// AKA Anonymous Self-Executing Function
(function()
{
    /**
     * This function uses AJAX open a connection to the url and returns data to the callback function
     *
     * @param {string} method
     * @param {string} url
     * @param {Function} callback
     */
     function AjaxRequest(method, url, callback)
     {
         // step 1 - create a new XHR object
         let XHR = new XMLHttpRequest();
 
         // step 2 - create an event
         XHR.addEventListener("readystatechange", ()=>
         {
             if(XHR.readyState === 4 && XHR.status === 200)
             {
                callback(XHR.responseText);
             }
         });
 
         // step 3 - open a request
         XHR.open(method, url);
 
         // step 4 - send the request
         XHR.send();
     }
 

    function DisplayAboutPage()
    {
        console.log("About Us Page");
    }

    function DisplayProductsPage()
    {
        console.log("Products Page");
    }

    function DisplayServicesPage()
    {
        console.log("Services Page");
    }

    /**
     * This function loads the Navbar from the header file and injects into the page
     *
     * @param {*} data
     */
     function LoadHeader(data)
     {
         $("header").html(data);
         $(`li>a:contains(${document.title})`).addClass("active");
         CheckLogin();
     }

    function DisplayWelcomePage()
    {
        console.log("Welcome Page");

        $("#AboutUsButton").on("click", function()
        {
            location.href = "about.html";
        });

        $("main").append(`<p id="MainParagraph" class="mt-3">This is the Main Paragraph</p>`);
        //Article.innerHTML = ArticleParagraph;
        $("body").append(`<article class="container">
        <p id="ArticleParagraph" class="mt-3">This is the Article Paragraph</p>
        </article>`);
    }


    function DisplayContactPage()
    {
        console.log("Contact Us Page");
    }


    function DisplayLoginPage()
    {
        console.log("Login Page.");

        const wrapper = document.querySelector('.wrapper');
        const loginLink = document.querySelector('.login-link');
        const registerLink = document.querySelector('.register-link');
        const btnLogin = document.querySelector('.btnLogin');
        const iconClose = document.querySelector('.icon-close');

        registerLink.addEventListener('click', ()=> {
            wrapper.classList.add('active');
        });

        loginLink.addEventListener('click', ()=> {
            wrapper.classList.remove('active');
        });

        btnLogin.addEventListener('click', ()=> {
            wrapper.classList.add('active-btn-login');
        });

        iconClose.addEventListener('click', ()=> {
            wrapper.classList.remove('active-btn-login');
        });

        
    }

    function CheckLogin()
    {
        // if user is logged in
        if(sessionStorage.getItem("user"))
        {
            // swap out the login link fot the logout link
            $("#login").html(
                `<a id="logout" class="nav-link" href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>`
            );

            $("#logout").on("click", function ()
            {
                // perform logout
                sessionStorage.clear();

                // redirect to login page
                location.href = "login.html";
            });
        }
    }

    function DisplayRegisterPage()
    {
        console.log("Register Page.");
    }

    function DisplayWelcomePage()
    {
        console.log("Welcome Page.");
    }

    // named function
    function Start()
    {
        console.log("App Started!!");
        AjaxRequest("GET", "header.html", LoadHeader);

        

        switch (document.title) 
        {
          case "Welcome":
            DisplayWelcomePage();
            break;
          case "Welcome":
            DisplayWelcomePage();
            break;
          case "Contact Us":
            DisplayContactPage();
            break;
          case "Contact-List":
            DisplayContactListPage();
            break;
          case "About Us":
            DisplayAboutPage();
            break;
          case "Our Products":
            DisplayProductsPage();
            break;
          case "Our Services":
            DisplayServicesPage();
            break;
          case "Edit":
            DisplayEditPage();
            break;
          case "Login":
            DisplayLoginPage();
            break;
          case "Register":
            DisplayRegisterPage();
            break;

        }
    }

    window.addEventListener("load", Start);

})();