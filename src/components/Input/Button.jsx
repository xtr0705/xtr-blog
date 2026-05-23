function Button({
  children,
  className='cursor-pointer',
  bgColor='bg-blue-600',
  ...props
}){
  return(
    <button className={`px-4 py-2 rounded-lg ${bgColor} ${className}`} {...props} >
      {children}
    </button>
  )
}

export default Button;