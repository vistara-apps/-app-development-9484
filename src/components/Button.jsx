import React from 'react'

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  disabled = false, 
  ...props 
}) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-white text-purple-900 hover:bg-white/90 active:bg-white/80',
    secondary: 'bg-white/20 text-white hover:bg-white/30 active:bg-white/25 border border-white/30',
    destructive: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700'
  }

  const classes = `${baseClasses} ${variants[variant]} ${className}`

  return (
    <button 
      className={classes}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button