import React from "react";
import { TypographyComponent } from "./styles";
import { ITypographyProps } from "./interface";

const Typography: React.FC<ITypographyProps> = (props) => {
  return <TypographyComponent {...props} />;
};

export default Typography;
