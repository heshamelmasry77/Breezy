import PropTypes from "prop-types";

const CustomButton = ({
  onClick,
  icon,
  text,
  color = "bg-blue-600",
  hoverColor = "hover:bg-zinc-500",
  textColor = "text-white",
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full ${color} px-4 py-2 text-xs font-semibold ${textColor} shadow-sm ${hoverColor} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 flex items-center gap-2 justify-center shrink-0`}
    >
      {icon && <span className="flex items-center justify-center">{icon}</span>}
      {text && <span>{text}</span>}
    </button>
  );
};

CustomButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.node,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default CustomButton;
