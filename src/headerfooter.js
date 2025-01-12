function Header() {
    return (
      <header className='text-white text-center p-2
      border-bottom border-5 border-primary' style={{backgroundColor: '$blue-800'}}>
        <h1>Digital Drum Kit</h1>
        <p className='lead'>Click or press keys to play</p>
      </header>
    );
  };
  
  function Footer() {
    return (
      <footer className="footer bg-danger text-light text-center mt-2">
        <div className="container">
          <span className="">Made with <span className='text-info fw-bold'>Bootstrap and React</span> by <a href="_Blank" className="text-decoration-none link-warning">Gabriel</a></span>
          </div>
      </footer>
      );
  };

  export {Header, Footer};