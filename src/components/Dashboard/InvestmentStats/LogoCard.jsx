import React from "react";
import propTypes from "prop-types";

function LogoCard(props) {
  const { LogoIcon, cardColor, cardLength } = props;
  return (
    <div
      style={{
        display: "flex",
        width: cardLength,
        height: cardLength,
        borderRadius: 2.45,
        alignItems: "center",
        justifyContent: "center",
        color: cardColor,
      }}
    >
      <LogoIcon style={{ fontSize: cardLength / 1.5 }} />
    </div>
  );
}

LogoCard.propTypes = {
  LogoIcon: propTypes.object.isRequired,
  cardColor: propTypes.string.isRequired,
  cardLength: propTypes.number.isRequired,
};

export default LogoCard;
