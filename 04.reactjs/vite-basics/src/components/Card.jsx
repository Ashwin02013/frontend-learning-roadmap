import profilePic from '../assets/xaasio-logo.svg'

function Card(){
  return(
  <div className="card">
    <img className = "card-image" src={profilePic} alt="Profile picture" />
    <h2>Xaasio</h2>
    <p>learning react</p>

  </div>)

}

export default Card