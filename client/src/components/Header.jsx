import logo from './assets/logo.png';

export default function Header() {
  return (
    <nav className='navbar bg-light mb-4 p-0'>
      <div className=''>
        <a className='navbar-brand' href='/'>
          <div className='d-flex'>
            <div>ProjectGrizzly</div>
          </div>
        </a>
      </div>
    </nav>
  );
}