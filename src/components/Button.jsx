import { forwardRef } from "react";

/**
 * Reusable Button — accepts a `variant` prop so the same component covers
 * every button style in the app, and spreads the rest of the received
 * props (onClick, disabled, aria-*, ...) onto the underlying element.
 * Wrapped in forwardRef so parents (like ConfirmDialog) can focus it
 * programmatically. Demonstrates component composition + reusable UI.
 */
const Button = forwardRef(function Button(
  { children, variant = "primary", type = "button", ...rest },
  ref
) {
  return (
    <button ref={ref} type={type} className={`btn btn--${variant}`} {...rest}>
      {children}
    </button>
  );
});

export default Button;
