const classNames = require('classnames');

export default function Input({ style, className, value, onChange = () => {}, placeholder = '', type = 'text', name, label, error, ...rest }){
  const inputClass = classNames(
    'shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300' + (className ? ' ' + className : ''),
  {
    'border-red-500': error,
  });

  return (
    <> {
      label &&
      <label
        className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
        { label }
      </label>
      }
      <input
        {...style}
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
        <p className="text-red-500 text-xs italic">
          { error }
        </p>
      }
  </>
)
}
