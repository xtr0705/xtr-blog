import { forwardRef } from "react";

const Input = forwardRef(function Input(
  {
    className = "",
    label,
    type = "text",
    ...props
  },
  ref
) {
  return (
    <div className="w-full">
      {label && (
        <label
          className="
            inline-block
            mb-2
            pl-1
            text-sm
            font-medium
            text-[var(--text)]
          "
        >
          {label}
        </label>
      )}

      <input
        ref={ref}
        type={type}
        className={`
          w-full

          rounded-sm

          px-4
          py-3

          bg-[var(--surface)]
          text-[var(--text)]

          border
          border-[var(--border)]

          outline-none

          placeholder:text-[var(--text-secondary)]

          transition-all
          duration-200

          hover:border-zinc-500

          focus:border-zinc-400
          focus:ring-2
          focus:ring-zinc-400/20

          ${className}
        `}
        {...props}
      />
    </div>
  );
});

export default Input;