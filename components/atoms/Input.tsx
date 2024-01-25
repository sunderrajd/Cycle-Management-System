import { UseFormRegister, UseFormRegisterReturn } from 'react-hook-form'
export const ERROR_MESSAGES = {
  required: 'This field is required',
  minLength: 'Length should be greator than 5',
  invalid: 'Invalid Credentials',
  'auth/user-not-found': 'No such user found! Please Sign Up!',
}
export default function Input({
  register,
  label,
  errorCode,
  placeholder,
  type,
  options,
}: {
  register: UseFormRegisterReturn
  label?: string
  placeholder?: string
  errorCode?: any
  type?: string
  options?: { title: string; code: string }[]
}) {
  let Component: any = 'input'
  if (type === 'textarea') Component = 'textarea'
  return (
    <div className={'mb-5'}>
      <div className={'mb-1 text-sm font-semibold'}>{label}</div>
      {type === 'select' && (
        <select {...register}>
          {options?.map((option) => (
            <option value={option.code} key={option.code}>
              {option.title}
            </option>
          ))}
        </select>
      )}
      {type !== 'select' && (
        <Component
          className={
            ' rounded-lg border border-gray-100  shadow-lg ' +
            (type === 'checkbox' ? 'ml-1 mt-1 scale-150' : 'w-full px-6 py-4')
          }
          type={type}
          placeholder={placeholder}
          {...register}
        />
      )}
      <div className={'mt-1 text-sm text-red-500'}>
        {ERROR_MESSAGES[errorCode as keyof typeof ERROR_MESSAGES]}
      </div>
    </div>
  )
}
