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

    function DisplayHomePage()
    {
        console.log("Home Page");

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

    /**
     * Adds a Contact Object to localStorage
     *
     * @param {string} fullName
     * @param {string} contactNumber
     * @param {string} emailAddress
     */
    function AddContact(fullName, contactNumber, emailAddress)
    {
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if(contact.serialize())
        {
            let key = contact.FullName.substring(0, 1) + Date.now();

            localStorage.setItem(key, contact.serialize());
        }
    }

    /**
     * This method validates an input text fields in the form
     * and displays an error in message Area div element
     * 
     * @param {string} input_field_ID 
     * @param {RegExp} regular_expression 
     * @param {string} errpr_message 
     */
    function ValidateField(input_field_ID, regular_expression, error_message)
    {
        let messageArea = $("#messageArea").hide();

        $("#" + input_field_ID).on("blur", function()
        {
            let inputTextContent = $(this).val(); 
            if(!regular_expression.test(inputTextContent))
            {
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }
            else 
            {
                messageArea.removeAttr("class").hide();
            }
        });
    }

    function ContactFormValidation()
    {
        ValidateField("fullName", /^([A-Z][a-z]{1,3}.?\s)?([A-Z][a-z]{1,25})((\s|,|-)([A-Z][a-z]{1,25}))*(\s|,|-)([A-Z][a-z]{1,25})$/, "Please enter a valid Full Name. This must include at least a Capitalized first name followed by a Capitalized last Name.");
        ValidateField("contactNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]?\d{4}$/, "Please enter a valid Contact Number. Contact Number Example: (905) 555-5555");
        ValidateField("emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/, "Please enter a valid Email address.");
    }

    function DisplayContactPage()
    {
        console.log("Contact Us Page");
        
        ContactFormValidation();
        

        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");

        sendButton.addEventListener("click", function(event)
        {
            //event.preventDefault();

            if(subscribeCheckbox.checked)
            {
                AddContact(fullName.value, contactNumber.value, emailAddress.value);
            }
        });
    }

    function DisplayContactListPage()
    {
        console.log("Contact-List Page");

        

        if(localStorage.length > 0) // check if localStorage has something in it 
        {
            let contactList = document.getElementById("contactList");

            let data = "";

            let keys = Object.keys(localStorage);

            let index = 1;

            //for every key in the keys collection loop
            for(const key of keys)
            {
                let contactData = localStorage.getItem(key); // retrieve contact data from localStorage

                let contact = new core.Contact(); // create an empty Contact Object
                contact.deserialize(contactData);

                data += `<tr>
                <th scope="row" class="text-center">${index}</th>
                <td>${contact.FullName}</td>
                <td>${contact.ContactNumber}</td>
                <td>${contact.EmailAddress}</td>
                <td class="text-center"><button value="${key}" class="btn btn-primary btn-sm edit"><i class="fas fa-edit fa-sm"></i> Edit</button></td>
                <td class="text-center"><button value="${key}" class="btn btn-danger btn-sm delete"><i class="fas fa-trash-alt fa-sm"></i> Delete</button></td>
                </tr>
                `;

                
                
                index++;
            }

            contactList.innerHTML = data;

            $("#addButton").on("click", () =>
            {
                location.href = "edit.html#add";
            });

            $("button.delete").on("click", function()
            {
                if(confirm("Are you sure?"))
                {
                    localStorage.removeItem($(this).val());
                }
                
                location.href = "contact-list.html";
            });

            $("button.edit").on("click", function() 
            {
                location.href = "edit.html#" + $(this).val();
            });
        }
    }

    function DisplayEditPage()
    {
        console.log("Edit Page");

        ContactFormValidation();

        let page = location.hash.substring(1);

        switch(page)
        {
            case "add":
                {
                    $("main>h1").text("Add Contact");

                    $("#editButton").html(`<i class="fas fa-plus-circle fa-lg"></i> Add`);

                    $("#editButton").on("click", (event) => 
                    {
                        event.preventDefault();
                        // Add Contactt
                        AddContact(fullName.value, contactNumber.value, emailAddress.value);
                        // Refresh the contact-list page
                        location.href ="contact-list.html";
                    });

                    $("#cancelButton").on("click", () =>
                    {
                        location.href ="contact-list.html";
                    });

                }
                break;
            default:
                {
                    // get the contact info from localStorage
                    let contact = new core.Contact();
                    contact.deserialize(localStorage.getItem(page));

                    // display the contact info in the edit form
                    $("#fullName").val(contact.FullName);
                    $("#contactNumber").val(contact.ContactNumber);
                    $("#emailAddress").val(contact.EmailAddress);

                    // when Edit is pressed - update the contact
                    $("#editButton").on("click", (event)=>
                    {
                        event.preventDefault();

                        // get any changes from the form
                        contact.FullName = $("#fullName").val();
                        contact.ContactNumber = $("#contactNumber").val();
                        contact.EmailAddress = $("#emailAddress").val();

                        // replace the item in localStorage
                        localStorage.setItem(page, contact.serialize());

                        // return to the contact-list
                        location.href ="contact-list.html";
                    });

                    $("#cancelButton").on("click", () =>
                    {
                        location.href ="contact-list.html";
                    });
                    
                }
                break;
        }
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
          case "Home":
            DisplayHomePage();
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