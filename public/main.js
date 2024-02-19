const btn = document.getElementById('btn');


const signUpHandler = async()=>{
    try{
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    const response =await axios.post('http://localhost:3000/user/add-user',{
        name,email,phone,password
    })
    if(response.data.message ==='User Created Successfully'){
        window.alert('User Created Successfully')
    }else{
        window.alert(response.data.message)
    }
    }
    catch(error){
        console.log(error);
    }
}

btn.addEventListener('click',signUpHandler);