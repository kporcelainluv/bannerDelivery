import React from "react";
import styled from "styled-components";

const Svg = styled.svg`
  &:hover {
    fill: ${p => p.theme.colors.orange100};
  }
`;

export const Icon = ({ height, width, name, viewbox, fill }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      width={width}
      viewBox={viewbox ? viewbox : `0 0 ${height} ${width}`}
      fill={fill ? fill : "none"}
    >
      <use xlinkHref={`/icons/sprite.svg#${name}`} />
    </Svg>
  );
};
