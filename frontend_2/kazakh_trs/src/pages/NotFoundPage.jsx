import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div>
      <h1>404</h1>
      <p>Page not found</p>
      <Link className='text-blue-600 visited:text-purple-600 target:shadow-lg' to="/">
        Go to home page
      </Link>
    </div>
  );
}
