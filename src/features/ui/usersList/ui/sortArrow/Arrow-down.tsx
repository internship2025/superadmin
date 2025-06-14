

export const ArrowDown = ({color, ...props}: {color?: string} & React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width={8} height={6} viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg"
     {...props}>
      <path d="M4 5L0.535898 0.5L7.4641 0.5L4 5Z" fill={color} />
    </svg>
  );
};
