declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.svg" {
  // const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  // export default content;
  import React = require("react")
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}
