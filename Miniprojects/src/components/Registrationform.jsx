import { useState } from 'react'

const initialForm = {
  name: '',
  email: '',
  mobile: '',
  password: '',
  gender: '',
  course: '',
}

function RegistrationForm() {
  const [form, setForm] = useState(initialForm)

  function handleChange(e) {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log('Submitted:', form)
    alert('Registered: ' + form.name)
  }

  function handleReset() {
    setForm(initialForm)
  }

  return (
    <div className="reg-wrapper">
      <form onSubmit={handleSubmit} className="reg-form">
        <h2>Registration</h2>

        <label>Name</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} />

        <label>Email</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} />

        <label>Mobile</label>
        <input type="tel" name="mobile" maxLength={10} value={form.mobile} onChange={handleChange} />

        <label>Password</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} />

        <label>Gender</label>
        <div>
          <label>
            <input type="radio" name="gender" value="Male"
              checked={form.gender === 'Male'} onChange={handleChange} /> Male
          </label>
          <label>
            <input type="radio" name="gender" value="Female"
              checked={form.gender === 'Female'} onChange={handleChange} /> Female
          </label>
          <label>
            <input type="radio" name="gender" value="Other"
              checked={form.gender === 'Other'} onChange={handleChange} /> Other
          </label>
        </div>

        <label>Course</label>
        <select name="course" value={form.course} onChange={handleChange}>
          <option value="">Select a course</option>
          <option value="HTML">HTML</option>
          <option value="CSS">CSS</option>
          <option value="JavaScript">JavaScript</option>
          <option value="React">React</option>
        </select>

        <div>
          <button type="submit">Register</button>
          <button type="button" onClick={handleReset}>Reset</button>
        </div>
      </form>

      <div className="preview">
        <h3>Live values (from state)</h3>
        <p>Name: {form.name}</p>
        <p>Email: {form.email}</p>
        <p>Mobile: {form.mobile}</p>
        <p>Password length: {form.password.length}</p>
        <p>Gender: {form.gender}</p>
        <p>Course: {form.course}</p>
      </div>
    </div>
  )
}

export default RegistrationForm