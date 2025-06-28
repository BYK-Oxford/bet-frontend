interface JerseySVGProps {
  bodyColor: string;
  accentColor: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

const JerseySVG = ({
  bodyColor,
  accentColor,
  width = "100%",
  height = "100%",
  className,
  style,
}: JerseySVGProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 169 181"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        d="M17.5 31.5C22.5 21 27 19 27 19C28 19 31 26.5 36.5 71.5L29 89C13.4 89 2.5 80 0.5 74.5L17.5 31.5Z"
        fill={bodyColor}
      />
      <path
        d="M27 19L58.5 5.5C61.7 7.5 77.5 9 85 9.5V180C69 180.4 37.5 178 36.5 176C36.5 84.5 37 64.5 27 19Z"
        fill={bodyColor}
      />
      <path
        d="M29 89C13.5 89 2.5 80 0.5 74.5L2.5 69.5C7 80.5 24.3333 84.3333 30.5 85.5L29 89Z"
        fill={accentColor}
      />
      <path
        d="M152 31.5C147 21 142.5 19 142.5 19C141.5 19 138.5 26.5 133 71.5L140.5 89C156.1 89 167 80 169 74.5L152 31.5Z"
        fill={bodyColor}
      />
      <path
        d="M142.5 19L111 5.5C107.8 7.5 92 9 84.5 9.5V180C100.5 180.4 132 178 133 176C133 84.5 132.5 64.5 142.5 19Z"
        fill={bodyColor}
      />
      <path
        d="M140.5 89C156 89 167 80 169 74.5L167 69.5C162.5 80.5 145.167 84.3333 139 85.5L140.5 89Z"
        fill={accentColor}
      />
      <path
        d="M85 3C71.5 2.5 73 2 63 0.5L61 6.57639C65.5 7.5 75 9.07639 85 9.57639V3Z"
        fill={accentColor}
      />
      <path
        d="M63 0.5C61.4 2.9 58.6667 5.16667 57.5 6C61.5 19 74 22.5 85 23.5V18C68 16.5 62.5 9.5 63 0.5Z"
        fill={accentColor}
      />
      <path
        d="M84.5 3C98 2.5 96.5 2 106.5 0.5L108.5 6.57639C104 7.5 94.5 9.07639 84.5 9.57639V3Z"
        fill={accentColor}
      />
      <path
        d="M106.5 0.5C108.1 2.9 110.833 5.16667 112 6C108 19 95.5 22.5 84.5 23.5V18C101.5 16.5 107 9.5 106.5 0.5Z"
        fill={accentColor}
      />
      <path
        d="M29 89C18.5 88.5 17.6667 87 12.5 85.5C14.9 79.5 22.1667 67.5 27 57.5C34 47.5 41.5 50 45 57.5C47.8 74.3 52.1667 142.333 51 178.5C49 178.5 37 177 36.5 176C36.5 174 37.5 113.5 35.1744 74.5931L35 75L29 89Z"
        fill="black"
        fill-opacity="0.10"
      />
      <path
        d="M140.694 89C151.194 88.5 152.027 87 157.194 85.5C154.794 79.5 147.527 67.5 142.694 57.5C135.694 47.5 128.194 50 124.694 57.5C121.894 74.3 117.527 142.333 118.694 178.5C120.694 178.5 132.694 177 133.194 176C133.194 174 132.194 113.5 134.519 74.5931L134.694 75L140.694 89Z"
        fill="black"
        fill-opacity="0.10"
      />
    </svg>
  );
};

export default JerseySVG;
