function Header() {
    return (
      <header className='text-dark text-center p-2
      border-bottom border-5 border-info bg-info'>
        <h1 className="display-6">Calculator made with <span className="titleMath text-primary-emphasis fw-bold">MathJS</span></h1>
      </header>
    );
  };
  
  function Footer() {
    return (
      <footer className="footer bg-info text-dark text-center mt-2">
        <div className="container">
          <span className="">Made with <span className='text-danger fw-bold'>Bootstrap and React</span> by <a href="_Blank" className="text-decoration-none link-dark fw-bold">Gabriel</a></span>
          </div>
      </footer>
      );
  };

  export {Header, Footer};