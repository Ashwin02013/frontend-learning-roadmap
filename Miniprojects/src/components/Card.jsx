import profilePic from "../assets/IMG_5566.JPEG";

function Card() {
  return (
    <div className="card">
      <img className="card-image" src={profilePic} alt="Profile picture" />
      <h2>Ashwin</h2>
      <p>Learning react</p>
    </div>
  );
}

export default Card;