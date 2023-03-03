(function(core)
{
    class User 
    {
        // constructor
        constructor(displayName = "", emailAddress="", username="", password="")
        {
            this.DisplayName = displayName;
            this.EmailAddress = emailAddress;
            this.Username = username;
            this.Password = password;
        }
        

        // overriden functions
        toString()
        {
            return `Display Name  : ${this.DisplayName}\nEmail Address  : ${this.EmailAddress}\nUser Name  : ${this.Username}`;
        }

        // utility functions
        toJSON()
        {
            return {
                "DisplayName": this.DisplayName,
                "EmailAddress": this.EmailAddress,
                "Username":this.Username
            }
        }

        fromJSON(data)
        {
            this.DisplayName = data.DisplayName;
            this.EmailAddress = data.EmailAddress;
            this.Username = data.Username;
            this.Password = data.Password;
        }

        // public methods
        serialize()
        {
            if(this.DisplayName !== "" && this.EmailAddress !== "" && this.Username !== "")
            {
                return `${this.DisplayName},${this.EmailAddress},${this.Username}`;
            }
            console.error("One or more properties of the User object are missing or empty");
            return null;
            
        }
    
        deserialize(data) // assume that the data object is comma-seperated list of properties
        {
            let propertyArray = data.split(",");
            this.Username = propertyArray[0];
            this.EmailAddress = propertyArray[1];
            this.Username = propertyArray[2];
        }
    }

    core.User = User;

})(core || (core={}));