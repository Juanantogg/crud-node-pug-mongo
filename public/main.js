const c = document.getElementById('create')
const r = document.getElementById('read')
const u = document.getElementById('update')
const d = document.querySelectorAll('.delete')
const name = document.getElementById('name')
const password = document.getElementById('password')
const email = document.getElementById('email')
const age = document.getElementById('age')
const currentName = document.getElementById('currentName')
const search = document.getElementById('search')
const newName = document.getElementById('newName')
const newPassword = document.getElementById('newPassword')
const newEmail = document.getElementById('newEmail')
const newAge = document.getElementById('newAge')
const showAlert = document.getElementById('showAlert')
const nameCard = document.querySelectorAll('.name-card')

const create = () => {
  if (name.value.trim()) {
    if (password.value.trim()) {
      if (email.value.trim()) {
        console.log(name.value)
        console.log(password.value)
        console.log(email.value)
        console.log(age.value)

        fetch('users', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            name: name.value,
            password: password.value,
            email: email.value,
            age: age.value
          })
        })
          .then(res => { if (res.ok) return res.json() })
          .then(data => {
            console.log(data)
          })
      } else {
        alert('Ingresa tu correo electrónico')
      }
    } else {
      alert('Ingresa tu contraseña')
    }
  } else {
    alert('Ingresa tu nombre')
  }
  name.value = ''
  password.value = ''
  email.value = ''
  age.value = 18
}

const update = () => {
  fetch('users', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      currentName: currentName.value,
      name: newName.value,
      password: newPassword.value,
      email: newEmail.value,
      age: newAge.value
    })
  })
    .then(res => { if (res.ok) return res.json() })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
  console.log('ok')
}

const delet = (e) => {
  for (var i = 0; i < d.length; i++) {
    if (d[i] == e.target) {
      fetch('users', {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: nameCard[i].textContent
        })
      })
        .then(res => { if (res.ok) return res.json() })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      console.log(nameCard[i].textContent)
    }
  }
}

const findOne = (e) => {
  e.preventDefault()
  fetch('user', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: currentName.value
    })
  })
    .then(res => {
      if (res.ok) return res.json()
    })
    .then(data => {
      console.log(data)
      newName.value = data.name
      newPassword.value = data.password
      newEmail.value = data.email
      newAge.value = data.age
    })
    .catch(err => {
      showAlert.setAttribute('class', 'alert-visible')
      setTimeout(() => {
        showAlert.setAttribute('class', 'alert-invisible')
      }, 2000)
    })
}

search.addEventListener('click', findOne)
c.addEventListener('click', create)
u.addEventListener('click', update)
d.forEach(el => el.addEventListener('click', delet))
