const classNames = require('classnames');

export default function Button ({ style, onClick = () => {}, type = 'button', loading, children, ...rest }) {
  const buttonClass = classNames(
    'text-white font-bold py-2 px-4 rounded-md', {
    'bg-gray-300 cursor-not-allowed': loading,
    'bg-blue-500 hover:bg-blue-700': !loading,
  });

  return (
    <button
      className={buttonClass}
      type={type}
      onClick={onClick}
      disabled={loading}
      {...rest}
    >
      {children ? children : ''}
    </button>
  )
}
