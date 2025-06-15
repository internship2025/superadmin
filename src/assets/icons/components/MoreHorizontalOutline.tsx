import { Ref, SVGProps, forwardRef, memo } from "react";

const SvgMoreHorizontal = (
  { className, ...props }: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>,
) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24"
    width="24"
    height="24"
    {...props} 
    ref={ref}
    style={{ backgroundColor: 'var(--color-dark-900)' }}
  >
    <rect width="24" height="24" fill="var(--color-dark-900)" />
    <path
      d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4M19 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4M5 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4"
      fill="currentColor"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgMoreHorizontal);
const Memo = memo(ForwardRef);

export default Memo;
