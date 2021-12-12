import { Link } from 'react-router-dom';
import { Footer } from "../components";

export default function About() {
  return (
    <>
      <h1>About</h1>
      <p>This is the about page</p>
      <Link className='text-blue-600 visited:text-purple-600 target:shadow-lg' to="/">
        Go home
      </Link>
      <Footer />
    </>
  );
}
