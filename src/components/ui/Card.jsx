import './Card.css';

const Card = ({ 
  children, 
  variant = 'default', 
  hover = false, 
  onClick, 
  className = '',
  ...props 
}) => {
  return (
    <div
      className={`card card-${variant} ${hover ? 'card-hover' : ''} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
