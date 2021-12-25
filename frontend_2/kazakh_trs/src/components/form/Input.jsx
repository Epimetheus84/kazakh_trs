const classNames = require('classnames');

export default function Input({ style, value, onChange = () => {}, placeholder = '', type = 'text', name, label, error, ...rest }){
  const inputClass = classNames(
    'shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline', {
    'border-red-500': error,
  });

  return (
    <> {
      label &&
      <label
        className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
        {label}
      </label>
      }
      <input
        className={inputClass}
        id={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...rest}
      />
      {
        error &&
        <p className="text-red-500 text-xs italic">{error}</p>
      }
  </>
)
}
