interface ButterflyLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function ButterflyLogo({ size = 'md', className = '' }: ButterflyLogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const wingSize = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const bodySize = {
    sm: 'w-1 h-6',
    md: 'w-2 h-8',
    lg: 'w-3 h-10'
  };

  return (
    <div className={`${sizeClasses[size]} relative ${className}`}>
      <div className="absolute inset-0 transform rotate-45">
        <div className={`${wingSize[size]} bg-gradient-to-br from-purple-500 to-purple-600 rounded-full absolute top-0 left-0`}></div>
        <div className={`${wingSize[size]} bg-gradient-to-br from-orange-500 to-orange-600 rounded-full absolute top-0 right-0`}></div>
        <div className={`${wingSize[size]} bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full absolute bottom-0 left-0`}></div>
        <div className={`${wingSize[size]} bg-gradient-to-br from-pink-500 to-pink-600 rounded-full absolute bottom-0 right-0`}></div>
        <div className={`${bodySize[size]} bg-gradient-to-b from-emerald-600 to-emerald-700 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full`}></div>
      </div>
    </div>
  );
}
