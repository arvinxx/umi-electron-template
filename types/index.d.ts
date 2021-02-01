declare module '*.less';
declare module '*.png';
declare module 'less-vars-to-js';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}
