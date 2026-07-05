function Button({
  children,
  className = "",
  ...props
}) {
  return (
    <button
      className={`
        cursor-pointer
        px-4
        py-2
        rounded-lg

        bg-(--surface)
        border
        border-(--border)

        text-(--text)
        font-medium

        transition-all
        duration-200

        hover:bg-(--hover)
        hover:border-zinc-500

        active:scale-[0.98]

        disabled:opacity-50
        disabled:cursor-not-allowed

        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;