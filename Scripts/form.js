// form validation

const user_fname = document.querySelector('user_fname') || null;
const user_lname = document.querySelector('user_lname');
const user_email_address = document.querySelector('user_email_address');
const password = document.querySelector('user_password');
const user_phone = document.querySelector('user_phone');
const user_address = document.querySelector('user_address');
const confirm_password = document.querySelector('confirm_password');
const user_type_id = document.querySelector('user_type_id');
const submitButton = document.querySelector('submitButton')

if(fname == null){ // which means login page is open

} else { // which means register page is open

    submitButton.addEventListener('click', () => {
        fetch('/register-user', {
            method: 'post',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({
                user_email_address: user_email_address.value,
                user_password: user_password.value,
                user_fname: user_fname.value,
                user_lname: user_lname.value,
                user_address: user_address.value,
                user_phone: user_phone.value,
                user_type_id: user_type_id.value
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.user_fname){
                alert('register successful');
            } else{
                alert(data);
            }
        })
    })
}