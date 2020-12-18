import { useState } from "react";

function Index() {
  const [username, setUsername] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    window.location.href = `/chat?username=${username}`;
  }

  return (
    <div className="username-container">
      <form onSubmit={onSubmit}>
        <h3>Please enter a username</h3>
        <div className="form-group">
          <label htmlFor="username">Enter Username</label>
          <input
            className="form-input"
            type="text"
            name="username"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />
        </div>
        <div className="form-group">
          <button className="submit-btn" type="submit">
            Enter chat!
          </button>
        </div>
      </form>
    </div>
  );
}

export default Index;
