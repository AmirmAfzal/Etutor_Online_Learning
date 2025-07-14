declare namespace JSX {
  interface IntrinsicElements {
    "iconify-icon": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      icon?: string;
      inline?: boolean;
      width?: string | number;
      height?: string | number;
    };
  }
}
