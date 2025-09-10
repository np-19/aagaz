import './Button.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  onClick, 
  disabled = false, 
  className = '',
  ...props 
}) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
