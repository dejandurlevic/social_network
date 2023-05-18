let session = new Session();
session_id = session.getSession();

if (session_id !== "") {

    async function populate() {

        let user = new User();
        user = await user.get(session_id);

        document.querySelector('#username').innerHTML = user['username'];
        document.querySelector('#email').innerHTML = user['email'];


        document.querySelector('#korisnicko_ime').value = user['username'];
        document.querySelector('#edit_email').value = user['email'];
    }

    populate();

} else {
    window.location.href = "/";
}

document.querySelector('#odjava').addEventListener('click', e=>{
    e.preventDefault();

    session.destroySession();
    window.location.href = "/";
});


document.querySelector('#edit').addEventListener('click', ()=> {
    document.querySelector('.custom_modal').style.display = 'block';
   
    
  });
  
  document.querySelector('#close_modal').addEventListener('click', () => {
     document.querySelector('.custom_modal').style.display = 'none';
  });
  
document.querySelector('#edit_form').addEventListener('submit', e=>{
    e.preventDefault();

    let user = new User();
    user.username = document.querySelector('#korisnicko_ime').value;
    user.email = document.querySelector('#edit_email').value;
    user.edit();
})  

document.querySelector('#deleteProfile').addEventListener('click', e=>{
    e.preventDefault();

    let text = "Da li ste sigurni da zelite da obrisete profil?"
    
    if(confirm(text) === true){
        let user = new User();
        user.delete();
    }
})