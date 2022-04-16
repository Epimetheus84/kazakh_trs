import { Link } from 'react-router-dom';
import { Footer } from "../components";
import { DefaultLayout } from './layouts';
export default function About() {
  return (
    <DefaultLayout>
      <h1>About</h1>
      <p>This is the about page</p>
      <Link className='text-blue-600 visited:text-purple-600 target:shadow-lg' to="/">
        Go home
      </Link>
      <Footer />
    </DefaultLayout>
  );
}
