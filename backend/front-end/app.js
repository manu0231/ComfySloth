const emailInput = document.querySelector('#inline-full-name')
const passwordInput = document.querySelector('#inline-password')

const loginForm = document.querySelector('.form')

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  if (!emailInput.value || !passwordInput.value) return
  const email = emailInput.value
  const password = passwordInput.value
  const user = { email, password }

  try {
    const response = await fetch('/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    const result = await response.json()
    console.log(result)

    if (response.status === 202) {
      emailInput.value = ''
      passwordInput.value = ''
    }
  } catch (error) {
    console.log(error)
  }
})
